
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

class Producto {
  constructor(nombre, precio, tipo) {
    this.nombre = nombre;
    this.precio = precio;
    this.tipo   = tipo;
  }

  buttonFunction(boton, action) {
    boton.addEventListener('click', ()=>{
      let campo = document.querySelector(`#cantidad-${this.nombre}`)
      if (action === "+"){
        campo.value++;
      }
      else if (action === "-"){
        if (campo.value > 0){
          campo.value--;
        }
      }
    })
  }

  generar() {
    const contenedor = document.createElement('div');
    contenedor.className = "card col-6 col-xl-6 ";

    const nombreProducto = document.createElement('h5');
    nombreProducto.className = "card-header text-uppercase";
    nombreProducto.innerHTML = this.nombre;

    const cardContent = document.createElement('div');
    cardContent.className = "card-body";

    const canitdadProducto = document.createElement('input');
    canitdadProducto.type = 'text';
    canitdadProducto.id = 'cantidad-' + this.nombre;
    canitdadProducto.className = 'container';

    const buttonDivs = document.createElement('div');
    buttonDivs.style = 'display: flex;';

    const buttonPlus = document.createElement('button');
    buttonPlus.type = 'button';
    buttonPlus.className = 'btn btn-success w-50';
    buttonPlus.innerHTML = '+1';
    this.buttonFunction(buttonPlus,"+")

    const buttonMinus = document.createElement('button');
    buttonMinus.type = 'button';
    buttonMinus.className = 'btn btn-danger w-50';
    buttonMinus.innerHTML = "-1";
    this.buttonFunction(buttonMinus, "-")

    // consolidacion de la estuctura
    const productsContainer = document.getElementById(this.tipo);

    buttonDivs.appendChild(buttonMinus); // botones
    buttonDivs.appendChild(buttonPlus);

    cardContent.appendChild(canitdadProducto); 
    cardContent.appendChild(buttonDivs);

    contenedor.appendChild(nombreProducto);
    contenedor.appendChild(cardContent)

    productsContainer.appendChild(contenedor);
  }

}
