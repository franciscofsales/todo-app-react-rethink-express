var express = require('express');
var todoService = require('../services/todo.js');

module.exports.get = function(){
  var app = express();
  //The REST routes for "todos".
  app.route('/')
    .get(todoService.fetchAll)
    .post(todoService.create);

  app.route('/:id')
    .delete(todoService.remove);

    return app;
}
