const Curso = require('../models/curso');

exports.crearCurso = (req, res, next) => {
    const curso = new Curso({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cupo: req.body.cupo,
        alumnos: req.body.alumnos
    });
    curso.save().then(
        () => {
            res.status(201).json({
                message: 'Curso creado con éxito'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error.message
            });
        }
    );
};

exports.datosDeUnCurso = (req, res, next) => {
    Curso.findOne({
        _id: req.params.id
    }).then(
        (curso) => {
            res.status(200).json(curso);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error.message
            });
        }
    );
};

exports.listadoCursos = (req, res, next) => {
    Curso.find().then(
        (cursos) => {
            res.status(200).json(cursos);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error.message
            });
        }
    );
};

exports.modificarCurso = (req, res, next) => {
    const cursoId = req.params.id;
    const updatedFields = req.body;

    Curso.findByIdAndUpdate(cursoId, updatedFields, { new: true })
        .then(updatedCurso => {
            if (!updatedCurso) {
                return res.status(404).json({ message: 'El curso no se encontró' });
            }
            res.status(200).json(updatedCurso);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

exports.borrarCurso = (req, res, next) => {
    Curso.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Curso eliminado con éxito'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};