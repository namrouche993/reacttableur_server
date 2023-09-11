const users = require('./users'); // Import the users array from users.js
  
function authenticate(req, res, next) {
 
    const { username, password } = req.body;  
    // Check if the username and password match any user in the database
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      //return res.redirect('/profile_fake');
      res.status(401).send('Authentication failed. Please provide valid credentials.');
    }
  
    // If authentication is successful, store the user object in the request for future use
    req.user = user;
  
    next(); // Proceed to the next middleware or route handler
  }
  module.exports = authenticate
  