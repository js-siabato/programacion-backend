### programacion-backend

- Conexión a bases de datos:
	1. Opciones clientes DB para productos:
		- mongoDB
		- mysql
		- firebase
	1. Opciones clientes DB para mensajes:
		- mongoDB
		- mysql
		- sqlite3
		- firebase
	1. Opciones clientes DB para carritos:
		- mongoDB
		- firebase

Estos ajustes se deben hacer unicamente en el archivo config.js en la opción DB, tener en cuenta las credenciales de los clientes ya que las que estan actualmente son de prueba y no funcionaran, de igual forma si se desea usar los clientes remotos solo se debe ajustar el parámetro remoteDB del mismo archivo.
Para la conexión con el cliente de firebase se debe agregar el archivo con sus credenciales, el nombre del archivo debe ser serviceAccountKey.json y se debe ubicar en la raiz del proyecto.