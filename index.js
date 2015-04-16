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
  //trigger next middleware
  next();
});
//NOT COVERED IN CLASS!!!
//custom middleware for alerts
app.use(function(req,res,next){

  //gets alerts (if any) from flash
  //attach them to res.locals
  //things in res.locals these will be passed
  //to the view (ejs) when you do res.render
  res.locals.alerts=req.flash();

  //trigger next middleware
  next();
})


// app.get("/", function (req,res) {
//   res.render("index");
// });

// app.get("/:id", function(req,res) {
//   var query = req.query.q
//   var url = "http://api.npr.org/query?fields=title,teaser,show,audio,image&requiredAssets=audio&searchTerm=" + query + "&sort=relevance&output=JSON&numResults=50&apiKey=MDAwNzQ4ODUxMDEyOTc4NzE2NTNjZjVkMg001";
//   request(url, function (error, response, data) {
//     if (!error && response.statusCode == 200) {

//     var podcasts = JSON.parse(data);
//     // console.log(podcasts.list.story[0].show[0].program.$text)
//   res.render('podcasts/index', podcasts)
//   } else {
//     res.send("error")}
//   })
// })

//load routes
app.use('/',require('./controllers/main.js'));
app.use('/auth',require('./controllers/auth.js'));
app.use('/podcasts',require('./controllers/podcasts.js'));

app.listen(process.env.PORT || 3000);
