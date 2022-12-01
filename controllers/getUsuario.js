const Usuario = require("../Schemas/Usuario");

const getUsuario = async (req,res)=>{

  const nombre = req.params.nombre;

  const usuario = await Usuario.findOne({nombre});

  res.json({
      usuario
  })

}

module.exports = getUsuario;
