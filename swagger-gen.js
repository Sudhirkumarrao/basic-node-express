const swagger_autogen = require('swagger-autogen')();
require("dotenv").config();

const port = process.env.PORT || 9020;
let servers = [
  { url: `http://localhost:${port}/` },
  { url: "https://cdndemo-api.co-vin.in/" }
]
let server_env = process.env.SERVER_ENV || 'Local'
if (server_env != 'Local') {
  if (server_env.toLowerCase() == 'sit') {
    servers = [
      { url: "https://cdndemo-api.co-vin.in/" }
    ]
  } else if (server_env.toLowerCase() == 'prod'){
    servers = [
      { url: "https://cdn-api.co-vin.in/" }
    ]
  }
}
const swaggerDefinition = {
  info: {
    title: 'BASIC API Specification', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the BASIC API Specification', // short description of the app
  },
  servers: servers,
  //basePath: '/api/v1/session', // the basepath of your endpoint
  components: {
    
  },
  security: [{
    secret_key: []
  }]
};

const outputFile = './swagger-output.json'
const endpointsFiles = ['./startup/startup.js']

swagger_autogen(outputFile, endpointsFiles, swaggerDefinition).then(() => {
    require('./app')           // Your project's root file
});