



let ticketProducts = [];
let allProduct = [];

class Product {

  constructor(nombre, precio, tipo) {
    this.nombre = nombre;
    this.precio = precio;
    this.tipo   = tipo;
  }

  buttonFunction(boton, action) {
    boton.addEventListener('click', ()=>{
      let campo = document.querySelector(`#cantidad-${this.nombre}`);
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


  Generate() {
    // consolidacion de la estuctura
    const productsContainer = document.getElementById(this.tipo);

    let divToCard = document.createElement('div');
    divToCard.className = "col-md-12 card prd-view";
    let titleProduct = document.createElement('h4');
    titleProduct.className = "col-6";
    titleProduct.innerHTML = this.nombre;
    let inpCantidad = document.createElement('input');
    //@ts-ignore
    inpCantidad.style = "text-align: center;"
    inpCantidad.className = "form-control";
    inpCantidad.id = 'cantidad-' + this.nombre;
    let btnMas = document.createElement('button')
    btnMas.className = "col-2 btn btn-success plus-button";
    //@ts-ignore
    btnMas.style = "border-radius: 0px 0px 5px 0px;"
    btnMas.innerHTML = "+";
    let btnMenos = document.createElement('button');
    btnMenos.className = "col-2 btn btn-danger minus-button";
    //@ts-ignore
    btnMenos.style = "border-radius: 0px 0px 0px 5px;"
    btnMenos.innerHTML = "-";

    divToCard.appendChild(titleProduct);
    divToCard.appendChild(btnMenos);
    divToCard.appendChild(btnMas);
    divToCard.appendChild(inpCantidad);

    productsContainer.appendChild(divToCard);
    this.buttonFunction(btnMas, "+");
    this.buttonFunction(btnMenos, "-");
  }


}