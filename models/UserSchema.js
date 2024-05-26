const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    // unique: [true, 'Email must be unique.'],
  },
  number: {
    type: Number,
    required: [true, 'number is required.'],
    // unique: [true, 'number must be unique.'],
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
})

module.exports = mongoose.model('User', userSchema)
