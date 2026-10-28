import express from "express";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3003;

//middlewares
app.use(express.json());


const iniciarServidor = async () => {
    try{
        //intentamos conectar a la base de datos
        await startDB();
        app.listen(PORT, () => {
            console.log(`servidor listo en el puerto ${PORT}`);
        });
    } catch (error) {
        //si falla termina aca y no ejecuta app.listen
        console.error("no se pudo iniciar la aplicacion:", error);
    }
};

//llamamos a la funcion
iniciarServidor();