# Test Node.js Inicial

## Objetivo

Desarrollar una api en Node.js que permita mantener el recurso *User* que contenga las siguientes propiedades:

* Name.
* LastName.
* Birthday.
* Dni.

Esta API deberá permitir:

* Crear.
* Actualizar
* Eliminar.
* Listar.
* Listar de acuerdo a los siguientes filtros:
    * Usuarios que cumplan años antes o después de una fecha determinada.
    * Usuarios que cumplan años entre dos fechas determinadas,
    * Usuarios que contengan una cadena de caracteres en el nombre o el apellido.
    * (Los filtros se deben poder combinar.)

## Instalación y ejecución

Instalamos las dependencias necesarias y ejecutamos el script *serve*:

```console
npm install
npm run serve
```

Al ejecutar este último comando la consola mostrará lo siguiente indicando que todo ha salido bien:

```console
Escuchando puerto {puerto}
Conectando a la base de datos de usuarios.
```
(*) {puerto} indicará el puerto que se está utilizando.

Podemos comenzar a testear las rutas que se describen en la siguiente sección.

### Rutas

En la siguiente tabla se presenta una descripción de las rutas disponibles.

Verbo | Ruta | Params | Body | Descripción
------------ | ------------- | ------------- | ------------- | -------------
POST | /user | |`{"dni": 99999999, "name": "Nombre", "lastName": "Apellido", "birthday": "YYYY-MM-DD"}` | Crear nuevo usuario.
PUT | /user:id | id |`{"dni": 99999999, "name": "Nombre", "lastName": "Apellido", "birthday": "YYYY-MM-DD"}` | Actualiza al usuario con el id {:id} (actualizará solo las propiedades que se incluyan en el body).
DELETE | /user:id | id | | Elimina el usuario con id igual a {:id}.
GET | /user | | | Listar todos los usuarios.
GET | /user?name={Name} | name | | Mostrar usuarios con nombre igual a {Name}.
GET | /user?lastName={LastName} | lastName | | Mostrar usuarios con apellido igual a {LastName}.
GET | /user?contain={String} | contain| | Mostrar usuarios que contengan en su nombre o apellido la cadena {String}.
GET | /user?years_before={YYYY-MM-DD} | years_before | | Mostrar usuarios que cumplan años antes de {YYYY-MM-DD}.
GET | /user?years_later={YYYY-MM-DD} | years_later | | Mostrar usuarios que cumplan años después de {YYYY-MM-DD}.
