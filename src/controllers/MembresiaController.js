import { MembresiaModel } from "../models/Membresia.models.js";
import { matchedData } from "express-validator";

export const crearMembresia = async (req, res) => {
    try {

        //traemos solo los datos que pasaron la validacion 
        const datosLimpios = matchedData(req);

        // Crear en la base de datos usando los datos de req.body //actualizacion en ves de req body le pasamos solo los que pasaron las validaciones.
        const nuevaMembresia = await MembresiaModel.create(datosLimpios);
        
        // Enviar la respuesta exitosa 
        res.status(201).json({message:"membresia creada correctamente", membresia: nuevaMembresia})
    } catch (error) {
        // Manejar el error si algo falla
        res.status(500).json({message:"error interno del servidor", error: error.message});
    }
};

export const obtenerMembresia = async (req, res) => {
    try {
        // Buscar todos en la base de datos
        const membresia = await MembresiaModel.find()
        
        // Enviar la respuesta con la lista 
        res.status(200).json({message:"se encontro la lista de membresias exitosamente", membresia:membresia});
    } catch (error) {
        // Manejar el error
        res.status(500).json({message: "error interno del servidor", error:error.message});
    }
};

export const obtenerMembresiaPorId = async (req, res) => {
    try {
        // Extraer el ID de los parámetros de la URL (req.params)
        const { id } = req.params;
        
        // Buscar en la base de datos usando findById
        const membresia = await MembresiaModel.findById(id);
        
        // Verificar si  existe. Si no existe, responder con un 404
        if(!membresia) {
            return res.status(404).json({message: "membresia no encontrado"});
        }
        
        // Enviar la respuesta exitosa 
        res.status (200).json({message:"membresia ecnontrado", membresia: membresia})
        
    } catch (error) {
        //Manejar el error (ej: si el ID tiene un formato inválido)
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

export const actualizarMembresia = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la URL
        const { id } = req.params;

        //nuevamente solo obtenemos los datos validos para actualizar 
        const datosLimpios = matchedData(req);
        
        // Usar updateOne buscando por _id y pasando los nuevos datos y tambien actualizamos el req.body por los datos limpios
        const membresiaActualizada = await MembresiaModel.updateOne({ _id: id }, datosLimpios);
        
        // Responder con el resultado
        return res.status(200).json({
            message: "Se actualizó correctamente", 
            membresia: membresiaActualizada
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
};

export const membresiaEliminado = async(req, res) => {
    try {
        const { id } = req.params;

        // Buscamos y desactivamos, { new: true } nos devuelve el doc actualizado
        const membresiaBorrada = await MembresiaModel.findByIdAndUpdate(
            id, 
            { activate: false }, 
            { new: true }
        );

        // Ahora sí verificamos la variable correcta
        if (!membresiaBorrada) {
            return res.status(404).json({ message: "membresia no encontrada" });
        }

        res.status(200).json({ 
            message: "La membreisa fue dada de baja con éxito", 
            data: membresiaBorrada 
        });
    } catch(error) {
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};