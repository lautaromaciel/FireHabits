const {Router} = require("express");
/* Controllers */
const actualizarHabitosUsuario = require("../controllers/actualizarHabitosUsuario");
const crearUsuario = require("../controllers/crearUsuario");
const getUsuario = require("../controllers/getUsuario");

const routes = Router();

routes.post("/",crearUsuario);

routes.get("/:nombre",getUsuario);

routes.put("/api/usuarios/actualizacion", actualizarHabitosUsuario);


module.exports = routes;
