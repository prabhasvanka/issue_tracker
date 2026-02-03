# Simple Issue Tracker

This is a minimal issue tracker with a React-based frontend (no build step; uses CDN + Babel for quick dev) and a Node/Express backend that persists issues to a JSON file.

Folders:

- `server/` — Node/Express API
- `client/` — static React frontend (open `client/index.html` in a browser)

Quick start

1. Start the backend:

```bash
cd server
npm install
npm start
```

The server listens on port from `server/.env` (default 4000).

2. Open the frontend:

- Open `client/index.html` in your browser. For better CORS/static behavior you can use VS Code Live Server or any static file server.

Notes

- Edit `server/.env` to change PORT or DATA_FILE.
- `client/.env` is a reference placeholder; the demo frontend reads `window.API_URL` set in `client/index.html` — update that to point to your backend if different.

Files created:

- `server/index.js` — API (GET/POST/PUT/DELETE /issues)
- `server/issues.json` — data file (starts empty)
- `server/.env` — env placeholders
- `server/package.json` — server dependencies and scripts
- `client/index.html` — React UI (uses CDN)
- `client/style.css` — styles
- `client/.env` — client env placeholder

Enjoy!"
