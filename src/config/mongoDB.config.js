import mongoose from "mongoose"

export const connectMongoDB= async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/baseCRUD");
        console.log("MongoDb connected")
    } catch (error) {
        console.log(error)
    }
}