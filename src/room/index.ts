import { Socket } from "socket.io";
import crypto from "crypto";
import { CREATE_ROOM_EVENT, GENERAL_MESSAGES_EVENT, JOIN_ROOM_EVENT, ROOM_CREATED_EVENT } from "../constants";

interface CreateRoomPayload {
  user: string;
}

interface User {
  userName: string;
  message: string;
}

interface Room {
  roomId: string;
  users: User[];
}

export const roomHandler = (socket: Socket) => {
  const rooms: Room[] = [];

  const createRoom = ({ user }: CreateRoomPayload) => {
    const roomId = crypto.randomUUID();
    rooms.push({
      roomId,
      users: [{ userName: user, message: '' }]
    })
    socket.emit(ROOM_CREATED_EVENT, { roomId, user });
    console.log(rooms);
    rooms[0].users.forEach((user) => console.log(user.userName));
    console.log(`User ${user} created a room`);
  }

  const joinRoom = async ({ roomId, userName }: { roomId: string, userName: string }) => {
    const roomFound = rooms.find((room) => room.roomId === roomId);
    if (!roomFound) {
      console.log(`Room ${roomId} does not exist`);
      socket.emit(GENERAL_MESSAGES_EVENT, { message: `Room ${roomId} does not exist` });
      return;
    }
    const newUser: User = { userName, message: '' };
    rooms.forEach((room) => {
      if (room.roomId === roomId) {
        room.users.push(newUser);
      }
      return room
    })
    rooms[0].users.forEach((user) => console.log(user.userName));
    console.log(`user ${userName} joined to the room ${roomId}`);
  }

  const handleRoom = ({ user, message }: { user?: string, message?: string }) => {
    // Modify message of the user

  }
  for (const room of rooms) {
    socket.on(room.roomId, handleRoom)
  }

  socket.on(CREATE_ROOM_EVENT, createRoom);
  socket.on(JOIN_ROOM_EVENT, joinRoom);
}