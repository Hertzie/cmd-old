let Post = require('../models/Post');
const faker = require('faker');

exports.index = function(req,res){
    res.render('admin/index');
}

exports.generarRandomPosts = function(req,res){
    let cantidad = req.body.cantidad;
    for(let i = 0; i < cantidad; i++){
        const nuevo = new Post({
            titulo:  faker.name.title(),
            archivo: 'http://via.placeholder.com/350x150',
            tipoPublicacion: 'publico',
            cuerpo: faker.lorem.sentence(),
            permitirComentarios: faker.random.boolean(),
            fecha_creacion: new Date().toLocaleString(),
            fecha_actualizacion: new Date().toLocaleString()
        });
        nuevo.save().then(guardado =>{
            
        }).catch(error=>{console.log(error)});
    }
    req.flash('mensaje_success', 'Los ' + cantidad + ' posts han sido creados.');
    res.redirect('/admin/posts');
}