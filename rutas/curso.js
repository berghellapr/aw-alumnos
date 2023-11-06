const express = require('express');
const router = express.Router();

const Curso = require('../models/curso'); 
const cursoControlador = require('../controladores/curso');

const auth = require('../middleware/auth');

router.post('/', auth, cursoControlador.crearCurso);
router.get('/:id', auth, cursoControlador.datosDeUnCurso);
router.get('/', cursoControlador.listadoCursos);
router.put('/:id', auth, cursoControlador.modificarCurso);
router.delete('/:id', auth, cursoControlador.borrarCurso);

module.exports = router;