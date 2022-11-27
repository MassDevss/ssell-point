const { remote } = require("electron");
const main = remote.require('./main')

/*
  @rojo time

  hacer que el valor total del precio a apgar se refleje en el input

  crear funcion para limpiar todos los campos
  es decir que devuelva todos los productos a 0

  la lista que contiene todos los objetos de producto es allProducts

  poner a los botones debajo del precio a pagar 
  Imprimir -> *pendiente*      Total -> agregarle la funcion de costo total          Borrar  ->  agregarle la funcion de borrado
  

  Crear otr view, contendra una tabla con el registro de todos los pedido que han salido

  hacer una view con un formulario para argera clietnes a una base de datos,      debe tener campos       nombre,   numero de telefono,  direccion


*/
var cantidadProductos = 0;

// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  const campoPrecio = document.querySelector('.total');
  let sumaTotal = 0;
  for(let i = 0; i < allProduct.length; i++){
    const element = allProduct[i];
    let campo = document.querySelector(`#cantidad-${element.nombre}`);
    if (campo.value > 0){
      sumaTotal += element.precio;
      cantidadProductos++;
    }
  }
  campoPrecio.value = "$" + sumaTotal;
}


/*  este pequeno script simplemente limpia los campos  */

// itera la lista global de prodcutos y pone en '' todos los campos


function clearAll(){
  cantidadProductos = 0;
  const campoPrecio = document.querySelector('.total');
  for (let i = 0; i < allProduct.length; i++) {
    const element = allProduct[i];
    let campo = document.querySelector(`#cantidad-${element.nombre}`);
    campo.value = '';
  }
  campoPrecio.value = 0;
}

function createTicket(){
  main.secondWindow();
  const tkBody = document.querySelector('.tickerBody');

}

