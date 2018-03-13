let Comentario = require('../models/Comentario');
let Post = require('../models/Post');
let Usuario = require('../models/Usuario');
let Respuesta = require('../models/Respuesta');

exports.index = function(req,res){
    Respuesta.find({}).populate('usuario').then(respuestas=>{
        
    });
}