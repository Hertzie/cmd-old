module.exports = {
    usuarioAutenticado: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('mensaje_eliminado','Tienes que iniciar sesión para continuar.');
        res.redirect('/login');
    },

    administrador: function(req,res,next){
        if(req.user.rol){
            return next();
        }
        req.flash('mensaje_eliminado', 'No tienes permisos para acceder a esta sección.');
        res.redirect('/admin/index');
    }
}