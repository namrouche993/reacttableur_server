const express = require('express')
const cors = require('cors'); // Import the cors package
const os = require('os');
const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');
const secretKey = '425cac990d726cd10669e2957c6f2ebef6e2b1f4f61dffc011c7327e73031620'; // Replace with your actual secret key
const crypto = require('crypto');

const http = require('http');

//const socketIO = require('socket.io');
const {Server} = require('socket.io');
const cookie = require('cookie');




//const nodefetch = require('node-fetch'); //nodefetch


//const fetch = import('node-fetch').then(module => module.default);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const RECAPTCHA_SECRET_KEY = '6LfIgpAoAAAAAKPs3UkRBQXxMhKHFS8BCQnLbj49';
const RECAPTCHA_ADD_SECRET_KEY = '6LfZqc0oAAAAAPAXdYC8Uc9UJtp7UANML0N6M-FR';
const RECAPTCHA_ACCESS_SECRET_KEY = '6LcPEtIoAAAAANNWLHaXXYdtBrkeRh2k8Nc6YBmV';


var bodyParser = require('body-parser')
const requestIp = require('request-ip');
//const generateRandomString = require('./Tools/Randst_server');

// || or signf

const {isValidEmail,isValidPhoneNumber} = require('./Tools/IsValid');
const {getCookieValue} = require('./Tools/getCookieValue.js');
const app = express()

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000',credentials: true}));  // Use the cors middleware!!!!!!
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);
//const io = socketIO(server);

const io = new Server(server,{
  cookie:true,
  cors:{
    origin:'http://localhost:3000',
    methods:["GET","POST"]
  }  
})


const mycache = {}; // Simple in-memory cache


//var things = require('./things.js');
//const { sup , how }= require('./middle.js');

const {organisme_data,region_data} = require('./users'); // Import the users array from users.js !!
const authenticate  = require('./authenticate.js');


//app.use(requestIp.mw()); !!
//app.use(sup);
//app.use('/things', things);

