const express = require('express');
const router = express.Router();
const AdminIndex = require('../../controllers/adminIndexController');
const { usuarioAutenticado } = require('../../helpers/autenticacion');

router.all('/*', usuarioAutenticado, (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});
router.get('/', AdminIndex.index);
router.post('/generar-random-posts', AdminIndex.generarRandomPosts);

module.exports = router;