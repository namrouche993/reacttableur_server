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

//const nodefetch = require('node-fetch'); //nodefetch


//const fetch = import('node-fetch').then(module => module.default);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const RECAPTCHA_SECRET_KEY = '6LfIgpAoAAAAAKPs3UkRBQXxMhKHFS8BCQnLbj49';
const RECAPTCHA_ADD_SECRET_KEY = '6LfZqc0oAAAAAPAXdYC8Uc9UJtp7UANML0N6M-FR';
const RECAPTCHA_ACCESS_SECRET_KEY = '6LcPEtIoAAAAANNWLHaXXYdtBrkeRh2k8Nc6YBmV';


var bodyParser = require('body-parser')
const requestIp = require('request-ip');
//const generateRandomString = require('./Tools/Randst_server');

const {isValidEmail,isValidPhoneNumber} = require('./Tools/IsValid');
const app = express()

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000',credentials: true}));  // Use the cors middleware!!!!!!
app.use(bodyParser.json());
app.use(cookieParser());

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
const {ddatafct_verify , retreived_data} = require('./Hot_validators/data_to_verify.js')



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
          { "users.user2.idusername": username },
          { "users.user3.idusername": username }
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
      //console.log('User updated:', updatedUser); 
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

const update_to_add_user = async (email_owner, new_email_of_user,myCookie_token_in_add) => {
    console.log('essai pass returning value :')
    console.log('*****************------------------------ ! 00')
   // console.log(generateRandomString(6).toLocaleUpperCase().toString())

    try {
      const filter = {
        "users.user1.email": email_owner,
        "users.user1.token":myCookie_token_in_add
      };
    
      // Find the document that matches the filter
      const document = await MyModelMongoose.findOne(filter);
    
      if (document && document.users) {
        if(!document.users.user2 && !document.users.user3){
          var idusername_from_generated = generateRandomString(14,false);
          var codepass = crypto.randomInt(10000000, 99999999);

        // Perform an update if user2 exists
        var update = {
          $set: {
            "users.user2.idusername": idusername_from_generated,
            "users.user2.email": new_email_of_user,
            "users.user2.token": jwt.sign({ idusername_from_generated }, secretKey),
            "users.user2.owner": false,
            "users.user2.pass": codepass,
            // Add more fields or update operations as needed
          }
        }
      } else if(!document.users.user2 && document.users.user3){
          var idusername_from_generated = generateRandomString(14,false);
          var codepass = crypto.randomInt(10000000, 99999999);

          console.log('user2 no and user3 yes')

        // Perform an update if user2 exists
        var update = {
          $set: {
            "users.user2.idusername": idusername_from_generated,
            "users.user2.email": new_email_of_user,
            "users.user2.token": jwt.sign({ idusername_from_generated }, secretKey),
            "users.user2.owner": false,
            "users.user2.pass": codepass,
            // Add more fields or update operations as needed
          }
        }
      } else if (document.users.user2 && !document.users.user3){
        var idusername_from_generated = generateRandomString(14,false);
        var codepass = crypto.randomInt(10000000, 99999999);

        var update = {
          $set: {
            "users.user3.idusername": idusername_from_generated,
            "users.user3.email": new_email_of_user,
            "users.user3.token": jwt.sign({ idusername_from_generated }, secretKey),
            "users.user3.owner": false,
            "users.user3.pass": codepass,
            // Add more fields or update operations as needed
          }
        };
      } else {
        console.log('user2 and user3 existed , so do nothing')
        return false
        //return res.status(401).send('Add to list is limited !!!.');
      }
    
        // Perform the update using findOneAndUpdate
        const updatedDoc = await MyModelMongoose.findOneAndUpdate(filter, update, { new: true });
    
        if (updatedDoc) {
          console.log("Document updated:");
          console.log(updatedDoc.users)
          console.log(updatedDoc.users.user2)
          return codepass
        } else {
          console.log("Document not updated.");
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


app.post('/register',authenticate, (req, res) => {
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
  console.log('receivedUsername')
  console.log(receivedUsername)

  console.log('httponly cookie :')
  const myCookie_token = req.cookies['jwtTokentableur'];  // Replace 'myCookieName' with your actual cookie name
  console.log(myCookie_token)
  console.log('receivedData')
  console.log(receivedData)
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

} catch (error) {
 console.log('error : ' + error) 
}
});



app.post('/tab/saveData',(req,res)=>{
  const { datar_received } = req.body ;
  console.log('data received succesfully ! ')
  console.log(datar_received)
  res.status(201).send('Data received successfully');
});

app.post('/tab/ownenter', async (req, res) => {
  console.log('we are in tab/ownenter  ::: ')
  const {ownroute} = req.body;
  //console.log(ownroute)
  var user_by_route = await MyModelMongoose.findOne({"hisownroute":ownroute});
  var userr = await MyModelMongoose.findOne({"phoneNumber_owner":"077775566"})
  //console.log(userr.dataa)
  console.log('userr')
  console.log('user_by_route')
  //console.log(user_by_route);!!!
  
  console.log('********************************');
  console.log('********************************');
  console.log('********************************');

  
  const myCookie_token = req.cookies['jwtTokentableur'];  //// */ Replace 'myCookieName' with your actual cookie name//
  console.log(myCookie_token);
  //console.log(user_by_route);

console.log('we will enter in try')
  try {
      console.log('enter in try')
  if(!user_by_route){
    console.log('1cond')
    res.status(400).send('Authentication failed !!!.');
  } else {
    console.log('2cond')

    if(myCookie_token){
      console.log('3cond')
      const decoded_in_ownenter = jwt.verify(myCookie_token, secretKey);
      console.log('decoded_in_ownenter')
     // console.log(decoded_in_ownenter)
    if (
    user_by_route.users.user1.token == myCookie_token && user_by_route.users.user1.idusername==Object.values(decoded_in_ownenter)[0] || //decoded_in_ownenter.newidusername
    user_by_route.users.user2.token == myCookie_token && user_by_route.users.user2.idusername==Object.values(decoded_in_ownenter)[0] || //decoded_in_ownenter.newidusername
    user_by_route.users.user3.token == myCookie_token && user_by_route.users.user3.idusername==Object.values(decoded_in_ownenter)[0]  //decoded_in_ownenter.newidusername
    ) {
    console.log('4cond')
    //console.log(user_by_route.dataa)
   // console.log(user_by_route.dataa)
    console.log(user_by_route.phoneNumber_owner)
    res.json({"organisme":user_by_route.organisme,
              "region":user_by_route.region,
             "dataa":user_by_route.dataa})
  } else {
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
  res.status(401).send('Authentication failed !!!.');   
}
});

app.post('/tab/enter', async (req, res) => {
  //const {act_data,idusername} = req.body;;
  
  //const {idusername,data_now} = req.body;
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
        var user_in_enter = await MyModelMongoose.findOne({
          //{"idusername":idusername}
          $or: [
            { "users.user1.idusername": idusername },
            { "users.user2.idusername": idusername },
            { "users.user3.idusername": idusername }
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
  console.log('tokenRecaptcha :')
  console.log(tokenRecaptcha)
  
  const verifyUrlRecaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${tokenRecaptcha}`;
  console.log(verifyUrlRecaptcha);
 
  try {
    const responseRecaptcha = await fetch(verifyUrlRecaptcha, { method: 'POST' });
    const dataRecaptcha = await responseRecaptcha.json();
    console.log('dataRecaptcha:')
    console.log(dataRecaptcha)

    if (dataRecaptcha.success) {
      //res.status(200).json({ success: true, message: 'reCAPTCHA verification successful' });

      const { organisme, region,email,phoneNumber } = req.body;
      var idusername_from_generated = generateRandomString(14,false);
      console.log(idusername_from_generated)
      var dataa_inital = retreived_data;
    
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
    
      var hisownroute = generateRandomString(25,false).toLowerCase();
      //const hisownroute = jwt.sign({idusername_from_generated,email,region,phoneNumber})
      console.log('hisownroute:')
      console.log(hisownroute);

        const newRecord = new MyModelMongoose({
          "users.user1.idusername":idusername_from_generated,
          "dataa":dataa_inital,
      
          "organisme":organisme,
          "region":region,
          "users.user1.email":email,
          "phoneNumber_owner":phoneNumber,
          "hisownroute":hisownroute,
          "users.user1.token":token,
          "users.user1.owner":true,
          "users.user1.pass":generateRandomString(6,true) // maybe editable when changing string to numbers
        });
        console.log('newRecord before:')
        console.log(newRecord)
        //newRecord.save();
        
        console.log('we will make await newrecord.save')
        await newRecord.save();
        console.log('we did await newrecord.save')

        //const savedItem = await newRecord.save();
        //res.json(savedItem);

        console.log('newRecord after Save:')
        console.log(newRecord)
    
        res.cookie('jwtTokentableur', token, { httpOnly: true,  maxAge: 8640000000 });
        res.json({"idusername_to_client_side":idusername_from_generated,"hisownroute":hisownroute});
        console.log('after resjson');
          
      
      } catch (error) {
        console.log('catch error ')
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

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});

app.post('/acc/accessfromurlem',async (req, res) => {
    console.log('we are in acc/accessfromurlem  ::: ')
    const {email} = req.body;
    console.log(email)
    if(!isValidEmail(email)){
      res.status(400).send('Authentication failed !!!.');
    } else {
    var email_in_db = await MyModelMongoose.findOne({
      //"email":email
      $or: [
        { "users.user1.email": email },
        { "users.user2.email": email },
        { "users.user3.email": email }
      ]
    
    });
    console.log('email_in_db')
    //console.log(email_in_db);

      
  if (email_in_db) {
    console.log('we are in emailindb')
    if(email_in_db.users.user1){
      console.log('we are in emailindb users.user1')
      if (email_in_db.users.user1.email === email) {
        var findemailinFields = email_in_db.users.user1;

        res.status(200).json({'idusername_to_client_side':email_in_db.users.user1.idusername,
                              'email':email_in_db.users.user1.email});

        console.log('Email found in users.user1.email');
      } 
      else if(email_in_db.users.user2){
        console.log('we are in emailindb users.user2')
        if (email_in_db.users.user2.email === email) {
          var findemailinFields = email_in_db.users.user2;
          console.log('Email found in users.user2.email');
          res.status(200).json({'idusername_to_client_side':email_in_db.users.user2.idusername,
          'email':email_in_db.users.user2.email});

        }
        else if(email_in_db.users.user3){
          console.log('we are in emailindb users.user3')
          if (email_in_db.users.user3.email === email) {
            var findemailinFields = email_in_db.users.user3;
            res.status(200).json({'idusername_to_client_side':email_in_db.users.user3.idusername,
            'email':email_in_db.users.user3.email});

            console.log('Email found in users.user3.email');
          } else {
            console.log('findemailinFields will be null')
            var findemailinFields =null      
          }
        }
      }
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
  const {email,pinCode,recaptchaTokenAccess} = req.body;
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
    $or: [
      { "users.user1.email": email },
      { "users.user2.email": email },
      { "users.user3.email": email }
    ]
  
  });
  console.log('email :')
  console.log(email);


  if (email_in_db) {
    console.log('we are in emailindb')
    if(email_in_db.users.user1){
      console.log('we are in emailindb users.user1')
      if (email_in_db.users.user1.email === email) {
        var findpassinFields = email_in_db.users.user1;
        console.log('Email found in users.user1.email');
      } 
      else if(email_in_db.users.user2){
        console.log('we are in emailindb users.user2')
        if (email_in_db.users.user2.email === email) {
          var findpassinFields = email_in_db.users.user2;
          console.log('Email found in users.user2.email');
        }
        else if(email_in_db.users.user3){
          console.log('we are in emailindb users.user3')
          if (email_in_db.users.user3.email === email) {
            var findpassinFields = email_in_db.users.user3;
            console.log('Email found in users.user3.email');
          } else {
            console.log('findpassinFields will be null')
            var findpassinFields =null      
          }
        }
      }
    }
  }

  console.log('we are before condition of !email_in_db');
  //console.log(email_in_db.users)
  console.log(findpassinFields)
  console.log(pinCode)
  console.log(pinCodenotArray);
  console.log(findpassinFields.pass);
  console.log(email_in_db.users.user2);


  if(!email_in_db){
    console.log('1cond')
    res.status(401).send('Authorization failed !!!.');
  } else if (findpassinFields==null) {
    res.status(401).send('Authorization failed !!!!!!.');
  } else if(findpassinFields.pass==pinCodenotArray) { // editable later
    console.log('we are in email existed !!')
    res.cookie('jwtTokentableur', findpassinFields.token, { httpOnly: true,  maxAge: 8640000000 });

    res.status(200).json({
    'idusername_to_client_side':findpassinFields.idusername,
    'email':findpassinFields.email,
    'phoneNumber_owner':email_in_db.phoneNumber_owner,
    'organisme':email_in_db.organisme,
    'region':email_in_db.region,
    'dataa':email_in_db.dataa,
    'hisownroute':email_in_db.hisownroute
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

  const {idusername} = req.body;
  const myCookie_token_in_allowedemails = req.cookies['jwtTokentableur'];  ///  Replace 'myCookieName' with your actual cookie name::!!!!

  if(myCookie_token_in_allowedemails!==undefined && myCookie_token_in_allowedemails!==null){
    const decoded_in_allowedemails = jwt.verify(myCookie_token_in_allowedemails, secretKey);

    if (Object.values(decoded_in_allowedemails)[0] == idusername && idusername!==null) {
      console.log('we are in the 200 request in allowedemails')
      var user_by_his_allowedemails = await MyModelMongoose.findOne({"users.user1.idusername":idusername});
      
      console.log('user_by_his_allowedemails : ')
      //console.log(user_by_his_allowedemails)
      var his_allowedemails2 = null;
      var his_allowedcode2 = null;

      var his_allowedemails3 = null;
      var his_allowedcode3 = null;

      if(user_by_his_allowedemails){
        
      if( typeof user_by_his_allowedemails.users.user2 !== 'undefined' ){
        var his_allowedemails2 = user_by_his_allowedemails.users.user2.email;
        var his_allowedcode2 = user_by_his_allowedemails.users.user2.pass;
      } else {
        var his_allowedemails2 = null;
        var his_allowedcode2 = null;
      }
    

      if(typeof user_by_his_allowedemails.users.user3 !== 'undefined'){
        var his_allowedemails3 = user_by_his_allowedemails.users.user3.email;
        var his_allowedcode3 = user_by_his_allowedemails.users.user3.pass;

      } else {
        var his_allowedemails3 = null;
        var his_allowedcode3 = null;

      }
    }
      //var his_allowedemails3 = user_by_his_allowedemails.users.user3.email;
      res.status(200).json({"user2":{"useremail": his_allowedemails2,"code":his_allowedcode2},  "user3":{"useremail":his_allowedemails3,"code":his_allowedcode3}   } );
    } else {
      res.status(401).send('Authorization failed !!!.');
    }
  } else {
    res.status(401).send('Authorization failed !!!.');

  }

})

app.post('/add',async (req, res) => {
  console.log('we are add  ::: ')
  const {email_owner,username_owner,new_email_added,recaptchaToken_add} = req.body;
  console.log(email_owner)
  console.log(recaptchaToken_add)
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
      if(!isValidEmail(email_owner) || !isValidEmail(new_email_added)){
        console.log('valie email failed owner or new')
        res.status(400).send('Authentication failed !!!.');
      } else if(Object.values(decoded_add)[0] !== username_owner){
        console.log('decoded verification failed')

        res.status(401).send('Authentication incorrect !!!.');
      } else {
        console.log('add part success')
        var updatetoadduser = await update_to_add_user(email_owner,new_email_added,myCookie_token_in_add);
        updatetoadduser
        console.log('updatetoadduser !!!!!!!!!!!!!!!!!!!!!!!')
        console.log(updatetoadduser)
        if(updatetoadduser==false){
          res.status(401).send('Adding to list is limited !!!.');
        }
        console.log('we will continue to resstatus200 :')
        console.log(new_email_added);
        res.status(200).json({'inputEmail':new_email_added,"codepass":updatetoadduser});
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

  const {emailremoved,idusername} = req.body;
  const myCookie_token_in_removedemail = req.cookies['jwtTokentableur'];  /// Replace 'myCookieName' with your actual cookie name::!!!!

  if(myCookie_token_in_removedemail!==undefined && myCookie_token_in_removedemail!==null){
    const decoded_in_removedemail = jwt.verify(myCookie_token_in_removedemail, secretKey);

    if (Object.values(decoded_in_removedemail)[0] == idusername && idusername!==null) {
      console.log('we are in the 200 request in removedemail')
     try{
      const foundDoc = await MyModelMongoose.findOne({
        $or: [
          { 'users.user2.email': emailremoved },
          { 'users.user3.email': emailremoved }
        ]
      });
      console.log('**************')
      //console.log(foundDoc.users)
      
      if (foundDoc) {
        var unsetField = foundDoc.users.user2 ? (foundDoc.users.user2.email === emailremoved ? 'users.user2' : 'users.user3') : (foundDoc.users.user3 ? (foundDoc.users.user3.email === emailremoved ? 'users.user3' : null) : null  )   ;
      console.log('unsetField :')
      console.log(unsetField);

        if(unsetField){
        // Now update the document to unset the field determined above
        const updatedDoc_removed = await MyModelMongoose.findOneAndUpdate(
          { _id: foundDoc._id }, // Assuming you have an _id field in your schema
          { $unset: { [unsetField]: 1 } },
          { new: true }
        );
      
        if (updatedDoc_removed) {
          console.log('Updated document:');
          res.status(200).send('Document updated');
        } else {
          console.log('Failed to update the document.');
          res.status(500).send('Failed to update the document');
        }
      } else {
        console.log('Document not found.');
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

app.get('/getdata',async (req,res)=>{
  try {
    
   console.log('we are in getdata :')
  console.log('*******************************---------------------------------************');
  console.log('*******************************---------------------------------************')
  console.log('*******************************---------------------------------************')
  console.log('*******************************---------------------------------************')
  console.log('*******************************---------------------------------************')

  var user_by_organisme = await MyModelMongoose.findOne({"hisownroute":"u9khl67j0k5lntqwp2arkfogv"}).lean();
  console.log(user_by_organisme)

  //var userfind = await MyModelMongoose.find({});
  //console.log(userfind[0])
  console.log('we will return status 200 in getdata ')
  res.status(200).json({'data00':user_by_organisme.dataa});
} catch (error) {
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






app.listen(5000,()=>{
    console.log('server listend to the port 5000')
})

