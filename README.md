# Ecommerce API

## Comandos

### Correr en modo desarrollo
npm run start dev

### Correr en modo produccion
npm start

## Tecnologías utilizadas

### Lenguaje

Javascript/NodeJS

### Base de datos
MongoDB (Atlas)

### Autenticación
JSON Web Token

### Motor de plantillas
ejs

## Rutas

### POST /api/user/signup

Recibe los siguientes campos:

username:string

password:string

password2:string

email:string

firstName:string

lastName:string

address:string

age:number

phone:string

admin:boolean (opcional, si no se pasa es false por defecto)

Todos los campos son obligatorios salvo admin. password y password2 deben ser iguales.

Si se pasan todos los datos correctamente se crea un nuevo usuario en la base de datos con la contraseña encriptada

También se crea un carrito de compras propio del usuario.

### POST /api/user/login

Recibe los siguientes campos:

username:string

password:string

Ambos campos son obligatorios.

Si el usuario no existe devuelve un objeto {error: 'El usuario no existe'}

Si la contraseña es incorrecta devuelve un objeto {error: 'Password inválida}

Si los datos son correctos se crea una sesión de express-session, se guarda en la base de datos y se devuelve un Bearer token con un tiempo de expiración configurable en una variable de entorno

Se envia un mail al usuario con la información de su registro

## GET /api/user/logout

Destruye la sesión y la elimina de la base de datos

## GET /api/productos

Devuelve todos los productos cargados en la base de datos

Admite dos opciones de filtrado por query params:

-por "title" utilizando el query param "title"

-por "price" utilizando los query params "min" y/o "max" para establecer un rango de precio

## GET /api/productos/:category

Recibe un URL param para filtrar los productos por "category"

Si no encuentra ningún producto devuelve un objeto {error: {message: "Producto no encontrado"}}

## POST /api/productos

Permite agregar nuevos productos a la base de datos. Solo usuarios admin pueden acceder a esta ruta.

Recibe los siguientes campos:

title:string

description:string

category:string

price:number

stock:number

thumbnails:array

Todos los campos son obligatorios. Si se pasan todos los datos correctamente se creará un nuevo producto en la base de datos y devuelve un status 201

## PUT /api/productos/:id

Permite actualizar los datos de un producto. Recibe un URL param para buscar el producto por su id.

## DELETE /api/productos/:id

Permite eliminar un producto de la base de datos. ecibe un URL param para buscar el producto por su id.

## GET /api/cart

Devuelve el carrito del usuario que lo solicita. El mismo debe estar logueado para acceder a esta ruta.

## POST /api/cart/add

Recibe un producto en el body y lo agrega al carrito del usuario. El mismo debe estar logueado para acceder a esta ruta.

## DELETE /api/cart/delete

Recibe el id de un producto en el body y lo elimina del carrito del usuario. El mismo debe estar logueado para acceder a esta ruta.

## POST /api/cart/submit

No recibe nada en el body. Crea una orden a partir del estado actual del carrito del usuario. El mismo debe estar logueado para acceder a esta ruta.

Se envía un mail al usuario con la información de su orden.

## GET /api/orders

Devuelve el historial de órdenes generadas por usuario. El mismo debe estar logueado para acceder a esta ruta.

## GET /api/orders/:id

Recibe un id de orden como URL param y devuelve la órden correspondiente. El usuario debe estar logueado para acceder a esta ruta.

## /api/orders/complete

Recibe un id de orden en el body y cambia el estado de la órden de "generada" a "completada". Se le envia un mail al usuario con la información de la órden.

Si la orden ya tiene estado "completada" se devuelve un status 400.

El usuario debe estar logueado para acceder a esta ruta.

## GET /chat

Renderiza una vista con un centro de mensajes que permite al usuario enviar mensajes al servidor. Se utiliza la tecnologia websockets.
Todos los mensajes se guardan en la base de datos y el historial de mensajes se renderiza cada vez que el usuario ingresa.

## GET /chat/:user

Renderiza el mismo centro de mensajes pero solo se mostrarán los mensajes enviados por el usuario logueado.

## GET /config

Renderiza una vista con información de configuración del servidor.