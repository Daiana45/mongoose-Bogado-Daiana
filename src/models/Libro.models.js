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
    }]
},
{
    timestamps: true,
    versionKey: false,
}
);

export const LibroModel = model("Libro", libroSchema);