"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      show: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.INTEGER
      },
      audio: {
        type: DataTypes.STRING
      },
      term: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("favorites").done(done);
  }
};