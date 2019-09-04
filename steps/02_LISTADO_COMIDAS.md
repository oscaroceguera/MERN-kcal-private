# Backend

* Crear controlador de listado de comida
* Crear EP GET

# FRONT

* ~Agregar componentWillUnmount en **AGREGAR CALORIAS**, ver ejemplo~
* listar items 
* Separar el componente de la lista de calorias y card de caloria en un componente (KcalList)
* Poner prop-types para KcalList
* Maquetar **KcalList**
* Maquetar **KcalListItemComp**:
  * Field **date** - crear funcion  **getUTCDate** para a helpers
  * Field **meal** -
  * Field **totalKcal** - Crear funcion total de calorias
  * Cuando creemos la funcion **getUTCDate** y **totalKcal** crear carpeta helpers y usarlas
  * Agregar alias a webpack para componentes para (helpers y component) y cambiar donde se mande a llamar
  * Meal type:
    * Crear componente **MealType** para obtenr tags de diferentes colores