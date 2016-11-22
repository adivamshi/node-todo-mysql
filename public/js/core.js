/**
 * Created by Vamshi on 19-Nov-16.
 */
var app = angular.module('todoAngular', []);

app.controller('mainController',['$http',function($http) {
    var store = this;
    store.formData = {};
    store.todos = [];
    store.status = "";
    $http.get('/api/todos')
        .success(function(data) {
            store.todos = data;
            store.status = "";
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    store.createTodo = function() {
        $http.post('/api/todos', store.formData)
            .success(function(data) {
                store.formData = {};
                store.todos = data;
                store.status = "";
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    store.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                store.todos = data;
                store.status = "";
            })
            .error(function(data) {
                console.log('Error: ' + data);
                store.status = data;
            });
    };

}]);