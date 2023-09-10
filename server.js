const express = require('express')
const app = express()

var things = require('./things.js');
app.use('/things', things);

app.get('/', function(req, res){
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
    // http://localhost:5000/things/nadjib/48
 });
 
 //Other routes here
app.get('*', function(req, res){   // 404 page 
    res.send('Sorry, this is an invalid URL.');
 });
 

 
app.listen(5000,()=>{
    console.log('server listend to the port 5000')
})