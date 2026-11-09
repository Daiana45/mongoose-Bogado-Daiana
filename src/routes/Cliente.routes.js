import { Router } from "express";
import { crearCliente, obtenerClientePorId, obtenerClientes, actualizarCliente, clienteEliminado } from "../controllers/ClienteController.js";
import {ValidarCampos} from "../middlewares/validarCampos.js"
import { ClienteValidaciones } from "../middlewares/cliente.validaciones.js";

//inicializar el router
const ClienteRouter = Router();

//definir las rutas
ClienteRouter.post("/",ClienteValidaciones, ValidarCampos, crearCliente);
ClienteRouter.get("/", obtenerClientes);
ClienteRouter.get("/:id", obtenerClientePorId);
ClienteRouter.put("/:id",ClienteValidaciones, ValidarCampos, actualizarCliente);
ClienteRouter.delete("/:id", clienteEliminado);

export default ClienteRouter;