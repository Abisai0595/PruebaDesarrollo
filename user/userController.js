const  {request} = require( "express" );
const  {response} = require( "express" );


class UserController{
    constructor(userRepository){
        this.userRepository = userRepository
    }

        /**
     * Función para listar usuarios dada una query
     * 
     * @param {*} req 
     * @param {*} res 
     *  
     * 
     * @return {Json} 
     */
    async getUsers (req=request, res=response) {        
        try {
            if(req.body) var query = req.body;
            else         var query = {status:true};

            const {code, message, data} = await global.userService.getUsers(query)
            return res.status(code).json({ code, message, data  });
        }
        catch (e) {
            return res.status(501).json({ status: 501, message: e.message });
        }
    }

        /**
     * Función para crear un nuevo usuario
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * @return {Json} 
     */
    async createNewUser(req = request, res = response){
        try {
            console.log(req.body)
            const { code, message, data } = await global.userService.handleCreateNewUser( req.body );
            return res.status(code).json({ code, message, data });
        } catch (error) {     
            console.log(error);
            return res.status(501).json({ code: 501, message: error.message });
        }
    }

        /**
     * Función para autenticar usuario
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * @return {Json} 
     */
    async authenticateUser(req = request, res = response){
        try {
            const { code, message, data } = await global.userService.handleAuthenticateUser( req.body );
            return res.status(code).json({ code, message, data });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ code: 501, message: error.message });
        }
    }
    
}
module.exports=UserController