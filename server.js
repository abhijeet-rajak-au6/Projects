const dotenv = require("dotenv")
dotenv.config();
const path = require("path");
const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)

const users = {}
app.use(express.static(path.join(__dirname)));



io.on('connection', socket => {
  socket.on('update-trello', updatedTrello => {
    console.log("updated Trello=",updatedTrello);
    socket.broadcast.emit('trello', updatedTrello);
  })
  // socket.on('send-chat-message', message => {
  //   socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  // })
  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('user-disconnected', users[socket.id])
  //   delete users[socket.id]
  // })
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));