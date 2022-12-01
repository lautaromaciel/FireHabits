require("dotenv").config()
const express = require("express");
const cors = require("cors");
const { appendFile } = require("fs");
const app = express();
const mongoose = require("mongoose");
const {Schema,model} = require("mongoose");
const {validationResult} = require("express")

const server = require("./server/server");
server.listen();

// const dbCNN = process.env.MONGO_CNN;
// const port = 8080;

// function fechaActual (){
//     const ajuste = new Date().getTimezoneOffset();
//     const actualMs = new Date().getTime();
//     return new Date(actualMs - (ajuste * 60 * 1000));
// }

// const main = async ()=>{

//     const enlazarBD = async ()=>{

//         try{
//             await mongoose.connect(dbCNN);
//             console.log("base de datos conectada");
//         }catch(err){
//             console.log("hubo error");
//         }

//     }

//     const iniciarServer = async ()=>{
//         app.listen(port,()=>{console.log(`Corriendo en el puerto: ${port}`)});
//     }

//     await enlazarBD();

//     app.use(express.json());
//     app.use(express.static("public"));

//      /* CORS */
//      app.use(cors());
//     //  app.options("*",cors());
//     //  app.use(cors({
//     //      origin: "*", // "true" will copy the domain of the request back
//     //                    // to the reply. If you need more control than this
//     //                    // use a function.

//     //      credentials: true, // This MUST be "true" if your endpoint is
//     //                         // authenticated via either a session cookie
//     //                         // or Authorization header. Otherwise the
//     //                         // browser will block the response.

//     //      methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
//     //                                             // pre-flight OPTIONS requests
//     //  }));


//     /* Definiendo Schemas */
//     const UsuarioSchema = Schema({
//         nombre :{
//             type : String,
//             required : true,
//             unique: true
//         },
//         lista : [{
//             type: Schema.Types.ObjectId,
//             ref : "Habito"
//         }]
//     })
//     const Usuario = model("usuario",UsuarioSchema);

//     const HabitoSchema = Schema({
//         titulo :{
//             type : String,
//             required : true,
//         },
//         racha :{
//             type : Number,
//             required : true
//         },
//         completado :{
//             type : Boolean,
//             required : true
//         },
//         fechas :{
//             type : Array,
//             required : true
//         },
//         usuario: {
//             type : String,
//             required : true
//         },
//         fechaActualizacion: {
//             type: String,
//             required: true
//         }
//     })
//     const Habito = model("habito",HabitoSchema);
//     /* Fin */



//     const validarUsuario = async (req,res,next)=>{
//         const user = req.body.nombre;
//         const userNotAvaible = await Usuario.findOne({nombre: user});

//         if(userNotAvaible){
//             next(new Error("Usuario no disponible"))
//         }else{
//             next();
//         }
//     }


//    /* ENDPOINTS */

//     /*Crear Usuario  */
//     app.post("/api/usuarios",validarUsuario,(req,res)=>{

//         const {nombre,lista} = req.body;

//         const user = new Usuario({nombre,lista});

//         user.save();

//         res.json({
//             msg: "se creó un nuevo usuario",
//             usuario: user
//         })

//     })

//     /* Crear Hábito */
//     app.post("/api/habitos",async(req,res)=>{

//         const {titulo,racha,completado,fechas,usuario} = req.body;
//         const fechaActualizacion = fechaActual().toJSON();

//         const habito = await new Habito({titulo,racha,completado,fechas,usuario,fechaActualizacion});

//         const usuarioAsociado = await Usuario.findById(habito.usuario);

//         const habitoGuardado = await habito.save();

//         usuarioAsociado.lista = usuarioAsociado.lista.concat(habitoGuardado);
//         await usuarioAsociado.save();


//         res.json({
//             msg: "se creó un nuevo hábito",
//             habito : {
//                 titulo,
//                 racha,
//                 completado,
//                 fechas
//             }
//         })

//     })

//     /* Obtener Usuario */
//     app.get("/api/usuarios/:nombre",async(req,res)=>{

