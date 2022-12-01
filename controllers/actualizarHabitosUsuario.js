const fechaActual = require("../utils/fechaActual");
const Habito = require("../Schemas/Habito");

const actualizarHabitosUsuario = async (req,res)=>{

  const id = req.body.id;
  const habitos = await Habito.find({usuario:id});

  habitos.forEach(async (habito) =>{

    const fechaHoy = fechaActual();
    const fechaActualizacion = new Date(habito.fechaActualizacion);

    if(fechaHoy.getTime() > fechaActualizacion.setUTCHours(00,00,00)){
      habito.completado = false;
    }

      await habito.save();

  })

  res.json({
      msg : "habitos actualizados"
  })

}

module.exports = actualizarHabitosUsuario;
