var todoModel = require('../models/todo.js');
var todoObj = new todoModel();

module.exports.fetchAll = function(req, res) {

  todoObj.getAllTodos(
    function(error, result) {
        res.json({"data": result, "error": error});
    }
  );
};

module.exports.create = function(req, res) {

  todoObj.addNewTodo(
    req.body,
    function(error, result) {
        res.json({"data": result, "error": error});
    }
  );
}

module.exports.remove = function(req, res) {

  todoObj.removeTodo(
    req.params.id,
    function(error, result) {
        res.json({"data": result, "error": error});
    }
  );
}
