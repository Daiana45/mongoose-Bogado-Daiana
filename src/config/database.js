import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const startDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conecion exitosa con la base de datos")
    } catch(error) {
        console.log("error al conectar con mongodb", error.message);
    };
};