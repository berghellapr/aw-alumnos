const Alumno = require('../models/alumno');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//register
exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const alumno = new Alumno({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: hash
            });
            alumno.save().then(
                () => {
                    res.status(201).json({
                        message: 'Alumno registrado con éxito!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error.message
                    });
                }
            );
        }
    );
};

//login
exports.login = (req, res, next) => {
    Alumno.findOne({ email: req.body.email }).then(
        (alumno) => {
            if (!alumno) {
                return res.status(401).json({
                    error: new Error('Alumno no encontrado!')
                });
            }
            bcrypt.compare(req.body.password, alumno.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Password incorrecta')
                        });
                    }
                    const token = jwt.sign(
                        { tknUserId: alumno._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.status(200).json({
                        tknUserId: alumno._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error.message
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error.message
            });
        }
    );
};

//obtener todos los alumnos
exports.listadoAlumnos = (req, res, next) => {
    Alumno.find().then(
        (alumnos) => {
            res.status(200).json(alumnos);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error.message
            });
        }
    );
};

//obtener un alumno por ID
exports.getAlumnoById = (req, res, next) => {
    Alumno.findOne({
        _id: req.params.id
    }).then(
        (alumno) => {
            res.status(200).json(alumno);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error.message
            });
        }
    );
};

// actualizar un alumno por su ID
exports.updateAlumno = async (req, res) => {
    try {
        const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(alumnoActualizado);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// eliminar un alumno por su ID
exports.deleteAlumno = async (req, res) => {
    try {
        await Alumno.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Alumno eliminado correctamente' });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}