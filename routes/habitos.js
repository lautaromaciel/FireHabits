const {Router} = require("express");

const actualizarHabito = require("../controllers/actualizarHabito");
const borrarHabito = require("../controllers/borrarHabito");
const crearHabito = require("../controllers/crearHabito");
const getHabito = require("../controllers/getHabito");
const getHabitos = require("../controllers/getHabitos");

const routes = Router();

/* Obtener Hábito */
routes.get("/:id",getHabito);

/* Crear Hábito */
routes.post("/",crearHabito);

/* Borrar Hábito */
routes.delete("/", borrarHabito)

/* Obtener Todos los Hábitos de un Usuario */
routes.get("/all/:id", getHabitos);

/* Actualizar Hábito  */
routes.put("/actualizacion/:id", actualizarHabito);

module.exports = routes;
