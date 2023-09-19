const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MySchema = new Schema({
   idusername :{
    required:false,
    type:String
   },
   dataa:{
    required:false,
    type:Array
   },
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