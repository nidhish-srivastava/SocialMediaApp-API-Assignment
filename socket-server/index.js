import {Server} from "socket.io"
import http from "http"

const server = http.createServer(app)
const io = new Server(server)


io.on('connection', (socket) => {
    console.log("A user is connected");

    // Optionally set the user ID or name
    socket.on('set user', (userId) => {
        socket.userId = userId;
    });

    // Listen to incoming chat messages
    socket.on("chat message", (msg) => {
        if (!msg || msg.trim().length === 0) {
            return;  // Ignore empty messages
        }
        console.log(`Message received from ${socket.userId || 'Unknown'}: ${msg}`);
        io.emit("chat message", msg);  // Broadcast to all clients
    });

    // Listen to new comment event
    socket.on('new comment', (comment) => {
        if (!comment || comment.trim().length === 0) {
            return;  // Ignore empty comments
        }
        console.log(`New comment: ${comment}`);
        io.emit('new comment', comment);  // Broadcast to all clients
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
