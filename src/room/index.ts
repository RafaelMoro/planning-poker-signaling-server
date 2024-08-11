import { Socket } from "socket.io";
import crypto from "crypto";
import { CREATE_ROOM_EVENT, GET_USERS_ROOM, JOIN_ROOM_EVENT, MESSAGES_EVENT, PurposesTypes, ROOM_CREATED_EVENT, SEND_MESSAGE_EVENT, USERS_EVENT } from "../constants";

interface CreateRoomPayload {
  userName: string;
}

interface User {
  userName: string;
  message: string;
  purpose: PurposesTypes;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = async ({ userName }: CreateRoomPayload) => {
    (socket as any).userName = userName;
    const roomId = crypto.randomUUID();
    socket.join(roomId);
    const newUser: User = { userName, message: '', purpose: 'create-room' };
    socket.emit(ROOM_CREATED_EVENT, { roomId, newUser });
    console.log(`User ${userName} created a room`);
  }

  const joinRoom = async ({ roomId, userName }: { roomId: string, userName: string }) => {
    (socket as any).userName = userName;
    const newUser: User = { userName, message: '', purpose: 'join-room' };
    socket.join(roomId);
    socket.in(roomId).emit(roomId, { newUser });
  }

  const handleGetUsersRoom = async ({ roomId, allUsers }: { roomId: string, allUsers: User[] }) => {
    socket.to(roomId).emit(USERS_EVENT, { allUsers });
  }

  const handleSendMessage = async ({ roomId, userName}: { roomId: string, userName: User }) => {
    socket.to(roomId).emit(roomId, { newUser: userName });
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on(JOIN_ROOM_EVENT, joinRoom);
  socket.on(GET_USERS_ROOM, handleGetUsersRoom);
  socket.on(SEND_MESSAGE_EVENT, handleSendMessage)
  socket.on('salute', (salute: string) => {
    console.log('new message', salute)
    // Necesitaba broadcast para enviar mensajes a todos los usuarios
    socket.broadcast.emit(MESSAGES_EVENT, salute)
  })
}