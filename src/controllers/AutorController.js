import { AutorModel } from "../models/Autor.models.js";
import { LibroModel } from "../models/Libro.models.js";

export const crearAutor = async (req, res) => {
    try {
        // Crear el autor en la base de datos usando los datos de req.body
        const nuevoAutor = await AutorModel.create(req.body);
        
        // Enviar la respuesta exitosa con el autor creado
        res.status(201).json({message:"autor creado correctamente", autor: nuevoAutor})
    } catch (error) {
        // Manejar el error si algo falla
        res.status(500).json({message:"error interno del servidor", error: error.message});
    }
};

export const obtenerAutor = async (req, res) => {
    try {
        // Buscar todos los autores en la base de datos
        const autor = await AutorModel.find()
        
        // Enviar la respuesta con la lista de autores
        res.status(200).json({message:"se encontro la lista de autores exitosamente", autor: autor});
    } catch (error) {
        // Manejar el error
        res.status(500).json({message: "error interno del servidor", error:error.message});
    }
};

export const obtenerAutorPorId = async (req, res) => {
    try {
        // Extraer el ID de los parámetros de la URL (req.params)
        const { id } = req.params;
        
        // Buscar el autor en la base de datos usando findById
        const autor = await AutorModel.findById(id).populate('libros');
        
        // Verificar si el autor existe. Si no existe, responder con un 404
        if(!autor) {
            return res.status(404).json({message: "autores no encontrado"});
        }
        
        // Enviar la respuesta exitosa con el autor
        res.status (200).json({message:"autor ecnontrado", autor: autor})
        
    } catch (error) {
        //Manejar el error (ej: si el ID tiene un formato inválido)
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

export const actualizarAutor = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la URL
        const { id } = req.params;
        
        // Usar updateOne buscando por _id y pasando los nuevos datos
         const autorActualizado = await AutorModel.updateOne({ _id: id }, req.body);
        
        // Responder con el resultado
        return res.status(200).json({message: "se actualizo correctamente", autorActualizado: autorActualizado});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
};

export const autorEliminado = async(req,res) => {
    try {
    const {id} = req.params;

    const autorBorrado = await AutorModel.findByIdAndUpdate(id,{activate: false}, {new: true}); //buscamos el autor por su id, y new:true sirve para que la variable autorBorrado guarde los datos del autor ya actualizados.
if(!autorBorrado){
    return res.status(404).json({message: "autor no encontrado"})
}

//la eliminacion de todos los libros del autor, buscamos el campo autor donde el id coincida y actualizamos el campo activate a false 
await LibroModel.updateMany({autor: id}, {activate:false});

    res.status(200).json({message: "el autor y sus libros fueron eliminados con exito", autorBorrado: autorBorrado});
} catch(error) {
return res.status(500).json({message: "error interno del servidor", error: error.message});
}
}
