"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a username.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,200],
          msg: 'Password must be at least 8 characters long.'
        }
      }
    }
  }, {
    hooks: {
     beforeCreate: function(user,options,sendback){
        bcrypt.hash(user.password,10,function(err,hash){
          if(err){ throw err; }
          user.password=hash;
          sendback(null,user);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.favorite)
        models.user.hasMany(models.save)
      }
    }
  });
  return user;
};
