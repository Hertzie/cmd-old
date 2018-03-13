const express = require('express');
const router = express.Router();
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req,res)=>{
    res.render('admin/usuarios/index');
});

router.get('/crear', (req,res)=>{
    res.render('admin/usuarios/crear');
});

module.exports = router;