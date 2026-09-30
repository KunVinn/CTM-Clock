"""Local browser bridge for the TCM diagnosis MCP tools.

This is for local testing only. It serves the CTM-Clock files and exposes the
patient question tool at POST /api/ask; it does not expose the MCP server to the
public internet.
"""

from __future__ import annotations

import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

import server as tcm_server

ROOT = Path(__file__).resolve().parent.parent
HOST = "127.0.0.1"
PORT = 8765


class Handler(SimpleHTTPRequestHandler):
    """Serve static files and a small local JSON endpoint."""

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self._json({"ok": True, "service": "tcm-diagnosis-local-bridge"})
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path != "/api/ask":
            self._json({"error": "Not found"}, 404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length > 32_000:
                raise ValueError("Question payload is too large.")
            payload = json.loads(self.rfile.read(length) or b"{}")
            question = str(payload.get("question", "")).strip()
            language = str(payload.get("language", "auto"))
            context = payload.get("context")
            if context is not None and not isinstance(context, dict):
                raise ValueError("context must be an object.")
            if not question:
                raise ValueError("Please enter a question.")
            result = tcm_server.ask_tcm_question(question, language, context)
            self._json(result)
        except (ValueError, json.JSONDecodeError) as exc:
            self._json({"error": str(exc)}, 400)
        except Exception as exc:
            self._json({"error": "Question service failed: " + str(exc)}, 500)

    def _json(self, value: dict[str, Any], status: int = 200) -> None:
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: Any) -> None:
        print(f"[{self.log_date_time_string}] {format % args}")


if __name__ == "__main__":
    print(f"TCM local site: http://localhost:{PORT}/tongue.html")
    print(f"Question API:    http://localhost:{PORT}/api/ask")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
