import { Schema, model } from "mongoose";

const clasificacionSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    activa:{
        type: Boolean,
        default: true,
    },
    //la relacion de n:m, se agrega un array de IDs referenciados.
    clasificaciones:{
        type: Schema.Types.ObjectId, //si importamos al principio types podemos usar solo types.objectID
        ref: "Autor",
    },
},
{
    versionKey: false,
    timestamps: true,
},
);

export const ClasificacionModel = model("Clasificacion", clasificacionSchema);