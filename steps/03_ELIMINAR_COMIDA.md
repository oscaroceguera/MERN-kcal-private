# Backend

* Crear controlador de detalle de comida
* Crear EP GET/:id
* Ir al front para obtener el detalle (A)
* (B) Crear controlador de actualizar comida
* (B) Crear EP PATCH/:id
* Ir al front para actualizar la comida (C)


# FRONT
* (A) Obtener detalle de comida:
  * Agregar evento (onClick) al listado de comidas para obtenr el id y nos mande a actualizar comida, en dashboard se hace el evento y **KcalList** lo hereda
  * Agregar ruta **/detail/:uuid** en el router
  * Obtener los datos para actualizar nuestro componente de **Calories**
  * Ir al Back para crear el **EP** de actualizar meal (B)
* (C) Actualizar comida mediante la funcion **onUpdate**

* PROBRAR: componentWillUnmount si es necesario usarse.