let Rol = require('../models/Rol');

exports.index = (req,res) => {
    Rol.find({}).then(roles => {
        if(req.user.rol){
            res.render('admin/roles/index', {roles:roles});
        }
        else{
            res.render('admin/index');
        }
    }).catch(error=>{console.log(error)});
}

exports.crearRol = (req,res) => {
    const nuevo_rol = new Rol({
        nombre: req.body.nombre
    });
    nuevo_rol.save().then(guardado=>{
        req.flash('mensaje_success', 'El rol ' + guardado.nombre + ' ha sido creado.');
        res.redirect('/admin/roles');
    });
}

exports.editarRol = (req,res) => {
    Rol.findOne({_id: req.params.id}).then(rol=>{
        rol.nombre = req.body.nombre;
        rol.save().then(guardado=>{
            req.flash('mensaje_success', 'El rol ha sido actualizado.');
            res.redirect('/admin/roles');
        });
    });
}
