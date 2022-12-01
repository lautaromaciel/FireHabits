const fechaActual = require("../utils/fechaActual");
const Habito = require("../Schemas/Habito");
const Usuario = require("../Schemas/Usuario");

const crearHabito = async (req,res)=>{

  const {titulo,racha,completado,fechas,usuario} = req.body;

  const fechaActualizacion = fechaActual().toJSON();

  const habito = await new Habito({titulo,racha,completado,fechas,usuario,fechaActualizacion});

  const usuarioAsociado = await Usuario.findById(habito.usuario);
  const habitoGuardado = await habito.save();
  usuarioAsociado.lista = usuarioAsociado.lista.concat(habitoGuardado);

  await usuarioAsociado.save();
  res.json({
      msg: "se creó un nuevo hábito",
      habito : {
        titulo,
        racha,
        completado,
        fechas
      }
  })

}

module.exports = crearHabito;
