var db = require('../models');
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();




//GET /auth/login
//display login form
router.get('/login',function(req,res){
    var user = req.getUser();
    res.render('auth/login',{user:user});
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
    var user = req.getUser();
    db.user.find({where:{userName:req.body.username}})
    .then(function(user){
        if(user){
            //check password
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err) throw err;

                if(result){
                    //store user to session!!
                    req.session.user={
                        id:user.id,
                        userName:user.userName,

                    };
                    req.flash('success','You have been logged in.');
                    res.redirect('/podcasts');
                }else{
                    req.flash('danger','Invalid password.');
                    res.redirect('/auth/login');
                }
            })
        }else{
            req.flash('danger','Unknown user. Please sign up.');
            res.redirect('/auth/login');
        }
    })
    //do login here (check password and set session value)

    //user is logged in forward them to the home page
    // res.redirect('/');
});

//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    var user = req.getUser();
    res.render('auth/signup',{user:user});
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
    var user = req.getUser();
    var userQuery={userName:req.body.username};
    var userData={
        userName:req.body.username,
        password:req.body.password
    };

    db.user.findOrCreate({where:userQuery,defaults:userData})
    .spread(function(user,created){
        if(created){
            req.flash('success','New user created. Please login.');
            res.redirect('/auth/login');
        }else{
            req.flash('danger','username already exists.');
            res.redirect('/auth/signup');
        }

    }).catch(function(error){
        //handle validation errors and create flash
        //messages
        if(error){
            if(Array.isArray(error.errors)){
                error.errors.forEach(function(errorItem){
                    req.flash('danger',errorItem.message);
                });
            }else{
                req.flash('danger','unknown error');
                console.log('unknown error',error);
            }
        }else{
            req.flash('danger','unknown error');
            console.log('error, but no error...');
        }
        res.redirect('/auth/signup');
    })


    //do sign up here (add user to database)
    // res.send(req.body);
    //user is signed up forward them to the home page
    // res.redirect('/');
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    var user = req.getUser();
    delete req.session.user;
    req.flash('info','You have been logged out.')
    res.redirect('/podcasts');
});


module.exports = router;
