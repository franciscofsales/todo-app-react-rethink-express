var rethinkdb = require('rethinkdb');
var async = require('async');
var config = require('../config.js');

class db {
  setupDb() {
    var self = this;
    async.waterfall([
      function(callback) {
        self.connectToRethinkDbServer(function(err,connection) {
          if(err) {
            return callback(true,"Error in connecting RethinkDB");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.dbCreate(config.rethinkdb.db).run(connection,function(err, result) {
          if(err) {
            console.log("Database already created");
          } else {
            console.log("Created new database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.db(config.rethinkdb.db).tableCreate('todos').run(connection,function(err,result) {
          connection.close();
          if(err) {
            console.log("table already created");
          } else {
            console.log("Created new table");
          }
          callback(null,"Database is setup successfully");
        });
      }
    ],function(err,data) {
      console.log(data);
    });
  }

  connectToRethinkDbServer(callback) {
    rethinkdb.connect(config.rethinkdb, function(err,connection) {
      callback(err,connection);
    });
  }

  connectToDb(callback) {
    rethinkdb.connect(config.rethinkdb, function(err,connection) {
      callback(err,connection);
    });
  }
}

module.exports = db;
