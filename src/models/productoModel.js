const mongoose = require('mongoose') 
const { Schema, model } = mongoose


const ObjectId = Schema.ObjectId;

const productoSchema = new Schema({
  id: ObjectId,
  timestamp: { type: Number, require: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true }
});

const productoModel = model('Product', productoSchema)

module.exports = productoModel
