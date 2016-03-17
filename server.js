var express = require('express');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
  res.send('hello world');
});
require("./public/Project/EverFit/server/app.js")(app);
require("./public/Assignment/server/app.js")(app);
app.use(express.static(__dirname + '/public'));
app.listen(port, ipaddress);
/*
app.use(session({ secret: process.env.PASSPORT_SECRET}));
app.use(cookieParser());
*/
