const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const alumnoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    cursosInscrip: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Curso'
    }] //representa mi array de IDs de cursos
});

alumnoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Alumno', alumnoSchema);