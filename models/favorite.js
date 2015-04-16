"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    title: DataTypes.STRING,
    show: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    audio: DataTypes.STRING,
    term: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.belongsTo(models.user)
      }
    }
  });
  return favorite;
};
