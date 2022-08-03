/**
 * Middleware que verifica que no hayan errores en los campos de validación
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * 
 * @return {Json} 
 */




const {validationResult} = require('express-validator');


const validateFields =(req, res, next)=>{
    errors = validationResult(req);
    if(!errors.isEmpty()){
        const code=400, message='errores de validación', data=errors;
        return res.status(code).json({code, message, data});
    }

    next();
}

module.exports={
    validateFields
}