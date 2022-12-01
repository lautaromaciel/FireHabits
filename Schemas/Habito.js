const {Schema,model} = require("mongoose");

const HabitoSchema = Schema({
  titulo :{
      type : String,
      required : true,
  },
  racha :{
      type : Number,
      required : true
  },
  completado :{
      type : Boolean,
      required : true
  },
  fechas :{
      type : Array,
      required : true
  },
  usuario: {
      type : String,
      required : true
  },
  fechaActualizacion: {
      type: String,
      required: true
  }
})
const Habito = model("habito",HabitoSchema);

module.exports = Habito;
