var db = require('../models');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/create',function(req,res){
  var user = req.getUser();
  if(user) {
    db.save.findAll({
    where: {userId:user.id}}).then(function(sav){
    var saves = (sav);
    res.render('saves/create',{user:user, saves:saves})
    });
  } else {
    res.render('main/index',{user:user});
  }
});

router.post("/", function(req,res) {
  var user = req.getUser();
  db.save.findOrCreate({where: {time: req.body.userTime}}).spread(function(save, created) {
    save.description = req.body.term;
    save.userId = req.body.userId
    save.save().then(function(data) {

      })
    })
  })

router.get('/:id', function(req,res) {
  var id = req.params.id;
  var user = req.getUser()
  if(user) {
    db.save.findAll({
      where: {userId:user.id}}).then(function(sav){
      var saves = (sav);
    db.save.find({
      where: {id:id}}).then(function(sav){
    res.render('podcasts/index',{user:user, sav:sav, saves:saves});
      })
    });
  } else {
    res.render('main/index',{user:user});
  }
})




module.exports = router;
