//Definicion de constantes del sistema
const express = require('express');
const app = express();
const path = require('path');
const expHandle = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const uploader = require('express-fileupload');
const session = require('express-session');
const parser = require('cookie-parser');
const toastr = require('express-toastr');

const flash = require('connect-flash');
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');

//Uso de estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Consiguracion de Mongo/Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('Mongo conectado');
}).catch(error => console.log(error));

//Carga de archivos
app.use(uploader());

//Cargar el parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));

//Session, flash, cookie-parser, toast
app.use(parser('tururu'));
app.use(toastr());
app.use(session({
    secret: 'tururu',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());


//Variables locales para usar en flash
app.use((req,res,next)=>{
    res.locals.us = req.user || null;
    res.locals.mensaje_success = req.flash('mensaje_success');
    res.locals.mensaje_eliminado = req.flash('mensaje_eliminado');
    res.locals.mensaje_actualizado = req.flash('mensaje_actualizado');
    res.locals.error = req.flash('error');
    next();
});

//Cargar rutas
const main_home_routes = require('./routes/home/main');
const admin_index_routes = require('./routes/admin/main');
const admin_posts_routes = require('./routes/admin/posts');
const admin_usuarios_routes = require('./routes/admin/usuarios');
const admin_categorias_routes = require('./routes/admin/categorias');
const admin_comentarios_routes = require('./routes/admin/comentarios');
const admin_respuestas_routes = require('./routes/admin/respuestas');
const admin_roles_routes = require('./routes/admin/roles');

//Usar las rutas
app.use('/', main_home_routes);
app.use('/admin', admin_index_routes);
app.use('/admin/posts', admin_posts_routes);
app.use('/admin/usuarios', admin_usuarios_routes);
app.use('/admin/categorias', admin_categorias_routes);
app.use('/admin/comentarios', admin_comentarios_routes);
app.use('/admin/respuestas', admin_respuestas_routes);
app.use('/admin/roles', admin_roles_routes);

//Helpers
const {select, ifCond, fecha, paginacion, logueado, truncar} = require('./helpers/handlebars-helpers');

//Usar template engine handlebars
app.engine('handlebars', expHandle({defaultLayout: 'home', helpers:{select:select, ifCond:ifCond, fecha:fecha, paginacion:paginacion, logueado:logueado, truncar:truncar}}));
app.set('view engine', 'handlebars');


const puerto = process.env.PORT || 4500;
//Ejecutar servidor
app.listen(puerto, () => {
    console.log('Servidor corriendo!');
});
