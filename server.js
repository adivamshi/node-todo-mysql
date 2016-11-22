/**
 * Created by Vamshi on 19-Nov-16.
 */

// set up ========================
var express  = require('express');
var app      = express();
var mysql = require('mysql');
var morgan = require('morgan'); //for logging requests
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

require('./app/routes.js')(app);

app.listen(8080);
console.log("App listening on port 8080");