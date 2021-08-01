const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = {}

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', socket => {

  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

let port = process.env.port || 5000
server.listen(port, () => {console.log('Listening at port: ' + port)})