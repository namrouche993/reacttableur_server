const express = require('express')
const cors = require('cors'); // Import the cors package
const os = require('os');
const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = '425cac990d726cd10669e2957c6f2ebef6e2b1f4f61dffc011c7327e73031620'; // Replace with your actual secret key


var bodyParser = require('body-parser')
const requestIp = require('request-ip');

const app = express()
app.use(express.json());

//var things = require('./things.js');
//const { sup , how }= require('./middle.js');

const {organisme_data,region_data} = require('./users'); // Import the users array from users.js
const authenticate  = require('./authenticate.js');

app.use(cors());
app.use(bodyParser.json());

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



app.post('/register',authenticate, (req, res) => {
   console.log('we are in register')
   //const { username, password } = req.body;
   
   //res.status(201).send('User registered successfully');
 });


 app.get('/profile',authenticate, (req, res) => {
   res.send(`Welcome, ${req.user.email}! This is your profile.`);
 });

 

app.post('/api/login', (req, res) => {
  console.log('we will call api/login nnnnnnnnnnnnnnnnnnnnnnn')
  const { idusername,dataa } = req.body;
  const mymodfind = MyModelMongoose.find({});
  console.log('mymodfind : ')
  //console.log(mymodfi nd)
  const newRecord = new MyModelMongoose({
    "idusername":idusername,
    "dataa":dataa
  });
  newRecord.save();
  
  // Create a JWT token with the user's username
  const token = jwt.sign({ idusername }, secretKey);
  console.log(token)

  res.json({ token });
});


const authorizeUser = (req, res, next) => {
  console.log('authorizeUser');
  const token = req.header('Authorization');
  console.log(token);
  const idusername = req.params.idusername;
  console.log(idusername)

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('decoded :')
    console.log(decoded)
    if (decoded.idusername !== idusername) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};


app.get("/api/:idusername", authorizeUser , async (req,res)=>{
  try {
    console.log('we are in api:username')
    const idusername = req.params.idusername;
    console.log(idusername); 
    const datamymodelget = await MyModelMongoose.find({idusername: req.params.idusername});
    res.json(datamymodelget);
    console.log(datamymodelget)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

   //res.json({ "users" : ["userOne","userTwo","userThree"]  })
})

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