let Comentario = require('../models/Comentario');
let Post = require('../models/Post');
let Usuario = require('../models/Usuario');
let Respuesta = require('../models/Respuesta');

exports.publicarRespuesta = function(req,res){
    let ss = req.body.slug;
    let us = req.body.usuariologueado;
    
 
    Comentario.findOne({_id: req.body.comentarioid}).then(comentario=>{

        const nueva_respuesta = new Respuesta({
            contenido: req.body.contenido,
            comentario: comentario.id,
            post: comentario.post
        });

        Usuario.findOne({_id: us}).then(usuario=>{
            nueva_respuesta.usuario = usuario.id;
        });
        
        comentario.respuestas.push(nueva_respuesta);
        comentario.save().then(guardado=>{
            nueva_respuesta.save().then(respuesta_guardada=>{
                Post.findOne({_id: respuesta_guardada.post}).then(post=>{
                    req.flash('mensaje_success', 'La respuesta al comentario ha sido publicada.');
                    res.redirect(`/post/${post.slug}`);
                })
            });
        });     
    });   
}
