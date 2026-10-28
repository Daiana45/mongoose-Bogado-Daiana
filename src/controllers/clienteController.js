import { ClienteModel } from "../models/Cliente.models.js";

export const crearCliente = async (req, res) => {
    try {
        // Crear el cliente en la base de datos usando los datos de req.body
        const nuevoCliente = await ClienteModel.create(req.body);
        
        // Enviar la respuesta exitosa con el cliente creado
        res.status(201).json({message:"usuario creado correctamente", cliente: nuevoCliente})
    } catch (error) {
        // Manejar el error si algo falla
        res.status(500).json({message:"error interno del servidor", error: error.message});
    }
};

export const obtenerClientes = async (req, res) => {
    try {
        // Buscar todos los clientes en la base de datos
        const clientes = await ClienteModel.find()
        
        // Enviar la respuesta con la lista de clientes
        res.status(200).json({message:"se encontro la lista de clientes exitosamente", clientes: clientes});
    } catch (error) {
        // Manejar el error
        res.status(500).json({message: "error interno del servidor", error:error.message});
    }
};