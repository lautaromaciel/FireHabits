const {Router} = require("express");

const actualizarHabito = require("../controllers/actualizarHabito");
const borrarHabito = require("../controllers/borrarHabito");
const crearHabito = require("../controllers/crearHabito");
const getHabitos = require("../controllers/getHabitos");

const routes = Router();

/* Crear Hábito */
routes.post("/",crearHabito);

/* Borrar Hábito */
routes.delete("/", borrarHabito)

/* Obtener Hábitos de un Usuario */
routes.get("/:id", getHabitos);

/* Actualizar Hábito  */
routes.put("/actualizacion/:id", actualizarHabito);

module.exports = routes;
