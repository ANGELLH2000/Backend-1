
console.log("Listo para agregar Socket");
//Configutamos el socket del lado del cliente
const socket= io(); //hacemos referencia a la libreria socket.io

let user;
let chatBox= document.getElementById("chatBox");

//Alerta para eingresar datos

Swal.fire({
    title:"Indetificarse",
    input:"text",
    text:"Ingrese el usuario para identificarse en el chat",
    icon:"info",
    inputValidator:(value)=>{
        return !value && "Porfavor ingresa un nombre"
    },
    allowOutsideClick:false,
}).then((result)=>{
    user=result.value;
    //console.log(user)

    //Enviamos el usurio al servidor
    socket.emit("newUser",user);
})

//Evento para los mensajes
chatBox.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        if(chatBox.value.trim().length >0){
            socket.emit("message",{user:user,message:chatBox.value})
            chatBox.value="";
        }
    }
})

//Recibimos los mensajes
socket.on("messageLogs",(data)=>{
    let messageLogs = document.getElementById("messageLogs");
    let  message = "";
    data.forEach(messageLogs => {
        message=message+`${messageLogs.user} dice: ${messageLogs.message} </br>`;
    });
    messageLogs.innerHTML=message;

})


socket.on("newUser",(data)=>{
    Swal.fire({
        text:`Se ha conectado ${data} al chat`,
        toast:true,
        position:"top-right",
        timer:2000
    })
})