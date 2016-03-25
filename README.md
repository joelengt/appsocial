# AppSocial v0.0.1
App CRUD con JavaScript, Nodejs, Express, MongoDB, socket.io, login passport.js + jade, stylus.
La app tiene un login social de autentificado, personalizar perfil de usuario(edit) un chat social en tiempo real, publicar personajes favoritos(Full Crud) y hablar con amigos en tiempo real, sistema administrador de mensajes y usuarios (Full CRUD). Toda la data se almanena en una base de datos, en este caso mongodb.

##Descarga/Clone
Para usarlo primero lo bajamos de github a nuestro computador, desde la terminal ejecutando:
```
git clone https://github.com/joelengt/appsocial.git
```
##Instalación
En la app se espera el contenido de configuración del archivo config.js, el cual contiene contraseñas de acceso al api de facebook, twitter, conexión con mongodb, etc. Estos datos no se suben, por seguridad, pero son necesario para lanzar el app en local u otro server, tan solo es necesario crear un archivo similar: config.js, dentro de el colocar:
```
var config = {
	twitter: {
		key: 'string key app twitter',
		secret: 'string secret app twitter'
	},
	facebook:{
		id: 'string id app facebook',
		secret: 'string secret app facebook'
	},
	admin:{
		name : 'admin',
		pass : '12345678'
	},
	mongodb:{
		connect_local: 'mongodb://localhost/networkanime',
		mlab: 'connect url mongodb'
	},
	cloudinary : {
		cloud_name: 'user cloud name',
		api_key: 'user cloud api key',
		api_secret: 'user cloud api secret'
	}
}

module.exports = config
```
*Para los datos del api, consultar la documentación de cada una

Una vez se tenga configurado el config.js

Para iniciar la app, debes tener instalado [NodeJS](https://nodejs.org/en/), [MongoDB](https://www.mongodb.org/downloads), en tu Sistema Operativo. Al tener todo, nos ubicamos en la carpeta donde guardamos la app, mediante la terminal/consola. Una vez alli ejecutar:
```
npm install
```
Con este comando bajamos todas las depentencias y modulos de la app.

##Iniciar/Start
Nuestra App usa mongoDB, con un modulo mongoose. Necesita conectarse localmente en su sistema operativo.
En una consola nueva ejecutar 
```
mongod
```
*Dependiendo a los permisos de acceso path al instalar mongodb en su ordenador, puede ejecutarlo donde desee, o en donde lo instalo.

Luego, en nuestra primera consola, cuando todo descargo, ejecutar:
```
npm start
``````
Con esto ya aplicación correra automaticamente en el puerto 5000:
```
http://localhost:5000
```
En todo caso puede correrlo en otro puerto:
```
PORT=4391 node index.js
```
##Desarrollo
En la carpeta lib, estan los archivos .styl para diseño.
En el resto de la app esta en forma de Model, View, Controller, Routes, con Express.
La  Aplicación aun esta en desarrollo, a nuevas funcionabilidades

##Permisos
MIT

Copyright (c) 2016 Joel Gonzales Tipismana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



