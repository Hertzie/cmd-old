const express = require('express');
const router = express.Router();
const { usuarioAutenticado } = require('../../helpers/autenticacion');
let UsuarioController = require('../../controllers/usuariosController');

router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', UsuarioController.index);
router.put('/editar/:id', UsuarioController.editar);
module.exports = router;