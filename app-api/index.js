const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hello from API" });
});

app.listen(3000);