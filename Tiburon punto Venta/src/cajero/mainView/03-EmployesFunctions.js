const { remote, ipcRenderer } = require("electron");
const main = remote.require('./main')
const fs = require('fs');

var numPedido = 1;

// allProduct arreglo que contiene todos los productos
// sea o no sea mayor a 0 su cantidad

var cantidadProductos = 0;
var orderProducts = [];
// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  orderProducts = [];
  const campoPrecio = document.querySelector('.total');
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

  const check5 = document.getElementById('check5');
  const check10 = document.getElementById('check10');
  const check15 = document.getElementById('check15');
  const check20 = document.getElementById('check20');
  const checkRecogen = document.getElementById('checkRecogen');


  

  campoPrecio.value = "$" + sumaTotal;
  ipcRenderer.send('pickData:onNewOrder', orderProducts)

  //! this controls the 
  const campoEntregado = document.querySelector('#entregado');
  const campoCambio = document.querySelector('#cambio');
  if (campoEntregado.value > 0) {
    campoCambio.value = "$" + (sumaTotal- campoEntregado.value);
  }

}

/*  este pequeno script simplemente limpia los campos  */
function clearAll(){
  cantidadProductos = 0;
  const campoPrecio = document.querySelector('.total');
  for (let i = 0; i < allProduct.length; i++) {
    const element = allProduct[i];
    let campo = document.querySelector(`#cantidad-${element.nombre}`);
    campo.value = '';
  }
  campoPrecio.value = '';
}

function createTicket(){
  // fs.writeFile(`./src/cajero/mainView/tickets/pedido-${numPedido}.txt`, 'esta prueba de texto', (err) => {
  //   if (err){
  //     throw err;
  //   }
  //   console.log("hola");
  // })
  // numPedido++;

  let dataPrint = [
  ]
  for (let i = 0; i < orderProducts.length; i++) {
    const product = orderProducts[i];
    
    dataPrint.push(
      {type:'text', value:`${product[0]}---${product[2]}-$${product[2] * product[1]}`, style:''}
    )
  }


  //! this is the event for print
  // ipcRenderer.send('printTime', JSON.stringify(dataPrint));
}
