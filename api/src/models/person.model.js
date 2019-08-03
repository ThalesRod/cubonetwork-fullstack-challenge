/*

Class: Person
- id: Number (mongodb guid)
- firstName: String
- lastName: String
- participation: Number

*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({

  firstName:      { type: String, required: true, max: 50 },
  lastName:       { type: String, required: true, max: 50 },
  participation:  { type: Number, required: true},

});

module.exports = mongoose.model('Person', PersonSchema);