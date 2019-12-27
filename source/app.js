var app = require("./config/server");
const mongoose = require("mongoose");
const listEndpoints = require('express-list-endpoints');

const {
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_HOSTNAME,
  DATABASE_PORT,
  DATABASE,
  API_PORT
} = process.env;

const port = API_PORT;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  keepAlive: 1,
  auth: {
    user: DATABASE_USER,
    password: DATABASE_PASS 
  }
};

const url = `mongodb://${DATABASE_HOSTNAME}:${DATABASE_PORT}/${DATABASE}?authSource=${DATABASE}`;

connect();

function listen() {
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  endpointsList();
  return mongoose.connect(url, options);
}

function endpointsList() {
  let endpoints = listEndpoints(app);
  console.table(endpoints)
}


