import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/",(req,res)=>{
    res.render("index")
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
//Configuracion del Socket
const io = new Server(httpServer);
io.on("connection",(socket)=>{
    console.log(`Nuevo cliente conectado conel id :  ${socket.id}`);

    //Recibe un evento en el servidor
    socket.on("empanada",(data)=>{
        console.log("Este es el mensaje desde el socket 'empanada' =>",data)
    })

    // Mensaje para un socket individual, solo lo recibe un cliente
    socket.emit("socket-individual", "Este mensaje es socket individual");
    
    // Mensaje para todos menos el socket actual
    socket.broadcast.emit("socket-excluye-actual", "Este mensaje lo ven todos menos el actual")

    // Mensaje para todos
    io.emit("socket-todos", "Este mensaje lo deberían ver todos")

});