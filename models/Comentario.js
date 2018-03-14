const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    cuerpo:{
        type: String,
        required: true
    },
    aprobado:{
        type:Boolean,
        default: false
    },
    post:{
        type:Schema.Types.ObjectId,
        ref: 'posts'
    },
    respuestas: [{
        type: Schema.Types.ObjectId,
        ref: 'respuestas'
    }]

});

module.exports = mongoose.model('comentarios', ComentarioSchema);