const express = require('express')
const app = express()
app.use(express.json());

var things = require('./things.js');
const { sup , how }= require('./middle.js');
const users = require('./users'); // Import the users array from users.js
const authenticate  = require('./authenticate.js');


app.use(sup);
app.use('/things', things);
app.use(authenticate)


app.post('/register', (req, res) => {
   const { username, password } = req.body; 
   // Add the new user to your database or users array (in this case, we're simulating it)
   users.push({ username, password }); 
   //res.status(201).send('User registered successfully');
 });


 app.get('/profile', authenticate, (req, res) => {
   if (!req.user) {
     return res.status(401).send('Authentication failed. Please provide valid credentials.');
   }
   
   res.send(`Welcome, ${req.user.username}! This is your profile.`);
 });
  
 

app.get('/', function(req, res){
    console.log('im in app get / ');
    res.send("Hello world!");
 });

app.get("/api",(req,res)=>{
    res.json({ "users" : ["userOne","userTwo","userThree"]  })
})

 app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
 });

 app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

 app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
    //http://localhost:5000/things/nadjib/45
 });
 
 //Other routes here
app.get('*', function(req, res){   // 404 page 
    res.send('Sorry, this is an invalid URL.');
 });
 

 
app.listen(5000,()=>{
    console.log('server listend to the port 5000')
})