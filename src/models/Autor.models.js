import { Schema, model } from "mongoose";

const autorSchema = new Schema ({
    nombre:{
        type: String,
        required: true,
    },
    nacionalidad:{
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
},
{
    versionKey: false,
},
);

export const AutorModel = model ("Autor", autorSchema);