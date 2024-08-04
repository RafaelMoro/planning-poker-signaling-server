import { Socket } from "socket.io";
import crypto from 'crypto';
import { CREATE_ROOM_EVENT, JOIN_ROOM_EVENT, ROOM_CREATED_EVENT } from "../constants";

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

  const joinRoom = async ({ roomId, newUser }: { roomId: string, newUser: User }) => {
    socket.emit(ROOM_CREATED_EVENT, { roomId, newUser });
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on(JOIN_ROOM_EVENT, joinRoom);
  socket.on('123-456', ({ user }: { user: User }) => {
    console.log(`User ${user.userName}`)
    console.log(`Message: ${user.message}`)
    // socket.
  })
  // socket.on(ROOM_CREATED_EVENT, handleRoom);
}