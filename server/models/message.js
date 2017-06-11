const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  text: String,
  user: String,
  createdAt: Date,
  chatId: String,
})

const ModelClass = mongoose.model('message', messageSchema)

module.exports = ModelClass
