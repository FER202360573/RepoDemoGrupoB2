const mongoose = require("mongoose");

//creamos una clase con todos los campos del formulario
const UsuarioEsquema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true //para que no vaya vacio
    },
    email:{
        type:String,
        required:true
    },
    genero:{
        type:String,
        required:true
    },
    plataformas:{
        type:[String]
    }
});

module.exports = mongoose.model("Usuario", UsuarioEsquema); //es poner a disposicion dentro del proyecto este esquema.
