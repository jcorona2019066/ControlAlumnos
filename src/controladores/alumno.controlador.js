'use strict'
var bcrypt = require('bcrypt-nodejs');

var Alumno = require("../modelos/alumno.model");
var Curso = require("../modelos/cursos.model");

var jwt = require("../servicios/jwt");
var jwt2 = require("../servicios/jwt");


function registrarAlumno(req, res) {
    var Alumnos = new Alumno();
    var params = req.body;

    if (params.email && params.password) {
        Alumnos.nombre = params.nombre;
        Alumnos.apellido = params.apellido;
        Alumnos.email = params.email;
        Alumnos.rol = 'ROL_USUARIO';

        Alumno.find({
            $or: [
                { email: Alumnos.email },
                { password: Alumnos.password }
            ]
        }).exec((err, alumnoEncontrado) => {
            if (err) return res.startsWith(500).send({ mensaje: 'Error en la petición de alumno' })

            if (alumnoEncontrado && alumnoEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: 'El alumno ya existe' });
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    Alumnos.password = passwordEncriptada;

                    Alumnos.save((err, alumnoGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la petición de guardar alumno' });

                        if (alumnoGuardado) {
                            res.status(200).send({ alumnoGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar alumno' })
                        }
                    })
                })
            }
        })

    }
}

function editarAlumno(req, res) {
    var idAlumno = req.params.id;
    var params = req.body;

    if (idAlumno != req.user.sub) {
        return res.status(500).send({ mensaje: 'No posee los permisos para editar ese usuario' });
    }

    Alumno.findByIdAndUpdate(idAlumno, params, { new: true }, (err, alumnoActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!alumnoActualizado) return res.status(500).send({ mensaje: 'No se ha podido editar el usuario' });

        return res.status(200).send({ alumnoActualizado });
    })
}

function login(req, res) {
    var params = req.body;
    Alumno.findOne({ email: params.email }, (err, PersonaEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (PersonaEncontrado) {
            bcrypt.compare(params.password, PersonaEncontrado.password, (err, passVerificada) => {
                if (passVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(PersonaEncontrado)
                        })
                    } else {
                        PersonaEncontrado.password = undefined;
                        return res.status(200).send({ PersonaEncontrado });
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

function eliminarAlumno(req, res){
    Curso.findOneAndDelete(nombre,(err, alumnoEliminado)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion al eliminar curso"});
        if(!alumnoEliminado) return res.status(500).send({mensaje:"Error en la consulta para eliminar"});
        return res.status(200).send({alumnoEliminado});
    })
}





module.exports = {
    registrarAlumno,
    editarAlumno,
    login,
    eliminarAlumno
}