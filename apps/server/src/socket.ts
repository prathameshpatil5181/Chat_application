// import {Server} from "socket.io"
// import { Redis } from "ioredis";

// const pub=new Redis({
//     host:'redis-120b094d-chatapp-redis.a.aivencloud.com',
//     port:12706,
//     username:'default',
//     password:'AVNS_yk3WRO6oYdzCzEsHDiB'
// });
// const sub = new Redis({
//     host:'redis-120b094d-chatapp-redis.a.aivencloud.com',
//     port:12706,
//     username:'default',
//     password:'AVNS_yk3WRO6oYdzCzEsHDiB'
// });

// class SocketService {
//     private _io:Server;

//     constructor(){
//         console.log("Init Socket Service...");
//         this._io = new Server({
//             cors:{
//                allowedHeaders:['*'],
//                origin:'*' 
//             }
//         });
//         sub.subscribe("MESSAGES");
//     }

//     get io(){
//         return this._io;
//     }
 
//     public initListner(){
//         const io = this.io;
//         console.log("Init Socket Listners...")
//         io.on("connect",(socket)=>{
//             console.log(`New Socket Connected`, socket.id);
//             socket.on('event:message',async ({message}:{message:string})=>{
//                 console.log("New Message Received",message);
//                 await pub.publish('MESSAGES',JSON.stringify({message}))
//             })
//         });

//         sub.on('message',(channel,message)=>{
//             if(channel==='MESSAGES'){
//                 io.emit('message',message);
//             }
//         })
//     }
// }

// export default SocketService;