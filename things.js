var express = require('express'); // aa
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});

router.get("/api",(req,res)=>{
    res.json({ "usersOfThinhs" : ["userOneT","userTwoT","userThreeT"]  })
})


//export this router to use in our index.js
module.exports = router;