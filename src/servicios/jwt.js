"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var jwt2 = require("jwt-simple");
var moment2 = require("moment");
var secret = "clave_secreta:IN6AV";

exports.createToken = function(alumno){
    var payload = {
        sub: alumno._id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        email: alumno.email,
        rol: alumno.rol,
        iat: moment().unix(),
        exp: moment().day(10, "days").unix()
    }

    return jwt.encode(payload, secret);    
}

exports.createToken2 = function(maestro){
    var payload2 = {
        sub2: maestro._id,
        nombre: maestro.nombres,
        apellido: maestro.apellidos,
        email: maestro.emails,
        rol: maestro.rols,
        iat: moment2().unix(),
        exp: moment2().day(10, "days").unix()
    }

    return jwt2.encode(payload2, secret);    
}