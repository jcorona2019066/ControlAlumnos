"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MaestroSchema = Schema({
    nombre: String,
    apellido: String,
    password: String,
    email:String,
    rol: String,

})

module.exports = mongoose.model("maestro", MaestroSchema);