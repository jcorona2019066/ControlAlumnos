//importacion
const mongoose = require("mongoose")
const app = require("./app")
var controlador = require("./src/controladores/principal.controlador")


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/dbControlAlumnos",{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Se encuentra la base de datoss");

    controlador.crearMaestro();

    app.listen(3000, function(){
        console.log("Servidor activado en 3000");
    })

}).catch(err => console.log(err))



        