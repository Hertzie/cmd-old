module.exports = {
    usuarioAutenticado: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('mensaje_eliminado','Tienes que iniciar sesión para continuar.');
        res.redirect('/login');
    }
}