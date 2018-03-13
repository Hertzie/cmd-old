const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const URL = require('mongoose-url-slugs');

const PostSchema = new Schema({

    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'categorias'
    },

    titulo:{
        type:String,
        required:true
    },
    tipoPublicacion:{
        type:String,
        default:'publico'
    },
    cuerpo:{
        type:String,
        required:true
    },
    permitirComentarios:{
        type:Boolean,
        required:true
    },
    archivo:{
        type:String
    },
    fecha_creacion:{
        type:String,
        
    },
    fecha_actualizacion:{
        type:String,
        
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'comentarios'
    }],
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    slug:{
        type:String
    }
});

PostSchema.plugin(URL('titulo', {field: 'slug'}));
module.exports = mongoose.model('posts', PostSchema);

