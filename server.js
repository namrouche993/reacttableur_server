const express = require('express')
const cors = require('cors'); // Import the cors package

const app = express()
app.use(express.json());

var things = require('./things.js');
const { sup , how }= require('./middle.js');
const {organisme_data,region_data} = require('./users'); // Import the users array from users.js
const authenticate  = require('./authenticate.js');

app.use(cors());
app.use(sup);
app.use('/things', things);
app.use(authenticate)


app.post('/register',authenticate, (req, res) => {
   console.log('we are in register')
   //const { username, password } = req.body;

   // Add the new user to your database or users array (in this case, we're simulating it)
   
   //users.push({ organisme, region , email , phoneNumber }); 
   //users={username,password};
   //console.log('users :')
   //console.log(users)
   
   res.status(201).send('User registered successfully');
 });


 app.get('/profile', (req, res) => {
   if (!req.user.organisme || !req.user.region || !req.user.organisme || !req.user.organisme) {
     return res.status(401).send('Authentication failed. Please provide valid credentials.');
   }
   
   res.send(`Welcome, ${req.user.email}! This is your profile.`);
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

app.get('/:id', function(req, res){
  res.send('The id you specified is ' + req.params.id + ' and you profile : ' + req.user.organisme);
});

app.get('*', function(req, res){   // 404 page 
  res.send('Sorry, this is an invalid URL.');
});






app.listen(5000,()=>{
    console.log('server listend to the port 5000')
})