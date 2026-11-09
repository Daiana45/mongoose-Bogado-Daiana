import { Router } from "express";
import { actualizarAutor, autorEliminado, crearAutor, obtenerAutor, obtenerAutorPorId } from "../controllers/AutorController.js";
import { ValidarCampos } from "../middlewares/validarCampos.js";
import { AutoValidaciones } from "../middlewares/autor.validaciones.js";

const AutorRouter = Router();

AutorRouter.post("/", AutoValidaciones, ValidarCampos, crearAutor);
AutorRouter.get("/",obtenerAutor);
AutorRouter.get("/:id", obtenerAutorPorId);
AutorRouter.put("/:id",AutoValidaciones, ValidarCampos, actualizarAutor);
AutorRouter.delete("/:id", autorEliminado);

export default AutorRouter;