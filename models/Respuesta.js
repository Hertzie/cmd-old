const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespuestaSchema = new Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    cuerpo:{
        type: String,
        required:true
    }
});