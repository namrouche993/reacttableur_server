const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema_owner = new Schema({
  idusername: {required:true,type:String},
  email: {required:true,type:String},
  pass: {required:true,type:Number}, // maybe editable when changing pass to string and not numbers
  token: {required:true,type:String},
  //owner: {required:true,type:Boolean},
  role : {required:true,type:String,default:'Owner',immutable:true},
  hisownroutetoken:{required:true,type:String},
  email_to_display: {required:true,type:String},
  used:{required:true,type:Boolean},

  navigator_laguage_of_browser:{required:true,type:'String'}, //navigator_language2 in initials_inputs
  userlocale_of_browser:{required:true,type:'String'}, //userLocale2 in initials_inputs
  decimalseparator_of_browser:{required:true,type:'String'}, //decimalSeparator2 in initials_inputs

  navigator_laguage_updated:{required:true,type:'String'}, 
  userlocale_updated:{required:true,type:'String'},
  decimalseparator_updated:{required:true,type:'String'}, 


});

const userSchema_teammate = new Schema({
  idusername: {required:false,type:String},
  email: {required:false,type:String},
  pass: {required:false,type:Number}, // maybe editable when changing pass to string and not numbers
  token: {required:false,type:String},
  //owner: {required:false,type:Boolean},
  role : {required:false,type:String,   enum:["Admin","Writer","Viewer"]},
  hisownroutetoken:{required:false,type:String},
  email_to_display: {required:false,type:String},
  used:{required:false,type:Boolean},

  navigator_laguage_of_browser:{required:false,type:'String'}, //navigator_language2 in initials_inputs
  userlocale_of_browser:{required:false,type:'String'}, //userLocale2 in initials_inputs
  decimalseparator_of_browser:{required:false,type:'String'}, //decimalSeparator2 in initials_inputs

  navigator_laguage_updated:{required:false,type:'String'}, 
  userlocale_updated:{required:false,type:'String'},
  decimalseparator_updated:{required:false,type:'String'}, 


});

const MySchema = new Schema({
  organisme: {required:true,type:String},
  region: {required:true,type:String},
  phoneNumber_owner: {required:true,type:String},
  hisownroute: {required:true,type:String},
  dataa: {required:true,type:Array},
  users: {
    user1: userSchema_owner,
    user12: userSchema_owner,
    user2: userSchema_teammate,
    user3: userSchema_teammate,

    user4: userSchema_teammate,
    user5: userSchema_teammate

    
  },
}, { collection: 'spreadsheet' });

const MyModelMongoose = mongoose.model('spreadsheet', MySchema);

module.exports = MyModelMongoose;