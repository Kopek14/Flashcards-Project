require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DBLOGIN}:${process.env.DBPASSWORD}@cluster0.hyxvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  .then(res => console.log('Server MongoDB is connected'))
  .catch(err => console.log(err));

module.exports = mongoose;