import { model, Schema, Types } from "mongoose";

const membresiaSchema = new Schema({
    tipo:{
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        required: true,
        default: true,
    },
    membresiaCliente: {
        type: Types.ObjectId,
        ref: "Cliente",
        required: true,
    }
},
{
    versionKey: false,
    timestamps: true,
},
);

export const MembresiaModel = model("Membresia", membresiaSchema);