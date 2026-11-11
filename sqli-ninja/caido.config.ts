import { defineConfig } from "@caido-community/dev";

export default defineConfig({
  id: "sqli-ninja",
  name: "SQLi Ninja",
  version: "1.0.0",
  description: "Advanced SQL Injection testing plugin with detection, exploitation, and data extraction",
  author: {
    name: "jzrx",
    email: "jzrx@example.com"
  },
  plugins: [
    {
      id: "sqli-ninja-backend",
      kind: "backend",
      name: "SQLi Ninja Backend",
      root: "src/backend"
    },
    {
      id: "sqli-ninja-frontend",
      kind: "frontend",
      name: "SQLi Ninja Frontend",
      root: "src/frontend",
      backend: {
        id: "sqli-ninja-backend"
      }
    }
  ]
});
