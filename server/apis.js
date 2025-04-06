const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  app.use(
    cors({
      methods: ["GET", "POST", "DELETE"],
      origin: "*",
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/api/receive", require("../routers/telegram-route"));
  app.use("/api/telegram", require("../routers/telegram-form"));
};