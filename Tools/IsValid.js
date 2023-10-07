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

  module.exports = {isValidEmail,isValidPhoneNumber}