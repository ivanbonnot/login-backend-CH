const mongoose = require('mongoose') 
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose


const userSchema = new Schema({
  timestamp: { type: Number, require: true },
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function(next) {
  const user = this;

  // Si la contraseña no se ha modificado, sigue adelante
  if (!user.isModified('password')) {
    return next();
  }

  // Genera un hash para la contraseña
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

const userModel = model('User', userSchema)

module.exports = userModel
