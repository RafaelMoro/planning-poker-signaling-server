import { Socket } from "socket.io";
import crypto from "crypto";
import { CREATE_ROOM_EVENT, JOIN_ROOM_EVENT, ROOM_CREATED_EVENT } from "../constants";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = crypto.randomUUID();
    socket.emit(ROOM_CREATED_EVENT, { roomId });
    console.log("user created a room");
  }
  const joinRoom = () => {
    console.log("user joined to the room");
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on(JOIN_ROOM_EVENT, joinRoom);
}