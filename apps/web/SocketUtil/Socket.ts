import { io } from "socket.io-client";

export const SocketIo = io("http://localhost:8000");
