const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
  uniqueId: {
    type: Number,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model('Info', infoSchema)
