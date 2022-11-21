
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
  |Promociones        |
  |                   |
  |Papas              |   "PapasLoads"
  |                   |
  |HotDogs            |
  |                   |
  |Extras             |
  |___________________|___________________
*/
let allProduct:Product[] = [];

class Product {
  nombre:string;
  precio:number;
  tipo:string;
  constructor(nombre:string, precio:number, tipo:string) {
    this.nombre = nombre;
    this.precio = precio;
    this.tipo   = tipo;
  }

  buttonFunction(boton:HTMLElement, action:string) {
    boton.addEventListener('click', ()=>{
      //@ts-ignore
      let campo:HTMLElement = document.querySelector(`#cantidad-${this.nombre}`);
      if (action === "+"){
        //@ts-ignore
        campo.value++;
      }
      else if (action === "-"){
        //@ts-ignore
        if (campo.value > 0){
          //@ts-ignore
          campo.value--;
        }
      }
    })
  }

  generarNew() {

  // consolidacion de la estuctura
  const productsContainer = document.getElementById(this.tipo);

  let divToCard = document.createElement('div');
  divToCard.className = "col-md-6 card";
  let titleProduct = document.createElement('h4');
  titleProduct.innerHTML = this.nombre;
  let inpCantidad = document.createElement('input');
  //@ts-ignore
  inpCantidad.style = "text-align: center;"
  inpCantidad.className = "form-control";
  inpCantidad.id = 'cantidad-' + this.nombre;
  let divButtons = document.createElement('div')
  let btnMas = document.createElement('button')
  btnMas.className = "col-6 btn btn-success";
  //@ts-ignore
  btnMas.style = "border-radius: 0px 0px 5px 0px;"
  btnMas.innerHTML = "+1";
  let btnMenos = document.createElement('button');
  btnMenos.className = "col-6 btn btn-danger";
  //@ts-ignore
  btnMenos.style = "border-radius: 0px 0px 0px 5px;"
  btnMenos.innerHTML = "-1";

  divToCard.appendChild(titleProduct);
  divToCard.appendChild(inpCantidad);

  divButtons.appendChild(btnMenos);
  divButtons.appendChild(btnMas);

  divToCard.appendChild(divButtons);

  //@ts-ignore
  productsContainer.append(divToCard);
  this.buttonFunction(btnMas, "+");
  this.buttonFunction(btnMenos, "-");
  }

}

// tiene que haber una peticion para cargar todos los productos que hay
// manual por lo pronto

const tibu:Product = new Product("Tiburon", 125, "BurgersLoads")
tibu.generarNew()
allProduct.push(tibu)

const chipo:Product = new Product("chipocluda", 125, "BurgersLoads")
chipo.generarNew()
allProduct.push(chipo)

// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
  let sumaTotal = 0;
  let cantidadProductos = 0;
  for(let i = 0; i < allProduct.length; i++){
    sumaTotal += allProduct[i].precio;
    cantidadProductos++;
  }
}

