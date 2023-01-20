"use strict";





const PeliculasModel = require('../models/peliculas.model');

exports.conseguirTodasLasPeliculas = async (req, res) => {
    let peliculas = await PeliculasModel.conseguirPeliculasDb();
    res.send(peliculas);
}

exports.conseguirPelicula = async (req, res) => {
    let { id } = req.params;
    let pelicula = await PeliculasModel.conseguirPeliculaDb(id);
    if (pelicula)
        res.send(pelicula);

    else
        res.status(404).send(`La pelicula con el id=${id} no existe`);

}
exports.eliminarPelicula = async (req, res) => {
    let { id } = req.params;
    let peliculaAEliminar = await PeliculasModel.conseguirPeliculaDb(id);
    if (peliculaAEliminar) {
        await PeliculasModel.eliminarPeliculaDB(id);
        res.status(200).send(`La pelicula con el id=${id} se elimino con exito`);
    } else {
        res.status(404).send(`La pelicula con el id=${id} que quiere eliminar no existe`);
    }
}
exports.crearPelicula = async (req, res) => {
    let nombre = req.body.nombre;
    let anio = req.body.anio;
    let produccion = req.body.produccion;
    let recaudacion = req.body.recaudacion;
    let id_genero = req.body.id_genero;
    try {
        if (nombre === "" || anio === "" || id_genero === "") {
            res.status(404).send("Necesita llenar los campos nombre, anio y id_genero");

        } else {
            await PeliculasModel.crearPeliculaDB(nombre, anio, produccion, recaudacion, id_genero);
            res.status(201).send("Se ha creado la pelicula con exito");
        }

    } catch (error) {
        console.log(error)
    }
}
exports.editarPelicula = async (req, res) => {
    let { id } = req.params;
    if (req.body.nombre === "" || req.body.anio === "" || req.body.id_genero === "") {
        res.status(404).send("Necesita llenar los campos nombre, anio y id_genero, para editar");

    } else {
        await PeliculasModel.editarPeliculaDB(req.body.nombre, req.body.anio, req.body.produccion, req.body.recaudacion, req.body.id_genero, id);
        res.status(200).send(`Se ha editado la pelicula con el id=${id}`);

    }
}

