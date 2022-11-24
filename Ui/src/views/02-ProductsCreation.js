
/*

  nombre:  =>   obviamente es el nombre del producto 
  precio: => igualmente obvio es el precio del producto

  tipo: => ATENCION::::::::::::::::::::;

  el tipo no necesariamente es "homburguesa" , "pollo", no.

  el tipo se pone en funcion a esta tabla
  ya que con este campo se decide donde se insertaran
  ______________________________________
  |                   |
  |Hamburguesa        |   "BurgersLoads" 
  |                   |
  |Pollo              |   "PolloLoads"
  |                   |
  |Promociones        |   "PromosLoads"
  |                   |
  |Papas              |   "PapasLoads"
  |                   |
  |HotDogs            |   "DogosLoads"
  |                   |
  |Extras             |   "ExtrasLoads"
  |                   |
  |Tortas             |    "TortasLoads"
  |___________________|___________________
*/

function newProducto(nombre, precio, tipo){
  let pdr = new Product(nombre, precio, tipo);
  pdr.generarNew();
  allProduct.push(pdr)
}
let dataAll = [];

fetch('./precios.json')
  .then(data => data.json())
  .then(data => {

    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      let pdr = new Product(elem.nombre, elem.precio, elem.type);
      pdr.generarNew()
    }
    

  })



const chickenFried = new Product("chickenFried", 125, "BurgersLoads");
chickenFried.generarNew();
allProduct.push(chickenFried);