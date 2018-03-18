let Post = require('../models/Post');
let Categoria = require('../models/Categoria');
let Comentario = require('../models/Comentario');
const {estaVacio} = require('../helpers/upload-helper');
const path = require('path');
const file_system = require('fs');
const directorio = path.join(__dirname, '../public/uploads/');


exports.index = function(req,res){
    Post.find({usuario:req.user.id}).populate('categoria').populate('usuario').then(posts =>{
        Categoria.find().then(categorias=>{
            res.render('admin/posts/index', {posts: posts, categorias: categorias});
        });
    }).catch(error => {console.log(error)});
}

exports.todosLosPosts = (req,res) => {
    Post.find({}).populate('categoria').populate('usuario').then(posts=>{
        Categoria.find().then(categorias=>{
            if(req.user.rol){
                res.render('admin/posts/todos', {posts:posts, categorias:categorias});
            }else{
                res.render('admin/index');
            }
        });
    }).catch(error=>{console.log(error)});
}

exports.crearGet = function(req,res){
    res.render('admin/posts/crear');
}

exports.crearPost = function(req,res){
    let nombre_archivo = 'http://via.placeholder.com/350x150';
    if(!estaVacio(req.files)){
        let archivo = req.files.archivo;
        nombre_archivo = Date.now() + '-' + archivo.name;
        archivo.mv('./public/uploads/' + nombre_archivo, (error)=>{
            if(error) throw error;
        });
    }
    let comentarios = (req.body.permitirComentarios ? true : false);
    const nuevo = new Post({
        titulo: req.body.titulo,
        categoria:req.body.categoria,
        archivo: nombre_archivo,
        tipoPublicacion: req.body.tipoPublicacion,
        cuerpo: req.body.cuerpo,
        permitirComentarios: comentarios,
        fecha_creacion: new Date().toLocaleString(),
        fecha_actualizacion: 'Sin actualizar',
        usuario: req.user.id
    });
    nuevo.save().then(guardado =>{
        req.flash('mensaje_success', 'El post ' + guardado.titulo + ' ha sido creado.');
        res.redirect('/admin/posts');
    }).catch(error=>{console.log(error)});   
}

exports.actualizarPost = function(req,res){
    let comentarios = (req.body.permitirComentarios ? true : false);
    let nombre_archivo = 'http://via.placeholder.com/350x150';
    if(!estaVacio(req.files)){
        let archivo = req.files.archivo;
        nombre_archivo = Date.now() + '-' + archivo.name;
        archivo.mv('./public/uploads/' + nombre_archivo, (error)=>{
            if(error) throw error;
        });
    }
    Post.findOne({_id: req.params.id}).then(post=>{
        file_system.unlink(directorio + post.archivo, (error)=>{
            post.titulo = req.body.titulo;
            post.archivo = nombre_archivo;
            post.tipoPublicacion = req.body.tipoPublicacion;
            post.categoria = req.body.categoria;
            post.cuerpo = req.body.cuerpo;
            post.permitirComentarios = comentarios;
            post.fecha_actualizacion = new Date().toLocaleString(); 
            post.save().then(actualizado=>{
                if(req.user.rol){
                    req.flash('mensaje_actualizado', 'El post ' + actualizado.titulo + ' ha sido actualizado.');
                    res.redirect('/admin/posts/todos-los-posts');
                }else{
                    req.flash('mensaje_actualizado', 'El post ' + actualizado.titulo + ' ha sido actualizado.');
                    res.redirect('/admin/posts');
                }
            });
        });
    });
}

exports.borrarPost = function(req,res){
    Post.findOne({_id: req.params.id}).populate('comentarios').then(post=>{
        file_system.unlink(directorio + post.archivo, (error)=>{
            if(!post.comentarios.length < 1){
                post.comentarios.forEach(comentario=>{
                    comentario.remove();
                });
            }
            post.remove().then(eliminado=>{
                req.flash('mensaje_eliminado', 'El post ' + eliminado.titulo + ' ha sido eliminado');
                res.redirect('/admin/posts');
            });            
        });
    });
}

exports.eliminarTodos = function(req,res){
    Post.find({}).then(encontrados=>{
        encontrados.forEach(function(post){
            file_system.unlink(directorio + post.archivo, (error)=>{
                post.remove().then(removido=>{});
            });
        });
        req.flash('mensaje_eliminado', 'Los posts han sido eliminados.');
        res.redirect('/admin/posts');
    }).catch(error=>{console.log(error)});
}

exports.activarComentarios = function(req,res){
    Post.findByIdAndUpdate(req.body.post_id, {$set:{permitirComentarios:req.body.post_comentario}}, (error,resultado)=>{
        if(error) throw error;
        res.send(resultado);
    });
}
