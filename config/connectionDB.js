/**
 * 
 * Apartado donde se establece la conexión con la BD nueva
 * 
 */


const mongoose= require('mongoose');

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useFindAndModify: false
        });
        console.log('Base de datos MongoDB online')
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports={
    dbConnection
}