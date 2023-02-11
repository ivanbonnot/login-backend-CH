const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
  id: ObjectId,
  productos: { type: Array, required: true }
})


const cartModel = model('Cart', cartSchema)


module.exports = cartModel