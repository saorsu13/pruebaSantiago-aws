const express = require('express');
const router = express.Router();
const { iniciarSesion } = require('../controllers/usuariosController');
const { crearUsuario } = require('../controllers/usuariosController');
const { cerrarSesion } = require('../controllers/usuariosController');



router.post('/login', iniciarSesion);
router.post('/register', crearUsuario);
router.post('/logout', cerrarSesion);

module.exports = router;
