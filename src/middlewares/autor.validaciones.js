import { body } from "express-validator";
import { AutorModel } from "../models/Autor.models.js";

export const AutoValidaciones = [
body('nombre')
.isString().withMessage("el nombre debe ser texto")
.notEmpty().withMessage("el nombre no puede ser vacio"),
body('nacionalidad')
.isString().withMessage('la nacionalidad no puede ser vacio')
.notEmpty().withMessage('la nacionalidad del autor no puede ser vacia'),
body('fechaNacimiento')
.notEmpty().withMessage('no debe ser vacio')
//usamos una expresion regular (Regex) que actua como una plantilla.
// /^\d{4}-\d{2}-\d{2}$/ significa 4 numeros, guion, 2 numeros, guion, 2 numeros.
.custom((valor) =>{
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/; //la plantilla

    //si el valor no coincide 
    if (!formatoFecha.test(valor)){
        throw new error("debe tener un formato valido");
    }
    return true;
})
];