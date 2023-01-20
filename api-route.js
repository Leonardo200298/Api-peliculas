"use strict"
require('dotenv').config();

const peliculasController = require('./controllers/peliculasController.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//tabla de ruteo 
/* Implicitamente javascript envia los parametros req y res al controlador peliculas */
app.get('/',peliculasController.conseguirTodasLasPeliculas);
app.get('/:id',peliculasController.conseguirPelicula);
app.delete('/:id',peliculasController.eliminarPelicula);
app.post('/',peliculasController.crearPelicula);
app.put('/:id',peliculasController.editarPelicula);

//se queda escuchando el puerto
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

