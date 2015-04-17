var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /
//home page of site
router.get('/',function(req,res){
    var user = req.getUser();
    if(user) {
      db.save.findAll({
      where: {userId:user.id}}).then(function(sav){
      var saves = (sav);
      res.render('podcasts/index',{user:user, saves:saves});
      });
    } else {
      res.render('main/index',{user:user});
    }

});



router.get('/about',function(req,res){
    var user = req.getUser();

     if(user) {
      db.save.findAll({
      where: {userId:user.id}}).then(function(sav){
      var saves = (sav);
      res.render('main/about',{user:user, saves:saves});
      });
    } else {
      res.render('main/about',{user:user});
    }

});

module.exports = router;
