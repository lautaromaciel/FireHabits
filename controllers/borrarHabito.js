const Habito = require("../Schemas/Habito");
const Usuario = require("../Schemas/Usuario");

const borrarHabito = async (req,res)=>{

  const habitoId = req.body.id;
  const habito = await Habito.findById(habitoId);
  const usuarioId = habito.usuario;

  await Usuario.findByIdAndUpdate(usuarioId,{$pull : {lista : habitoId}});

  await habito.remove();

  res.json({msg:"hábito eliminado"});

}

module.exports = borrarHabito;

