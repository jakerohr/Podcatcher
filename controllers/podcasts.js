var db = require('../models');
var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');

router.get('/',function(req,res){
    var user = req.getUser();
    if(user) {
     db.save.findAll({
      where: {userId:user.id}}).then(function(sav){
      var saves = (sav);
    res.render('podcasts/index',{user:user, saves:saves});
    });
      } else {
      res.render('podcasts/index',{user:user});
    }
});

router.get("/:id", function(req,res) {
  var term = req.query.term;
  var user = req.getUser();
  var userTime = req.query.userTime;

  // use async to get more results
  var url = "http://api.npr.org/query?fields=title,teaser,show,audio,image&requiredAssets=audio&searchTerm=" + term + "&sort=relevance&output=JSON&numResults=50&apiKey="+ process.env.Npr_Key;
  request(url, function (error, response, data) {
    if (!error && response.statusCode == 200) {
    var podcasts = JSON.parse(data);

    var episodeData = [];
    var totalTime = 0;
    var playList = [];

      if (podcasts.list.story) {
        // sort by episode length
        for (var i = 0; i < podcasts.list.story.length; i++) {
          var episodeLength = podcasts.list.story[i].audio[0].duration.$text;
          // check playlist length
          if (totalTime <= userTime) {
            // check episode length, add to playlist and add to total time
            if(episodeLength <= userTime * 60){
              var file = podcasts.list.story[i].audio[0].format.mp4.$text //check for mp4 or other file
              var title = escape( podcasts.list.story[i].title.$text).replace(/%(..)/g,"&#x$1;")
              playList.push({length: episodeLength, title:  title, file: file.slice(0, file.indexOf('?'))});
              episodeData.push(podcasts.list.story[i]);
              totalTime += episodeLength/60;
            }
          }
        }

        if(user) {
          db.save.findAll({
          where: {userId:user.id}}).then(function(sav){
          var saves = (sav);
          res.render('podcasts/show',{user:user, playList:playList, episodeData:episodeData, saves:saves});
          });
        } else {
          res.render('podcasts/show',{playList:playList, episodeData:episodeData, user:user});
        }
      } else {
        req.flash('danger','No podcasts found. Please search again.');
        res.redirect("/podcasts")
      }

    } else {
      req.flash('danger','Whoops. There seems to be a mysterious error.');
      res.redirect("/podcasts")
    }
  })
})



module.exports = router;
