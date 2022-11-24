
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


// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  let sumaTotal = 0;
  let cantidadProductos = 0;
  for(let i = 0; i < allProduct.length; i++){
    sumaTotal += allProduct[i].precio;
    cantidadProductos++;
  }
}

