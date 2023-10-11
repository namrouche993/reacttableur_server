const express = require('express')
const cors = require('cors'); // Import the cors package
const os = require('os');
const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');
const secretKey = '425cac990d726cd10669e2957c6f2ebef6e2b1f4f61dffc011c7327e73031620'; // Replace with your actual secret key
//const nodefetch = require('node-fetch'); //nodefetch


//const fetch = import('node-fetch').then(module => module.default);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const RECAPTCHA_SECRET_KEY = '6LfIgpAoAAAAAKPs3UkRBQXxMhKHFS8BCQnLbj49';


var bodyParser = require('body-parser')
const requestIp = require('request-ip');
const generateRandomString = require('./Tools/Randst_server');
const {isValidEmail,isValidPhoneNumber} = require('./Tools/IsValid');
const app = express()

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000',credentials: true}));  // Use the cors middleware
app.use(bodyParser.json());
app.use(cookieParser());

//var things = require('./things.js');
//const { sup , how }= require('./middle.js');

const {organisme_data,region_data} = require('./users'); // Import the users array from users.js
const authenticate  = require('./authenticate.js');


//app.use(requestIp.mw());
//app.use(sup);
//app.use('/things', things);


mongoose.connect('mongodb://localhost/mydatabasetableur', {
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


const updateByUsername = async (username, newData) => {
  try {
    const updatedUser = await MyModelMongoose.findOneAndUpdate(
      { idusername: username },
      { $set: {dataa: newData}},
    );

    if (updatedUser) {
      //console.log('User updated:', updatedUser); 
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};


app.post('/register',authenticate, (req, res) => {
   console.log('we are in register')
   //const { username, password } = req.body;
   
   //res.status(201).send('User registered successfully');;
 });

 app.post('/beacondata',express.json(), express.text(), (req, res) => {
  // Handle the received data
  console.log('req.body :')

  const receivedData = JSON.parse(req.body.jsonData_whenclosed); //JSON.parse(req.body) ;!!
  const receivedUsername = req.body.idusername00;

  console.log('httponly cookie :')
  const myCookie_token = req.cookies['jwtTokentableur'];  // Replace 'myCookieName' with your actual cookie name
  
  const decoded = jwt.verify(myCookie_token, secretKey);
  console.log('decoded :');
  console.log(decoded);
  console.log(receivedUsername)

  if (decoded.idusername_from_generated !== receivedUsername) {
    console.log('we are inside decoded.idusername_from_generated !== idusername')
    return res.status(403).json({ message: 'Forbidden' });
  }


  // console.log('ddatafct_verify : ')
  // console.log(ddatafct_verify(last_row_after_header,receivedData));

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
  updateByUsername(decoded.idusername_from_generated, receivedData2);


  // Respond with a success message
  res.status(200).send('Data received successfully.');
});



app.post('/api/saveData',(req,res)=>{
  const { datar_received } = req.body ;
  console.log('data received succesfully ! ')
  console.log(datar_received)
  res.status(201).send('Data received successfully');
});

app.post('/api/ownenter', async (req, res) => {
  console.log('we are in api/ownenter  ::: ')
  const {ownroute} = req.body;
  //console.log(ownroute)
  var user_by_route = await MyModelMongoose.findOne({"hisownroute":ownroute});
  const myCookie_token = req.cookies['jwtTokentableur'];  //// */ Replace 'myCookieName' with your actual cookie name
  console.log(myCookie_token);
  //console.log(user_by_route);

  if(!user_by_route){
    console.log('1cond')
    res.status(400).send('Authentication failed !!!.');
  } else if(user_by_route.token !== myCookie_token){
    console.log('2cond')
    res.status(401).send('Authentication failed !!!.');
  } else {
    console.log('3cond')
    res.json({"organisme":user_by_route.organisme,"region":user_by_route.region})
  }
});

app.post('/api/enter', async (req, res) => {
  //const {act_data,idusername} = req.body;;
  
  //const {idusername,data_now} = req.body;
  const {idusername} = req.body;

  console.log('we are in api/enter : ')
  console.log('idusername :');
  console.log(idusername);

  const myCookie_token_in_enter = req.cookies['jwtTokentableur'];  /// Replace 'myCookieName' with your actual cookie name
  
  if(myCookie_token_in_enter!==undefined && myCookie_token_in_enter!==null){
    console.log('first cond')
    const decoded_in_enter = jwt.verify(myCookie_token_in_enter, secretKey);
    console.log(decoded_in_enter)
    console.log(decoded_in_enter.idusername_from_generated);
    console.log(idusername);
    if (decoded_in_enter.idusername_from_generated == idusername && idusername!==null) {
      //if(data_now){
        
        /*
        console.log('we update the data when etnering :')
        const updatedUser = await MyModelMongoose.findOneAndUpdate(
          { idusername: idusername },
          { $set: {dataa: data_now}},
        );
        */
        var user_in_enter = await MyModelMongoose.findOne({"idusername":idusername})
        console.log(user_in_enter);
        console.log(user_in_enter.hisownroute);
        var user_own_route = 'tab/'+user_in_enter.hisownroute
        res.json({"hisownroute": user_own_route});
      //}
      console.log('second cond');
      //res.status(201).send('User registered successfully');
    } else {
      console.log('third cond')
      res.status(401).send('Authentication failed. Please provide valid credentials.');
    }
  } else {
    console.log('fourth cond')
    res.status(401).send('Already entered.');
  }
  
});

app.post('/api/login', async (req, res) => {
  console.log('we will call api/login nnnnnnnnnnnnnnnnnnnnnnn'); //aa
  const tokenRecaptcha = req.body.recaptchaToken;
  console.log('tokenRecaptcha :')
  console.log(tokenRecaptcha)
  
  const verifyUrlRecaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${tokenRecaptcha}`;
  console.log(verifyUrlRecaptcha);
 
  try {
    const responseRecaptcha = await fetch(verifyUrlRecaptcha, { method: 'POST' });
    const dataRecaptcha = await responseRecaptcha.json();

    if (dataRecaptcha.success) {
      //res.status(200).json({ success: true, message: 'reCAPTCHA verification successful' });

      const { organisme, region,email,phoneNumber } = req.body;
      var idusername_from_generated = generateRandomString(14);
      console.log(idusername_from_generated)
      var dataa_inital = retreived_data;
    
      const organisme_to_check = organisme_data.find(u => u.val === organisme);
      const region_to_check = region_data.find(u => u.matriculeregion === region);
      const email_check = isValidEmail(email);
      const phoneNumber_check = isValidPhoneNumber(phoneNumber);
    
      if (!organisme_to_check || !region_to_check || !email_check || !phoneNumber_check ) {
        res.status(401).send('Authentication failed. Please provide valid credentials.');
      } else {
          //const { idusername,dataa } = req.body;//!!
      
      //const mymodfind = MyModelMongoose.find({});
      //console.log('mymodfind : ')
      //console.log(mymodfi  nd)!!
    
      
      try {
      
      // Create a JWT token with the user's username
      const token = jwt.sign({ idusername_from_generated }, secretKey);
      console.log(token);
    
      var hisownroute = generateRandomString(25).toLowerCase();
      //const hisownroute = jwt.sign({idusername_from_generated,email,region,phoneNumber})
    
        const newRecord = new MyModelMongoose({
          "idusername":idusername_from_generated,
          "dataa":dataa_inital,
      
          "organisme":organisme,
          "region":region,
          "email":email,
          "phoneNumber":phoneNumber,
          "hisownroute":hisownroute,
          "token":token
        });
        //newRecord.save();
        
        await newRecord.save();
        //const savedItem = await newRecord.save();
        //res.json(savedItem);
    
        res.cookie('jwtTokentableur', token, { httpOnly: true,  maxAge: 8640000000 });
        res.json({"idusername_to_client_side":idusername_from_generated,"hisownroute":hisownroute});
        console.log('after resjson');
          
      
      } catch (error) {
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


app.get('/api/:ownroute', function(req, res) {
   res.send('own route : ' + req.params.ownroute);
   //http://localhost:5000/things/nadjib/45
});

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

