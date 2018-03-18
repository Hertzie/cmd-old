let Usuario = require('../models/Usuario');
let Comentario = require('../models/Comentario');
let Respuesta = require('../models/Respuesta');
let Rol = require('../models/Rol');

exports.index = (req,res) => {
    Usuario.find({}).populate('rol').then(usuarios=>{
        Rol.find({}).then(roles=>{
            res.render('admin/usuarios/index', {usuarios:usuarios, roles:roles});
        });
    });
}

exports.editar = (req,res) => {
    Usuario.findOne({_id: req.params.id}).populate('rol').then(usuario=>{
        usuario.nombre = req.body.nombre;
        usuario.nombre_usuario = req.body.nombre_usuario;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;
        usuario.save().then(actualizado=>{
            req.flash('mensaje_actualizado', 'Los datos del usuario han sido actualizados.');
            res.redirect('/admin/usuarios');
        });
    });
}

exports.eliminar = (req,res) => {
    Usuario.findOne({_id: req.params.id}).then(usuario=>{
        //Eliminando los posts del Usuario con sus respectivos comentarios y respuestas del post
        Post.find({usuario: usuario.id}).then(posts=>{
           posts.forEach(post=>{
                Comentario.find({post: post.id}).then(comentarios=>{
                    comentarios.forEach(comentario=>{
                        Respuesta.find({comentario: comentario.id}).then(respuestas=>{
                            respuestas.forEach(respuesta=>{
                                respuesta.remove();
                            });
                        });
                        comentario.remove();
                    });
                });
                post.remove();
           });
        });
        //Eliminando los comentarios y respuestas restantes del usuario en el resto de la app (comentarios del usuario)
        Comentario.find({usuario: usuario.id}).then(comentarios=>{
            comentarios.forEach(comentario=>{
                Respuesta.find({comentario:comentario.id}).then(respuestas=>{
                    respuestas.forEach(respuesta=>{
                        respuesta.remove();
                    });
                });
                comentario.remove();
            });
        });
        //Eliminando las respuestas restantes del usuario en la app (respuestas donde no sea su comentario)
        Respuesta.find({usuario: usuario.id}).then(respuestas=>{
            respuestas.forEach(respuesta=>{
                respuesta.remove();
            });
        });
        usuario.remove().then(eliminado=>{
            req.flash('mensaje_eliminado', 'El usuario: ' + usuario.nombre + 'y sus posts, comentarios y respuestas han sido eliminados.');
            res.redirect('/admin/usuarios');
        });
    });
}