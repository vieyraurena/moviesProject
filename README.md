# Proyecto II Buscador de Películas

## Requerimientos

* Node.js 12.x o superior

## Uso

```bash
npm install
npm run dev
```

## Implementación de la mejora del programa

**La mejora consiste en hacer click al botón **more** y este traéra otra lista de películas relacionado con el nombre que se escribió en el input.**

* **Para ello se crea:**
- Un fetch global, ya que se va ha llamar en varias partes del programa incluyendo la mejora

```javascript
const globalFetch = (parm) => fetch(`${URL}&${parm}`)
  .then((response) => response.json())
  .then((data) => data);
```
Se crean dos variables: 
```javascript
let countPage = 1;
let movieName = '';
```
- countPage guarda valor 1 para que se contabilicen las nuevas páginas.
- movieName se crea con un string vació para que cada ves se limpie el input y se agregue el nuevo valor.

Luego se crea una función llamada **addMovies** donde se llamara el fecth global y se le pasara el parámetro que contiene el Search y page,

```javascript
globalFetch(`s=${movieName}&page=${countPage}`)
    .then((data) => {
```
En esta misma función se crea el contenido de la lista con los títulos de las películas.

Luego en la función **loadMore**  que esta ligada a un addEventListener tipo click  hará que el countPage aumente en 1 cada ves que se haga click para que cargue las nuevas páginas, también se llama la función addMovies para crear el contenido de las mismas.

Y es así como se hace posible que el botón tenga dicha funcionalidad. 
