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

//agregamos esto porque finge que el campo libros existe asi cuando hacemos una consulta nos devuelve el libro con el autor.
autorSchema.virtual('libros',{ //creamos una propiedad fantasma llamada libros al esquema del autor.
    ref: 'Libro', //la coleccion a la que vamos a buscar
    localField: '_id', //el campo en el Autor (su propio ID) para la busqueda
    foreignField: 'autor', //el campo en el libro que coincide con el ID del autor
    justOne: false //como es 1:N, queremos un array de libros, no solo uno
});

//para que los virtuals aparezcan cuando convertimos el documento a JSON, porque cuando hacemos un res.json mongoose convierte el documento en json pero borra los virtuales, entonces estas lineas hacen que se incluya.
autorSchema.set('toJSON', {virtuals: true});
autorSchema.set('toObject', {virtuals: true});

export const AutorModel = model ("Autor", autorSchema); 