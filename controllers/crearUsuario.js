const Usuario = require("../Schemas/Usuario");

const crearUsuario = async (req,res)=>{

  const {nombre,lista} = req.body;

  const user = await new Usuario({nombre,lista});

  await user.save();

  res.json({
      msg: "se creó un nuevo usuario",
      usuario: user
  })

}

module.exports = crearUsuario;
