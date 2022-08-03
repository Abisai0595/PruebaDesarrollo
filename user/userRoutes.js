const { Router }         = require('express');
const { check }          = require('express-validator');

const { verificaEmail }  = require('../scripts/middlewares/ValidatesDB');
const { validateFields } = require('../scripts/middlewares/ValidateFields');
const { validarJWT }     = require('../scripts/middlewares/ValidateJWT');

const UserController     = require('./userController');
const UserRepository     = require('./userRepository');
const UserService        = require('./userService');

global.userRepository   = new UserRepository();
global.userService      = new UserService(global.userRepository);

const router            = Router();

// Llamado a controladores
const userController    = new UserController;

//TODO: terminar de hacer los servicios del crud usuarios

//Obtener usuarios
router.post('/',[    validarJWT, 
    validateFields],userController.getUsers);

    //Crear nuevo usuario
router.post('/newUser',[
    check('password','El password debe tener al menos 6 caracteres').isLength({min:6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(verificaEmail),
    validateFields],
    userController.createNewUser);

//Iniciar session
router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validateFields],
    userController.authenticateUser);

    module.exports = router;