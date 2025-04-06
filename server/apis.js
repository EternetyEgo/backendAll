const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  // Dinamik CORS konfiguratsiyasi
  const allowedOrigins = [
    "https://portfolio-eternityego.netlify.app",
    "https://portfolio-me-seven-virid.vercel.app"
  ];

  app.use(
    cors({
      methods: ["GET", "POST", "DELETE"], 
      origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true); 
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, 
    })
  );

  app.use(express.json());

  // Routerni yo'naltirish
  app.use("/api/receive", require("../routers/telegram-route"));
  app.use("/api/telegram", require("../routers/telegram-form"));
};