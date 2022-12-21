const { remote, ipcRenderer } = require("electron");
const main = remote.require('./main')
const fs = require('fs');



//! elements and fisical widgets
const check5 = document.getElementById('check5');
const check10 = document.getElementById('check10');
const check15 = document.getElementById('check15');
const check20 = document.getElementById('check20');
const checkRecogen = document.getElementById('checkRecogen');
const checkComedor = document.getElementById('checkComedor');

//! total price
const campoPrecio = document.querySelector('.total');

const campoEntregado = document.querySelector('#entregado');
const campoCambio = document.querySelector('#cambio');


var numPedido = 1;

// allProduct arreglo que contiene todos los productos
// sea o no sea mayor a 0 su cantidad

var cantidadProductos = 0;
var orderProducts = [];
// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  orderProducts = [];
  let sumaTotal = 0;
  for(let i = 0; i < allProduct.length; i++){
    const element = allProduct[i];
    let campo = document.querySelector(`#cantidad-${element.nombre}`);
    if (campo.value > 0){
      sumaTotal += (element.precio * campo.value);
      cantidadProductos++;
      orderProducts.push([element.nombre, element.precio, campo.value])
    }
  }




  if(check5.checked) {
    console.log(check5.value);
  }
  if(check10.checked){
    console.log("B");
  }

  campoPrecio.value = "$" + sumaTotal;
  ipcRenderer.send('pickData:onNewOrder', orderProducts)

  //! this controls the money received and change to deliver

  if (campoEntregado.value > 0) {
    campoCambio.value = "$" + (sumaTotal- campoEntregado.value);
  }

}

/*  este pequeno script simplemente limpia los campos  */
function clearAll(){
  cantidadProductos = 0;

  for (let i = 0; i < allProduct.length; i++) {
    const element = allProduct[i];
    let campo = document.querySelector(`#cantidad-${element.nombre}`);
    campo.value = '';
  }
  campoPrecio.value = '';
  campoEntregado.value = '';
  campoCambio.value = '';
  check5.checked = false;
  check10.checked = false;
  check15.checked = false;
  check20.checked = false;
  checkRecogen.checked = false;
  checkComedor.checked = false;
}

function createTicket(){
  let dataPrint = [
  ]

  dataPrint.push(
    {type:'text', value:`num: ${numPedido}`, style:''}
  )

  numPedido++;

  for (let i = 0; i < orderProducts.length; i++) {
    const product = orderProducts[i];
    
    dataPrint.push(
      {type:'text', value:`${product[0]}---${product[2]}-$${product[2] * product[1]}`, style:''}
    )
  }

  //! this is the event for print
  // ipcRenderer.send('printTime', JSON.stringify(dataPrint));
}
