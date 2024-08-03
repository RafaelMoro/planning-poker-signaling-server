import express from 'express';
import http from 'node:http';
import cors from 'cors'
import { Server } from 'socket.io';

const port = 8080
const app = express()
app.use(cors())
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})