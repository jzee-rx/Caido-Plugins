# Caido Plugins

## SQLi Ninja

A self-contained SQL injection scanner + enumeration plugin for [Caido](https://caido.io) — error / boolean / time / UNION detection, DBMS fingerprinting, blind data extraction (databases → tables → columns → dump), banner/user/current-DB, and a SQL shell. Runs entirely inside Caido's sandbox (no external server).

### Option A — Install the prebuilt plugin (quick)

1. Download **[`sqli-ninja.zip`](sqli-ninja.zip)** from this repo's root.
2. In Caido: **Plugins → Install Package** → select the downloaded `sqli-ninja.zip`.
3. Open **SQLi Ninja** from the sidebar.

### Option B — Build from source

The full source lives in **[`sqli-ninja/`](sqli-ninja/)**.

```bash
cd sqli-ninja
npm install
node build.mjs
# package the loadable plugin (zip is written to the repo root, next to this README)
zip -r ../sqli-ninja.zip manifest.json dist/ README.md
```

Then install the resulting `sqli-ninja.zip` in Caido as in Option A.

### Usage

Right-click a request in **HTTP History** or **Replay** → **Send to SQLi Ninja**. Each request opens its own tab (labeled method + path); review the detected parameters and techniques, then click **Start Scan**. Confirmed findings unlock enumeration, dump, and the SQL shell per tab.

> For authorized security testing only.
