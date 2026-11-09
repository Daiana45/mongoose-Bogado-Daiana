import { body } from "express-validator";
import { ClienteModel } from "../models/Cliente.models.js";

//exportamos un array llamado 'clienteValidaciones' porque express necesita que las reglas vengan en forma de lista para aplicarlos en cadena sobre la misma peticion.
export const ClienteValidaciones = [
    //validaciones
    body('nombre')
    .isString().withMessage("el nombre debe ser en formato texto")
    .notEmpty().withMessage("el nombre no puede estar vacio"),
    body('email')
    .isEmail().withMessage("el email debe tener un formato valido")
    .notEmpty().withMessage("el email no puede ser vacio")
    //usamos custom para ver si ya hay algun email igual
    .custom(async(valor) => {
        //buscamos en la base de datos
        const clienteExistente = await ClienteModel.findOne({email:valor});

        //si lo encontramos
        if (clienteExistente) {
            throw new error("ya existe un cliente registrado con ese email");
        }

        //si no econtramos retornamos true para que la validacion continue
        return true;
    }),
    body('telefono')
    .isString().withMessage("el telefono debe ser texto")
    .notEmpty().withMessage("el telefono es obligatorio")
    .isLength({min:8, max:15}).withMessage("el telefono debe tener un minimo de 8 digitos y 15 como maximo"),
    body('dni')
    .isString().withMessage("el dni debe ser formato texto")
    .notEmpty().withMessage("el dni no debe estar vacio")
    .isLength({min:7, max:8}).withMessage("el dni debe tener un minimo de 7 digitos y como maximo 8 digitos")
    .custom(async(valor) => {
        const dniRegistrados = await ClienteModel.findOne({dni:valor});
        if (!dniRegistrados) {
            throw new error("ya existe un dni registrado")
        }
        return true;
    }),
];