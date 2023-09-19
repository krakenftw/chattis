import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import messageRoutes from './routes/message.js';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors'
import userRoutes from './routes/user.js';
import { chatRoutes } from './routes/chat.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const server = http.createServer(app)
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
});





app.use(cors());

dotenv.config();

app.use("", messageRoutes);
app.use("/user", userRoutes)
app.use("/messages", messageRoutes)
app.use("/chat", chatRoutes)

const handleUserJoin = () => {
    console.log("New user joined")
}

io.on('connection', (socket) => {

    socket.on('new-user-joined', () => {
        socket.broadcast.emit("New user joined")
    })
    socket.on("chat", (data) => {
        console.log("Chat Received : ", data.message)
    })
});



function main() {
    mongoose.connect(process.env.MONGO_URI);
}

mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT || 3500;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})