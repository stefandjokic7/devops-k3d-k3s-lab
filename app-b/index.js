const http = require("http");

http.createServer((req, res) => {
  res.end("Hello from simple node app BBB");
}).listen(3000);