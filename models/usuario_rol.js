

exports.getUserRol = function(req,res){
    Usuario.find({_id: req.user.id}).populate('roles').then(usuario=>{
        Rol.find({}).then(roles=>{
            roles.forEach(rol=>{
                usuario.roles.forEach(rol_usuario=>{
                    if(rol_usuario === rol.id){
                        res.render('vista');
                    }else{
                        res.redirect('/login');
                    }
                });
            });
        });
    });

    Usuario.find({_id: req.user.id}).then(usuario=>{
        Rol.find({nombre: 'Administrador'}).then(rol=>{
            usuario.roles.forEach(user_rol=>{
                if(user_rol === rol.id){
                    res.render('vista');
                }
            });
            res.redirect('/home');
        });
    });
}