"use strict"
const express = require('express');
const app = express();
const port = 3020;

//tabla de ruteo 
app.get('/', function (req, res) {
    res.send('Hello World!');
});

//se queda escuchando el puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})