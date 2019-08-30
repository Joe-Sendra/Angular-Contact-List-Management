const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true},
    middle: String,
    suffix: String
  },
  email: {
    home: String,
    work: String,
  },
  phone: {
    mobile: String,
    home: String,
    work: String,
    other: String
  },
  address: {
    home: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    work: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    other: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    }
  }
})

// The model name should start with an uppercase and needs to be exported
module.exports = mongoose.model('Contact', contactSchema); // Collection will be called contacts
