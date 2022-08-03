
/**
 * Middleware que hace las validaciones correspondientes para verificar el token
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * 
 * @return {Json} 
 */


const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const User = require('../../schema/clienAdviser');


const validarJWT = async(req = request, res = response, next) =>{

    const token = req.header('autorizacion');//Extrae el token de los headers

    if(!token){
        const code=401, message='No hay token en la peticion ', data=[];
        return res.status(code).json({code, message, data});
    }

    //Validación
    try{
        //si JWT no es valido lanza un error
        const {_id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario correspondiente al uid
        const usuario =  await User.findById(_id);

        
        
        if(!usuario){
            const code=401, message='Token no valido - usuario no existe en la BD', data=[];
            return res.status(code).json({code, message, data});
        }

        req.usuario=usuario ;
        next();
    }catch(error){
        console.log(error);
        const code=401, message='Token no valido', data=[];

        res.status(code).json({ 
            code, message, data
        })
    }
}


module.exports={
    validarJWT
}