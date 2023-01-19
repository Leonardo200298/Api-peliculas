"use strict";

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PeliculasModel = require('../models/peliculas.model');

exports.conseguirTodasLasPeliculas= async  (req, res)=>{
    let peliculas =await  PeliculasModel.conseguirPeliculasDb();
    res.send(peliculas);
}

exports.conseguirPelicula = async (req, res) => {
    let { id } = req.params;
    let pelicula = await PeliculasModel.conseguirPeliculaDb(id);
    if (pelicula)
        res.send(pelicula);

    else
        res.status(404).send(`La tarea con el id=${id} no existe`);
    
}
exports.eliminarPelicula = async (req, res) => {
    let { id } = req.params;
    let peliculaAEliminar = await PeliculasModel.conseguirPeliculaDb(id);
    if (peliculaAEliminar){
        await PeliculasModel.eliminarPeliculaDB(id);
        res.status(200).send(`La pelicula con el id=${id} se elimino con exito`);
    }else{
        res.status(404).send(`La pelicula con el id=${id} que quiere eliminar no existe`);
    }
}
exports.crearPelicula = async (req, res) => {

    let nombre = req.body.nombre;
    let anio = req.body.anio;
    let produccion = req.body.produccion;
    let recaudacion = req.body.recaudacion;
    let id_genero = req.body.id_genero;
   

   /*  if (empty(nombre) || empty(anio)  || empty(id_genero)){

    } */
    try{

        await PeliculasModel.crearPeliculaDB(nombre,anio,produccion,recaudacion,id_genero);
       
    }catch(error){
        console.log(error)
    }
}

