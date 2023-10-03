const express = require('express')
const cors = require('cors'); // Import the cors package
const os = require('os');
const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');
const secretKey = '425cac990d726cd10669e2957c6f2ebef6e2b1f4f61dffc011c7327e73031620'; // Replace with your actual secret key


var bodyParser = require('body-parser')
const requestIp = require('request-ip');
const generateRandomString = require('./Randst_server.js');

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
const ddatafct_verify = require('./Hot_validators/data_to_verify.js')


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
   
   //res.status(201).send('User registered successfully');
 });

 app.post('/beacondata',express.json(), express.text(), (req, res) => {
  // Handle the received data
  console.log('req.body :')

  const receivedData = JSON.parse(req.body.jsonData_whenclosed); //JSON.parse(req.body) ;
  const receivedUsername = req.body.idusername;

  console.log('httponly cookie :')
  const myCookie_token = req.cookies['jwtToken2'];  // Replace 'myCookieName' with your actual cookie name
  console.log(myCookie_token);

  const decoded = jwt.verify(myCookie_token, secretKey);
  console.log('decoded :');
  console.log(decoded);

  if (decoded.idusername !== receivedUsername) {
    console.log('we are inside decoded.idusername !== idusername')
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

  updateByUsername(decoded.idusername, receivedData);


  // Respond with a success message
  res.status(200).send('Data received successfully.');
});



app.post('/api/saveData',(req,res)=>{
  const { datar_received } = req.body ;
  console.log('data received succesfully ! ')
  console.log(datar_received)
  res.status(201).send('Data received successfully');
});


app.post('/api/login', (req, res) => {
  console.log('we will call api/login nnnnnnnnnnnnnnnnnnnnnnn')
  const { idusername,dataa } = req.body;
  const mymodfind = MyModelMongoose.find({});
  console.log('mymodfind : ')
  //console.log(mymodfi  nd )
  const newRecord = new MyModelMongoose({
    "idusername":idusername,
    "dataa":dataa
  });
  newRecord.save();
  
  // Create a JWT token with the user's username
  const token = jwt.sign({ idusername }, secretKey);
  console.log(token);
  console.log('we will call res.cookie');
  res.cookie('jwtToken2', token, { httpOnly: true,  maxAge: 8640000000 });
  console.log(req.cookies['jwtToken2'])
  //res.cookie('cookie_name', 'cookie_value');  
  // res.json({ token });
});



// authorizeUser is in separated file

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});


app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name );
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


