import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io"
import { MessageManager } from "./manager/messageManager.js"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("index")
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
//Configuracion del Socket

const messageManager = new MessageManager();
let message = []

const io = new Server(httpServer);
io.on("connection", (socket) => {
    console.log(`Nuevo cliente conectado socket id :  ${socket.id}`);

    socket.on("newUser", (data) => {
        socket.broadcast.emit("newUser", data);
        console.log(data)
    })
    socket.on("message", async (data) => {
        message.push(data)
        try {
            await messageManager.addMessages(data);

        } catch (error) {
            console.log(error);
        }
        io.emit("messageLogs", message)
        console.log(message)
    })
});