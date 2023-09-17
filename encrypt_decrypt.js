const crypto = require('crypto');
const secretKey = '425cac990d726cd10669e2957c6f2ebef6e2b1f4f61dffc011c7327e73031620'; // Replace with your actual secret key

// Function to encrypt data
function encryptData(data) {
  const stringifiedData = JSON.stringify(data);
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encryptedData = cipher.update(stringifiedData, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

// Function to decrypt data
function decryptData(encryptedData) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
  
    // Attempt to parse the decrypted data as JSON
    let parsedData;
    try {
      parsedData = JSON.parse(decryptedData);
    } catch (error) {
      // If parsing fails, return the decrypted string as is
      return decryptedData;
    }
  
    return parsedData;
}

let val1 = [
    [7,4,65,12,6,7,8,412,"sdq",456,'sdq'],
    [7,4,65,12,6,7,8,412,"sgfddq",456,'sdq'],
    [7,4,65,1254,6,7,8456,412,"s456dq",456,'sdq'],
    [7,4,67895,12,6,7,8,412,"sdq",456,'s456dq'],
    [7,4,65,14562,6,7456,8,412,"sdq",456,'sdq'],
    [7,4,65,12,6,7,8,412,"sgfddq",456,'sdq'],
    [7,4,65,1254,6,7,8456,412,"s456dq",456,'sdq'],
    [7,4,65,12,6,7,8,412,"sgfddq",456,'sdq'],
    [7,4,'dsq',1254,6,7,8445656,412,"s456dq",456,'sdq'],
    [7,4,65,12,6,"dsqdsq",8,"dsqdsq","sgfddq",456,'sdq'],
    [7,4,65,1254,6,7,8456,412,"s456dq",456,'sdq'],
    [7,4,'dsq',1254,6,7,8445656,412,"s456dq",456,'sdq'],
    [7,4,65,12,6,"dsqdsq",8,"dsqdsq","sgfddq",456,'sdq'],
    [7,4,65,1254,6,7,84564456,412,"s456dq",456,'sdq'],
    [7,4,'dsq',12456454,6,7,8445656,412,"s456dq",456,'sdq'],
    [7,4,65,12,6,"dsqdsq",8,"dsqdsq","sgfdsqdsqddq",456,'sdq'],
    [7,4,65,1254564,6,7,8456,412,"s456dq",456,'sdq'],
    [7,4,'dsq',1254,6,7,8445656,412,"s456dq",456,'sdq'],
    [7,4,65,145642,6,"dsqdsq",8,"dsqdsq","sgfddq",456,'sdq'],
    [7,4,65,12456454,6,7,8456,412,"s4ezaeaz56dq",456,'sdq']


]
console.log('encrypt data of : val1 is : '  + encryptData(val1))
console.log('decrypt data of : encrypt(val1) is : '  + decryptData(encryptData(val1)))

module.exports = {encryptData,decryptData};

