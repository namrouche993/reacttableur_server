const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MySchema = new Schema({
   organisme: {
    required: false,
    type: String
  },
  region: {
    required: false,
    type: String
  },  // Define your schema properties here
}, { collection: 'spreadsheet' });

const MyModelMongoose = mongoose.model('spreadsheet', MySchema);

module.exports = MyModelMongoose;