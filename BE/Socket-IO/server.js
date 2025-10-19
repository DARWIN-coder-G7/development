const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuid } = require('uuid');


const PORT = 3000;

const App = express();
const server = http.createServer(App);

const socketIO = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

let todoList = [];

const todoListNameSpace = socketIO.of('/todo');
todoListNameSpace.on("connection", (socket) => {
    console.log("New Connection Established");
    socket.emit('update', todoList);
    socket.on('newItem', (item) => {
        const todoItem = { id: uuid(), value: item };
        todoList.push(todoItem);
        todoListNameSpace.emit('update', todoList);
    });
    socket.on('updateItem', (newItem)=>{
        // todoList.map((obj)=>{
        //     if(obj.id === newItem.id){
        //         obj.value = newItem.value;
        //     }
        //     return obj;
        // })
        const index = todoList.findIndex((item) => item.id == newItem.id);
        if(index !==-1){
            todoList[index].value = newItem.value;
        }
         todoListNameSpace.emit('update', todoList);
    });

        socket.on('deleteItem', (newItem)=>{
            todoList = todoList.filter((line)=> line.id !== newItem);
        // const index = todoList.findIndex((item) => item.id == newItem.id);
        // if(index !==-1){
        //    todoList.splice(index,1)
        // }
         todoListNameSpace.emit('update', todoList);
    });

    socket.on("disconnect",()=>{
        console.log("Client Disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`APP Running Succesfully On Port Number ${PORT}`)
})