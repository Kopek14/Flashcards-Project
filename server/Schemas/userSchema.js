const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  user_type_id: Number,
});

const User = mongoose.model('User', userSchema);
module.exports.User = User;