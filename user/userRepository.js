const User = require('../schema/clienAdviser');

class UserRepository{
        /**
     * Función para obtener usuarios de la base de datos
     * 
     * @param {Json} campo  del usuario que se buscara
     * @param {Json} query  
     * 
     * @returns 
     */
    async getUser(query) {

        try {

            const data = await User.find(query);

            if (!data) return { code: 404, message: 'Usuario no encontrado' }

            return {code:201, message:"usuarios", data};
            
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

        /**
     * Función para guardar un nuevo usuario en base propia de timreports
     * 
     * @param {Json} payload Datos para crear nuevo usuario
     * 
     * @returns 
     */
    async saveUser( payload ) {

        try {

            const saveUser = new User(payload);

            const response = await saveUser.save();
            console.log(saveUser)

            
            return { code: 201, data: response, message: 'Usuario creado correctamente' }
            
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }

    }
}

module.exports = UserRepository;