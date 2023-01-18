"use strict"

/* correr nodemon con npm run dev */

const peliculasController = require('./controllers/peliculasController.js')
const express = require('express');
const app = express();
const port = 3020;

//tabla de ruteo 
/* app.get('/peliculas', function (req, res) {
    peliculasController.conseguirTodasLasPeliculas(req, res);
}); */

/* Implicitamente javascript envia los parametros req y res al controlador peliculas */
app.get('/peliculas',peliculasController.conseguirTodasLasPeliculas);

//se queda escuchando el puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})