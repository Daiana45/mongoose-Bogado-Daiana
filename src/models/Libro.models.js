import { model, Schema, Types } from "mongoose";

const libroSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    anioPublicacion: {
        type: Number,
        required: true,
    },
    //relacion de uno a muchos, la referencia en la parte de muchos.
    autor: {
        type: Types.ObjectId,
        ref: "Autor",
        required: true,
    },
    //relacion muchos a muchos. Array de referencia.
    clasificaciones: [{
        type: Types.ObjectId,
        ref: "Clasificacion",
    }],

    //campo para la eliminacion logica
    activate: {type: Boolean, default: true} //marcamos la ficha del libro como dado de baja, el libro sigue ahi pero el sistema sabe que no debe mostrarlo
    //cuando mongoose crea un libro le pone activate: true, y para que no se borre para siempre usamos: await LibroModel.findByIdAndUpdate(id, { activate: false }, { new: true }); 
},
{
    timestamps: true,
    versionKey: false,
}
);

export const LibroModel = model("Libro", libroSchema);