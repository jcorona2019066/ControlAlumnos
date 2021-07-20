'use strict'
var bcrypt = require('bcrypt-nodejs');

var Maestro = require("../modelos/maestro.model");
var Curso = require("../modelos/cursos.model");

var jwt2 = require("../servicios/jwt");


function crearCurso(req, res) {
    var params = req.body;
    var curso = Curso();

    if (params.nombre) {
        curso.nombre = params.nombre;
        curso.alumnos = params.alumno;
        curso.maestro = params.maestro;

        Curso.find({
            $or: [
                { curso: curso.nombre }
            ]
        }).exec((err, cursoCreado) => {
            if (err) return res.startsWith(500).send({ mensaje: 'Error en la petición de curso' })

            if (cursoCreado && cursoCreado.length >= 1) {
                return res.status(500).send({ mensaje: 'El curso ya existe' });
            } else {
                curso.save((err, cursoCreado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la petición de guardar curso' });

                    if (cursoCreado) {
                        res.status(200).send({ cursoCreado })
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el curso' })
                    }
                })

            }
        })

    }


}


function loginProf(req, res) {
    var params = req.body;
    Maestro.findOne({ email: params.email }, (err, ProfeEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (ProfeEncontrado) {
            bcrypt.compare(params.password, ProfeEncontrado.password, (err, passVerificada) => {
                if (passVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token2: jwt2.createToken(ProfeEncontrado)
                        })
                    } else {
                        ProfeEncontrado.password = undefined;
                        return res.status(200).send({ProfeEncontrado });
                    }
                } else {
                    return res.status(500).send({ mensaje: 'La persona no se ha podido identificar' });
                }
            });
        } else {
            return res.tatus(500).send({ mensaje: 'Error al ingresar la persona' });
        }
    })
}

function obtenerMaestros (req, res){
    Maestro.find().exec((err, maestros)=>{
        if(err) return res.status(500).send({mensaje:"Error a la peticion de obtner Maestros"});
        if(!maestros) return res.status(500).send({mensaje:"Error en la consulta de Maestros o no tiene datos"});
        return res.status(200).send({maestros})
    })
}

function eliminarCurso(req, res){
    Curso.findOneAndDelete(nombre,(err, cursoEliminado)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion al eliminar curso"});
        if(!cursoEliminado) return res.status(500).send({mensaje:"Error en la consulta para eliminar"});
        return res.status(200).send({cursoEliminado});
    })
}

function obtenerCursos(req, res){
    Curso.find().exec((err, cursoEncontrado)=>{
        if(err) return res.status(500).send({mensaje:"Error a la peticion de obtener Cursos"});
        if(!cursoEncontrado) return res.status(500).send({mensaje:"Error en la consilta de Cursos o no tiene datos"});
        return res.status(200).send({cursoEncontrado})
    })
}

function editarCurso(req, res){
    var idCursoP = req.params.id;
    var params = req.body;
    //Borrar la propíedad password en el body

    if (idCursoP != req.user.sub2){
        return res.status(500).send({mensaje:"No posee los permisos para editar ese Curso"})
    }

    Curso.findByIdAndUpdate(idCursoP,params, {new: true},(err, cursoActualizado)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion"});
        if(!cursoActualizado) return res.status(500).send({mensaje:"No se a podido editar el curso"});
        return res.status(200).send({cursoActualizado})
    })
}

module.exports = {
    crearCurso,
    loginProf,
    obtenerMaestros,
    eliminarCurso,
    obtenerCursos,
    editarCurso
}