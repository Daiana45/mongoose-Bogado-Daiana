import { Schema, model } from "mongoose";

const clienteSchema = new Schema({
    nombre:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
    },
    telefono: {
        type: String,
        unique:true,
        required: true,   
    },
    dni: {
        type: String,
        unique:true,
        required:true,
    },
    activate: {
        type: Boolean,
        default: true,
    },
    direccion: [
        {
            _id:false,
            calle: {
                type:String,
                required: true,
            },
            ciudad: {
                type: String,
                required: true,
            },
            altura: {
                type: Number,
                required: true,
            },
        },
    ],
},
{
    timestamps: true,
    versionKey: false, //quita el _v de mongoose.
}
);

export const ClienteModel = model("Cliente", clienteSchema);