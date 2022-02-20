const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || port;

require("./startup/startup")(app);
const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));
module.exports = server;