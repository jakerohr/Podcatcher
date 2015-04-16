var db = require('../models');
var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');

router.get('/',function(req,res){
    var user = req.getUser();
    res.render('podcasts/index',{user:user});
});

router.get("/:id", function(req,res) {
  var term = req.query.term;
  var userTime = req.query.userTime;
  var url = "http://api.npr.org/query?fields=title,teaser,show,audio,image&requiredAssets=audio&searchTerm=" + term + "&sort=relevance&output=JSON&numResults=50&apiKey=MDAwNzQ4ODUxMDEyOTc4NzE2NTNjZjVkMg001";
  request(url, function (error, response, data) {
    if (!error && response.statusCode == 200) {

    var podcasts = JSON.parse(data);

    var episodeData = [];
    var totalTime = 0;
    var playList = [];
    for (var i = 0; i < podcasts.list.story.length; i++) {
      var episodeLength = podcasts.list.story[i].audio[0].duration.$text;
      // check playlist length
      if (totalTime <= userTime) {
        // check episode length, add to playlist and add to total time
        if(episodeLength <= userTime * 60){
          var file = podcasts.list.story[i].audio[0].format.mp4.$text
          var title = escape( podcasts.list.story[i].title.$text).replace(/%(..)/g,"&#x$1;")
          playList.push({length: episodeLength, title:  title, file: file.slice(0, file.indexOf('?'))});
          episodeData.push(podcasts.list.story[i]);
          totalTime += episodeLength/60;
        }
      }
    }
        console.log(totalTime);
        console.log(playList);

  res.render('podcasts/show', {playList:playList, episodeData:episodeData})


  } else {
    res.send("error")}
  })
})

// combine forms - make both variables (req.body.term, req.body.userTime)
// ditch query - go req.body.term then TEST
// render filterTime one at a time /:id using req.params and index of array







module.exports = router;
