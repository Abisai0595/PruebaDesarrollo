const express = require("express");
var cors = require('cors');
const { dbConnection } = require("../config/connectionDB");



class Server{
    constructor(){
        this.app = express();
        this.server = require('http').Server(this.app);
        this.port = process.env.PORT;
        this.usersPath='/api/users';

        
        //conectar base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //rutas de la aplicación
        this.routes();
    }
    async conectarDB(){
        try{
            await dbConnection();
        }
        catch(error){
            throw new Error(error);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());
    }


        //rutas de la aplicación
        routes(){
            this.app.use(this.usersPath, require ('../user/userRoutes'));
        }
        //se levanta el servidor
        listen(){
            this.server.listen(this.port, ()=>{
                console.log('Servidor corriendo en puerto', this.port)
            });
            
        }
} 
module.exports=Server;