//Routing Library
var express = require('express');
var app = express();
var authentication = require('./authMiddleware.js');
//Logging
var morgan = require('morgan');
app.use(morgan('dev'));

//Path functions
var path = require('path');

//Body parsing for reqs
var bodyParser = require('body-parser');
app.use(bodyParser());

//Firebase Integration
var admin = require("firebase-admin");

//Beautify console
var chalk = require('chalk');
var write = console.log;

//Serving the static files
app.use(express.static('ui'));

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname, 'ui','html', 'index.html'));
});

//Create Admin
app.post('/create-user',function(req,res){
    authentication.createUserMiddleware(req,res);
});

//Login
app.post('/login',function(req,res){
    authentication.loginMiddleware(req,res);
});

//Logout
app.get('/logout', function(req,res){
    authentication.logoutMiddleware(req,res);
});

//Ports
var port = 6969;
app.listen(port, function(){
    write(chalk.red.bold('Life\'s happening!'),chalk.green.bold(port));
});

