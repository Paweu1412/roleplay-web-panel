require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const uuid = require("uuidv4");
const mysql = require("mysql2");

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/server");
  }, 100);
});

// app.use(express.static('/server'));
app.use(connectLiveReload());
app.use(cookieParser());

app.listen(5000);

// let databasePool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
// });

app.get("*", (req, res) => {
  res.send(null);
});
