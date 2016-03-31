var express = require('express');
var app = express();
var uuid = require('node-uuid');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var connectionString = 'mongodb://localhost/cs5610';
//if(process.env.)
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

console.log(mongoose);

console.log("secret", process.env.OPENSHIFT_NODEJS_IP);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: "process.env.PASSPORT_SECRET"}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


require("./public/Project/EverFit/server/app.js")(app,db,mongoose);
require("./public/Assignment/server/app.js")(app,db,mongoose);

app.listen(port, ipaddress);
