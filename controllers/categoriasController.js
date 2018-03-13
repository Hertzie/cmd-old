let Categoria = require('../models/Categoria');

exports.index = function(req,res){
    Categoria.find({}).then(categorias => {
        res.render('admin/categorias/index', {categorias:categorias});
    }).catch(error=>{console.log(error)});
}

exports.nuevaCategoria = function(req,res){
    const nueva = new Categoria({
        nombre: req.body.nombre
    });
    nueva.save().then(guardada=>{
        req.flash('mensaje_success', 'La categoría ' + guardada.nombre + ' ha sido creada.');
        res.redirect('/admin/categorias');
    }).catch(error=>{console.log(error)});
}

exports.eliminarCategoria = function(req,res){
    Categoria.findOne({_id: req.params.id}).then(categoria=>{
        categoria.remove().then(eliminada=>{
            req.flash('mensaje_eliminado', 'La categoría ' + eliminada.nombre + ' ha sido eliminada');
            res.redirect('/admin/categorias');
        }).catch(error=>{console.log(error)});
    });
}