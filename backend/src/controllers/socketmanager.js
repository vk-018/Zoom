import { Server } from "socket.io"


//this fn is connecting n0de -http created seever with the socket.io server
const connectToSocket = (server) => {
    const io= new Server(server);     //This line creates a new Socket.IO server instance that’s attached to your existing HTTP server.
    return io;
}

export default connectToSocket;