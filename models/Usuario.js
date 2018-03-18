const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    nombre_usuario:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:Schema.Types.ObjectId,
        ref: 'roles'
    }

});

module.exports = mongoose.model('usuarios', UsuarioSchema);