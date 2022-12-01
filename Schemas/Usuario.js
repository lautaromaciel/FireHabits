const {Schema,model} = require("mongoose");

const UsuarioSchema = Schema({
  nombre :{
      type : String,
      required : true,
      unique: true
  },
  lista : [{
      type: Schema.Types.ObjectId,
      ref : "Habito"
  }]
})
const Usuario = model("usuario",UsuarioSchema);

module.exports = Usuario;
