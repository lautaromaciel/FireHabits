const Habito = require("../Schemas/Habito");

const getHabitos = async(req,res)=>{

  const id = req.params.id;

  const habitos = await Habito.find({usuario : id});

  res.json({
      habitos
  })

}

module.exports = getHabitos;

