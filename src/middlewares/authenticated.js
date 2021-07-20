"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var jwt2 = require("jwt-simple");
var moment2 = require("moment");
var secret = "clave_secreta:IN6AV";

exports.ensureAuth = function(req, res , next ){
    if(!req.headers.authorization){
        return res.status(404).send({mensaje:"La peticion no tiene la cabecera de Autentificacion"});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'')

    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment.unix()){
            return res.status(401).send({
                mensaje:"El token ha expirado"
            });
        }
    } catch (error) {
        return res.status(404).send({
            mensaje: "El token no es valido"
        })
    }

    req.user = payload;
    next();
}


exports.ensureAuth = function(req, res , next ){
    if(!req.headers.authorization){
        return res.status(404).send({mensaje:"La peticion no tiene la cabecera de Autentificacion"});
    }

    var token2 = req.headers.authorization.replace(/['"]+/g,'')

    try {
        var payload2 = jwt2.decode(token2, secret);
        if(payload2.exp <= moment2.unix()){
            return res.status(401).send({
                mensaje:"El token ha expirado"
            });
        }
    } catch (error) {
        return res.status(404).send({
            mensaje: "El token no es valido"
        })
    }

    req.user = payload2;
    next();
}