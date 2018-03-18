const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolSchema = new Schema({
    nombre:{
        type:String
    }
});

module.exports = mongoose.model('roles', RolSchema);