import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import animalsRoutes from "./routes/animals.routes.js"
connectMongoDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/animals",animalsRoutes)   

app.listen(8080,()=>{
    console.log("Server on port 8080")
})
