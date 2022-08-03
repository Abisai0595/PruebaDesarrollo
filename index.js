/**
 * 
 * Apartado donde se instancía el servidor
 * 
 */

require('dotenv').config();

const Server = require ('./server/serverConfig');

const server = new Server();
server.listen();