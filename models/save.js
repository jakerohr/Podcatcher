"use strict";
module.exports = function(sequelize, DataTypes) {
  var save = sequelize.define("save", {
    time: DataTypes.INTEGER,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.save.belongsTo(models.user)
      }
    }
  });
  return save;
};
