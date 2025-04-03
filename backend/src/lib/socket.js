const {Server} = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
        credentials : true
    }
});

function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//Used to store online users
const userSocketMap = {}; //{userID : socketId}

io.on("connection",(socket)=>{
    console.log("A new User connected",socket.id);
    //Store the socketId in the userSocketMap
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    //send events to all clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));


    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

module.exports = {io,app,server,getReceiverSocketId};