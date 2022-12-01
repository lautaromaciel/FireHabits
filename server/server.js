const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

function manejadorDeErrores (err,req,res,next) {
  res.status(400).json({
    msg : err.message
  })
}

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.linkDb = process.env.MONGO_CNN;

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB(){
    try{
      await mongoose.connect(this.linkDb);
      console.log("base de datos conectada");
    }catch(err){
      console.log("hubo error");
    }
  }

  middlewares(){
        /*Setear el Cors */
        this.app.use(cors());

        /* Lectura y Parseo del Body */
        this.app.use(express.json( ))

        /* Directorio Público */
        this.app.use(express.static("public"));

        /* Manejador de Errores */
        this.app.use(manejadorDeErrores);
  }

  routes(){
    this.app.use("/api/usuarios", require("../routes/usuarios"));
    this.app.use("/api/habitos", require("../routes/habitos"));
  }

  listen(){
    this.app.listen(this.port, ()=>{
        console.log("Servidor corriendo en el puerto",this.port);
    })
  }



}

module.exports = new Server();
