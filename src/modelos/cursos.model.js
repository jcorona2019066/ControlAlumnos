'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CursoSchema = Schema({

    nombre: String,
    alumnos: String,
    maestro: String
})

module.exports = mongoose.model('cursos', CursoSchema);