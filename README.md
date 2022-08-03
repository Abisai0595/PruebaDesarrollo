En el siguiente archivo se documenta el codigo desarrollado por Josue Abisaí Valdez Mendez; que consta de un sistema de back end que registra y logea usuarios.
Código desarrollado con Javascript, Nodejs y Mongodb, tambien se utilizaron herramientas como Express, Jsonwebtoken, Cors, entre otras.
Los servicios se probaron con Postman desde el host 8000.

## Instalación
npm -i

## Run
nodemon index.js



*********************************            SERVICIO QUE CREA UN NUEVO USUARIO                                              **************
MÉTODO: POST
URL:http://localhost:8000/api/users/newUser
BODY:
{
    "email":"test20@tsest.com",
    "password":"holamundo",
}
NOTAS: 
1.- Se verifica que el email no exista en la bd y que sea correcto 
2.- El password es cifrado
3.- se genera un token con el id del nuevo usuario después de registrarlo en bd






*********************************            SERVICIO QUE LOGEA UN USUARIO                                              **************
MÉTODO: POST
URL:http://localhost:8000/api/users/login
BODY:
{
    "email":"test20@tsest.com",
    "password":"holamundo",
}
NOTAS: 
1.- Se genera un token al iniciar session 






*********************************            SERVICIO QUE CONSULTA USUARIOS DADO UN RFC, ID, EMAIL, AREA, STATUS               ****************
MÉTODO: POST
URL:http://localhost:8000/api/users
HEADERS:
  'autorizacion':TOKEN
NOTAS: 
1.- Es necesario el token en los headers, osea que necesita logear un usuario para consultar este servicio