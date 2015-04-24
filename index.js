var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require("request");
var flash = require('connect-flash');


//configure express
var app = express();
app.set("view engine", "ejs");

//load middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: 'adfsadgasdahggbcohfkdlhj',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

//custom middleware - is user logged in
app.use(function(req,res,next){
  req.getUser = function(){
    return req.session.user || false;
  }
  next();
});

//custom middleware for alerts
app.use(function(req,res,next){
  res.locals.alerts=req.flash();
  next();
})



//load routes
app.use('/',require('./controllers/main.js'));
app.use('/auth',require('./controllers/auth.js'));
app.use('/podcasts',require('./controllers/podcasts.js'));
app.use('/saves',require('./controllers/saves.js'));

app.get('*', function(req, res) {
  var user= req.getUser();
  req.flash('danger',"I'm sorry. That is an invalid URL");
  res.redirect('/')
});

app.listen(process.env.PORT || 3000);