mongoose.connect('mongodb://127.0.0.1:27017/mydatabasetableur', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mydb = mongoose.connection;
mydb.on('error',(error)=> console.error('Error connecting to MongoDB:', error));
mydb.once('open',() =>console.log('Connected to MongoDB'))
const MyModelMongoose = require('./MyModelMongooseFile.js')
var mongooseRouter = require('./mongooseRouter.js')


app.use('/mongooseRouter', mongooseRouter);
const last_row_after_header = 15; // editable 
const {ddatafct_verify , retreived_data,ddatafct00} = require('./Hot_validators/data_to_verify.js');
const { Console } = require('console');



function generateRandomString(length,returnNb) {  
  const randomBytes = crypto.randomBytes(length);
  if(!returnNb){
  // Generate random bytes and convert them to a string
  const randomString = randomBytes.toString('base64')
    .replace(/\//g, 'x') // Replace '/' with 'x' to avoid encoding issues
    .replace(/\+/g, 'a') // Replace '+' with 'a' to avoid encoding issues
    .slice(0, length); // Trim the string to the desired length

  return randomString;
} else {
  const numericString = Array.from(randomBytes).map(byte => (byte % 10).toString()).join('').slice(0, length);
  return numericString;
}

}


const updateByUsername = async (username, newData) => {
  try {
    const updatedUser = await MyModelMongoose.findOneAndUpdate(
      {
        $or: [
          { "users.user1.idusername": username },
          { "users.user12.idusername": username },
          { "users.user2.idusername": username },
          { "users.user3.idusername": username },

          { "users.user4.idusername": username }, // editable nb users if we want to remove user4 or user5
          { "users.user5.idusername": username } // editable nb users if we want to remove user4 or user5

        ]
      },
      //{ idusername: username },
      { $set: {dataa: newData}},
    );
    console.log('updateUser ---------------- :')
    //console.log(updatedUser)
    //console.log(updatedUser.users)
   // console.log(updatedUser.users.user1)
   // console.log(updatedUser.users.user2)


    if (updatedUser) {
      console.log('updatedUser s')
      var returning = true;
      return true
      //console.log('User updated:', updatedUser); !!
    } else {
      var returning = false;
      return false
      console.log('User not found.');
    }
  } catch (error) {
    var returning = false;
    return false
    console.error('Error updating user:', error);
  }
};

const update_to_add_user = async (email_owner, new_email_of_user,role_new_user,myCookie_token_in_add,route,username_owner) => {
    console.log('essai pass returning value :')
    console.log('*****************------------------------ ! 00')
   // console.log(generateRandomString(6).toLocaleUpperCase().toString())

    try {
      
      const filter = { // useless
        "users.user1.email": email_owner,
        "users.user1.token":myCookie_token_in_add
      };

      const filter2byroute = {"hisownroute":route}
      var requestor_role = 'Viewer'
      var alreadyadded = 'notalreadyadded'
      // Find the document that matches the filter

      //const document = await MyModelMongoose.findOne(filter);
      const document = await MyModelMongoose.findOne(filter2byroute);
      if(document && document.users) {

        for(const userId in document.users){
          if (document.users.hasOwnProperty(userId) && document.users[userId]) {
            var theuser = document.users[userId];
            if (theuser.email==new_email_of_user) {
              alreadyadded='alreadyadded'
              break
            }
          }
        }
        if(alreadyadded=='alreadyadded'){
          return alreadyadded
        }

        for(const userId in document.users){
          if (document.users.hasOwnProperty(userId) && document.users[userId]) {
            var theuser = document.users[userId];
            console.log('theuser before if :')
            console.log(userId)
            //console.log(theuser)
            if (theuser.idusername==username_owner) {
              console.log('email found in : theuser.email equal to email ')
              //console.log(theuser)
              requestor_role = document.users[userId].role
              console.log('Email found in users[userId].role  RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
              console.log(requestor_role)
              break
            }
          }
     }

     var hisownroutewillbesigned = document.hisownroute;
     var tokenownroute = jwt.sign({hisownroutewillbesigned},secretKey);
     console.log('tokenownroute in accessfromurlcp verifiying pass ')
     console.log(tokenownroute)

     if(requestor_role=='Owner' || requestor_role=='Admin'){
      var idusername_from_generated = generateRandomString(14,false);
      var codepass = crypto.randomInt(10000000, 99999999);
      if(!document.users.user2 ){
        var update = {
          $set: {
            "users.user2.idusername": idusername_from_generated,
            "users.user2.email": new_email_of_user,
            "users.user2.email_to_display": new_email_of_user,
            "users.user2.token": jwt.sign({ idusername_from_generated }, secretKey),
            //"users.user2.owner": false,
            "users.user2.role":role_new_user,
            "users.user2.pass": codepass,
            "users.user2.hisownroutetoken":tokenownroute,
            "users.user2.used":false
            // Add more fields or update operations as needed
          }
        }

      } else if (!document.users.user3){
        var update = {
          $set: {
            "users.user3.idusername": idusername_from_generated,
            "users.user3.email": new_email_of_user,
            "users.user3.email_to_display": new_email_of_user,
            "users.user3.token": jwt.sign({ idusername_from_generated }, secretKey),
            //"users.user3.owner": false,
            "users.user3.role":role_new_user,
            "users.user3.pass": codepass,
            "users.user3.hisownroutetoken":tokenownroute,
            "users.user3.used":false

            // Add more fields or update operations as needed
          }
        }

        /*  // editable when we want to change the nb of users , let this and remove user4 and users5 // editable nb users if we want to remove user4 or user5
        else { 
          console.log('user2 and user3 existed , so do nothing')
          return false
        }
        */
      } else if (!document.users.user4){  // // editable nb users if we want to remove user4 or user5 // editable nb users if we want to remove user4 or user5
        var update = {
          $set: {
            "users.user4.idusername": idusername_from_generated,
            "users.user4.email": new_email_of_user,
            "users.user4.email_to_display": new_email_of_user,
            "users.user4.token": jwt.sign({ idusername_from_generated }, secretKey),
            //"users.user4.owner": false,
            "users.user4.role":role_new_user,
            "users.user4.pass": codepass,
            "users.user4.hisownroutetoken":tokenownroute,
            "users.user4.used":false

            // Add more fields or update operations as needed
          }
        }
      } else if (!document.users.user5){  // // editable nb users if we want to remove user4 or user5 // editable nb users if we want to remove user4 or user5
        var update = {
          $set: {
            "users.user5.idusername": idusername_from_generated,
            "users.user5.email": new_email_of_user,
            "users.user5.email_to_display": new_email_of_user,
            "users.user5.token": jwt.sign({ idusername_from_generated }, secretKey),
            //"users.user5.owner": false,
            "users.user5.role":role_new_user,
            "users.user5.pass": codepass,
            "users.user5.hisownroutetoken":tokenownroute,
            "users.user5.used":false

            // Add more fields or update operations as needed
          }
        }
      } else {
        console.log('user2 and user3 existed , so do nothing')
        return false
      }
      const updatedDoc = await MyModelMongoose.findOneAndUpdate(filter2byroute, update, { new: true });  
      if (updatedDoc) {
        console.log("Document updated:");
        //console.log(updatedDoc.users)
        return codepass
      } else {
        console.log("Document not updated.");
        return false
      }

      } else {
        console.log('requestors are not owner or admins')
        return false
      }

    } else {
      console.log("User2 does not exist or document not found matching the filter.");
      return false

    }
    } catch (error) {
      console.error("Error updating user:", error);
      return false

    }
    
};


app.post('/register',authenticate, (req, res) => { // editable to remove
   console.log('we are in register')
   //const { username, password } = req.body;!!
   
   //res.status(201).send('User registered successfully');;
 });

 app.post('/beacondata',express.json(), express.text(), async (req, res) => {
  // Handle the received data
  console.log('req.body :')
  
try {
  
  const receivedData = JSON.parse(req.body.jsonData_whenclosed); //JSON.parse(req.body) ;!!!!!!!::
  const receivedUsername = req.body.idusername00;
  console.log('req.bodyy of beacondata')
  //console.log(mycache)
  //console.log(receivedData)

  if (mycache[receivedData]) {
    // If request is in progress or recently completed
    //return res.json(mycache[receivedData]); // editable
    console.log('- DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS DDDDDDDDDDDDD ------')
    //console.log(mycache)
    return res.status(400).send('Duplicated receivedData');
  }
  mycache[receivedData] = true; // Mark as in progress

  // const navigator_laguage_updated = req.body.navigator_laguage_updated;
  // const userlocale_updated = req.body.userlocale_updated;
  // const decimalseparator_updated = req.body.decimalseparator_updated;

  
  console.log('receivedUsername')
  console.log(receivedUsername)

  console.log('httponly cookie :')
  const myCookie_token = req.cookies['jwtTokentableur'];  // Replace 'myCookieName' with your actual cookie name
  console.log(myCookie_token)
  console.log('receivedData')
  //console.log(receivedData)
  const decoded = jwt.verify(myCookie_token, secretKey);
  console.log('decoded :');
  console.log(decoded);
  //console.log(receivedUsername)

  if (Object.values(decoded)[0] !== receivedUsername) {
    console.log('we are inside decoded.idusername_from_generated !== idusername')
    return res.status(403).json({ message: 'Forbidden' });
  }


  // console.log('ddatafct_verify : ')
  // console.log(ddatafct_verify(last_row_after_header,receivedData));
  console.log('datafctverify')
  ddatafct_verify(last_row_after_header,receivedData);
  console.log('after datafctverify');
  //console.log(testa)
  if(!ddatafct_verify(last_row_after_header,receivedData)){
    console.log('we return false')
    //res.status(500).json({ message: error.message });
    return res.status(400).json({
      error:'Error',
      message: 'Error'
    }); 
  }

  if(typeof receivedData == 'string'){
    var receivedData2 = JSON.parse(receivedData)
  } else {
    var receivedData2 = receivedData
  }
  var returningfct = await updateByUsername(Object.values(decoded)[0], receivedData2);
  if(returningfct){
  // Respond with a success message
  console.log('beacon or somethingelse success')
  res.status(200).send('Data received successfully.');
} else {
  console.log('beacon or somethingelse or somethingelse failed')
  res.status(400).send('Data received failed.');
}

setTimeout(() => delete mycache[receivedData], 3000); // Adjust time as needed

} catch (error) {
 mycache = {}
 console.log('error beacondataaaaaaaaaaaaaaaaa  : ' + error) 
}
});



app.post('/tab/saveData',(req,res)=>{ // editable to remove , not nessecary
  const { datar_received } = req.body ;
  console.log('data received succesfully ! ')
  console.log(datar_received)
  res.status(201).send('Data received successfully');
});

app.post('/tab/ownenter', async (req, res) => {
  console.log('we are in tab/ownenter  ::: ')
  const {
    ownroute,
    username
    
    /*
    navigator_laguage_of_browser,
    userlocale_of_browser,
    decimalseparator_of_browser,

    navigator_laguage_updated,
    userlocale_updated,
    decimalseparator_updated
    */
    
  
  } = req.body;
  //console.log(ownroute)!
  try {
 console.log('we are in tab/webenter : ')
  const myCookie_token = req.cookies['jwtTokentableur'];  //// *// Replace 'myCookieName' with your actual cookie name//
  console.log('mycookies_token :')
  console.log(myCookie_token);
  

  const decoded_in_ownenter = jwt.verify(myCookie_token, secretKey);
  console.log('decoded_in_ownenter')
 // console.log(decoded_in_ownenter)


  if (Object.values(decoded_in_ownenter)[0] !== username) {
    console.log('we are inside decoded.decoded_in_ownenter !== username')
    return res.status(401).send('Authentication failed !!!.');
  }


  var user_by_route = await MyModelMongoose.findOne({"hisownroute":ownroute});
  //var userr = await MyModelMongoose.findOne({"phoneNumber_owner":"077775566"})
  //console.log(userr.dataa)
  console.log('userr')
  console.log('user_by_route')
  //console.log(user_by_route);!!!
  
  console.log('********************************');
  console.log('********************************');
  console.log('********************************');

  
  //console.log(user_by_route);

console.log('we will enter in try')
  
      console.log('enter in try')
  if(!user_by_route){
    console.log('1cond')
    res.status(400).send('Authentication failed !!!.');
  } else {
    console.log('2cond')

    if(myCookie_token){
      console.log('3cond')
     var returniffalse = false;

     for(const userId in user_by_route.users){
      if (user_by_route.users.hasOwnProperty(userId) && user_by_route.users[userId]) {
        var theuser = user_by_route.users[userId];
        console.log('theuser before if :')
        console.log(userId)
        
        //console.log(theuser)
        if (theuser.token === myCookie_token && user_by_route.users[userId].idusername==Object.values(decoded_in_ownenter)[0]) {
          
          console.log('email found in : theuser.email equal to email ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ')
          //console.log(theuser)
        console.log('Email found in users[userId].email');
        console.log('4cond')
        //console.log(user_by_route.dataa)
       // console.log(user_by_route.dataa)
        console.log(user_by_route.phoneNumber_owner)
        returniffalse = true;
        console.log('*******************---------------------------------------************')
        var userinset = "users."+userId+".used";
        user_by_route.users[userId].used=true

        /*
        user_by_route.users[userId].navigator_laguage_of_browser=navigator_laguage_of_browser; //navigator_language2 in initials_inputs
        user_by_route.users[userId].userlocale_of_browser=userlocale_of_browser; //userLocale2 in initials_inputs
        user_by_route.users[userId].decimalseparator_of_browser=decimalseparator_of_browser; //userLocale2 in initials_inputs
        
        user_by_route.users[userId].navigator_laguage_updated=navigator_laguage_updated;
        user_by_route.users[userId].userlocale_updated=userlocale_updated;
        user_by_route.users[userId].decimalseparator_updated=decimalseparator_updated; 
        */
        
        await user_by_route.save();

        res.json({"organisme":user_by_route.organisme,
                  "region":user_by_route.region,
                  "dataa":user_by_route.dataa,
                  "phoneNumber":user_by_route.phoneNumber_owner,

                  "hisownroute_from_server":user_by_route.hisownroute,

                  
                  "navigator_laguage_from_db":user_by_route.navigator_laguage_db,
                  "userlocale_from_db":user_by_route.userlocale_db,
                  "decimalseparator_from_db":user_by_route.decimalseparator_db,
                  "use_english_from_db":user_by_route.use_english_date_by_user_himeself_in_modal_db,

                  "userTimeZone_form_server":user_by_route.userTimeZone_db,

                  "email_to_display_from_server":theuser.email_to_display,

                  "role_user_from_server":theuser.role
                
                })
        break
        }
      }
    }
 
  if(returniffalse==false) {
  console.log('5cond')
  res.status(401).send('Authentication failed !!!.');
 }

} else {
  console.log('6cond')
  res.status(401).send('Authentication failed !!!.');
}
}
} catch (error) {
  console.log('7cond')
  console.log(error)
  res.status(401).send('Authentication failed !!!.');   
}
});

app.post('/tab/enter', async (req, res) => {
  //const {act_data,idusername} = req.body;;
  
  //const {idusername,data_now} = req.body;!!
  const {idusername} = req.body;

  console.log('we are in tab/enter : ')
  console.log('idusername :');
  console.log(idusername);

  const myCookie_token_in_enter = req.cookies['jwtTokentableur'];  /// Replace 'myCookieName' with your actual cookie name
  
  if(myCookie_token_in_enter!==undefined && myCookie_token_in_enter!==null){
    console.log('first cond')
    const decoded_in_enter = jwt.verify(myCookie_token_in_enter, secretKey);
    console.log(decoded_in_enter)
    console.log(decoded_in_enter.idusername_from_generated);
    console.log(Object.values(decoded_in_enter)[0])
    console.log(idusername);
    if (Object.values(decoded_in_enter)[0] == idusername && idusername!==null) {
      //if(data_now){
        
        /*
        console.log('we update the data when etnering :')
        const updatedUser = await MyModelMongoose.findOneAndUpdate(
          { idusername: idusername },
          { $set: {dataa: data_now}},
        );
        */
        var user_in_enter = await MyModelMongoose.findOne({  // maybe editable, i think we should change it to search hisownroute instead of idusernames
          //{"idusername":idusername}
          $or: [
            { "users.user1.idusername": idusername },
            { "users.user12.idusername": idusername },
            { "users.user2.idusername": idusername },
            { "users.user3.idusername": idusername },

            { "users.user4.idusername": idusername }, // editable nb users if we want to remove user4 or user5
            { "users.user5.idusername": idusername } // editable nb users if we want to remove user4 or user5

          ]
        }
          )
        console.log(user_in_enter);
        console.log(user_in_enter.hisownroute);
        var user_own_route = 'tab/'+user_in_enter.hisownroute
        res.json({"hisownroute": user_own_route});
      //}
      console.log('second cond');
      //res.status(201).send('User registered successfully');!!!!!!!!
    } else {
      console.log('third cond')
      res.status(401).send('Authentication failed. Please provide valid credentials.');
    }
  } else {
    console.log('fourth cond')
    res.status(401).send('Already entered.');
  }
  
});

app.post('/tab/login', async (req, res) => {
  console.log('we will call tab/login nnnnnnnnnnnnnnnnnnnnnnn'); //aa
  const tokenRecaptcha = req.body.recaptchaToken;
  const navigator_laguage_of_browser = req.body.navigator_laguage_of_browser;
  const userlocale_of_browser = req.body.userlocale_of_browser;
  const decimalseparator_of_browser = req.body.decimalseparator_of_browser;
  const use_english_date_by_user_himeself_of_browser = req.body.use_english_date_by_user_himeself_of_browser;
  const userTimeZone_of_browser = req.body.userTimeZone;
  console.log('use_english_date_by_user_himeself_of_browser --------------------:')
  console.log(use_english_date_by_user_himeself_of_browser)


  //const { organisme, region,email,phoneNumber,tokenRecaptcha,navigator_laguage_of_browser } = req.body;

  console.log('tokenRecaptcha :')
  console.log(tokenRecaptcha)
  console.log(navigator_laguage_of_browser)

  
  const verifyUrlRecaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${tokenRecaptcha}`;
  console.log(verifyUrlRecaptcha);
 
  try {
    const responseRecaptcha = await fetch(verifyUrlRecaptcha, { method: 'POST' });
    const dataRecaptcha = await responseRecaptcha.json();
    console.log('dataRecaptcha:')
    console.log(dataRecaptcha)

    if (dataRecaptcha.success) {
      //res.status(200).json({ success: true, message: 'reCAPTCHA verification successful' });!!

       const { organisme, region,email,phoneNumber, } = req.body;
      
      var idusername_from_generated = generateRandomString(14,false);
      var idusername_from_generated_12 = generateRandomString(14,false);


      console.log(idusername_from_generated)
      var dataa_inital = ddatafct00(last_row_after_header)//retreived_data;
    
      const organisme_to_check = organisme_data.find(u => u.val === organisme);
      const region_to_check = region_data.find(u => u.matriculeregion === region);
      const email_check = isValidEmail(email);
      const phoneNumber_check = isValidPhoneNumber(phoneNumber);
    
      if (!organisme_to_check || !region_to_check || !email_check || !phoneNumber_check ) {
        console.log('!orgniasme or region or email or phonumber')
        res.status(401).send('Authentication failed. Please provide valid credentials.');
      } else {
        console.log('else !')
          //const { idusername,dataa } = req.body;//!!
      
      //const mymodfind = MyModelMongoose.find({});
      //console.log('mymodfind : ')
      //console.log(mymodfi  nd)!!
    
      
      try {
      console.log('try token login')
      // Create a JWT token with the user's username
      const token = jwt.sign({ idusername_from_generated }, secretKey);
      console.log(token);

      const token12 = jwt.sign({ idusername_from_generated_12 }, secretKey);
      console.log(token12);

    
      var hisownroute = generateRandomString(25,false).toLowerCase();
      //const hisownroute = jwt.sign({idusername_from_generated,email,region,phoneNumber})
      console.log('hisownroute:')
      console.log(hisownroute);

      var hisownroutewillbesigned = hisownroute;
      const tokenownroute = jwt.sign({hisownroutewillbesigned, user:"user1"},secretKey) // user2 is not user1 of users.user1 , is just for that

      console.log(tokenownroute)

      const tokenownroute12 = jwt.sign({hisownroutewillbesigned, user:"user2"},secretKey)  // user2 is not user2 of users.user2 , is just for that
      console.log(tokenownroute12)
      var emailtodisplay = email + "(poste2)" // editable , maybe we make a space
      console.log(emailtodisplay)
      var codepass1 = crypto.randomInt(10000000, 99999999);
      var codepass12 = crypto.randomInt(10000000, 99999999);

        const newRecord = new MyModelMongoose({
          "users.user1.idusername":idusername_from_generated,
          "dataa":dataa_inital,
      
          "organisme":organisme,
          "region":region,
          "users.user1.email":email,
          "phoneNumber_owner":phoneNumber,
          "hisownroute":hisownroute,

          "navigator_laguage_db":navigator_laguage_of_browser,
          "userlocale_db":userlocale_of_browser,
          "decimalseparator_db":decimalseparator_of_browser,
          "use_english_date_by_user_himeself_in_modal_db":use_english_date_by_user_himeself_of_browser,
          "userTimeZone_db":userTimeZone_of_browser,

          "users.user1.token":token,
          //"users.user1.owner":true,
          "users.user1.role":"Owner",
          "users.user1.pass":  codepass1, //generateRandomString(6,true), // maybe editable when changing string to numbers
          "users.user1.hisownroutetoken":tokenownroute,
          "users.user1.email_to_display":email,
          "users.user1.used":true,

          //"users.user1.navigator_laguage_of_browser":navigator_laguage_of_browser,
          //"users.user1.userlocale_of_browser":userlocale_of_browser,
          //"users.user1.decimalseparator_of_browser":decimalseparator_of_browser,

          //"users.user1.navigator_laguage_updated":navigator_laguage_of_browser,
          //"users.user1.userlocale_updated":userlocale_of_browser,
          //"users.user1.decimalseparator_updated":decimalseparator_of_browser,

          

          "users.user12.idusername":idusername_from_generated_12,
          "users.user12.email":email,
          "users.user12.token":token12,
          "users.user12.role":"Owner",
          "users.user12.pass":codepass12,  //generateRandomString(6,true), // maybe editable when changing string to numbers
          "users.user12.hisownroutetoken":tokenownroute12,
          "users.user12.email_to_display":emailtodisplay,
          "users.user12.used":false,

          //"users.user12.navigator_laguage_of_browser":navigator_laguage_of_browser,
          //"users.user12.userlocale_of_browser":userlocale_of_browser,
          //"users.user12.decimalseparator_of_browser":decimalseparator_of_browser,

          //"users.user12.navigator_laguage_updated":navigator_laguage_of_browser,
          //"users.user12.userlocale_updated":userlocale_of_browser,
          //"users.user12.decimalseparator_updated":decimalseparator_of_browser,



        });
        console.log('newRecord before:')
        //console.log(newRecord)
        //newRecord.save();
        
        console.log('we will make await newrecord.save')
        await newRecord.save();
        console.log('we did await newrecord.save')

        //const savedItem = await newRecord.save();
        //res.json(savedItem);

        console.log('newRecord after Save:')
        //console.log(newRecord)
    
        res.cookie('jwtTokentableur', token, { httpOnly: true,  maxAge: 8640000000 });
        res.cookie('jwtTokentableurhisownroute', tokenownroute, { httpOnly: true,  maxAge: 8640000000 });
        
        res.json({"idusername_to_client_side":idusername_from_generated,"hisownroute":hisownroute,"emailtodisplay":emailtodisplay});
        console.log('after resjson');
          
      
      } catch (error) {
        console.log('catch error ' + error)
        res.status(400).json({ message: error.message });
      }
    
      }
    

    } else {
      res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ success: false, message: 'An error occurred during reCAPTCHA verification' });
  }

  
});



// authorizeUser is in separated file

app.post('/hello', function(req, res){ // editable to remove
   res.send("You just called the post method at '/hello'!\n");
});

app.post('/acc/accessfromurlem',async (req, res) => {
    console.log('we are in acc/accessfromurlem  ::: ')
    const {email,currentrouteofurl} = req.body;
    console.log(email)
    console.log(currentrouteofurl)
    
    if(!isValidEmail(email)){
      res.status(400).send('Authentication failed !!!.');
    } else {

    var email_in_db = await MyModelMongoose.findOne({
      //"email":email
      "hisownroute":currentrouteofurl
     /* $or: [
        { "users.user1.email": email },
        { "users.user2.email": email },
        { "users.user3.email": email }
      ]
      */
    });
    console.log('email_in_db')
    //console.log(email_in_db);
  var returnval = false;
  if (email_in_db) {
    for(const userId in email_in_db.users){
      if (email_in_db.users.hasOwnProperty(userId) && email_in_db.users[userId] && userId!=='user1') {
        var theuser = email_in_db.users[userId];
        console.log('theuser before if :')
        console.log(userId)
        if (theuser.email === email) {
          console.log('email found in : theuser.email equal to email ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ')
          //console.log(theuser)
          var returnval = true
          if(email_in_db.users[userId].used==true){
            console.log('email already used and we will call status 402')
            res.status(402).send('Email already used')
          } else {
          res.status(200).json({'idusername_to_client_side':email_in_db.users[userId].idusername,
          'email':email_in_db.users[userId].email,
          'emailtodisplay':email_in_db.users[userId].email_to_display,
        });
      }
        console.log('Email found in users[userId].email');
        break
        }
      }
 }
 if(!returnval){
  res.status(401).send('Authorization failed !!!.');        
 }
   
  } else {
    console.log('!email_in_db')
    res.status(401).send('Authorization failed !!!.');
  }
  console.log('we are in email existed !!')

  }
})

app.post('/acc/accessfromurlcp',async (req, res) => {
  console.log('we are in acc/accessfromurlcp  ::: ')
  const {email,pinCode,recaptchaTokenAccess,currentrouteofurl} = req.body;
  const pinCodenotArray = pinCode.join('');
  console.log(email)
  if(!isValidEmail(email)){
    res.status(400).send('Authentication failed !!!!!!!.');
  } else {
    const verifyUrlRecaptcha_access = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_ACCESS_SECRET_KEY}&response=${recaptchaTokenAccess}`;
 
    try {
      const responseRecaptcha_access = await fetch(verifyUrlRecaptcha_access, { method: 'POST' });
      const dataRecaptcha_access = await responseRecaptcha_access.json();
      //console.log(responseRecaptcha_add)
   
      if (dataRecaptcha_access.success) {
        
  var email_in_db = await MyModelMongoose.findOne({
    //"email":email
    "hisownroute":currentrouteofurl

/*    $or: [
      { "users.user1.email": email },
      { "users.user2.email": email },
      { "users.user3.email": email }
    ]
*/
  });
  console.log('email :')
  console.log(email);

  var findpassinFields = null;
  if (email_in_db) {
    for(const userId in email_in_db.users){
      if (email_in_db.users.hasOwnProperty(userId) && email_in_db.users[userId] && userId!=='user1') {
        var theuser = email_in_db.users[userId];
        console.log('theuser before if :')
        console.log(userId)
        //console.log(theuser)
        if (theuser.email === email) {
          console.log('email found in : theuser.email equal to email ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ')
          //console.log(theuser)
          var findpassinFields=email_in_db.users[userId]
          console.log('Email found in users[userId].email');
          break
        }
      }
 }
   
  } else {
    var findpassinFields = null
    console.log('!email_in_db')
  }

  console.log('we are before condition of !email_in_db');
  //console.log(email_in_db.users)
  console.log(findpassinFields)
  //console.log(pinCode)
  //console.log(pinCodenotArray);
  //console.log(findpassinFields.pass);
  //console.log(email_in_db.users.user2);


  if(!email_in_db){
    console.log('1cond')
    res.status(401).send('Authorization failed !!!.');
  } else if (findpassinFields==null) {
    res.status(401).send('Authorization failed !!!!!!.');
  } else if(findpassinFields.pass==pinCodenotArray) { // editable later !
    console.log('we are in email existed !!')

    res.cookie('jwtTokentableur', findpassinFields.token, { httpOnly: true,  maxAge: 8640000000 });
    res.cookie('jwtTokentableurhisownroute', findpassinFields.hisownroutetoken, { httpOnly: true,  maxAge: 8640000000 });

    res.status(200).json({
    'idusername_to_client_side':findpassinFields.idusername,
    'email':findpassinFields.email,
    'phoneNumber_owner':email_in_db.phoneNumber_owner,
    'organisme':email_in_db.organisme,
    'region':email_in_db.region,
    'dataa':email_in_db.dataa,
    'hisownroute':email_in_db.hisownroute,
    'role':findpassinFields.role,
    'email_to_display':findpassinFields.email_to_display,

    "navigator_laguage_of_owner":email_in_db.navigator_laguage_db,
    "userlocale_of_owner":email_in_db.userlocale_db,
    "decimalseparator_of_owner":email_in_db.decimalseparator_db,
    "use_english_date_by_user_himeself_in_modal_of_owner":email_in_db.use_english_date_by_user_himeself_in_modal_db,
    "userTimeZone_of_owner":email_in_db.userTimeZone_db
    //,'token_aftersuccesspass':findpassinFields.token
  });
  } else {
    res.status(400).send('Authorization invalid !!!.');
  }

      } else {
        res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      res.status(500).json({ success: false, message: 'An error occurred during reCAPTCHA verification' });
    }
}
})

app.post('/allowedemails',async (req, res) => {
  console.log('we are in allowedemails  ::: ')

  const {idusername,hisownroute} = req.body;
  const myCookie_token_in_allowedemails = req.cookies['jwtTokentableur'];  ///  Replace 'myCookieName' with your actual cookie name::!!!!
  const myCookie_token_hisownroute_in_allowedemails = req.cookies['jwtTokentableurhisownroute'];  ///  Replace 'myCookieName' with your actual cookie name::!!!!

  if(myCookie_token_in_allowedemails!==undefined && myCookie_token_in_allowedemails!==null && myCookie_token_hisownroute_in_allowedemails!==undefined && myCookie_token_hisownroute_in_allowedemails!==null ){
    const decoded_in_allowedemails = jwt.verify(myCookie_token_in_allowedemails, secretKey);
    const decoded_hisownroute_in_allowedemails = jwt.verify(myCookie_token_hisownroute_in_allowedemails,secretKey)

    if (Object.values(decoded_in_allowedemails)[0] == idusername && idusername!==null && Object.values(decoded_hisownroute_in_allowedemails)[0] == hisownroute && hisownroute!==null) {
      console.log('we are in the 200 request in allowedemails')
      //var user_by_his_allowedemails = await MyModelMongoose.findOne({"users.user1.idusername":idusername});
      var user_by_his_allowedemails = await MyModelMongoose.findOne({"hisownroute":hisownroute});
      
      var role_of_the_requestor = 'Viewer';

      var his_allowedemails2 = null;
      var his_allowedcode2 = null;
      var his_allowedrole2 = null;

      var his_allowedemails3 = null;
      var his_allowedcode3 = null;
      var his_allowedrole3 = null;
      

      var his_allowedemails12 = null;
      var his_allowedrole12 = null;
      var his_allowedcode12 = null;

      var his_allowedemails4 = null;
      var his_allowedcode4 = null;
      var his_allowedrole4 = null;

      var his_allowedemails5 = null;
      var his_allowedcode5 = null;
      var his_allowedrole5 = null;


      var emailslength = 2;


      if (user_by_his_allowedemails) {
        for(const userId in user_by_his_allowedemails.users){
          if (user_by_his_allowedemails.users.hasOwnProperty(userId) && user_by_his_allowedemails.users[userId]) {
            var theuser = user_by_his_allowedemails.users[userId];
            console.log('theuser before if :')
            console.log(userId)
            //console.log(theuser)
            if (theuser.idusername==idusername) {
              console.log('email found in : theuser.email equal to email ')
              //console.log(theuser)
              role_of_the_requestor = user_by_his_allowedemails.users[userId].role
              console.log('Email found in users[userId].role  RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
              console.log(role_of_the_requestor)
              break
            }
          }
     }


     for(const userId in user_by_his_allowedemails.users){
      if (user_by_his_allowedemails.users.hasOwnProperty(userId) && user_by_his_allowedemails.users[userId] && userId!=='user1') {
        var theuser = user_by_his_allowedemails.users[userId];
        console.log('theuser before if :')
        console.log(userId)
        //console.log(theuser)

        if(userId=='user2'){
          var his_allowedemails2 = theuser.email;
          var his_allowedrole2 = theuser.role;
          var his_allowedcode2 = theuser.pass;
          emailslength=emailslength+1;
        } else if(userId=='user3'){
          var his_allowedemails3 = theuser.email;
          var his_allowedrole3 = theuser.role;
          var his_allowedcode3 = theuser.pass;
          emailslength=emailslength+1;

        } else if (userId=='user12' && role_of_the_requestor=='Owner'){
          var his_allowedemails12 = theuser.email_to_display;
          var his_allowedrole12 = theuser.role;
          var his_allowedcode12 = theuser.pass;

        } else if(userId=='user4'){ // editable nb users if we want to remove user4 or user5
          var his_allowedemails4 = theuser.email;
          var his_allowedrole4 = theuser.role;
          var his_allowedcode4 = theuser.pass;
          emailslength=emailslength+1;
        }
        else if(userId=='user5'){ // editable nb users if we want to remove user4 or user5
          var his_allowedemails5 = theuser.email;
          var his_allowedrole5 = theuser.role;
          var his_allowedcode5 = theuser.pass;
          emailslength=emailslength+1;

        }
      }
 }
 console.log('user5 :')
 console.log(his_allowedemails5)
 console.log(his_allowedrole5)
 console.log(his_allowedcode5)

 res.status(200).json({
  "user12":{"useremail":his_allowedemails12  ,"role":his_allowedrole12,  "code":his_allowedcode12},
  "user2":{"useremail": his_allowedemails2,"role":his_allowedrole2,"code":his_allowedcode2},
  "user3":{"useremail":his_allowedemails3,"role":his_allowedrole3,"code":his_allowedcode3} , 
  
  "user4":{"useremail":his_allowedemails4,"role":his_allowedrole4,"code":his_allowedcode4} , // editable nb users if we want to remove user4 or user5
  "user5":{"useremail":his_allowedemails5,"role":his_allowedrole5,"code":his_allowedcode5} , // editable nb users if we want to remove user4 or user5

  "role_of_the_requestor":role_of_the_requestor,
  "emailslength":emailslength
}
);
       
      } else {
        console.log('!user_by_his_allowedemails')
        res.status(401).send('Authorization failed !!!.');

      }


    } else {
      res.status(401).send('Authorization failed !!!.');
    }
  } else {
    res.status(401).send('Authorization failed !!!.');

  }

})

app.post('/add',async (req, res) => {
  console.log('we are add  ::: ')
  const {email_owner,username_owner,new_email_added,role_new_user,recaptchaToken_add,route} = req.body;
  console.log(email_owner)
  console.log(recaptchaToken_add)
  console.log(role_new_user)
  console.log('********')
  console.log(RECAPTCHA_ADD_SECRET_KEY)
  const verifyUrlRecaptcha_add = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_ADD_SECRET_KEY}&response=${recaptchaToken_add}`;
 
  try {
    const responseRecaptcha_add = await fetch(verifyUrlRecaptcha_add, { method: 'POST' });
    const dataRecaptcha_add = await responseRecaptcha_add.json();
    //console.log(responseRecaptcha_add)
    console.log('-------------------------------------------------')
    console.log('-------------------------------------------------')
    console.log(dataRecaptcha_add)
    if (dataRecaptcha_add.success) {
      console.log('recaptcha add sucess')
      const myCookie_token_in_add = req.cookies['jwtTokentableur'];  /// Replace 'myCookieName' with your actual cookie name
      const decoded_add = jwt.verify(myCookie_token_in_add, secretKey);

      const myCookie_token_hisownroute_in_add = req.cookies['jwtTokentableurhisownroute']; 
      const decoded_jwtcookiehisownroute_add = jwt.verify(myCookie_token_hisownroute_in_add, secretKey);  
      
      if( role_new_user!='Admin' && role_new_user!='Writer' && role_new_user!='Viewer' ){
        res.status(400).send('Authentication failed !!!.');
      }
      else if(!isValidEmail(email_owner) || !isValidEmail(new_email_added)){
        console.log('valie email failed owner or new')
        res.status(400).send('Authentication failed !!!.');
      } else if(Object.values(decoded_add)[0] !== username_owner){
        console.log('decoded verification failed')

        res.status(401).send('Authentication incorrect !!!.');
      } if (Object.values(decoded_jwtcookiehisownroute_add)[0] !== route) {
        console.log('***************************** route incorrect ::::::::::::::::::::')
        res.status(401).send('Authentication incorrect !!!.');
      } else {
        console.log('add part success')
        var updatetoadduser = await update_to_add_user(email_owner,new_email_added,role_new_user,myCookie_token_in_add,route,username_owner);
        updatetoadduser
        console.log('updatetoadduser !!!!!!!!!!!!!!!!!!!!!!!')
        console.log(updatetoadduser)
        if(updatetoadduser=='alreadyadded'){
          res.status(500).send('Adding to list is limited !!!.');
        } else if(updatetoadduser==false){
          res.status(401).send('Adding to list is limited !!!.');
        } // editable may be we have to add else 
        console.log('we will continue to resstatus200 :')
        console.log(new_email_added);
        res.status(200).json({'inputEmail':new_email_added,"codepass":updatetoadduser,"role":role_new_user});
      }

    } else {
      console.log('recaptcha failed')
      res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.log('catch error ')
    console.error('Error updating user:', error);
  }

  
})




app.post('/removedemail',async (req, res) => { 
  console.log('we are in removedemail  ::: ')

  const {emailremoved,idusername,currentrouteofurl} = req.body;
  const myCookie_token_in_removedemail = req.cookies['jwtTokentableur'];  /// Replace 'myCookieName' with your actual cookie name::!!!!

  if(myCookie_token_in_removedemail!==undefined && myCookie_token_in_removedemail!==null){
    const decoded_in_removedemail = jwt.verify(myCookie_token_in_removedemail, secretKey);

    if (Object.values(decoded_in_removedemail)[0] == idusername && idusername!==null) {
      console.log('we are in the 200 request in removedemail')
     try{
      var role_of_the_requestor = 'Viewer';
      var unsetField = null;
      const foundDoc = await MyModelMongoose.findOne({"hisownroute":currentrouteofurl});
      console.log(Object.keys(foundDoc.users).length)

      /*
      const foundDoc = await MyModelMongoose.findOne({
        $or: [
          { 'users.user2.email': emailremoved },
          { 'users.user3.email': emailremoved }
        ]
      });
      */
      console.log('**************')
      //console.log(foundDoc.users)

      if(foundDoc) {
      
        for(const userId in foundDoc.users){
          if (foundDoc.users.hasOwnProperty(userId) && foundDoc.users[userId]) {
            var theuser = foundDoc.users[userId];
            console.log('theuser before if :')
            console.log(userId)
            //console.log(theuser)
            if (theuser.idusername==idusername) {
              console.log('email found in : theuser.email equal to email ')
              //console.log(theuser)
              role_of_the_requestor = foundDoc.users[userId].role
              console.log('Email found in users[userId].role  RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
              console.log(role_of_the_requestor)
              break
            }
          }
     }
     if(role_of_the_requestor!=='Owner' && role_of_the_requestor!=='Admin'){
      return res.status(500).send('role of the requestor cannot remove !');
    }

    for(const userId in foundDoc.users){
      if (foundDoc.users.hasOwnProperty(userId) && foundDoc.users[userId]) {
        var theuser = foundDoc.users[userId];
        console.log('theuser before if :')
        console.log(userId)
        //console.log(theuser)
        if (theuser.email==emailremoved) {
          console.log('email found in : theuser.email equal to email ')
          //console.log(theuser)
          var unsetField = 'users.'+userId.toString();
          console.log('unsetField in remove emails')
          console.log(unsetField)
          break
        }
      }
 }

 if(unsetField){
  // Now update the document to unset the field determined above
  const updatedDoc_removed = await MyModelMongoose.findOneAndUpdate(
    { _id: foundDoc._id }, // Assuming you have an _id field in your schema
    { $unset: { [unsetField]: 1 } },
    { new: true }
  );

  if (updatedDoc_removed) {
    var emailslengthbeforeremoved = Object.keys(foundDoc.users).length
    console.log('Updated document:');
    res.status(200).json({"emailslength":emailslengthbeforeremoved-1})
    //res.status(200).send('Document updated');
  } else {
    console.log('Failed to update the document.');
    res.status(500).send('Failed to update the document');
  }
 } else {
  console.log('Document not found!!!!!!.');
  res.status(404).send('Document not found');   
}

      } else {
        console.log('no email to remove');
        res.status(404).send('no email to remove ');
      }

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send('Authorization failed !!!.');
  }

      //var his_allowedemails3 = user_by_his_allowedemails.users.user3.email;
    } else {
      res.status(401).send('Authorization failed !!!.');
    }
  } else {
    res.status(401).send('Authorization failed !!!.');

  }

})







app.get('/tab/:ownroute', function(req, res) {
   res.send('own route : ' + req.params.ownroute);
   //http://localhost:5000/things/nadjib/45
});

app.post('/getdata',async (req,res)=>{
  console.log('getdata cond 00')
  try {
    console.log('getdata cond 1')
    const {hisroute,idusername} = req.body;
    console.log('hisroute :')
    console.log(hisroute)
    console.log(idusername)
    var hisroute2 = hisroute.toString().replace('/tab/','');
    const myCookie_token_in_getdata = req.cookies['jwtTokentableur'];  ////!! Replace 'myCookieName' with your actual cookie name::!!!!
    console.log('myCookie_token_in_getdata : ')
    console.log(myCookie_token_in_getdata)
    console.log(hisroute)
    console.log(idusername)
    console.log(hisroute2)



    if(myCookie_token_in_getdata!==undefined && myCookie_token_in_getdata!==null){
      console.log('getdata cond 2')
      const decoded_in_getdata = jwt.verify(myCookie_token_in_getdata, secretKey);
  
      if (Object.values(decoded_in_getdata)[0] == idusername && idusername!==null) {
        console.log('getdata cond 3')

   console.log('we are in getdata :')
  console.log('*******************************---------------------------------************');
  console.log('*******************************---------------------------------************')
  console.log('*******************************---------------------------------************')
  console.log('*******************************---------------------------------************')
  console.log('*******************************---------------------------------************')

  var user_by_organisme = await MyModelMongoose.findOne({"hisownroute":hisroute2});
  //console.log(user_by_organisme)

  //var userfind = await MyModelMongoose.find({});
  //console.log(userfind[0])
  console.log('we will return status 200 in getdata ')
  //console.log(user_by_organisme)
  res.status(200).json({'data00':user_by_organisme.dataa});
      } else {
        console.log('getdata cond 4')
        res.status(401).json({
          error:'Error',
          message: 'Error'
        }) 
      }
    } else {
      console.log('getdata cond 5')

      res.status(400).json({
        error:'Error',
        message: 'Error'
      }) 
    }
} catch (error) {
  
  res.status(400).json({
    error:'Error',
    message: 'Error'
  })
  console.log('getdata cond 6')
 console.error('errorr : ' + error )   
}

})

//Other routes here

app.get('/', function(req, res){
  console.log('im in app get / ');
  //res.send("Hello world!");
});


app.get('*', function(req, res){   //   404 page 
  res.send('Sorry, this is an invalid URL.');
});

app.post('/clearcookie', (req, res) => {
  console.log('clear cookie')
  // Clearing a cookie by setting its expiration date to a past date!!!
  res.clearCookie('jwtTokentableurhisownroute');
  res.clearCookie('jwtTokentableur');

 // res.cookie('jwtTokentableurhisownroute', null, { httpOnly: true,  maxAge: 8640000000 });
 // res.cookie('jwtTokentableur', null, { httpOnly: true,  maxAge: 8640000000 });
  res.status(200).send('Cookie cleared');

});

app.post('/users_roles_navbar',async (req,res)=>{
  console.log('we are in users_roles_navbar')
  try {
    const {username,hisownroute} = req.body;
    const myCookie_token_in_usersrolesnavbar = req.cookies['jwtTokentableur'];  
    const myCookie_token_hisownroute_in_usersrolesnavbar = req.cookies['jwtTokentableurhisownroute']; 

    const decoded = jwt.verify(myCookie_token_in_usersrolesnavbar, secretKey);

    if (username==undefined){
      return res.status(402).json({message:'new'})
    }
    if (Object.values(decoded)[0] !== username) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const decoded_jwtcookiehisownroute = jwt.verify(myCookie_token_hisownroute_in_usersrolesnavbar, secretKey);  
    if (Object.values(decoded_jwtcookiehisownroute)[0] !== hisownroute) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    var user_by_route = await MyModelMongoose.findOne({"hisownroute":hisownroute});
    
    if(!user_by_route){
      return res.status(400).json({ message: 'Forbidden' });
    } else {
      if(user_by_route.users.user1.idusername==username){
        return res.status(200).json({"role":user_by_route.users.user1.role})
      } else if(user_by_route.users.user12 && user_by_route.users.user12.idusername==username){
          return res.status(200).json({"role":user_by_route.users.user12.role})
      } else if(user_by_route.users.user2 &&  user_by_route.users.user2.idusername==username){
        return res.status(200).json({"role":user_by_route.users.user2.role})
      } else if(user_by_route.users.user3 && user_by_route.users.user3.idusername==username){
        return res.status(200).json({"role":user_by_route.users.user3.role})

      } else if(user_by_route.users.user4 && user_by_route.users.user4.idusername==username){ // editable nb users if we want to remove user4 or user5
        return res.status(200).json({"role":user_by_route.users.user4.role})
      }else if(user_by_route.users.user5 && user_by_route.users.user5.idusername==username){ // editable nb users if we want to remove user4 or user5
        return res.status(200).json({"role":user_by_route.users.user5.role})
      } else {
        res.status(400).json({message:'username doesnt exist '})
      }

    }

  } catch (error) {
    console.log('we are in users_roles_navbar catch error ')
    return res.status(402).json({message:'new'})

  }


})

app.post('/changeformat',async (req,res)=>{
  console.log('we are in changeformat')
  try {
    const {currentrouteofurl,username, navigator_laguage_of_browser, userlocale_of_browser , decimalseparator_of_browser,use_english_date_by_user_himeself_in_modal_of_browser} = req.body;
    const myCookie_token_in_changeformat = req.cookies['jwtTokentableur'];  
    const myCookie_token_hisownroute_in_changeformat = req.cookies['jwtTokentableurhisownroute']; 

    const decoded_in_changeformat = jwt.verify(myCookie_token_in_changeformat, secretKey);
    console.log('decimalseparator_of_browser')
    console.log(decimalseparator_of_browser)
    
    if (username==undefined){
      return res.status(402).json({message:'new'})
    }
    if (Object.values(decoded_in_changeformat)[0] !== username) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const decoded_jwtcookiehisownroute_in_changeformat = jwt.verify(myCookie_token_hisownroute_in_changeformat, secretKey);  
    if (Object.values(decoded_jwtcookiehisownroute_in_changeformat)[0] !== currentrouteofurl ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    var user_by_route_in_changeformat = await MyModelMongoose.findOne({"hisownroute":currentrouteofurl});
    
    if(!user_by_route_in_changeformat){
      return res.status(400).json({ message: 'Forbidden' });
    } else {
      console.log('we will make changes in changeformat if it is true !!!!!!!!!!!!!!!!!!!!!!!!!')
      if(user_by_route_in_changeformat.users.user1.idusername==username || user_by_route_in_changeformat.users.user12.idusername==username ){
        console.log('22222 we will make changes in changeformat if it is true !!!!!!!!!!!!!!!!!!!!!!!!!')

        user_by_route_in_changeformat.navigator_laguage_db=navigator_laguage_of_browser;
        user_by_route_in_changeformat.userlocale_db=userlocale_of_browser;
        user_by_route_in_changeformat.decimalseparator_db=decimalseparator_of_browser;
        user_by_route_in_changeformat.use_english_date_by_user_himeself_in_modal_db=JSON.parse(use_english_date_by_user_himeself_in_modal_of_browser);
        await user_by_route_in_changeformat.save();
        res.status(200).json({ message: 'Data saved successfully' });

      } else {
        console.log('validation is not correct in changeformat ')
        return res.status(400).json({ message: 'User cannot change format' });
      }

    }
    
  } catch (error) {
    console.log('we are in error in changeformat ' + error)
    return res.status(400).json({ message: 'Forbidden' });
  }

})


// //////////////////             SOCKET !

// io.of('/zqoucqnalzkhvxba2lc5zat4w').on('connection',(socket)=>{
//   console.log('aaaaaaaaaaaaaaaaaaa')
// })

io.use((socket, next) => {
  // Perform authentication here, e.g., validate a token
  //const token = socket.handshake.auth.token;
  try {
  console.log('io.use $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ : ')
  var getjwtcookiehisownroute = getCookieValue(socket.request.headers.cookie,'jwtTokentableurhisownroute');
  console.log('****')
  console.log(getjwtcookiehisownroute)
  console.log('***')
  console.log(socket.request.headers.cookie)  

  const decoded_jwtcookiehisownroute = jwt.verify(getjwtcookiehisownroute, secretKey);
  console.log('decoded_jwtcookiehisownroute :');
  console.log(decoded_jwtcookiehisownroute);
  console.log('testverif :')
  //var testverif = jwt.verify(, secretKey);
  //console.log(testverif)
  console.log('socket.handskhake query namespace0 :')
  console.log(socket.handshake.query.namespace0)
  //console.log()
  //console.log(receivedUsername)

  if (Object.values(decoded_jwtcookiehisownroute)[0] !== socket.handshake.query.namespace0) {
     console.log('we are inside decoded_jwtcookiehisownroute.hisownroute !== namespace0')
       //return next(new Error('Authentication failed'));

     //return res.status(403).json({ message: 'Forbidden' });
   } else {
    console.log('authorization succes in io.use')
    return next();
   } 
} catch (error) {
    console.log('we are inside error in io.use')
}


  // Assuming you have a function to verify the token
  
  // if (isValidToken(token)) {
  //   return next();
  // }

  // If authentication fails, reject the connection
  //return next(new Error('Authentication failed'));
});

const usersList = {};
const updatedUsersList = {};

io.on('connection', (socket) => {
   console.log('ddddddddddddddddddddddddddddddddddddd')

  var namespace = socket.handshake.query.namespace0;
  console.log(namespace)

  console.log('connection : --------------------------------------------------')
  console.log(socket.handshake.query.username)
  console.log(socket.handshake.query.email)
  console.log(socket.handshake.query.email_to_display)

  if (!namespace){
    console.log('namesopace is undefiened!!!')
    return 'namespace is undefined!!!!!!!!!!!'
  }

  
  usersList[namespace]=[];
  updatedUsersList[namespace]=[];

  console.log(namespace)
  var namespace_without_tab = namespace.toString().replace('tab/','');
 
    console.log(io.engine.clientsCount)
    socket.join(namespace);

  //  socket.on('joinRoom', (room) => {
  //    socket.join(room);
  //    console.log(`User joined room: ${room}`);
//    });

    //console.log('socket after joining the room : ')
    //console.log(socket.rooms)



    const socketsInRoom = io.of(`/${namespace}`).sockets;
    console.log('socketsInRoom')
    console.log(socketsInRoom)

    console.log(io.sockets.adapter.rooms);
    console.log(io.sockets.adapter.rooms.get(namespace));

    const socketsInTargetRoom = io.sockets.adapter.rooms.get(namespace);

if (socketsInTargetRoom) {
  // Iterate over the socket IDs in the target room
  socketsInTargetRoom.forEach((socketId) => {
    console.log('inside ForEACHHHHH :')
    console.log(socketId)
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
      console.log('**********************************')
      console.log(`ussd74kasd75_2: ${socket.handshake.query.username}`);
      console.log(`email: ${socket.handshake.query.email}`);
      console.log(`email_to_display: ${socket.handshake.query.email_to_display}`);

      //***usersList[namespace].push(socket.handshake.query.email)
      usersList[namespace].push(socket.handshake.query.email_to_display)
      
      // Add email to your usersList arrayf
    }
  });
} else {
  console.log(`Room ${namespace} not found!!`);
}


  console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGaaGMMMMMMMaMMMMMMMMMMMMMMsMMMpmmpMmmMMMMsMMMM')
    
  const username_from_query = socket.handshake.query.username;
  const email_from_query = socket.handshake.query.email;
  const email_from_query_to_display = socket.handshake.query.email_to_display;


  io.to(namespace).emit('listingusers',usersList[namespace])
      
    console.log(username_from_query)
    console.log(email_from_query)
    console.log(usersList)
    console.log(usersList[namespace])

    
    socket.on('subscribeToListingUsers', () => {
      // Send the current user list to the newly reconnected user!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      socket.join(namespace);
      io.to(namespace).emit('listingusers', usersList[namespace]);
    });

    socket.on('change_numericformat',([data1,data2])=>{
      socket.join(namespace)
      //io.to(namespace).emit('change_numericformat',data)
      //socket.broadcast.emit('inputUpdated', data);
      socket.broadcast.to(namespace).emit('change_numericformat',[data1,data2])

    })

    socket.on('afterchange_data_socket_event',(receving_data_from_socket_clientside)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('updateData_socket_event',receving_data_from_socket_clientside);
    })

    socket.on('afterchange_data_socket_event_edit',(receving_data_from_socket_clientside)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('updateData_socket_event_edit',receving_data_from_socket_clientside);
    })

    socket.on('afterchange_data_socket_event_CopyPaste.paste',(receving_data_from_socket_clientside)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('updateData_socket_event_CopyPaste.paste',receving_data_from_socket_clientside);
    })

    socket.on('afterchange_data_socket_event_Autofill.fill',(receving_data_from_socket_clientside)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('updateData_socket_event_Autofill.fill',receving_data_from_socket_clientside);
    })

    socket.on('afterchange_data_socket_event_UndoRedo.undo',(receving_data_from_socket_clientside)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('updateData_socket_event_UndoRedo.undo',receving_data_from_socket_clientside);
    })

    socket.on('afterchange_data_socket_event_UndoRedo.redo',(receving_data_from_socket_clientside)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('updateData_socket_event_UndoRedo.redo',receving_data_from_socket_clientside);
    })

    /*
    socket.on('undo_click_triggering' , (input)=> {
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('getting_undo_click',input);
    })

    socket.on('redo_click_triggering' , (input)=>{
      socket.join(namespace);
      socket.broadcast.to(namespace).emit('getting_redo_click',input);
    })
  */
 
    socket.on('disconnect', () => {
      updatedUsersList.namespace = usersList[namespace].filter(user => user !== email_from_query_to_display);
      io.to(namespace).emit('listingusers',updatedUsersList[namespace]);
      console.log('User disconnected');
  
    });

  


});


//app.listen(5000,()=>{
server.listen(5000,()=>{
  console.log('server listend to the port 5000')
})

