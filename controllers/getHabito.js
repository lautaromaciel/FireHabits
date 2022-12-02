const Habito = require("../Schemas/Habito");

const getHabito = async(req,res)=>{

  const id = req.params.id;

  const habito = await Habito.findById(id);

  res.json({
      habito
  })

}

module.exports = getHabito;

