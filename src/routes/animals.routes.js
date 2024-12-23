import { response, Router } from "express";
import { animalsModel } from "../models/animals.models.js";

const router = Router();

router.get("/",async(req,res)=>{
    try {
        const animals = await animalsModel.find();
        res.send(animals);
        console.log("Animales.get")
    } catch (error) {
        console.log(error)
    }
})

router.post("/",async(req,res)=>{
    try {
        const body = req.body
        const animal = await animalsModel.create(body);
        res.send(animal);
        console.log("Animales.post")
    } catch (error) {
        console.log(error)
    }
})
export default router;