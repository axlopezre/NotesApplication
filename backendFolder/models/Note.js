// models/Note.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Note;
