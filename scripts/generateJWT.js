const jwt = require('jsonwebtoken');

/**
 * Middleware que verifica que no hayan errores en los campos de validación
 * 
 * @reject
 * @resolve 
 */



const generarJWT = ( _id = '') => {
    return new Promise((resolve , reject) =>{
        const payload = {_id};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
            },(err, token)=>{

                if(err){
                    console.log(err);
                    reject('No se pudo generar el token');
                }else{
                    resolve(token);
                }

            });
    });
}


module.exports = {
    generarJWT
}