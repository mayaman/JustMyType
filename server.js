var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var config = require('./config');

var app = express();
var port = 4747;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    secret: config.get('APP_SECRET'),
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());

require('./routes')(app);

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.listen(port);