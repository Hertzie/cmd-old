const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespuestaSchema = new Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    contenido:{
        type: String,
        required:true
    },
    comentario:{
        type: Schema.Types.ObjectId,
        ref: 'comentarios'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }
});

module.exports = mongoose.model('respuestas', RespuestaSchema);