const mongoose = require('mongoose') 
const { Schema, model } = mongoose


const userSchema = new Schema({
  timestamp: { type: Number, require: true },
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = model('Product', userSchema)

module.exports = userModel
