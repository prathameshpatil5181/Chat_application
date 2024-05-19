import { io } from "socket.io-client";
import { Serverurl } from "../Utils/UtilityFunctions";
export const SocketIo = io(Serverurl);
