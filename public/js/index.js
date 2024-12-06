console.log("Listo para agregar Socket");
//Configutamos el socket del lado del cliente
const socket= io(); //hacemos referencia a la libreria socket.io
//Enviamos un evento al servidor al servidor
socket.emit("empanada","Hola este el el mensaje del evento empanda")

//Escuchamos un evento del servidor
socket.on("socket-individual",(data)=>{
    console.log("Este es el mensaje desde el socket 'socket-individual' =>",data)
})

socket.on("socket-excluye-actual",(data)=>{
    console.log("Este es el mensaje desde el socket 'socket-excluye-actual' =>",data)
})

socket.on("socket-todos",(data)=>{
    console.log("Este es el mensaje desde el socket 'socket-todos' =>",data)
})

