"use strict"

// variables
const express= require("express");
const app = express();
const bodyParser = require("body-parser");

//Importacion de rutas
var rutas = require("./src/rutas/rutas");
//var maestro_rutas = require("./src/rutas/maestro.rutas")

//middlewear
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//aplicacion de rutas
app.use("/api", rutas);

//Exportar
module.exports = app;