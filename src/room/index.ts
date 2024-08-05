import { Socket } from "socket.io";
import { CREATE_ROOM_EVENT, JOIN_ROOM_EVENT, RECEIVE_MESSAGE_EVENT, ROOM_CREATED_EVENT, SEND_MESSAGE_EVENT } from "../constants";

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

  const handleSendMessage = ({ user, message }: { user: string, message: string }) => {
    console.log({ user, message})
    socket.emit(RECEIVE_MESSAGE_EVENT, { user, message });
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on(JOIN_ROOM_EVENT, joinRoom);
  socket.on('123-456-send', ({ user }: { user: User }) => {
    socket.emit('123-456-receive', { user });
    // socket.
  })
  socket.on(SEND_MESSAGE_EVENT, handleSendMessage)
  // socket.on(ROOM_CREATED_EVENT, handleRoom);
}