import axios from "axios";

export async function createRoom({ roomName, userName }: { roomName: string, userName: string }) {
  try {
    const payload = {
      roomName,
      users: [
        { userName, message: `Room ${roomName} created by ${userName}` }
      ]
    }
    console.log(payload);
    const response = await axios.post('http://localhost:5500/room', { payload });
    console.log('Response =>', response.data);
    console.log('----------------')
    return response.data;
  } catch (error) {
    console.log(error);
  }
}