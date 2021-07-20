"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlumnoSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,

})

module.exports = mongoose.model("alumno", AlumnoSchema);