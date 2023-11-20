// Function to extract the value of a specific cookie
const getCookieValue = (cookieString, cookieName) => {
  console.log('cookiesString :')
  console.log(cookieString)
    const cookies = cookieString.toString().split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return value;
      }
    }
    return null; // Return null if the cookie is not found
  };
  module.exports = {getCookieValue}