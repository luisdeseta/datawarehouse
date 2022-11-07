# Data Warehouse
Trabajo integrador del curso Desarrollo Web FullStack.
El proyecto permite administrar los contactos y usuarios de una agencia de marketing.

Desarrollado en **modo freelance**

## Instalación
Instrucciones para instalar y ejecutar el proyecto

### Pre-Requisitos

Tener instalado [MySQL](https://www.mysql.com/). O puedes descargar un paquete como [XAMPP](https://www.apachefriends.org/es/index.html), [WampServer](https://www.wampserver.com/en/) o [MAPM](https://www.mamp.info/en/windows/)

## Instalación
Crear una base de datos e importar el archivo *install_datawarehouse.sql* de la carpeta SQL en la base de datos que creaste.

Crear un un archivo **.env** con las siguiente variables (Ejemplo):

```
# Puerto donde correra la aplicacion
PORT=3010

# Nombre de usuario de la base de datos
DB_USER=your_username

# Contraseña de la base de datos
DB_PASS=your_password

# Nombre de la base de datos
DB_NAME=data-warehouse

# Host donde corre la base de datos
DB_HOST=localhost

# Secreto del JWT a utilizar, puede ser cualquier string
SECRET_TOKEN=tu_jwt_secret
```
## Port y Host
Puedes modificar los valores del puerto y el host en el archivo **rutas.js**

Los valores por default son:

**PORT:** 3010

**HOST:** locahost

## Dependencias
Ingresa a la la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias del proyecto

```
npm install
```

Para ejecuar el proyecto puedes instalar y ejecutar *nodemon* 
```
nodemon index
```

## Información de Ejemplo
La base tiene dos usuarios de prueba

**ADMIN**

 usuario: admin@email.com.ar 

 contraseña: admin123

**USUARIO**

 usuario: luis@gmail.com 

 contraseña: usuario123



