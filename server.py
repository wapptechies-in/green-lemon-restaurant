from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
os.chdir(PUBLIC_DIR)

PORT = 8080
HOST = "0.0.0.0"

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

try:
    httpd = ThreadingHTTPServer((HOST, PORT), CustomHandler)
    print(f"Server started at http://localhost:{PORT}")
    sys.stdout.flush()
    httpd.serve_forever()
except Exception as e:
    print(f"Error starting server: {e}")
    sys.stdout.flush()
