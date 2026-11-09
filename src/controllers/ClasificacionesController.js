import { ClasificacionModel } from "../models/Clasificaciones.models.js";

export const crearClasificacion = async (req, res) => {
    try {
        // Crear el autor en la base de datos usando los datos de req.body
        const nuevaClasificacion = await ClasificacionModel.create(req.body);
        
        // Enviar la respuesta exitosa con el autor creado
        res.status(201).json({message:"clasificacion creada correctamente", clasificacion: nuevaClasificacion})
    } catch (error) {
        // Manejar el error si algo falla
        res.status(500).json({message:"error interno del servidor", error: error.message});
    }
};

export const obtenerClasificacion = async (req, res) => {
    try {
        // Buscar todos los autores en la base de datos
        const clasificacion = await ClasificacionModel.find()
        
        // Enviar la respuesta con la lista de autores
        res.status(200).json({message:"se encontro la lista de clasificaciones exitosamente", clasificacion: clasificacion});
    } catch (error) {
        // Manejar el error
        res.status(500).json({message: "error interno del servidor", error:error.message});
    }
};

export const obtenerClasificacionPorId = async (req, res) => {
    try {
        // Extraer el ID de los parámetros de la URL (req.params)
        const { id } = req.params;
        
        // Buscar el autor en la base de datos usando findById
        const clasificacion = await ClasificacionModel.findById(id);
        
        // Verificar si  existe. Si no existe, responder con un 404
        if(!clasificacion) {
            return res.status(404).json({message: "clasificacion no encontrado"});
        }
        
        // Enviar la respuesta exitosa 
        res.status (200).json({message:"clasificacion ecnontrado", clasificacion: clasificacion})
        
    } catch (error) {
        //Manejar el error (ej: si el ID tiene un formato inválido)
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

export const actualizarClasificacion = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la URL
        const { id } = req.params;
        
        // Usar updateOne buscando por _id y pasando los nuevos datos
         const clasificacionActualizado = await ClasificacionModel.updateOne({ _id: id }, req.body);
        
        // Responder con el resultado
        return res.status(200).json({message: "se actualizo correctamente", clasificacionActualizado: clasificacionActualizado});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
};

export const clasificacionEliminado = async(req, res) => {
    try {
        const { id } = req.params;

        // Buscamos y desactivamos, { new: true } nos devuelve el doc actualizado
        const clasificacionBorrada = await ClasificacionModel.findByIdAndUpdate(
            id, 
            { activate: false }, 
            { new: true }
        );

        // Ahora sí verificamos la variable correcta
        if (!clasificacionBorrada) {
            return res.status(404).json({ message: "Clasificación no encontrada" });
        }

        res.status(200).json({ 
            message: "La clasificación fue dada de baja con éxito", 
            data: clasificacionBorrada 
        });
    } catch(error) {
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};