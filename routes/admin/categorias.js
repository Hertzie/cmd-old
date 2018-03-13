const express = require('express');
const router = express.Router();
const Categoria = require('../../models/Categoria');
const CategoriaController = require('../../controllers/categoriasController');
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', CategoriaController.index);
router.post('/crear', CategoriaController.nuevaCategoria);
router.delete('/eliminar/:id', CategoriaController.eliminarCategoria);

module.exports = router;