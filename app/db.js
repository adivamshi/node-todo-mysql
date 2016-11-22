/**
 * Created by Vamshi on 19-Nov-16.
 */

var mysql = require('mysql');

// configuration =================

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'todo_angular'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

var db = {};

db.getAllTodos = function(successCallback, failureCallback){
    connection.query('SELECT * FROM todo_angular.lists;',function (err,rows,fields,res) {
        if(err){
            console.log("Error in get: " + JSON.stringify(err));
            failureCallback(err);
            return;
        }
        successCallback(rows);
    });
};

db.createTodo = function(text,successCallback, failureCallback){
    var sqlQuery;
    if(text) {
        sqlQuery = "INSERT INTO `todo_angular`.`lists` (`text`) VALUES ('" + text + "');";
    }

    if(sqlQuery) {
        connection.query(sqlQuery,
            function (err, rows, fields, res) {
                if (err) {
                    console.log("Error in create: " + JSON.stringify(err));
                    failureCallback(err);
                    return;
                }
                successCallback(rows.insertId)
            });
    }
};

db.deleteTodo = function(id,successCallback, failureCallback){
    connection.query("call todo_angular.deleteTodo(" + id + ");",function(err,rows,fields,res){
        if(err){
            console.log("Error in delete: " + JSON.stringify(err));
            failureCallback(err);
            return;
        }
        if(rows[0].length !== 0 && typeof(rows[0][0].status) === "undefined"){
            failureCallback(rows[0][0]["status"]);
        }else {
            successCallback(rows[0]);
        }
    });
};

module.exports = db;