const authorizeUser = (req, res, next) => {
    console.log('authorizeUser');
    //const token = req.header('Authorization');
    //console.log(token);
    
    const token = req.cookies.jwtToken;
    console.log(token);
  
    const idusername = req.params.idusername;
    console.log(idusername)
  
    if (!token) {
      console.log('we are inside !token')
      return res.status(401).json({ message: 'Access denied' });
    }
  
    try {
      console.log('we are inside try')
      console.log(token)
      const decoded = jwt.verify(token, secretKey);
      console.log('decoded :')
      console.log(decoded)
      if (decoded.idusername !== idusername) {
        console.log('we are inside decoded.idusername !== idusername')
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      console.log('we are inside catch error ')
      res.status(400).json({ message: 'Invalid token' });
    }
  };
  
  module.exports = authorizeUser;