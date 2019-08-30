const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// This is a blueprint (definition/model)
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  role: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

// The model name should start with an uppercase and needs to be exported
module.exports = mongoose.model('User', userSchema); // Collection will be called users
