// Se usa javascript en modo estricto
"use strict";

// Archivo que permite configurar ciertos elementos a partir del ambiente en el que se corre el proyecto
//const env = require('./env');

// Se usa Express, una infraestructura web rápida, minimalista y flexible para Node.js
const express = require("express");

// Inicializacion de Express
const app = express();

// Objeto para las rutas - API
const router = express.Router();


// Se usa Body-Parser, se encarga de analizar los cuerpos (body) de las solicitudes en el middleware antes que nuestros manejadores lo hagan
const bodyParser = require("body-parser");

// Se usa CORS, que permite proveer un middleware Connect/Express que puede ser usado para habilitar CORS con varias opciones
//const cors = require("cors");

// Se usa para poder implementar paths
const path = require('path');

// Puerto a usar. Se tiene en cuenta el caso de Heroku
const port = process.env.PORT || 3001;

// Se obtiene la configuración de la base de datos
//const config = require("./database");

// Ruta api
const rutaApi = '/parcial1/api/';

// Configura las peticiones con cuerpo de tipo JSON
app.use(
    bodyParser.json({
        limit: "1mb"
    })
);

// Configura las peticiones con cuerpo de tipo url encoded
app.use(
    bodyParser.urlencoded({
        limit: "1mb",
        extended: true
    })
);


// Se define la ruta de archivos estáticos para el front
app.use(express.static(path.resolve(__dirname, 'client/build')));


//Se conecta al front
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

//Se define el puerto en el que trabaja el servidor
app.listen(port, () => {
    console.log(
        "El servidor de la aplicación está corriendo en el puerto " +
        port +
        " en modo " +
        process.env.NODE_ENV
    );
});