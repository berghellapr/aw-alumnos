const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/bd-aw-alumnos')
    .then(()=>{
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error)=>{
        console.log('Error en la conexión a MongoDB');
        console.error(error);
    });

app.use(express.json());

const cursosRutas = require('./rutas/curso');
const alumnosRutas = require('./rutas/alumno');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
     next();
   });
 
 
 app.use('/api/v1/cursos', cursosRutas);
 app.use('/api/v1/auth', alumnosRutas);

module.exports = app;
