import { Socket } from "socket.io";
import { CREATE_ROOM_EVENT, MESSAGES_EVENT, REGISTER_USER_EVENT, ROOM_CREATED_EVENT } from "../constants";

interface CreateRoomPayload {
  userName: string;
}

interface User {
  userName: string;
  message: string;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = async ({ userName }: CreateRoomPayload) => {
    const roomId = '123-456';
    const newUser: User = { userName, message: '' };
    socket.emit(ROOM_CREATED_EVENT, { roomId, newUser });
    console.log(`User ${userName} created a room`);
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on('salute', (salute: string) => {
    console.log('new message', salute)
    // Necesitaba broadcast para enviar mensajes a todos los usuarios
    socket.broadcast.emit(MESSAGES_EVENT, salute)
  })
  
  socket.on(REGISTER_USER_EVENT, ({ userName }: { userName: string }) => {
    (socket as any).userName = userName;
  })
}