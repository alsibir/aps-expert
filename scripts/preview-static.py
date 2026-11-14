from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
PROJECT=Path(__file__).resolve().parent.parent
ROOT=PROJECT/'dist' if (PROJECT/'dist'/'index.html').is_file() else PROJECT
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
 def do_GET(self):
  if self.path=='/':self.send_response(302);self.send_header('Location','/aps-expert/');self.end_headers();return
  if self.path.startswith('/aps-expert/'):
   self.path=self.path[len('/aps-expert'):];super().do_GET()
  else:self.send_error(404)
print('Open http://127.0.0.1:8080/aps-expert/')
ThreadingHTTPServer(('127.0.0.1',8080),Handler).serve_forever()
