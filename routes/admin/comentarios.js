const express = require('express');
const router = express.Router();
const ComentarioController = require('../../controllers/comentariosController');
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.get('/*', (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', ComentarioController.index);

router.post('/enviarComentario', ComentarioController.enviarComentario);
router.delete('/eliminarComentario/:id', ComentarioController.eliminarComentario);

router.post('/aprobar-comentario', ComentarioController.aprobarComentario);
router.put('/editar/:id', ComentarioController.editarComentario);

module.exports = router;