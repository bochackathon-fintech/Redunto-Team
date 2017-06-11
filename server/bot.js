

const socketio = require('socket.io')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const Message = mongoose.model('message')

module.exports = function(app) {
  //const server = http.Server(app)
  const websocket = socketio(app)
  const clients = {}
  const users = {}
  const chatId = 1

  websocket.on('connection', (socket) => {
    console.log('tconnection==============')
    //clients[socket.id] = socket
    //socket.on('userJoined', (userId) => onUserJoined(userId, socket))
    socket.on('message', (message) => onMessageReceived(message, socket))
  })

  function onUserJoined(userId, socket) {
    try {
      if (!userId) {
        const user = new User({}, (user) => {
          socket.emit('userJoined', user._id)
          users[socket.id] = user._id
          _sendExistingMessages(socket)
        })
      } else {
        users[socket.id] = userId
        _sendExistingMessages(socket)
      }
    } catch (err) {
      console.err(err)
    }
  }
  function onMessageReceived(message, senderSocket) {
    let userId = users[senderSocket.id]
    if (!userId) return
    _sendAndSaveMessage(message, senderSocket)
  }
  function _sendExistingMessages(socket) {
    const messages = Message
    .find({chatId})
    .sort({createdAt: 1})
    .toArray((messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return
      socket.emit('message', messages.reverse())
    })
  }
  function _sendAndSaveMessage(message, socket, fromServer) {
    let messageData = {
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
      chatId: chatId,
    }

    return new Message(messageData).save()
   .then((message) => {
     let emitter = fromServer ? websocket : socket.broadcast
     console.log([message])
     emitter.emit('message', [message])
   })

  }
  const stdin = process.openStdin()
  stdin.addListener('data', (d) => {
    _sendAndSaveMessage({
      text: d.toString().trim(),
      createdAt: new Date(),
      user: '23232',
    }, null /* no socket */, true /* send from server */)
  })

}
