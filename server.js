const express = require('express')
const cors = require('cors'); // Import the cors package
const os = require('os');
const fs = require('fs');
const mongoose = require('mongoose');


var bodyParser = require('body-parser')
const requestIp = require('request-ip');

const app = express()
app.use(express.json());

var things = require('./things.js');
//const { sup , how }= require('./middle.js');
const {organisme_data,region_data} = require('./users'); // Import the users array from users.js
const authenticate  = require('./authenticate.js');

app.use(cors());
app.use(bodyParser.json());

//app.use(requestIp.mw());

//app.use(sup);
app.use('/things', things);


//app.use(authenticat e)

console.log('os : ')
console.log(os.userInfo())

mongoose.connect('mongodb://localhost/mydatabasetableur', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mydb = mongoose.connection;
mydb.on('error',(error)=> console.error('Error connecting to MongoDB:', error));
mydb.once('open',() =>console.log('Connected to MongoDB'))
console.log('mydb :')
//console.log(mydb.collections)
let collection2 = mydb.collection("spreadsheet");
//console.log(collection2)
//console.log(collection2.find({}))

const MyModelMongoose = require('./MyModelMongooseFile.js')
var mongooseRouter = require('./mongooseRouter.js')


console.log('we will cal mongooserouter : ')
app.use('/mongooseRouter', mongooseRouter);



app.post('/register',authenticate, (req, res) => {
   console.log('we are in register')
   //const { username, password } = req.body;
   
   //res.status(201).send('User registered successfully');
 });


 app.get('/profile',authenticate, (req, res) => {
   res.send(`Welcome, ${req.user.email}! This is your profile.`);
 });

 app.post('/api/collectuserdata', (req, res) => {
  // Get the user's IP address from the request object
  const userIpAddress = req.ip;
  // You can also retrieve other information about the user if needed
  const userAgent = req.get('user-agent');
  // Log or process the user data as needed
  console.log('User IP Address:', userIpAddress);
  console.log('User Agent:', userAgent);

});

app.get('/api/regions', (req, res) => {
  console.log('a client was asking for the regions')
  res.json(organisme_data);
});
 


let savedData=null;
app.post('/api/saveData',(req,res)=>{
  const receivedData = req.body;
  // Handle storing the data (e.g., save to a database)
  savedData = receivedData;
  console.log('Received data from client and saved:', receivedData);
  console.log('yes ' + new Date())
  res.json({ message: 'Data received and saved successfully.' });
})

app.get('/api/getData', (req, res) => {
  console.log('fetching data from server app.get api getdata')
  console.log('ip address of the userrrr :')
  const userIp = req.clientIp; // Use req.clientIp instead
  console.log(userIp)
  res.json(savedData);
});


app.get("/api",(req,res)=>{
   res.json({ "users" : ["userOne","userTwo","userThree"]  })
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