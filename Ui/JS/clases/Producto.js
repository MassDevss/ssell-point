
class Producto {
  constructor(nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
  }

  buttonFunction(boton){
    boton.addEventListener('click', ()=>{
      console.log("asdas")
    })
  }

  generar() {
    const contenedor = document.createElement('div');
    contenedor.className = "card col-4 col-xl-2";

    const nombreProducto = document.createElement('h5');
    nombreProducto.className = "card-header";
    nombreProducto.innerHTML = this.nombre;

    const cardContent = document.createElement('div');
    cardContent.className = "card-body";

    const canitdadProducto = document.createElement('input');
    canitdadProducto.type = 'text';
    canitdadProducto.id = 'cantidad-' + nombreProducto;
    canitdadProducto.className = 'container';

    const buttonDivs = document.createElement('div');
    buttonDivs.style = 'display: flex;';

    const buttonPlus = document.createElement('button');
    buttonPlus.type = 'button';
    buttonPlus.className = 'm-1 btn btn-success w-50';
    buttonPlus.innerHTML = '+1';
    this.buttonFunction(buttonPlus)

    const buttonMinus = document.createElement('button');
    buttonMinus.type = 'button';
    buttonMinus.className = 'm-1 btn btn-danger w-50';
    buttonMinus.innerHTML = "-1";

    // consolidacion de la estuctura
    const productsContainer = document.getElementById('products-container');

    buttonDivs.appendChild(buttonMinus); // botones
    buttonDivs.appendChild(buttonPlus);

    cardContent.appendChild(canitdadProducto); 
    cardContent.appendChild(buttonDivs);

    contenedor.appendChild(nombreProducto);
    contenedor.appendChild(cardContent)

    productsContainer.appendChild(contenedor);
  }


}

const testP = new Producto("tiburon", 123);
testP.generar()

/*
    <div class="card col-4 col-xl-2">  --
      <h5 class="card-header">Tiburon</h5> --
      <div class="card-body">
        <input type="text" id="qualityPRD" class="container">
        <div style="display: flex;">
          <button type="button" class="m-1 btn btn-danger w-50" onclick="menosUno()">-1</button>    
          <button type="button" class="m-1 btn btn-success w-50" onclick="masUno()">+1</button>  
        </div>
      </div>
    </div>
*/