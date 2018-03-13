let Post = require('../models/Post');
let Categoria = require('../models/Categoria');
let Usuario = require('../models/Usuario');
let Comentario = require('../models/Comentario');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.index = function(req,res){

    const posts_por_pagina = 10;
    const pagina = req.query.pagina || 1;

    Post.find({}).populate('usuario')
        .skip((posts_por_pagina * pagina) - posts_por_pagina)
        .limit(posts_por_pagina)
        .then(posts =>{
                Post.count().then(cantidad_posts=>{
                    Categoria.find({}).then(categorias=>{
                        res.render('home/index', {posts: posts, 
                                                  categorias:categorias,
                                                  actual: parseInt(pagina),
                                                  paginas: Math.ceil(cantidad_posts / posts_por_pagina)});
                    });
                });

    }).catch(error => {console.log(error)});
}

exports.about = function(req,res){
    res.render('home/about');
}

exports.loginGet = function(req,res){
    res.render('home/login');
}

//Configuracion de passport
passport.use(new LocalStrategy({usernameField: 'nombre_usuario'}, (nombre_usuario,password,done)=>{
    
    Usuario.findOne({nombre_usuario:nombre_usuario}).then(usuario=>{
        if(!usuario){
            return done(null,false,{message:'No se encontro un usuario con esas credenciales.'});
        }

        bcrypt.compare(password, usuario.password, (err,matched)=>{
            if(err) throw err;
            if(matched){ return done(null,usuario);}
            else{ return done(null,false,{message:'Contraseña incorrecta.'});}
        });
        
    });
}));

passport.serializeUser(function(user,done){
    console.log(user.id + '---' + user.password);
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    Usuario.findById(id, function(err,user){
        done(err,user);
    });
});

exports.loginPost = function(req,res,next){
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true

    })(req,res,next);   
}

exports.logOut = function(req,res){
    req.logOut();
    res.redirect('/login');
}

exports.registroGet = function(req,res){
    res.render('home/registro');
}

exports.registroPost = function(req,res){

    Usuario.findOne({email:req.body.email}).then(encontrado=>{
        if(encontrado){
            req.flash('mensaje_eliminado','Ya hay un usuario registrado con ese email. Si es usted, inicie sesión.')
            res.redirect('/login');
        }
        else{
            const usuario = new Usuario({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                nombre_usuario: req.body.nombre_usuario,
                password: req.body.password
            });
        
            bcrypt.genSalt(10, (error,salt)=>{
                bcrypt.hash(usuario.password, salt, (err,hash)=>{
                    usuario.password = hash;
                    usuario.save().then(guardado=>{
                        req.flash('mensaje_success', 'El usuario ' + guardado.nombre + " " + guardado.apellido + " ha sido creado.");
                        res.redirect('/login');
                    }).catch(error=>{console.log(error)});
                });
            });
        }
    });

    
}

exports.verPost = function(req,res){
    Post.findOne({slug: req.params.slug}).populate({path: 'comentarios', match:{aprobado:true}, populate:{path: 'usuario', model:'usuarios'}}).populate('usuario').then(post=>{
        Categoria.find({}).then(categorias=>{
            res.render('home/post', {post:post, categorias: categorias});
        });
    }).catch(error=>{console.log});
}
