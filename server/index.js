const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    //Usuário conectado
    console.log(`O usuário com ID: ${socket.id} entrou na sala.`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`Usuário com ID: ${socket.id} entrou na sala: ${data}.`)
    })


    //Usuário desconectado
    socket.on("disconnect", () => {
        console.log(`O usuário com ID ${socket.id} saiu da sala.`)
    })
});

server.listen(3001, () => console.log("Server running on port 3001."));