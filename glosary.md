# Backend

## Node.js

> Es un entorno javasccript del lado del servidor que utiliza un modelo asíncrono y dirigido a eventos. 

> Node ejecuta javascript usando el motor v8 , desarrollado por google para el uso de su navegador chrome.

> El motor V8 es una máquina virtual tremendamente rápida, no olvidemos que V8 es actualizado constantemente y es uno de los interpretes mas rapidos actualmente.

> Para I/O (Entrada/Salida) son realmente ligeras y potentes.

> Node soporta protocolos TCP, DNS y HTTP. Node tiene la capacidad de mantener muchas conexiones abiertas y esperando.

**Progamación asíncrona**

Node.js dispone del Bucle de Eventos (Event Loop), que permite gestionar enormes cantidades de clientes de forma asíncrona. Tradicionalmente para trabajar de forma asíncrona las aplicaciones se valían de la programacón basada en hilos (programming threaded applications), pero esto supone l autilización (normalmente eficaz) de un espacio de memoria que va escalando a medida que la cantidad de clientes conectado a nuestra aplicación aumenta.

Generalmente cada hilo supone la utilización de 2MB de memoria, lo que en un sistema de 8GB de RAM supone un máximo teórico de conexiones de 4.000 usuarios. Por lo tanto, si necesitamos gestionar grandes cantidades de conexiones tendremos que ampliar el número de servidores.

**La solución de Node**

Node.js resuelve este problema cambiando la manera de realizar las conexiones con el servidor. En vez de generar un nuevo hilo E/S para cada cliente, cada conexión dispara la ejecución de un evento dentro del proceso del motor de Node. De este modo, Node permite que un solo servidor que lo ejecute pueda soportar decenas de miles de conexiones.

> ¡Gracias a Node, LinkedIn pasó de utilizar 30 servidores a únicamente 3!


> Nodejs es muy escalable y usa npm (node package manager)

**En resumen**
NodeJS es bueno por su alta velocidad, tiene un desarrollo muy rápido, las aplicaciones al ser tan rápidas la experiencia del usuario es mejor y lo mejor es open source.


## NPM (Node package manager)

> Node cuenta con su gestor de paquetes NPM, que permite acceder a una enorme cnatida de librerías Open Source desarrolladas por la comunidad de Javascript

> Iniciar un proyecto con node $ npm init -y

## Express.js

> Es un framework Web Rápido, de mente abierta, minimalista para Node.js (Dicho por express.js)

> Express.js está basado en Connect, que es un framework extensible de manejo de servidores HTTP, el cual provee plugins de alto rendimiento conocidos como middleware.

> **Middleware** es un software que asiste a una aplicación para interactuar o comunicarse con otras aplicaciones, software, redes, hardware y/o sistemas operativos.

## MongoDB

> Es la mas representativa base de datos open source conocidas como NoSQL, acrónimo de **Not only SQL**, basada en documentos. Esto quiere decir que en lugar de guardar los datos en registros, guarda datos en documentos. Estos documentos son almacenados en BSON, que son una representación binaria de JSON.

> Una de las diferencias más importantes con respecto a base de datos, que que no es necesario seguir un esquema. los documentos de una misma collección - concepto simimilar a una tabla de base de datos relacional -, pueden tener esquemas diferentes.

Imaginemos que tenemos una colección a la que llamamos Personas. Un documento podría almacenarse de la siguiente manera:

```json
{
  Nombre: "Pedro",
  Apellidos: "Martínez Campo",
  Edad: 22,
  Aficiones: ["fútbol","tenis","ciclismo"],
  Amigos: [
   {
     Nombre:"María",
     Edad:22
   },
   {
     Nombre:"Luis",
     Edad:28
   }
  ]
}
```

El documento anterior es un clásico documento JSON. Tiene strings, arrays, subdocumentos y números. En la misma colección podríamos guardar un documento como este:

```json
  {
    Nombre: "Luis",
    Estudios: "Administración y Dirección de Empresas",
    Amigos:12
  } 
```

Este documento no sigue el mismo esquema que el primero. Tiene menos campos, algún campo nuevo que no existe en el documento anterior e incluso un campo de distinto tipo.

Esto que es algo impensable en una base de datos relacional, es algo totalmente válido en MongoDB.


**Principales caracteristicas de mongoDB**
* **Alto rendimiento:**
  * Posibilidad de tener documentos con la información anidada, evitando, de esta forma, un número elevado de operacione I/O
  * El soporte de índices y la posibilidad de crear índices sobre arrays y subdocumentos
* **Alta disponiblidad**
  * Mediante la réplica automática conocida como replica set, la cual proporciona redundancia de datos y failover automático, es decir, la transferencia automática a un nuevo nodo cuando se encuentra un fallo en uno de los nodos.
* **Escalado Automatico**
  * nos ofrece un escalado horizontal. Para ello el sistema de sharding nos permite distribuir información por diferentes cluster de máquinas.

## mongoose

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono.

## Body-parser
Es un middleware que analiza el cuerpo de un request, permitiendo obtener dicha info bajo la propiedad **req.body**

---
* node enviroment
* es6-requireindex
* es un middleware
* async/await

* mocha
* morgan
* uuid
* nodemon
* supertest
* jest
* coverage con jest
* CORS
* exepect
* body parser
* lodash
* Eslint

# Frontend

## React

> Es una biblioteca de Javascript para construir interfaces de usuario

**Declarativo**
React te ayuda a crear interfaces de usuario interactivas de forma sencilla. Diseña vistas simples para cada estado en tu aplicación, y React se encargará de actualizar y renderizar de manera eficiente los componentes correctos cuando los datos cambien.

Las vistas declarativas hacen que tu código sea más predecible, por lo tanto, fácil de depurar.

**Basado en componentes**
Crea componentes encapsulados que manejen su propio estado, y conviértelos en interfaces de usuario complejas.

Ya que la lógica de los componentes está escrita en JavaScript y no en plantillas, puedes pasar datos de forma sencilla a través de tu aplicación y mantener el estado fuera del DOM.

> React puede también renderizar desde el servidor usando Node, así como potencializar aplicaciones móviles usando React Native.

> Tiene **Componentes simples y componentes sin estado** 

**React usa el virtual DOM**

Es un algoritmo muy eficiente para determinar las diferencias entre la representación virtual de la página actual y la nueva. Apartir de esas diferencias, hace el conjunto mínimo de cambios necesarios en el DOM.

1- En primer lugar, React ejecuta un algoritmo de "diffing", que identifica lo que ha cambiado.

2- El segundo paso es la reconciliación, donde se actualiza el DOM con los resultados de diff.

## Webpack

En escencia, Webpack es un paque de módulos estáticos para aplicaciones javascript modernas.

Cuando webpack procesa la aplicación, internamente crea un gráfico de dependecias que asigna cada módulo que el proyecto necesita y genera uno o mas paquetes.

En la programacion modular, los devs dividen los prgramas en chunks (trozos) discretos de funcionalidad llamado módulo.

Node.js ha admitido la programación modular casi desde su inicio. Pero en la web ha tardado en llegar y webpack nos ayuda a usar los modulos.

[webpack](https://webpack.js.org/concepts/)
[modulos](https://webpack.js.org/concepts/modules)


---

* PropTypes
* react router dom
* axios
* lodash
* es babel
* Eslint
* webpack analize
* react-router
* react-loadable
* css-modules
* Enzyme
* jest

http://pm2.keymetrics.io/docs/usage/quick-start/ (para variables de entorno en aws)
