import { Router } from "express";
import { actualizarAutor, autorEliminado, crearAutor, obtenerAutor, obtenerAutorPorId } from "../controllers/AutorController.js";

const AutorRouter = Router();

AutorRouter.post("/", crearAutor);
AutorRouter.get("/", obtenerAutor);
AutorRouter.get("/:id", obtenerAutorPorId);
AutorRouter.put("/:id",actualizarAutor);
AutorRouter.delete("/:id", autorEliminado);

export default AutorRouter;