// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  let sumaTotal = 0;
  let cantidadProductos = 0;
  for(let i = 0; i < allProduct.length; i++){
    sumaTotal += allProduct[i].precio;
    cantidadProductos++;
  }
}

