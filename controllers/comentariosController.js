let Comentario = require('../models/Comentario');
let Post = require('../models/Post');
let Usuario = require('../models/Usuario');

exports.index = function(req,res){
    Comentario.find({usuario: req.user.id}).populate('usuario').populate('post').then(comentarios=>{
        Usuario.find({}).then(usuarios=>{
            res.render('admin/comentarios/index', {comentarios:comentarios, usuarios:usuarios});
        });
    }).catch(error=>{console.log});
}

exports.enviarComentario = function(req,res){
    Post.findOne({_id: req.body.id}).then(post=>{
        const nuevo_comentario = new Comentario({
            usuario: req.user.id,
            cuerpo: req.body.cuerpo,
            post: post.id
        });
        if(post.usuario == req.user.id){
            nuevo_comentario.aprobado = true;
        }
        if(req.user.rol){
            nuevo_comentario.aprobado = true;
        }
        post.comentarios.push(nuevo_comentario);
        post.save().then(guardado=>{
            nuevo_comentario.save().then(comentario_guardado=>{

                if(post.usuario == req.user.id || req.user.rol){
                    req.flash('mensaje_success', 'Su comentario ha sido publicado.');
                }
                else{
                    req.flash('mensaje_actualizado', 'Su comentario está pendiente a revisión, por favor espere a que sea moderado.');
                }
                res.redirect(`/post/${post.slug}`);
            });
        });      
    });
}

exports.eliminarComentario = function(req,res){
    Comentario.findOne({_id:req.params.id}).then(comentario=>{
        comentario.remove().then(eliminado=>{
            Post.findOneAndUpdate({comentarios:req.params.id}, {$pull: {comentarios: req.params.id}}, (err,datos)=>{
                if(err) throw err;
                req.flash('mensaje_eliminado', 'El comentario ' + eliminado.cuerpo + ' ha sido eliminado');
                res.redirect('/admin/comentarios');
            });
        });     
    });
}

exports.aprobarComentario = function(req,res){
    Comentario.findByIdAndUpdate(req.body.comentario_id, {$set: {aprobado: req.body.comentario_aprobado}}, (error,resultado)=>{
        if(error) throw error;
        res.send(resultado);
    });
}

exports.comentariosPost = function(req,res){
    Post.findOne({_id: req.params.id}).then(post=>{
        Comentario.find({post:post.id}).populate({path: 'usuario', model:'usuarios', populate:{path:'rol', model:'roles'}}).then(comentarios=>{
            if(post.usuario == req.user.id || req.user.rol){
                res.render('admin/posts/comentarios-post', {comentarios:comentarios, post:post});
            }
            else{
                res.render('admin/posts');
            }
        });
    })
}

exports.editarComentario = function(req,res){
    Comentario.findOne({_id: req.params.id}).then(comentario=>{
        comentario.cuerpo = req.body.cuerpo;
        comentario.save().then(actualizado=>{
            req.flash('mensaje_actualizado', 'El comentario ha sido actualizado.');
            res.redirect('/admin/comentarios');
        });
    });
}

