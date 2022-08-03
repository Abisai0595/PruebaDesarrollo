/**
 * En este apartado se harán todas las funciones de lógica del negocio
 * 
 */

const bcryptjs       = require('bcryptjs');
const { generarJWT } = require('../scripts/generateJWT')


class UserService{
    constructor (userRepository){
        this.userRepository = userRepository;
    }
        /**
     * Encargado obtener usuarios
     * 
     * @param {Object} payload Query para filtrar usuarios
     * 
     * @returns {Object} Información en base de datos del usuario
     */
        async getUsers(payload){
            const {code, message, data} = await this.userRepository.getUser(payload);
            if (data[0]) return { code, message, data };
            else return {code:400, message: 'no se encontraron usuarios'};
        }

            /**
     * Encargado de crear un nuevo usuario en base de datos propia de Timreports
     * 
     * @param {Object} payload Información que contiene los datos necesarios para crear un nuevo usuario
     * 
     * @returns 
     */
        async handleCreateNewUser(payload){
            const { password} = payload;
            //cifrar contraseña
            const salt                     = bcryptjs.genSaltSync();
            payload.password               = bcryptjs.hashSync(password, salt);
            const { code, message, data }  = await this.userRepository.saveUser( payload );
            if(data._id)
            {
                const token = await generarJWT (data._id);
                return { code, message, data:{data, token } };
            }
            else{
                return { code:400, message:'Algo salio mal'}
            }
        }

            /**
     * Encargado de autenticar usuario
     * 
     * @param {Object} payload Información que contiene los datos del usuario timreports
     * 
     * @returns {Object} Información en base de datos del usuario
     */
    async handleAuthenticateUser(payload){

        const { email, password }   = payload;

        const {code, message, data} = await this.userRepository.getUser( {email:email} );
        if (!data[0])               return { code: 400, message: 'Cuenta inexistente', data:{status:400} };

        const password2=data[0].password;
        const validPassword = bcryptjs.compareSync(password, password2);  //Esta linea verifica que la contraseña ingresada haga match con la establecida

        if(!validPassword) return { code: 401, message: 'Usuario o contraseña incorrecta', data: [] };
                
        //Generar el JWT
        console.log(data[0]._id)
        const token = await generarJWT (data[0]._id);

        return { code: 200, message: 'Authentication exitosa', data:{data, token} }

    }
}
module.exports = UserService;