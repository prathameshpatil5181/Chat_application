// import { Socket, io } from "socket.io-client";
// class SocketClass {
//   public _io:Socket;
//     constructor() {
//     this._io=io("http://localhost:8000/", {
//       withCredentials: true,
//     });
//   }
//   get(){
//     return this._io;
//   }
//   public  sendMessage(){
//     this._io.emit('chat',"hiii");
//   }
 
// }

// export default SocketClass;

import io from "socket.io-client";
let socket = io("http://localhost:8000/chat".{
  withCredentials:true
});
export default socket;

