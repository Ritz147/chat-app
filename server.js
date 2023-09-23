const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const server=http.createServer(app);
const socketIO=require('socket.io');
const io= new socketIO.Server(server);
io.on('connection',(socket)=>{
    console.log("Connected...")
    socket.on('message',(msg)=>{
      socket.broadcast.emit('message',msg);//ye message sabko bhejega jitne connected sockets hain siwaye jis coket ne emit kiya hai
    })
})

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+"/index.html");
// })
//socket

app.use(express.static(path.join(__dirname,"public")));
const PORT=process.env.PORT ||4000;
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
