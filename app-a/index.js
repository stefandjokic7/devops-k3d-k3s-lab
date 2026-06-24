const http = require("http");

http.createServer((req, res) => {
  res.end("Hello from simple node app AAA");
}).listen(3000);