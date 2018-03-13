const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const ComentarioController = require('../../controllers/comentariosController');
const PostController = require('../../controllers/postController');
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});
//Ruta raiz de posts
router.get('/', PostController.index);

//Rutas para crear post
router.get('/crear', PostController.crearGet);
router.post('/crear', PostController.crearPost);

//Rutas para editar,actualizar y eliminar post
router.put('/actualizar/:id', PostController.actualizarPost);
router.delete('/eliminar/:id', PostController.borrarPost);
router.post('/aprobar-comentarios-post', PostController.activarComentarios);

//Eliminar todos los posts
router.delete('/eliminarTodos', PostController.eliminarTodos);

//Obtener los comentarios del posts en admin
router.get('/comentarios-post/:id', ComentarioController.comentariosPost);




module.exports = router;