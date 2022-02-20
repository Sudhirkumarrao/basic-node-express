const express = require('express');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const port = process.env.PORT || port;

require("./startup/startup")(app);
const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));
app.use('/api-docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
module.exports = server;