//         const nombre = req.params.nombre;

//         const usuario = await Usuario.findOne({nombre});

//         res.json({
//             usuario
//         })

//     })

//     /* Obtener los habitos de un usuario */
//     app.get("/api/habitos/:id",async(req,res)=>{

//         const id = req.params.id;

//         const habitos = await Habito.find({usuario : id});

//         res.json({
//             habitos
//         })

//     })


//     /* Actualizar todos los habitos de un usuario */
//     app.put("/api/usuarios/actualizacion", async(req,res)=>{

//         const id = req.body.id;
//         const habitos = await Habito.find({usuario:id});

//         habitos.forEach(async (habito) =>{

//             const fechaHoy = fechaActual();
//             const fechaActualizacion = new Date(habito.fechaActualizacion);

//             if(fechaHoy.getTime() > fechaActualizacion.setHours(00,00,00)){
//                 habito.completado = false;
//             }

//             await habito.save();

//         })

//         res.json({
//             msg : "habitos actualizados"
//         })

//     })

//     /* Modificar Hábito */
//     app.put("/api/habitos/:id", async(req,res)=>{
//         const id = req.params.id;
//         const body = req.body
//         const {racha,titulo,fechas,completado} = req.body

//         let habito = await Habito.findById(id);

//         Object.keys(body).forEach(parametro =>{
//             if(body.parametro != undefined && body.parametro != "");
//             if(habito[parametro] != undefined && body.parametro != ""){
//                 habito[parametro] = body[parametro];
//             }
//         })

//         // Object.keys(habito).forEach(llave =>{
//         //     console.log(llave);
//         //     if(req.body.llave) habito.llave = req.body.llave
//         // })



//         await habito.save();
//         habito = await Habito.findById(id);

//         res.json({
//             msg : "hábito modificado",
//             habito
//         })

//     })

//     /* Actualizar Habito */
//     app.put("/api/habitos/actualizacion/:id", async(req,res)=>{
//         const id = req.params.id;
//         // const {completado,racha} = req.body
//         const fechaHoy = fechaActual();

//         let habito = await Habito.findById(id);

//         const fechaActualizacion = new Date(habito.fechaActualizacion);

//         if(fechaHoy.getTime() > fechaActualizacion.setHours(00,00,00)){
//             habito.racha++;
//             const fechaHoyMs = fechaHoy.getTime();
//             const diaMs = 1000 * 60 * 60 * 24;
//             habito.fechaActualizacion = new Date(fechaHoyMs + diaMs).toJSON();
//             habito.completado = true;
//             await habito.save();
//             res.json({
//                 msg : "hábito actualizado",
//                 habito
//             })
//         }else{
//             res.status(400).json({
//                 msg : "Todavia no se puede actualizar la fecha",
//             })
//         }

//         // habito = await Habito.findById(id);
//         // Object.keys(habito).forEach(llave =>{
//         //     console.log(llave);
//         //     if(req.body.llave) habito.llave = req.body.llave
//         // })

//     })

//     /* Borrar Hábito */
//     app.delete("/api/habitos",async (req,res)=>{

//         const habitoId = req.body.id;
//         const habito = await Habito.findById(habitoId);
//         const usuarioId = habito.usuario;

//         await Usuario.findByIdAndUpdate(usuarioId,{$pull : {lista : habitoId}});

//         await habito.remove();

//         res.json({msg:"hábito eliminado"});

//     })

//     app.use((err,req,res,next)=>{
//         res.status(400).json({
//             msg : err.message
//         })
//     })



//     // app.use((req, res, next) => {
//     //     res.header('Access-Control-Allow-Origin', '*');
//     //     res.header('Access-Control-Allow-Headers', 'Accept,Accept-Encoding,Access-Control-Request-Headers,Access-Control-Request-Method,Connection,Host,Origin,Referer,Sec-Fetch-Dest,Sec-Fetch-Mode,Sec-Fetch-Site,User-Agent,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
//     //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     //     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     //     next();
//     // })



//     iniciarServer();



// }

// main();




