const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const bodyParser = require("body-parser");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/server");
  }, 100);
});

// app.use(express.static('/server'));
app.use(connectLiveReload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000);

app.get("*", (req, res) => {
  res.send(null);
});