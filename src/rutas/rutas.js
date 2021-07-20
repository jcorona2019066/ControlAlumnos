'use strict'

//importaciones
var express = require("express");
var controlador = require("../controladores/principal.controlador");
var controladorMa = require("../controladores/maestro.controlador");
var controladorAlu = require("../controladores/alumno.controlador");
var api = express.Router();

//middlewares
var md_authorization = require('../middlewares/authenticated');


api.post("/crearMaestroSecu", controlador.crearMaestroSecu);
api.get("/obtenerMaestros",controlador.obtenerMaestros);

api.post('/registrarAlumno', controladorAlu.registrarAlumno);
api.put('editarAlumno/:id', md_authorization.ensureAuth, controladorAlu.editarAlumno);
api.post('/login', controladorAlu.login);
api.delete("/eliminarAlumno/:id", md_authorization.ensureAuth, controladorAlu.eliminarAlumno);


api.post("/loginProf",controladorMa.loginProf);

api.post('/crearCurso', controladorMa.crearCurso);
api.delete("/eliminarCurso/:id", md_authorization.ensureAuth,controladorMa.eliminarCurso);
api.get("/obtenerCursos",controladorMa.obtenerCursos);
api.put("/editarCurso/:id", md_authorization.ensureAuth,controladorMa.editarCurso);

module.exports = api;