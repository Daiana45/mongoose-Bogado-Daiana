import { validationResult } from "express-validator";

//middleware reutilizable
export const ValidarCampos = (req, res, next) => {
    //extreamos los errores que exprres guarda en la petiicion
    const errores = validationResult(req);

    //si hay errores, cortamos y respondemos 
    if(!errores.isEmpty()) {
        return res.status(400).json({message:"error de validacion", errores: errores.array()}); //decuelve la lista de campos que fallaron
    };
//si no hay errores, le decimos a express que siga hacia el siguiente controlador
next();
};