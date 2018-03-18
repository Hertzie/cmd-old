const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FotoSchema = new Schema({
    ruta:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('fotos', FotoSchema);