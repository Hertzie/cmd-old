const express = require('express');
const router = express.Router();
const HomeController = require('../../controllers/homeController');

router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/', HomeController.index);
router.get('/about', HomeController.about);
router.get('/login', HomeController.loginGet);
router.post('/login', HomeController.loginPost);
router.get('/logout', HomeController.logOut);
router.get('/registro', HomeController.registroGet);
router.post('/registro', HomeController.registroPost);
router.get('/post/:slug', HomeController.verPost);

module.exports = router;