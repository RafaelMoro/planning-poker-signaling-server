import express from 'express';
import http from 'node:http';
import cors from 'cors'
import * as dotenv from 'dotenv';
import { Server } from 'socket.io';

import { roomHandler } from './room';

dotenv.config();
const PORT = process.env.PORT || 8080;
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
  roomHandler(socket)

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})