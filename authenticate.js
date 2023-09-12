const {organisme_data,region_data} = require('./users'); // Import the users array from users.js

const isValidEmail = (value) => {
  // Simple email validation using a regular expression
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(value){
    return emailPattern.test(value.toString().trim());
  }
  return false;
};

const isValidPhoneNumber = (value) => {
  // Simple phone number validation using a regular expression
  const phonePattern = /^\+?[\d\/\s()+\-_:]+$/;
  if(value){
     return phonePattern.test(value.toString().trim());
  }
  return false;
};

function authenticate(req, res, next) {
  console.log('we are in authenticate')
    const { organisme, region,email,phoneNumber } = req.body;
    console.log('organisme :')
    console.log(organisme)
    console.log(region)
    console.log(email)
    console.log(phoneNumber)

    // Check if the username and   password  match any user in the database
    const organisme_to_check = organisme_data.find(u => u.val === organisme);
    const region_to_check = region_data.find(u => u.matriculeregion === region);
    const email_check = isValidEmail(email);
    const phoneNumber_check = isValidPhoneNumber(phoneNumber);

    if (!organisme_to_check || !region_to_check || !email_check || !phoneNumber_check ) {
      res.status(401).send('Authentication failed. Please provide valid credentials.');
    }
  
    // If authentication is successful, store the user object in the request for future use
    req.user = { organisme, region,email,phoneNumber };
   

    next(); // Proceed to the next middleware or route handler
  }
  module.exports = authenticate
  