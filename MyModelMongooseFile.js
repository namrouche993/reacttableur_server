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
  email: {
    required: false,
    type: String
  },
  phoneNumber: {
    required:false,
    type: String
  },
  hisownroute: {
    required:false,
    type: String
  },
  token: {
    required:true,
    type: String
  },
  new_email_1: {
    required:false,
    type: String
  }

}, { collection: 'spreadsheet' });

const MyModelMongoose = mongoose.model('spreadsheet', MySchema);

module.exports = MyModelMongoose;