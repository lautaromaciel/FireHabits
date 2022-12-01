const Habito = require("../Schemas/Habito");
const fechaActual = require("../utils/fechaActual");

const actualizarHabito = async(req,res)=>{
  const id = req.params.id;

  const fechaHoy = fechaActual();

  let habito = await Habito.findById(id);

  const fechaActualizacion = new Date(habito.fechaActualizacion);

  if(fechaHoy.getTime() > fechaActualizacion.setHours(00,00,00)){
      habito.racha++;
      const fechaHoyMs = fechaHoy.getTime();
      const diaMs = 1000 * 60 * 60 * 24;
      habito.fechaActualizacion = new Date(fechaHoyMs + diaMs).toJSON();
      habito.completado = true;
      await habito.save();
      res.json({
          msg : "hábito actualizado",
          habito
      })
  }else{
      res.status(400).json({
          msg : "Todavia no se puede actualizar la fecha",
      })
  }
}

module.exports = actualizarHabito;
