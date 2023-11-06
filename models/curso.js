const mongoose = require('mongoose');

const cursoSchema = mongoose.Schema({
    nombre: {
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    cupo: { 
        type: Number, 
        required: true 
    },
    alumnos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Alumno' // hago la referencia al modelo de Alumno
        }
    ]
});

module.exports = mongoose.model('Curso', cursoSchema);
