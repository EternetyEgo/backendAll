"use strict";
const express = require("express");

const app = express();
const port = process.env.PORT || 5050;

require("./server/db")(app);
require("./server/apis")(app);

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server started. Access via: http://localhost:${port} or http://192.168.13.21:${port}`);
});