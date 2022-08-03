/**
 * 
 * Apartado donde se define el esquema de usuario
 */


const{Schema, model} = require('mongoose');

const ClientAdviserSchema = Schema({
    email:{
        type:String,
        required:[true, "El campo correo es obligatorio"],
    },
    password:{
        type:String,
        required:[true, "El campo password es obligatorio"]
    }
});

module.exports = model('User', ClientAdviserSchema);