import { Router } from "express";
import { actualizarLibro, crearLibro, libroEliminado, obtenerLibro, obtenerLibroPorId } from "../controllers/LibroController.js";

const LibroRouter = Router();

LibroRouter.post("/", crearLibro);
LibroRouter.get("/", obtenerLibro);
LibroRouter.get("/:id", obtenerLibroPorId);
LibroRouter.put("/:id",actualizarLibro);
LibroRouter.delete("/:id", libroEliminado);

export default LibroRouter;