import mongoose from "mongoose";

//Definimos el nombre de la collección
const animalsCollection = "animales"

//Definimos el esquema del documento

const animalsSchema=new mongoose.Schema({
    nombre:String,
    especie:String,
    edad:Number,
    dni:{
        type:String,
        unique:true
    }
})

//Exportamos nuestro modelo para poder utilizar en nuestras rutas
export const animalsModel=mongoose.model(animalsCollection,animalsSchema)
