import http from 'http';
import SocketService from './socket';

async function init(){
    const httpServer = http.createServer();
    const PORT = process.env.PORT?process.env.PORT:8000;
    const socketService = new SocketService();

    socketService.io.attach(httpServer);

    httpServer.listen(PORT,()=>{
        console.log(`HTTP server running at port ${PORT}`);
    })

    socketService.initListner();
}

init();