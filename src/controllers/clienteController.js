import { LibroModel } from "../models/Libro.models.js";

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

export const obtenerClientePorId = async (req, res) => {
    try {
        // Extraer el ID de los parámetros de la URL (req.params)
        const { id } = req.params;
        
        // Buscar el cliente en la base de datos usando findById
        const cliente = await ClienteModel.findById(id);
        
        // Verificar si el cliente existe. Si no existe, responder con un 404
        if(!cliente) {
            return res.status(404).json({message: "Cliente no encontrado"});
        }
        
        // Enviar la respuesta exitosa con el cliente
        res.status (200).json({message:"cliente ecnontrado", cliente: cliente})
        
    } catch (error) {
        //Manejar el error (ej: si el ID tiene un formato inválido)
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

export const actualizarCliente = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la URL
        const { id } = req.params;
        
        // Usar updateOne buscando por _id y pasando los nuevos datos
         const clienteActualizado = await ClienteModel.updateOne({ _id: id }, req.body);
        
        // Responder con el resultado
        return res.status(200).json({message: "se actualizo correctamente", clienteActualizado: clienteActualizado});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
};

export const clienteEliminado = async(req,res) => {
    try {
    const {id} = req.params;

    const clienteBorrado = await ClienteModel.findByIdAndUpdate(id,{activate: false}, {new: true});
if(!clienteBorrado){
    return res.status(404).json({message: "cliente no encontrado"})
}
    res.status(200).json({message: "el cliente fue eliminado con exito", clienteBorrado: clienteBorrado});
} catch(error) {
return res.status(500).json({message: "error interno del servidor", error: error.message});
}
}
