import { Socket } from "socket.io";
import { CREATE_ROOM_EVENT, JOIN_ROOM_EVENT, MESSAGES_EVENT, ROOM_CREATED_EVENT } from "../constants";

interface CreateRoomPayload {
  userName: string;
}

interface User {
  userName: string;
  message: string;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = async ({ userName }: CreateRoomPayload) => {
    (socket as any).userName = userName;
    const roomId = crypto.randomUUID();
    socket.join(roomId);
    const newUser: User = { userName, message: `User ${userName} created the room` };
    socket.emit(ROOM_CREATED_EVENT, { roomId, newUser });
    console.log(`User ${userName} created a room`);
  }

  const joinRoom = async ({ roomId, userName }: { roomId: string, userName: string }) => {
    (socket as any).userName = userName;
    const newUser: User = { userName, message: `User ${userName} joined the room` };
  
    socket.join(roomId);
    socket.in(roomId).emit(roomId, { roomId, newUser });
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on(JOIN_ROOM_EVENT, joinRoom);
  socket.on('salute', (salute: string) => {
    console.log('new message', salute)
    // Necesitaba broadcast para enviar mensajes a todos los usuarios
    socket.broadcast.emit(MESSAGES_EVENT, salute)
  })
}