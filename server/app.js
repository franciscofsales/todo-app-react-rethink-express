var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');

var config = require(__dirname + '/config.js');
var routes = require('./routes/index.js');
var db = require('./models/db');


var app = express();

app.use(bodyParser.json());
app.use('/todos', routes.get());
//If we reach this middleware the route could not be handled and must be unknown.
app.use(handle404);
//Generic error handling middleware.
app.use(handleError);

var dbModel = new db();
dbModel.setupDb();

  /*
   * Page-not-found middleware.
   */
  function handle404(req, res, next) {
    res.status(404).end('not found');
  }

  /*
   * Generic error handling middleware.
   * Send back a 500 page and log the error to the console.
   */
  function handleError(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({err: err.message});
  }

  /*
   * Store the db connection and start listening on a port.
   */
  function startExpress() {
    app.listen(config.express.port);
    console.log('Listening on port ' + config.express.port);
  }
  startExpress();
