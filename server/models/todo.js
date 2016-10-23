var rethinkdb = require('rethinkdb');
var db = require('./db');
var async = require('async');

class todos {
  addNewTodo(todoData, callback) {
    async.waterfall(
      [
        function(callback) {
          var todoObject = new db();
          todoObject.connectToDb(function(err,connection) {
            if(err) {
              return callback(true,"Error connecting to database");
            }
            callback(null,connection);
          });
        },
        function(connection,callback) {
          rethinkdb.table('todos').insert({
            text: todoData.text,
            title: todoData.title,
            created_at: rethinkdb.now()
          }).run(connection,function(err,result) {
            connection.close();
            if(err) {
              return callback(true,"Error happens while adding new todo");
            }
            callback(null, result);
          });
        }
      ],
      function(err,data) {
        callback(err === null ? false : true,data);
      }
    );
  }



  getAllTodos(callback) {
    async.waterfall(
      [
        function(callback) {
          var todoObject = new db();
          todoObject.connectToDb(function(err, connection) {
            if(err) {
              return callback(true, "Error connecting to database");
            }
            callback(null, connection);
          });
        },
        function(connection,callback) {
          rethinkdb.table('todos').run(connection,function(err,cursor) {
            connection.close();
            if(err) {
              return callback(true, "Error fetching todos from database");
            }
            cursor.toArray(function(err, result) {
              if(err) {
                return callback(true, "Error reading cursor");
              }
              callback(null,result)
            });
          });
        }
      ],
      function(error, data) {
        callback(error === null ? false : true, data);
      }
    );
  }

  removeTodo(todoId, callback) {
    async.waterfall(
      [
        function(callback) {
          var todoObject = new db();
          todoObject.connectToDb(function(err,connection) {
            if(err) {
              return callback(true,"Error connecting to database");
            }
            callback(null,connection);
          });
        },
        function(connection,callback) {
          rethinkdb.table('todos')
            .get(todoId)
            .delete()
            .run(connection, function(err,result) {
              connection.close();
              if(err) {
                return callback(true,"Error fetching todos from database");
              }
              callback(null, result);
          });
        }
      ],
      function(err,data) {
        callback(err === null ? false : true,data);
      }
    );
  }
}



module.exports = todos;
