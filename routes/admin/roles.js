const express = require('express');
const router = express.Router();
const RolesController = require('../../controllers/rolesController');
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.all('/*', usuarioAutenticado, (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', RolesController.index);
router.post('/crear', RolesController.crearRol);
router.put('/editar/:id', RolesController.editarRol);


module.exports = router;

