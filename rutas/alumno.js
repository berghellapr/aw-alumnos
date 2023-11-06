const express = require('express');
const router = express.Router();

const Alumno = require('../models/alumno');
const alumnoControlador = require('../controladores/alumno');


router.post('/register', alumnoControlador.register);
router.post('/login', alumnoControlador.login);
router.get('/', alumnoControlador.listadoAlumnos);
router.get('/:id', alumnoControlador.getAlumnoById);
router.put('/:id', alumnoControlador.updateAlumno);
router.delete('/:id', alumnoControlador.deleteAlumno);

module.exports = router;