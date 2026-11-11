# SQLi Ninja - Caido SQL Injection Plugin

Advanced SQL Injection testing plugin for Caido, inspired by sqlmap and ghauri.

## Features

### Detection Techniques
- **Error-based** - Detects SQL errors in responses
- **Boolean-based Blind** - Compares true/false condition responses
- **Time-based Blind** - Measures response delays
- **UNION-based** - Enumerates columns and extracts data
- **Stacked Queries** - Tests for multiple query execution

### Supported Databases
- MySQL / MariaDB
- PostgreSQL
- Microsoft SQL Server
- Oracle
- SQLite

### WAF Bypass / Tamper Scripts
- `space2comment` - Replace spaces with `/**/`
- `randomcase` - Randomize character case
- `between` - Replace `>` with `NOT BETWEEN 0 AND`
- `charencode` - Encode as `CHR()` functions
- `hex` - Hex encode payload
- `uppercase` / `lowercase` - Case conversion
- `doubleurlencode` - Double URL encoding

### Data Extraction
- Database enumeration
- Table enumeration
- Column enumeration
- Data dumping
- User/privilege extraction

### Out-of-Band (OOB) Exfiltration
- DNS exfiltration
- HTTP exfiltration
- Supports Burp Collaborator, interact.sh, etc.

## Installation

### From Source
```bash
cd caido-sqli-plugin
npm install
npm run build
```

### In Caido
1. Go to **Settings > Plugins**
2. Click **Install from file**
3. Select the built `.zip` package

## Usage

### Quick Scan
1. Send a request to Caido's HTTP History
2. Right-click the request
3. Select **SQLi Ninja: Test Parameter**
4. Choose the parameter to test
5. Click **Quick Scan**

### Full Scan
1. Open the **SQLi Ninja** sidebar panel
2. Enter the **Request ID** from HTTP History
3. Enter the **Parameter Name** to test
4. Select injection techniques
5. Configure Level (1-5) and Risk (1-3)
6. Optionally enable WAF bypass tampers
7. Click **Start Full Scan**

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| Level | Number of payloads to test (1-5) | 3 |
| Risk | Aggressiveness (1-3) | 2 |
| Time Delay | Seconds for time-based tests | 5 |
| Threads | Concurrent requests | 1 |
| DBMS | Target database type | Auto |
| OOB Domain | Collaborator domain for exfil | - |

## Payload Levels

### Level 1 (Minimal)
- Basic quote tests
- Simple boolean conditions

### Level 2 (Low)
- Extended quote variations
- Common injection patterns

### Level 3 (Medium) - Default
- Comment-based injections
- UNION enumeration
- Time-based delays

### Level 4 (High)
- WAF evasion payloads
- Database-specific payloads
- Advanced boolean conditions

### Level 5 (Maximum)
- Full payload suite
- All tamper combinations
- Brute-force column enumeration

## Risk Levels

### Risk 1 (Safe)
- Read-only operations
- No data modification

### Risk 2 (Medium) - Default
- Includes heavy queries
- May cause delays

### Risk 3 (Aggressive)
- Stacked queries enabled
- Potential data modification
- OOB exfiltration attempts

## Example Payloads

### Error-based
```sql
' AND 1=CONVERT(int,(SELECT @@version))--
' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT version())))--
```

### Boolean-based
```sql
' AND '1'='1  (TRUE)
' AND '1'='2  (FALSE)
```

### Time-based
```sql
' AND SLEEP(5)--
' AND WAITFOR DELAY '0:0:5'--
' AND PG_SLEEP(5)--
```

### UNION-based
```sql
' UNION SELECT NULL,NULL,NULL--
' ORDER BY 10--
```

## Contributing

Pull requests welcome. For major changes, please open an issue first.

## License

MIT

## Disclaimer

This tool is for authorized security testing only. Always obtain proper authorization before testing any application.
