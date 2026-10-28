import { Router } from "express";
import { crearCliente, obtenerClientePorId, obtenerClientes, actualizarCliente, clienteEliminado } from "../controllers/ClienteController.js";

//inicializar el router
const ClienteRouter = Router();

//definir las rutas
ClienteRouter.post("/", crearCliente);
ClienteRouter.get("/", obtenerClientes);
ClienteRouter.get("/:id", obtenerClientePorId);
ClienteRouter.put("/:id", actualizarCliente);
ClienteRouter.delete("/:id", clienteEliminado);

export default ClienteRouter;