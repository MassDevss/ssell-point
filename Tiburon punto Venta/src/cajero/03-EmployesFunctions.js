const { remote } = require("electron");
const { addAbortSignal } = require("stream");
const main = remote.require('./main')


// allProduct arreglo que contiene todos los productos
// sea o no sea mayor a 0 su cantidad

var cantidadProductos = 0;

// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  const campoPrecio = document.querySelector('.total');
  let sumaTotal = 0;
  for(let i = 0; i < allProduct.length; i++){
    const element = allProduct[i];
    let campo = document.querySelector(`#cantidad-${element.nombre}`);
    if (campo.value > 0){
        sumaTotal += (element.precio * campo.value);
      cantidadProductos++;
    }
  }
  campoPrecio.value = "$" + sumaTotal;
  main.postTotalWindow() // llmaada a tu ventana 
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

