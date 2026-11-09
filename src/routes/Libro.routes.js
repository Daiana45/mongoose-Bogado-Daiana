import { Router } from "express";
import { actualizarLibro, crearLibro, libroEliminado, obtenerLibro, obtenerLibroPorId, agregarClasificacionALibro } from "../controllers/LibroController.js";

const LibroRouter = Router();

LibroRouter.post("/", crearLibro);
LibroRouter.get("/", obtenerLibro);
LibroRouter.get("/:id", obtenerLibroPorId);
LibroRouter.put("/:id",actualizarLibro);
LibroRouter.delete("/:id", libroEliminado);
//ruta patch /api/libros/:id/clasificaciones.
//esta es la ruta especial para la relacion N:M muchos a muchos, patch se usa para modificaciones parciales (agregar una clasificacion, no remplazar todo el libro)
//la url es semantica: "al libro con este ID, agregale una clasificacion"
LibroRouter.patch("/:id/clasificaciones", agregarClasificacionALibro);

export default LibroRouter;