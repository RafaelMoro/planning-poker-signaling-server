import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    console.log("user created a room");
  }
  const joinRoom = () => {
    console.log("user joined to the room");
  }

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
}