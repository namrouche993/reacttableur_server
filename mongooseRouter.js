const express = require('express');
const MyModelMongoose = require('./MyModelMongooseFile.js')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('we will use await MyModelMongoose.find()')
    console.log(MyModelMongoose)
    const data = await MyModelMongoose.find({});
    res.json(data);
    console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define other routes and CRUD operations using MyModelMongoose §§

module.exports = router;
