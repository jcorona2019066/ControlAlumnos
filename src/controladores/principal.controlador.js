'use strict'
var bcrypt = require('bcrypt-nodejs');


var Maestro = require("../modelos/maestro.model");

function crearMaestro(req, res) {
    var pMaestro = Maestro();
    pMaestro.nombre = "David",
    pMaestro.apellido = "Escobar",
    pMaestro.password = "123456",
    pMaestro.email = "admin@gmail.com"
    pMaestro.rol = "ROL_MAESTRO"
    Maestro.find({
        pMaestro: "MAESTRO"
    })

    .exec((err, principalEncontrado) => {
        if (err) return console.log({ mensaje: "error en la peticion del Maestro" });
        if (principalEncontrado.length >= 1) {
            return console.log("El ya existe! ");
        } else {
            bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                pMaestro.password = passwordEncriptada;

                pMaestro.save((err, usuarioguardado) => {
                    if (err) return console.log({ mensaje: "Error en la peticion " });

                    if (usuarioguardado) {
                        console.log("Maestro Listo")

                    } else {
                        console.log({ mensaje: "No se pudo registrar" })


                    }

                })
            })
        }
    })
}

function crearMaestroSecu(req, res){
    var maestroModel= new Maestro();
    var params = req.body;
    console.log(params);

    if (params.email && params.apellido && params.password) {
        // modelo base de datos = los datos del cuerpo de datos/formulario
        maestroModel.nombre = params.nombre;
        maestroModel.apellido = params.apellido;
        maestroModel.email = params.email;
        maestroModel.rol = "ROL_MAESTRO";

        Maestro.find({
            pMaestro: "MAESTRO"
        }).exec((err, MaestroEncontrados)=>{
            if (err)return res.status(500).send({ mensaje: "Error en la peticion de maestros"});

            if(MaestroEncontrados && MaestroEncontrados.length >=1){
                return res.status(500).send({ mensaje:"Maestro ya existe"});
            }else{
                bcrypt.hash(params.password, null, null,(err, passwordEncriptada)=>{
                    maestroModel.password=passwordEncriptada;
                    maestroModel.save((err, MaestroGuardado)=>{
                        if (err) return res.status(500).send({mensaje: "Error en la peticion de Guardar Maestro"});
                        
                        if (MaestroGuardado) {
                            res.status(200).send({MaestroGuardado})
                        }else{
                            res.status(404).send({mensaje: "No sea podido registrar el usuario"})
                        }
                        
                    })
                })
            }
        })
    }
}


function obtenerMaestros (req, res){
    Maestro.find().exec((err, maestros)=>{
        if(err) return res.status(500).send({mensaje:"Error a la peticion de obtner Maestros"});
        if(!maestros) return res.status(500).send({mensaje:"Error en la consulta de Maestros o no tiene datos"});
        return res.status(200).send({maestros})
    })
}

module.exports = {
    crearMaestro,
    crearMaestroSecu,
    obtenerMaestros
}