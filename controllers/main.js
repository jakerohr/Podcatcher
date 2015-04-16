var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /
//home page of site
router.get('/',function(req,res){
    var user = req.getUser();
    res.render('main/index',{user:user});
});




module.exports = router;
