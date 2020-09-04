const dotenv = require("dotenv")
dotenv.config();
const cors = require('cors');
const path = require("path");
const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)
const userRoutes = require('./Routes/userRoutes');
const dataRoutes = require('./Routes/dataRoutes');
require('./db');

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>res.send({msg:'hello'}))
app.use(userRoutes);
app.use(dataRoutes);
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