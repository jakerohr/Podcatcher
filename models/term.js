"use strict";
module.exports = function(sequelize, DataTypes) {
  var term = sequelize.define("term", {
    term: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return term;
};
