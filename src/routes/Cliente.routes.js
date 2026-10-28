import { Router } from "express";
import { crearCliente, obtenerClientes } from "../controllers/ClienteController.js";

//inicializar el router
const router = Router();

//definir las rutas
router.post("/", crearCliente);
router.get("/", obtenerClientes);

export default router;