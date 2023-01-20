"use strict"
require('dotenv').config();

// get the client
const mysql = require('mysql2/promise');


/* Devuelve conexion a la db*/

const conseguirConexion = async () => {
    // create the connection
    return await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database:  process.env.DATABASE
    });

}

exports.conseguirPeliculasDb = async () => {
    try{
        const conexion = await conseguirConexion();
        const [rows] = await conexion.execute('SELECT * FROM peliculas');
        return rows;

    }catch(error){
        console.log(error)
    }
}
exports.conseguirPeliculaDb = async (id) => {
    const conexion = await conseguirConexion();
    /* segundo parametro del execute para bindear el parametro que me llega del controlador */
    const [rows] = await conexion.execute('SELECT * FROM peliculas WHERE id_peliculas = ?', [id]);
    return rows[0];
}
exports.eliminarPeliculaDB = async (id) => {
    const conexion = await conseguirConexion();
    /* segundo parametro del execute para bindear el parametro que me llega del controlador */
    await conexion.execute('DELETE FROM peliculas WHERE id_peliculas = ?', [id]);
}
exports.crearPeliculaDB = async (nombre,anio,produccion,recaudacion,id_genero) => {
    try{

        const conexion = await conseguirConexion();
        await conexion.execute('INSERT INTO peliculas (nombre, anio, produccion, recaudacion, id_genero) VALUES (?, ?, ?, ?, ?)', [nombre,anio,produccion,recaudacion,id_genero])

       
    }catch(error){
        console.log(error)
    }
}
exports.editarPeliculaDB = async (nombre,anio,produccion,recaudacion,id_genero,id)=> {
    const conexion = await conseguirConexion();
    await conexion.execute("UPDATE peliculas SET nombre = ?, anio = ?, produccion = ?, recaudacion= ?, id_genero = ? WHERE id_peliculas = ?",[nombre,anio,produccion,recaudacion,id_genero,id]);

}