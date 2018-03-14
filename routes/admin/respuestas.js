const express = require('express');
const router = express.Router();
const RespuestaController = require('../../controllers/respuestasController');
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.get('/*', usuarioAutenticado, (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.post('/publicar', RespuestaController.publicarRespuesta);

module.exports = router;