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
var allProduct = [];
var Product = /** @class */ (function () {
    function Product(nombre, precio, tipo) {
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
    }
    Product.prototype.buttonFunction = function (boton, action) {
        var _this = this;
        boton.addEventListener('click', function () {
            //@ts-ignore
            var campo = document.querySelector("#cantidad-".concat(_this.nombre));
            if (action === "+") {
                //@ts-ignore
                campo.value++;
            }
            else if (action === "-") {
                //@ts-ignore
                if (campo.value > 0) {
                    //@ts-ignore
                    campo.value--;
                }
            }
        });
    };
    Product.prototype.generarNew = function () {
        // consolidacion de la estuctura
        var productsContainer = document.getElementById(this.tipo);
        var divToCard = document.createElement('div');
        divToCard.className = "col-md-6 card";
        var titleProduct = document.createElement('h4');
        titleProduct.innerHTML = this.nombre;
        var inpCantidad = document.createElement('input');
        //@ts-ignore
        inpCantidad.style = "text-align: center;";
        inpCantidad.className = "form-control";
        inpCantidad.id = 'cantidad-' + this.nombre;
        var divButtons = document.createElement('div');
        var btnMas = document.createElement('button');
        btnMas.className = "col-6 btn btn-success";
        //@ts-ignore
        btnMas.style = "border-radius: 0px 0px 5px 0px;";
        btnMas.innerHTML = "+1";
        var btnMenos = document.createElement('button');
        btnMenos.className = "col-6 btn btn-danger";
        //@ts-ignore
        btnMenos.style = "border-radius: 0px 0px 0px 5px;";
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
    };
    return Product;
}());
// tiene que haber una peticion para cargar todos los productos que hay
// manual por lo pronto
var tibu = new Product("Tiburon", 125, "BurgersLoads");
tibu.generarNew();
allProduct.push(tibu);
var chipo = new Product("chipocluda", 125, "BurgersLoads");
chipo.generarNew();
allProduct.push(chipo);
// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
    var sumaTotal = 0;
    var cantidadProductos = 0;
    for (var i = 0; i < allProduct.length; i++) {
        sumaTotal += allProduct[i].precio;
        cantidadProductos++;
    }
}
