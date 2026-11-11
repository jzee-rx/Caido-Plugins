// src/frontend/index.ts
var createTab = (caido, sessionId, onLabel) => {
  const onLabelChange = onLabel;
  const container = document.createElement("div");
  container.innerHTML = `
    <style>
      .sqli-container {
        padding: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #1a1a2e;
        color: #eee;
        min-height: 100vh;
        overflow-y: auto;
      }
      .sqli-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .sqli-header h1 { margin: 0; font-size: 20px; }
      .badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        background: #2d3748;
      }
      .badge.scanning {
        background: #805ad5;
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .card {
        background: #16213e;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;
      }
      .card h2 {
        margin: 0 0 10px 0;
        font-size: 12px;
        color: #a0aec0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        margin-bottom: 10px;
      }
      .form-group { margin-bottom: 10px; }
      .form-group label {
        display: block;
        font-size: 11px;
        color: #a0aec0;
        margin-bottom: 3px;
      }
      .form-group input, .form-group select {
        width: 100%;
        padding: 6px 10px;
        background: #1a1a2e;
        border: 1px solid #333;
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
        box-sizing: border-box;
      }
      .form-group input:focus, .form-group select:focus {
        outline: none;
        border-color: #667eea;
      }
      .param-list {
        max-height: 150px;
        overflow-y: auto;
        border: 1px solid #333;
        border-radius: 4px;
        background: #1a1a2e;
      }
      .param-item {
        display: flex;
        align-items: center;
        padding: 6px 10px;
        border-bottom: 1px solid #2d3748;
        cursor: pointer;
        font-size: 12px;
      }
      .param-item:hover { background: #2d3748; }
      .param-item:last-child { border-bottom: none; }
      .param-item input[type="checkbox"] {
        width: auto;
        margin-right: 8px;
      }
      .param-item .param-name { font-weight: 500; flex: 1; }
      .param-item .param-type {
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 3px;
        background: #4a5568;
        margin-left: 6px;
      }
      .param-item .param-type.query { background: #2b6cb0; }
      .param-item .param-type.body { background: #2f855a; }
      .param-item .param-type.json { background: #805ad5; }
      .param-item .param-type.cookie { background: #c05621; }
      .param-item .param-value {
        font-size: 10px;
        color: #718096;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 6px;
      }
      .no-params {
        padding: 15px;
        text-align: center;
        color: #718096;
        font-size: 12px;
      }
      .checkbox-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .checkbox-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        cursor: pointer;
      }
      .checkbox-item input { width: auto; }
      .btn-row {
        display: flex;
        gap: 8px;
        margin: 12px 0;
        flex-wrap: wrap;
      }
      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .btn-primary:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-secondary { background: #2d3748; color: white; }
      .btn-secondary:hover { background: #4a5568; }
      .btn-success { background: #2f855a; color: white; }
      .btn-success:hover { background: #276749; }
      .btn-sm { padding: 5px 10px; font-size: 11px; }
      .log-box {
        background: #0d1117;
        border-radius: 6px;
        padding: 10px;
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 11px;
        line-height: 1.4;
        height: 300px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .log-info { color: #8b949e; }
      .log-success { color: #3fb950; }
      .log-error { color: #f85149; }
      .log-warn { color: #d29922; }
      .log-verbose { color: #6e7681; }
      .result-card {
        background: #1a1a2e;
        border-left: 3px solid #3fb950;
        padding: 10px;
        margin-bottom: 8px;
        border-radius: 0 5px 5px 0;
        font-size: 12px;
      }
      .result-card.high { border-left-color: #f85149; }
      .result-card h3 { margin: 0 0 6px 0; font-size: 13px; }
      .result-card p { margin: 3px 0; color: #a0aec0; }
      .result-card code {
        background: #0d1117;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 10px;
        color: #79c0ff;
      }
      .grid-2 {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 16px;
      }
      @media (max-width: 1000px) {
        .grid-2 { grid-template-columns: 1fr; }
      }
      .select-btns { display: flex; gap: 6px; }
      .options-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
      }
      .payloads-info {
        font-size: 11px;
        color: #718096;
        margin-top: 8px;
      }
    </style>

    <div class="sqli-container" style="min-height:auto">
      <div class="sqli-header" style="margin-bottom:12px;padding-bottom:8px">
        <span style="font-size:12px;color:#a0aec0" id="tabReqLabel">New target</span>
        <span class="badge" id="statusBadge">Ready</span>
      </div>

      <div class="grid-2">
        <div>
          <div class="card">
            <h2>\u{1F3AF} Target</h2>
            <div class="form-row">
              <div class="form-group" style="margin-bottom:0">
                <label>Request ID (from HTTP History)</label>
                <input type="text" id="requestId" placeholder="e.g. 123">
              </div>
              <div style="display:flex;align-items:flex-end;gap:4px">
                <button class="btn btn-secondary btn-sm" id="btnLoadParams">Load</button>
                <button class="btn btn-secondary btn-sm" id="btnProbe" title="Diagnose SDK methods">\u{1F50D}</button>
              </div>
            </div>
            <div style="margin-top:10px;text-align:center;color:#718096;font-size:11px">\u2014 OR paste raw request \u2014</div>
            <div class="form-group" style="margin-top:8px">
              <textarea id="rawRequest" placeholder="POST /api/login HTTP/1.1&#10;Host: example.com&#10;Content-Type: application/x-www-form-urlencoded&#10;&#10;username=admin&password=test" style="width:100%;height:80px;background:#1a1a2e;border:1px solid #333;border-radius:4px;color:#fff;font-family:monospace;font-size:11px;padding:8px;resize:vertical;box-sizing:border-box"></textarea>
              <button class="btn btn-secondary btn-sm" id="btnParseRaw" style="margin-top:6px;width:100%">Parse Raw Request</button>
            </div>
          </div>

          <div class="card">
            <h2>
              \u{1F4CB} Parameters
              <div class="select-btns">
                <button class="btn btn-sm btn-secondary" id="btnSelectAll">All</button>
                <button class="btn btn-sm btn-secondary" id="btnSelectNone">None</button>
              </div>
            </h2>
            <div class="param-list" id="paramList">
              <div class="no-params">Load a request to detect parameters</div>
            </div>
          </div>

          <div class="card">
            <h2>\u26A1 Techniques</h2>
            <div class="checkbox-grid">
              <label class="checkbox-item">
                <input type="checkbox" id="techError" checked> Error
              </label>
              <label class="checkbox-item">
                <input type="checkbox" id="techBoolean" checked> Boolean
              </label>
              <label class="checkbox-item">
                <input type="checkbox" id="techTime"> Time
              </label>
              <label class="checkbox-item">
                <input type="checkbox" id="techUnion"> UNION
              </label>
            </div>
          </div>

          <div class="card">
            <h2>\u{1F527} Options</h2>
            <div class="options-row">
              <div class="form-group" style="margin:0">
                <label>Level</label>
                <select id="level">
                  <option value="1">1 - Fast</option>
                  <option value="2" selected>2 - Normal</option>
                  <option value="3">3 - Deep</option>
                </select>
              </div>
              <div class="form-group" style="margin:0">
                <label>Time (sec)</label>
                <input type="number" id="timeSec" value="5" min="3" max="15">
              </div>
              <div class="form-group" style="margin:0">
                <label>&nbsp;</label>
                <label class="checkbox-item">
                  <input type="checkbox" id="verbose" checked> Verbose
                </label>
              </div>
            </div>
            <div class="payloads-info">
              Level 1: ~15 payloads | Level 2: ~30 payloads | Level 3: ~50+ payloads
            </div>
          </div>

          <div class="btn-row">
            <button class="btn btn-primary" id="btnScan">\u{1F680} Scan Selected</button>
            <button class="btn btn-success" id="btnScanAll">\u26A1 Scan All</button>
            <button class="btn" id="btnStop" style="background:#c53030;color:#fff">\u23F9 Stop</button>
            <button class="btn btn-secondary" id="btnClear">Clear</button>
          </div>
        </div>

        <div>
          <div class="card" style="height: calc(100% - 24px)">
            <h2>
              \u{1F4CB} Log
              <button class="btn btn-sm btn-secondary" id="btnCopyLog">Copy</button>
            </h2>
            <div class="log-box" id="logBox">Ready. Send a request from HTTP History to begin.</div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top: 12px">
        <h2>\u{1F3AF} Findings</h2>
        <div id="resultsBox">No vulnerabilities found yet. Run a scan to detect SQL injection.</div>
      </div>

      <div class="card" id="enumCard" style="margin-top: 12px; opacity: 0.5; pointer-events: none">
        <h2>
          \u{1F5C4}\uFE0F Enumeration &amp; Extraction
          <span style="font-size:10px;color:#718096;font-weight:400" id="enumVectorLabel">\u2014 run a scan to unlock \u2014</span>
        </h2>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
          <label style="font-size:11px;color:#a0aec0">Injection point:</label>
          <select id="enumVector" style="padding:5px 8px;background:#1a1a2e;border:1px solid #333;border-radius:4px;color:#fff;font-size:11px"></select>
          <label style="font-size:11px;color:#a0aec0;margin-left:auto">Row cap:</label>
          <input type="number" id="enumRowCap" value="20" min="1" max="500" style="width:60px;padding:5px;background:#1a1a2e;border:1px solid #333;border-radius:4px;color:#fff;font-size:11px">
        </div>

        <div class="btn-row" style="margin:0 0 10px 0">
          <button class="btn btn-sm btn-secondary" id="btnBanner">Banner</button>
          <button class="btn btn-sm btn-secondary" id="btnUser">Current User</button>
          <button class="btn btn-sm btn-secondary" id="btnCurrentDb">Current DB</button>
          <button class="btn btn-sm btn-secondary" id="btnHostname">Hostname</button>
          <button class="btn btn-sm btn-primary" id="btnDbs">\u{1F4C2} Get Databases</button>
        </div>

        <div id="enumTree" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
          <div>
            <div style="font-size:10px;color:#718096;text-transform:uppercase;margin-bottom:4px">Databases</div>
            <div id="dbList" class="enum-list"></div>
          </div>
          <div>
            <div style="font-size:10px;color:#718096;text-transform:uppercase;margin-bottom:4px">Tables</div>
            <div id="tableList" class="enum-list"></div>
          </div>
          <div>
            <div style="font-size:10px;color:#718096;text-transform:uppercase;margin-bottom:4px">Columns</div>
            <div id="columnList" class="enum-list"></div>
          </div>
        </div>
        <div class="btn-row" style="margin:0 0 10px 0">
          <button class="btn btn-sm btn-success" id="btnDump">\u2B07\uFE0F Dump Selected Columns</button>
          <span style="font-size:11px;color:#718096;align-self:center" id="dumpTarget"></span>
        </div>
        <div id="dumpResult" style="overflow-x:auto"></div>

        <div style="margin-top:12px;border-top:1px solid #333;padding-top:10px">
          <div style="font-size:10px;color:#718096;text-transform:uppercase;margin-bottom:6px">\u{1F4BB} SQL Shell</div>
          <div style="display:flex;gap:6px">
            <input type="text" id="sqlShellInput" placeholder="SELECT @@version   (scalar queries)" style="flex:1;padding:7px 10px;background:#0d1117;border:1px solid #333;border-radius:4px;color:#79c0ff;font-family:monospace;font-size:12px">
            <button class="btn btn-sm btn-primary" id="btnSqlRun">Run</button>
          </div>
          <div id="sqlShellResult" style="margin-top:6px;font-family:monospace;font-size:12px;color:#3fb950"></div>
        </div>
      </div>
    </div>
    <style>
      .enum-list { max-height:160px; overflow-y:auto; border:1px solid #333; border-radius:4px; background:#1a1a2e; min-height:40px; }
      .enum-item { padding:5px 8px; font-size:11px; cursor:pointer; border-bottom:1px solid #2d3748; display:flex; align-items:center; gap:6px; }
      .enum-item:hover { background:#2d3748; }
      .enum-item.active { background:#2b6cb0; }
      .enum-item input { width:auto; }
      .dump-table { border-collapse:collapse; width:100%; font-size:11px; }
      .dump-table th { background:#0d1117; color:#79c0ff; padding:5px 8px; text-align:left; border:1px solid #333; }
      .dump-table td { padding:4px 8px; border:1px solid #2d3748; color:#eee; }
    </style>
  `;
  const logBox = container.querySelector("#logBox");
  const resultsBox = container.querySelector("#resultsBox");
  const statusBadge = container.querySelector("#statusBadge");
  const btnScan = container.querySelector("#btnScan");
  const btnScanAll = container.querySelector("#btnScanAll");
  const btnStop = container.querySelector("#btnStop");
  const requestIdInput = container.querySelector("#requestId");
  const paramList = container.querySelector("#paramList");
  let params = [];
  let isScanning = false;
  const log = (msg, type = "info") => {
    const line = document.createElement("div");
    line.className = `log-${type}`;
    line.textContent = msg;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  };
  const clearLog = () => {
    logBox.innerHTML = "";
  };
  const renderParams = () => {
    if (params.length === 0) {
      paramList.innerHTML = '<div class="no-params">No parameters found</div>';
      return;
    }
    paramList.innerHTML = params.map((p, i) => `
      <label class="param-item">
        <input type="checkbox" data-index="${i}" ${p.selected ? "checked" : ""}>
        <span class="param-name">${p.name}</span>
        <span class="param-type ${p.type}">${p.type}</span>
        <span class="param-value">${p.value.substring(0, 20)}${p.value.length > 20 ? "..." : ""}</span>
      </label>
    `).join("");
    paramList.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener("change", (e) => {
        const idx = parseInt(e.target.dataset.index);
        params[idx].selected = e.target.checked;
      });
    });
  };
  const loadParams = async () => {
    const requestId = requestIdInput.value.trim();
    if (!requestId) {
      caido.window.showToast("Enter a Request ID", { variant: "warning" });
      return;
    }
    log(`Loading parameters from request ${requestId}...`, "info");
    try {
      const result = await caido.backend.getParams(requestId);
      params = result.map((p) => ({ ...p, selected: true }));
      renderParams();
      log(`Found ${params.length} parameter(s)`, "success");
      if (params.length > 0) {
        caido.window.showToast(`Found ${params.length} parameters`, { variant: "success" });
        log(`Ready \u2014 review level/techniques/params above, then click Start Scan.`, "info");
      }
    } catch (e) {
      log(`Error: ${e.message}`, "error");
      params = [];
      renderParams();
    }
  };
  const parseRawRequest = () => {
    const rawText = container.querySelector("#rawRequest").value.trim();
    if (!rawText) {
      caido.window.showToast("Paste a raw HTTP request first", { variant: "warning" });
      return;
    }
    log(`Parsing raw request...`, "info");
    params = [];
    try {
      const lines = rawText.split(/\r?\n/);
      const firstLine = lines[0];
      const urlMatch = firstLine.match(/^(?:GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)/i);
      if (urlMatch) {
        const urlPath = urlMatch[1];
        const queryIndex = urlPath.indexOf("?");
        if (queryIndex !== -1) {
          const queryStr = urlPath.substring(queryIndex + 1);
          const queryParams = new URLSearchParams(queryStr);
          for (const [name, value] of queryParams.entries()) {
            params.push({ name, value, type: "query", selected: true });
          }
        }
      }
      let bodyStart = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "") {
          bodyStart = i + 1;
          break;
        }
      }
      if (bodyStart > 0 && bodyStart < lines.length) {
        const body = lines.slice(bodyStart).join("\n").trim();
        if (body) {
          try {
            const json = JSON.parse(body);
            const extractJson = (obj, prefix = "") => {
              if (typeof obj === "object" && obj !== null) {
                for (const [key, value] of Object.entries(obj)) {
                  const fullKey = prefix ? `${prefix}.${key}` : key;
                  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                    extractJson(value, fullKey);
                  } else {
                    params.push({ name: fullKey, value: String(value), type: "json", selected: true });
                  }
                }
              }
            };
            extractJson(json);
          } catch {
            const bodyParams = new URLSearchParams(body);
            for (const [name, value] of bodyParams.entries()) {
              params.push({ name, value, type: "body", selected: true });
            }
          }
        }
      }
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === "") break;
        if (line.toLowerCase().startsWith("cookie:")) {
          const cookieStr = line.substring(7).trim();
          for (const part of cookieStr.split(";")) {
            const [name, ...rest] = part.trim().split("=");
            if (name) {
              params.push({ name, value: rest.join("="), type: "cookie", selected: true });
            }
          }
        }
      }
      renderParams();
      log(`Found ${params.length} parameter(s) from raw request`, "success");
      if (params.length > 0) {
        caido.window.showToast(`Found ${params.length} parameters`, { variant: "success" });
        log(`Ready \u2014 review level/techniques/params above, then click Start Scan.`, "info");
        container._rawRequest = rawText;
      } else {
        caido.window.showToast("No parameters found in request", { variant: "warning" });
      }
    } catch (e) {
      log(`Parse error: ${e.message}`, "error");
    }
  };
  const tabReqLabel = container.querySelector("#tabReqLabel");
  const api = {
    setRequestId: (id) => {
      requestIdInput.value = id;
      log(`Request ${id} loaded`, "info");
      tabReqLabel.textContent = `Request ${id}`;
      caido.backend.getMeta(id).then((m) => {
        if (m && (m.method || m.path)) {
          onLabelChange(`${m.method || "REQ"} ${m.path || id}`.trim());
          tabReqLabel.textContent = `${m.method || ""} ${m.path || ""} (#${id})`.trim();
        }
      }).catch(() => {
      });
      setTimeout(loadParams, 100);
    },
    setRawRequest: (raw) => {
      container.querySelector("#rawRequest").value = raw;
      requestIdInput.value = "";
      log(`Raw request loaded from editor`, "info");
      const fl = (raw.split(/\r?\n/)[0] || "").match(/^([A-Z]+)\s+([^\s?]+)/);
      if (fl) {
        onLabelChange(`${fl[1]} ${fl[2]}`);
        tabReqLabel.textContent = `${fl[1]} ${fl[2]}`;
      }
      setTimeout(parseRawRequest, 100);
    },
    loadParams,
    log,
    autoScan: () => {
      setTimeout(() => runScan(true), 400);
    },
    stop: () => {
      try {
        caido.backend.stopScan(sessionId);
      } catch (e) {
      }
    }
  };
  const getSelectedParams = () => params.filter((p) => p.selected);
  const getConfig = (allParams = false) => {
    const techniques = [];
    if (container.querySelector("#techError").checked) techniques.push("error");
    if (container.querySelector("#techBoolean").checked) techniques.push("boolean");
    if (container.querySelector("#techTime").checked) techniques.push("time");
    if (container.querySelector("#techUnion").checked) techniques.push("union");
    return {
      requestId: requestIdInput.value.trim(),
      rawRequest: container.querySelector("#rawRequest").value.trim(),
      params: allParams ? params : getSelectedParams(),
      techniques,
      level: parseInt(container.querySelector("#level").value),
      timeSec: parseInt(container.querySelector("#timeSec").value),
      verbose: container.querySelector("#verbose").checked,
      sessionId
    };
  };
  const renderResults = (results) => {
    if (results.length === 0) {
      resultsBox.innerHTML = '<p style="color: #a0aec0;">No vulnerabilities found.</p>';
      return;
    }
    resultsBox.innerHTML = results.map((r) => `
      <div class="result-card ${r.confidence === "high" ? "high" : ""}">
        <h3>\u{1F3AF} ${r.technique.toUpperCase()} - ${r.param}</h3>
        <p><strong>Type:</strong> ${r.paramType} | <strong>DBMS:</strong> ${r.dbms} | <strong>Confidence:</strong> ${r.confidence}</p>
        <p><strong>Payload:</strong> <code>${r.payload.substring(0, 80)}${r.payload.length > 80 ? "..." : ""}</code></p>
        <p><strong>Evidence:</strong> ${r.evidence}</p>
      </div>
    `).join("");
  };
  const createFindings = async (requestId, results) => {
    if (!requestId) {
      log("[i] Findings tab needs a saved request (HTTP History) \u2014 raw-paste scans are logged here only.", "info");
      return;
    }
    const api2 = caido.findings;
    if (!api2 || typeof api2.createFinding !== "function") {
      log("[i] Findings API unavailable in this Caido version.", "info");
      return;
    }
    let added = 0;
    for (const r of results) {
      const description = `SQL Injection \u2014 ${r.technique.toUpperCase()} technique

Parameter: ${r.param} (${r.paramType})
DBMS: ${r.dbms}
Vector: ${r.title}
Confidence: ${r.confidence}

Payload:
${r.payload}

Evidence:
${r.evidence}`;
      try {
        await api2.createFinding(requestId, {
          title: `SQLi (${r.technique}) \u2014 ${r.param}`,
          description,
          reporter: "SQLi Ninja"
        });
        added++;
      } catch (e) {
        log(`[!] Could not add finding for ${r.param}: ${e.message}`, "warn");
      }
    }
    if (added > 0) {
      log(`[+] ${added} finding(s) added to Caido Findings tab`, "success");
      caido.window.showToast(`${added} finding(s) sent to Findings tab`, { variant: "success" });
    }
  };
  const runScan = async (allParams) => {
    const config = getConfig(allParams);
    if (!config.requestId && !config.rawRequest) {
      caido.window.showToast("Load a request or paste raw request first", { variant: "error" });
      return;
    }
    if (config.params.length === 0) {
      caido.window.showToast("No parameters selected", { variant: "error" });
      return;
    }
    if (config.techniques.length === 0) {
      caido.window.showToast("Select at least one technique", { variant: "error" });
      return;
    }
    isScanning = true;
    btnScan.disabled = true;
    btnScanAll.disabled = true;
    statusBadge.textContent = "Scanning...";
    statusBadge.classList.add("scanning");
    clearLog();
    resultsBox.innerHTML = '<p style="color: #a0aec0;">Scanning...</p>';
    try {
      const results = await caido.backend.scan(config);
      renderResults(results);
      if (results.length > 0) {
        caido.window.showToast(`Found ${results.length} vulnerability! Enumeration unlocked.`, { variant: "success" });
        await unlockEnumeration(config.requestId);
        await createFindings(config.requestId, results);
      }
    } catch (e) {
      log(`ERROR: ${e.message}`, "error");
    } finally {
      isScanning = false;
      btnScan.disabled = false;
      btnScanAll.disabled = false;
      statusBadge.textContent = "Ready";
      statusBadge.classList.remove("scanning");
    }
  };
  const enumCard = container.querySelector("#enumCard");
  const enumVectorSel = container.querySelector("#enumVector");
  const enumVectorLabel = container.querySelector("#enumVectorLabel");
  const dbListEl = container.querySelector("#dbList");
  const tableListEl = container.querySelector("#tableList");
  const columnListEl = container.querySelector("#columnList");
  const dumpTargetEl = container.querySelector("#dumpTarget");
  const dumpResultEl = container.querySelector("#dumpResult");
  let selectedDb = "";
  let selectedTable = "";
  const enumCfg = (extra = {}) => ({
    requestId: requestIdInput.value.trim(),
    param: enumVectorSel.value || void 0,
    timeSec: parseInt(container.querySelector("#timeSec").value) || 5,
    rowCap: parseInt(container.querySelector("#enumRowCap").value) || 20,
    sessionId,
    ...extra
  });
  const unlockEnumeration = async (requestId) => {
    try {
      const vectors = await caido.backend.getVectors(requestId);
      if (!vectors || vectors.length === 0) return;
      enumVectorSel.innerHTML = vectors.map((v) => `<option value="${v.param}">${v.param} \u2014 ${v.technique}/${v.dbms}</option>`).join("");
      enumVectorLabel.textContent = `${vectors.length} injection point(s)`;
      enumCard.style.opacity = "1";
      enumCard.style.pointerEvents = "auto";
    } catch (e) {
      log(`Enum unlock error: ${e.message}`, "error");
    }
  };
  const renderList = (el, items, onClick, checkbox = false) => {
    if (items.length === 0) {
      el.innerHTML = '<div style="padding:8px;color:#718096;font-size:11px">none</div>';
      return;
    }
    el.innerHTML = "";
    items.forEach((item) => {
      const node = document.createElement("div");
      node.className = "enum-item";
      node.innerHTML = checkbox ? `<input type="checkbox" data-col="${item}"><span>${item}</span>` : `<span>${item}</span>`;
      node.addEventListener("click", (e) => {
        if (checkbox && e.target.tagName === "INPUT") return;
        onClick(item, node);
      });
      el.appendChild(node);
    });
  };
  const runEnum = async (kind, extra = {}) => {
    try {
      return await caido.backend.enumerate(enumCfg({ kind, ...extra }));
    } catch (e) {
      log(`Enum error: ${e.message}`, "error");
      return [];
    }
  };
  container.querySelector("#btnBanner")?.addEventListener("click", () => runEnum("banner"));
  container.querySelector("#btnUser")?.addEventListener("click", () => runEnum("user"));
  container.querySelector("#btnCurrentDb")?.addEventListener("click", () => runEnum("currentdb"));
  container.querySelector("#btnHostname")?.addEventListener("click", () => runEnum("hostname"));
  container.querySelector("#btnDbs")?.addEventListener("click", async () => {
    dbListEl.innerHTML = '<div style="padding:8px;color:#718096;font-size:11px">loading\u2026</div>';
    const dbs = await runEnum("dbs");
    renderList(dbListEl, dbs, async (db, node) => {
      dbListEl.querySelectorAll(".enum-item").forEach((n) => n.classList.remove("active"));
      node.classList.add("active");
      selectedDb = db;
      tableListEl.innerHTML = '<div style="padding:8px;color:#718096;font-size:11px">loading\u2026</div>';
      columnListEl.innerHTML = "";
      const tables = await runEnum("tables", { db });
      renderList(tableListEl, tables, async (tbl, tnode) => {
        tableListEl.querySelectorAll(".enum-item").forEach((n) => n.classList.remove("active"));
        tnode.classList.add("active");
        selectedTable = tbl;
        dumpTargetEl.textContent = `${selectedDb}.${selectedTable}`;
        columnListEl.innerHTML = '<div style="padding:8px;color:#718096;font-size:11px">loading\u2026</div>';
        const cols = await runEnum("columns", { db: selectedDb, table: tbl });
        renderList(columnListEl, cols, () => {
        }, true);
      });
    });
  });
  container.querySelector("#btnDump")?.addEventListener("click", async () => {
    if (!selectedTable) {
      caido.window.showToast("Select a table first", { variant: "warning" });
      return;
    }
    const checked = Array.from(columnListEl.querySelectorAll('input[type="checkbox"]:checked')).map((c) => c.dataset.col);
    if (checked.length === 0) {
      caido.window.showToast("Check at least one column", { variant: "warning" });
      return;
    }
    dumpResultEl.innerHTML = '<p style="color:#718096;font-size:11px">dumping\u2026</p>';
    try {
      const res = await caido.backend.dump(enumCfg({ db: selectedDb, table: selectedTable, columns: checked }));
      if (!res.rows || res.rows.length === 0) {
        dumpResultEl.innerHTML = '<p style="color:#718096;font-size:11px">no rows</p>';
        return;
      }
      dumpResultEl.innerHTML = `<table class="dump-table"><thead><tr>${res.columns.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${res.rows.map((row) => `<tr>${row.map((cell) => `<td>${(cell ?? "").replace(/</g, "&lt;")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    } catch (e) {
      log(`Dump error: ${e.message}`, "error");
    }
  });
  const runSqlShell = async () => {
    const q = container.querySelector("#sqlShellInput").value.trim();
    if (!q) return;
    const resEl = container.querySelector("#sqlShellResult");
    resEl.textContent = "running\u2026";
    try {
      const val = await caido.backend.sqlShell(enumCfg({ query: q }));
      resEl.textContent = val ? `\u2192 ${val}` : "(empty / no data)";
    } catch (e) {
      resEl.textContent = `error: ${e.message}`;
    }
  };
  container.querySelector("#btnSqlRun")?.addEventListener("click", runSqlShell);
  container.querySelector("#sqlShellInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSqlShell();
  });
  container.querySelector("#btnLoadParams")?.addEventListener("click", loadParams);
  container.querySelector("#btnParseRaw")?.addEventListener("click", parseRawRequest);
  container.querySelector("#btnProbe")?.addEventListener("click", async () => {
    const id = requestIdInput.value.trim();
    if (!id) {
      caido.window.showToast("Load a request ID first", { variant: "warning" });
      return;
    }
    log("Probing SDK methods...", "info");
    try {
      const info = await caido.backend.probe(id);
      log("=== SDK PROBE RESULT ===", "success");
      log(JSON.stringify(info, null, 2), "info");
    } catch (e) {
      log(`Probe error: ${e.message}`, "error");
    }
  });
  btnScan.addEventListener("click", () => runScan(false));
  btnScanAll.addEventListener("click", () => runScan(true));
  container.querySelector("#btnSelectAll")?.addEventListener("click", () => {
    params.forEach((p) => p.selected = true);
    renderParams();
  });
  container.querySelector("#btnSelectNone")?.addEventListener("click", () => {
    params.forEach((p) => p.selected = false);
    renderParams();
  });
  btnStop.addEventListener("click", async () => {
    btnStop.disabled = true;
    log("[!] Stopping\u2026", "warn");
    try {
      await caido.backend.stopScan(sessionId);
    } catch (e) {
    }
    setTimeout(() => {
      btnStop.disabled = false;
    }, 500);
  });
  container.querySelector("#btnClear")?.addEventListener("click", () => {
    clearLog();
    resultsBox.innerHTML = "No vulnerabilities found yet.";
    log("Ready.", "info");
  });
  container.querySelector("#btnCopyLog")?.addEventListener("click", () => {
    navigator.clipboard.writeText(logBox.textContent || "");
    caido.window.showToast("Log copied", { variant: "success" });
  });
  return { element: container, api };
};
var createPage = (caido) => {
  const shell = document.createElement("div");
  shell.innerHTML = `
    <style>
      .ninja-shell { background:#1a1a2e; color:#eee; min-height:100vh; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
      .ninja-topbar { display:flex; align-items:center; gap:12px; padding:10px 16px; border-bottom:1px solid #333; position:sticky; top:0; background:#1a1a2e; z-index:5; }
      .ninja-topbar h1 { margin:0; font-size:18px; }
      .ninja-tabs { display:flex; gap:4px; overflow-x:auto; flex:1; }
      .ninja-tab { display:flex; align-items:center; gap:8px; padding:6px 10px; background:#16213e; border:1px solid #2d3748; border-radius:6px 6px 0 0; cursor:pointer; white-space:nowrap; font-size:12px; color:#cbd5e0; max-width:260px; }
      .ninja-tab.active { background:#2b2b55; border-color:#667eea; color:#fff; }
      .ninja-tab .tlabel { overflow:hidden; text-overflow:ellipsis; max-width:190px; }
      .ninja-tab .tclose { border:none; background:transparent; color:#a0aec0; cursor:pointer; font-size:14px; line-height:1; padding:0 2px; }
      .ninja-tab .tclose:hover { color:#fc8181; }
      .ninja-tab .tdot { width:8px; height:8px; border-radius:50%; background:#4a5568; flex:none; }
      .ninja-tab .tdot.scanning { background:#805ad5; animation:pulse 1.2s infinite; }
      .ninja-tab .tdot.done { background:#38a169; }
      .ninja-newtab { padding:6px 10px; background:#16213e; border:1px dashed #4a5568; border-radius:6px; cursor:pointer; color:#a0aec0; font-size:12px; }
      .ninja-host > div { display:none; }
      .ninja-host > div.active { display:block; }
    </style>
    <div class="ninja-shell">
      <div class="ninja-topbar">
        <h1>\u{1F489} SQLi Ninja</h1>
        <div class="ninja-tabs" id="ninjaTabs"></div>
        <button class="ninja-newtab" id="ninjaNewTab">+ New</button>
      </div>
      <div class="ninja-host" id="ninjaHost"></div>
    </div>
  `;
  const tabsBar = shell.querySelector("#ninjaTabs");
  const host = shell.querySelector("#ninjaHost");
  const tabs = /* @__PURE__ */ new Map();
  let activeSid = "";
  let counter = 0;
  const renderTabBar = () => {
    tabsBar.innerHTML = "";
    for (const rec of tabs.values()) {
      const tab = document.createElement("div");
      tab.className = "ninja-tab" + (rec.sessionId === activeSid ? " active" : "");
      tab.innerHTML = `<span class="tdot" data-dot="${rec.sessionId}"></span><span class="tlabel">${rec.label}</span><button class="tclose">\u2715</button>`;
      tab.addEventListener("click", (e) => {
        if (e.target.classList.contains("tclose")) return;
        switchTab(rec.sessionId);
      });
      tab.querySelector(".tclose")?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeTab(rec.sessionId);
      });
      tabsBar.appendChild(tab);
    }
  };
  const setDot = (sid, cls) => {
    const dot = tabsBar.querySelector(`[data-dot="${sid}"]`);
    if (dot) dot.className = "tdot" + (cls ? " " + cls : "");
  };
  const switchTab = (sid) => {
    activeSid = sid;
    for (const rec of tabs.values()) {
      rec.element.classList.toggle("active", rec.sessionId === sid);
    }
    renderTabBar();
  };
  const closeTab = (sid) => {
    const rec = tabs.get(sid);
    if (!rec) return;
    try {
      rec.api.stop();
    } catch (e) {
    }
    rec.element.remove();
    tabs.delete(sid);
    if (activeSid === sid) {
      const next = tabs.size ? Array.from(tabs.keys())[tabs.size - 1] : "";
      if (next) switchTab(next);
      else {
        activeSid = "";
        renderTabBar();
      }
    } else {
      renderTabBar();
    }
  };
  const addTab = (opts = {}) => {
    const sessionId = `tab_${Date.now()}_${counter++}`;
    const label0 = opts.requestId ? `Request ${opts.requestId}` : opts.raw ? "Raw request" : `Tab ${counter}`;
    const { element, api } = createTab(caido, sessionId, (label) => {
      const rec2 = tabs.get(sessionId);
      if (rec2) {
        rec2.label = label;
        renderTabBar();
      }
    });
    host.appendChild(element);
    const rec = { sessionId, api, element, label: label0 };
    tabs.set(sessionId, rec);
    switchTab(sessionId);
    if (opts.requestId) api.setRequestId(opts.requestId);
    else if (opts.raw) api.setRawRequest(opts.raw);
    if (opts.autoScan) api.autoScan();
    return rec;
  };
  caido.backend.onEvent("log", (data) => {
    const sid = data.sessionId || "";
    const rec = tabs.get(sid);
    if (rec) {
      rec.api.log(data.msg, data.type);
      if (/SCAN COMPLETE|Could not|banner:|Dumped|error/i.test(data.msg)) setDot(sid, "done");
      else if (/Starting scan|Enumerating|Probing|Extracting/i.test(data.msg)) setDot(sid, "scanning");
    } else if (activeSid) {
      tabs.get(activeSid)?.api.log(data.msg, data.type);
    }
  });
  shell.querySelector("#ninjaNewTab")?.addEventListener("click", () => addTab({}));
  pageManager = { addTab: (o) => addTab(o) };
  addTab({});
  return shell;
};
var pageManager = null;
function init(caido) {
  caido.navigation.addPage("/sqli-ninja", { body: createPage(caido) });
  caido.sidebar.registerItem("SQLi Ninja", "/sqli-ninja", { icon: "fas fa-database" });
  const resolveRequestId = (context) => {
    if (context?.type === "RequestRowContext" && context.requests?.length > 0) {
      return context.requests[0].id?.toString();
    }
    if (context?.type === "RequestContext" && context.request) {
      const req = context.request;
      if (req.type === "RequestFull" && req.id) return req.id.toString();
    }
    if (context?.requests?.length > 0) return context.requests[0].id?.toString();
    if (context?.request?.id) return context.request.id.toString();
    if (context?.id) return context.id.toString();
    try {
      const page = caido.window?.getContext?.()?.page?.kind;
      let selected;
      switch (page) {
        case "Replay":
          selected = caido.replay?.getSelectedRequest?.();
          break;
        case "HTTPHistory":
          selected = caido.httpHistory?.getSelectedRequest?.();
          break;
        case "Intercept":
          selected = caido.intercept?.getSelectedRequest?.();
          break;
        case "Sitemap":
          selected = caido.sitemap?.getSelectedRequest?.();
          break;
        case "Search":
          selected = caido.search?.getSelectedRequest?.();
          break;
        default:
          selected = caido.replay?.getSelectedRequest?.();
      }
      if (selected?.id) return selected.id.toString();
    } catch (e) {
    }
    try {
      const entry = caido.replay?.getCurrentEntry?.();
      if (entry?.requestId) return entry.requestId.toString();
    } catch (e) {
    }
    return void 0;
  };
  const readEditorRaw = () => {
    const tryCmView = (node) => {
      if (!node) return void 0;
      const cm = node.cmView;
      if (!cm) return void 0;
      const doc = cm?.view?.state?.doc ?? cm?.state?.doc ?? cm?.docView?.view?.state?.doc;
      const txt = doc?.toString?.();
      if (txt && txt.trim().length > 0) return txt;
      return void 0;
    };
    const readLines = (editor) => {
      const lines = editor.querySelectorAll(".cm-line");
      if (lines.length === 0) return void 0;
      const text = Array.from(lines).map((l) => l.innerText.replace(/ /g, " ")).join("\n");
      return text.trim().length > 0 ? text : void 0;
    };
    try {
      const candidates = [
        ...Array.from(document.querySelectorAll("[data-language='http-request']")),
        ...Array.from(document.querySelectorAll(".cm-editor"))
      ];
      const visible = candidates.filter((el) => el.offsetParent !== null);
      const ordered = [...visible, ...candidates];
      for (const el of ordered) {
        let raw = tryCmView(el);
        if (raw) return raw;
        const inner = el.querySelector(".cm-editor");
        if (inner) {
          raw = tryCmView(inner);
          if (raw) return raw;
        }
        raw = tryCmView(el.parentElement);
        if (raw) return raw;
        raw = readLines(el);
        if (raw) return raw;
      }
    } catch (e) {
    }
    return void 0;
  };
  caido.commands.register("sqli-ninja:send", {
    name: "Send to SQLi Ninja",
    run: async (context) => {
      const requestId = resolveRequestId(context);
      const raw = requestId ? void 0 : readEditorRaw();
      let diag = "";
      try {
        const pageKind = caido.window?.getContext?.()?.page?.kind ?? "?";
        const nEditors = document.querySelectorAll(".cm-editor").length;
        const nHttp = document.querySelectorAll("[data-language='http-request']").length;
        diag = `ctx.type=${context?.type ?? "?"} page=${pageKind} editors=${nEditors} http=${nHttp}`;
      } catch (e) {
      }
      caido.navigation.goTo("/sqli-ninja");
      setTimeout(() => {
        if (!pageManager) return;
        if (requestId) {
          pageManager.addTab({ requestId });
        } else if (raw) {
          pageManager.addTab({ raw });
        } else {
          caido.window.showToast(`No request found. ${diag}`, { variant: "warning" });
        }
      }, 150);
    }
  });
  caido.menu.registerItem({ type: "RequestRow", commandId: "sqli-ninja:send", leadingIcon: "fas fa-syringe" });
  caido.menu.registerItem({ type: "Request", commandId: "sqli-ninja:send", leadingIcon: "fas fa-syringe" });
}
export {
  init
};
