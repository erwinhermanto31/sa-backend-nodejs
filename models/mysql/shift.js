'use strict';
module.exports = (sequelize, DataTypes) => {
  const shift = sequelize.define('shift', {
    name: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {});
  shift.associate = function(models) {
    // associations can be defined here
  };
  shift.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return shift;
};