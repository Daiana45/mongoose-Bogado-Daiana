import { LibroModel } from "../models/Libro.models.js";

export const crearLibro = async (req, res) => {
    try {
        // Crear el cliente en la base de datos usando los datos de req.body
        const nuevoLibro = await LibroModel.create(req.body);
        
        // Enviar la respuesta exitosa con el cliente creado
        res.status(201).json({message:"Libro creado correctamente", Libro: nuevoLibro})
    } catch (error) {
        // Manejar el error si algo falla
        res.status(500).json({message:"error interno del servidor", error: error.message});
    }
};

export const obtenerLibro = async (req, res) => {
    try {
        // Buscar todos los clientes en la base de datos
        const libro = await LibroModel.find()

        // Enviar la respuesta con la lista de clientes
        res.status(200).json({message:"se encontro la lista de libros exitosamente", libro: libro});
    } catch (error) {
        // Manejar el error
        res.status(500).json({message: "error interno del servidor", error:error.message});
    }
};

export const obtenerLibroPorId = async (req, res) => {
    try {
        // Extraer el ID de los parámetros de la URL (req.params)
        const { id } = req.params;
        
        // Buscar el cliente en la base de datos usando findById
        const libro = await LibroModel.findById(id)
        .populate('autor')
        .populate('clasificaciones');
        
        // Verificar si el cliente existe. Si no existe, responder con un 404
        if(!libro) {
            return res.status(404).json({message: "libro no encontrado"});
        }
        
        // Enviar la respuesta exitosa con el cliente
        res.status (200).json({message:"libro ecnontrado", libro: libro})
        
    } catch (error) {
        //Manejar el error (ej: si el ID tiene un formato inválido)
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

export const actualizarLibro = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la URL
        const { id } = req.params;
        
        // Usar updateOne buscando por _id y pasando los nuevos datos
         const libroActualizado = await LibroModel.updateOne({ _id: id }, req.body);
        
        // Responder con el resultado
        return res.status(200).json({message: "se actualizo correctamente", libroActualizado: libroActualizado});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
};

export const libroEliminado = async(req,res) => {
    try {
    const {id} = req.params;

    const libroBorrado = await LibroModel.findByIdAndUpdate(id,{activate: false}, {new: true});
if(!libroBorrado){
    return res.status(404).json({message: "libro no encontrado"})
}
    res.status(200).json({message: "el libro fue eliminado con exito", libroBorrado: libroBorrado});
} catch(error) {
return res.status(500).json({message: "error interno del servidor", error: error.message});
}
}