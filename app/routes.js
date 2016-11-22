/**
 * Created by Vamshi on 19-Nov-16.
 */
var db = require('./db');
var todos = [];
module.exports = function (app) {
    // get all todos
    app.get('/api/todos', function(request, response) {
        db.getAllTodos(function(res){
            todos = res;
            response.json(res);
        },function(err){
            response.json(err);
        });
    });

    app.post('/api/todos', function(request, response) {
        var bodyParams = request.body;
        db.createTodo(bodyParams.text,function (res) {
            bodyParams.id = res;
            todos.push(bodyParams);
            response.json(todos);
        },function (err) {
            response.json(err);
        });
    });

    app.delete('/api/todos/:todo_id', function(request, response) {
        var todoId = request.params.todo_id;
        if(todoId && todoId !== "undefined") {
            db.deleteTodo(todoId,function(res){
                todos = res;
                response.json(res);
            },function(err){
                response.send(err);
            });
        }
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
