# Sesiones

## Descripcion

Es un mecannismo que matiene el estado entre multiples peticiones HTTP de un mismo usuario debido a que HTTP
es un protocolo sin estado.Por tanto, la sesion es un contexto temporal asociado en un usuario permite:

* Identificar al usuario
* Guardar infromación relevante
* Dar contiunidad ala interación

## Como funiona una sesión

Cliente --> login
Server --> crea un ID sesión del cliente (ID=xyz123)
Cliente --> guarda el ID sesión del cliente (ID=xyz123)

Cliente --> En cada nueva petición envía la cookie con el ID de sesion
Servidor --> Busca el ID de sesión y reocnoce al usuario (ID=xyz123)

## Puntos claves

* La sesión se guarda an el servidor y contiene los datos del usuario

* La  cookie se guarda an el cliente y contiene el ID de sesión

## Como se almacena en el cliente

* localStorage --> accesible via JS
* sessionStorge --> util para estados intermedios, se elimina al cerrar la pestaña
* Variables en memoria de JS --> No es persisitente
* IndexDB --> Base de datos del navegador
* Cookie --> Es configurable y de mayor nivel de seguridad de 