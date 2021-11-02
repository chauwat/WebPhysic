const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLivereload());
app.use('/', express.static('public'));
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}.`);
});