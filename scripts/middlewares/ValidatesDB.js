const User = require('../../schema/clienAdviser');

/**
 * Middlewares que verifican que no hayan errores al validar con la BD
 * 
 * 
 */

//verificar que el correo no exista en la bd
const verificaEmail = async(email='')=>{
    const existEmail = await User.findOne({email});
    if(existEmail)
    {
        throw new Error ("El correo ingresado ya existe");
    }
}

//verificar que el id no exista en la bd
const verificaUsuarioId = async(id)=>{
    const existUsuario = await User.findById(id);
    if(!existUsuario)
    {
        throw new Error ("El id ingresado no existe");
    }
}



module.exports={
    verificaEmail,
    verificaUsuarioId
}