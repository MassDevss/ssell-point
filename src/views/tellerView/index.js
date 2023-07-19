
let allProduct = [];

class Product {

	constructor(nombre, precio, tipo, desch) {
		this.nombre = nombre;
		this.precio = precio;
		this.tipo   = tipo;
		this.desch = desch;
	}

	buttonFunction(boton, action) {
		boton.addEventListener('click', ()=>{
			let campo = document.querySelector(`#cantidad-${this.nombre}`);
			if (action === '+'){
				campo.value++;
			}
			else if (action === '-'){
				if (campo.value > 0){
					campo.value--;
				}
			}
		});
	}

	Generate() {
		const productsContainer = document.getElementById(this.tipo);

		let divToCard = document.createElement('div');
		divToCard.className = 'col-md-12 card prd-view';
		let titleProduct = document.createElement('h4');
		titleProduct.className = 'col-6 product-name-in-view';
		titleProduct.innerHTML = this.nombre;
		let inpCantidad = document.createElement('input');
		//@ts-ignore
		inpCantidad.style = 'text-align: center;';
		inpCantidad.className = 'form-control';
		inpCantidad.id = 'cantidad-' + this.nombre;
		let btnMas = document.createElement('button');
		btnMas.className = 'col-2 btn btn-success plus-button';
		//@ts-ignore
		btnMas.style = 'border-radius: 0px 0px 5px 0px;';
		btnMas.innerHTML = '+';
		let btnMenos = document.createElement('button');
		btnMenos.className = 'col-2 btn btn-danger minus-button';
		//@ts-ignore
		btnMenos.style = 'border-radius: 0px 0px 0px 5px;';
		btnMenos.innerHTML = '-';

		divToCard.appendChild(titleProduct);
		divToCard.appendChild(btnMenos);
		divToCard.appendChild(btnMas);
		divToCard.appendChild(inpCantidad);

		productsContainer.appendChild(divToCard);
		this.buttonFunction(btnMas, '+');
		this.buttonFunction(btnMenos, '-');
	}
}


/*

  nombre:  =>   obviamente es el nombre del producto 
  precio: => igualmente obvio es el precio del producto

  tipo: => ATENCION::::::::::::::::::::

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


fetch('../mocks/precios.json').then(data => data.json()).then(data => {
	data.forEach((product) => {
		let pdr = new Product(product.nombre, product.precio, product.type, product.desch);
		allProduct.push(pdr);
		pdr.Generate();
	});
});


//!notas
const campoNotas = document.getElementById('notasInput');
const campoDirecc = document.getElementById('direccionInput');

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

// field of products recount
const recountArea = document.querySelector('.recount');

let numPedido = 1;


let needDesech = false;
let cantidadProductos = 0;
let cantidadDesechable = 0;
let orderProducts = [];
let envio = 0;
let lastCountOfRecount = 20;


// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
	cantidadProductos = 0;
	cantidadDesechable = 0;
	let checkControls = 0;
	needDesech = false;

	orderProducts = [];
	let sumaTotal = 0;
	for(let i = 0; i < allProduct.length; i++) {
		const element = allProduct[i];
		let campo = document.querySelector(`#cantidad-${element.nombre}`);
		if (campo.value > 0){
			sumaTotal += (element.precio * campo.value);

			cantidadProductos += parseInt(campo.value);
			cantidadDesechable += element.desch * campo.value;

			orderProducts.push([element.nombre, element.precio, campo.value]);
		}
	}

	if (check5.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check5.value);
		envio = parseInt(check5.value);
	}
	if (check10.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check10.value);
		envio = parseInt(check10.value);
	}
	if (check15.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check15.value);
		envio = parseInt(check15.value);
	}
	if (check20.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check20.value);
		envio = parseInt(check20.value);
	}
	if (checkComedor.checked) {
		needDesech = false;
		checkControls++;
	}
	if (checkRecogen.checked) {
		needDesech = true;
		checkControls++;
	}

	if (checkControls >= 2) {
		alert('selecciona solo una casilla');
		check5.checked = false;
		check10.checked = false;
		check15.checked = false;
		check20.checked = false;
		checkRecogen.checked = false;
		checkComedor.checked = false;
		return;
	}

	while (recountArea.children.length > 0) {
		recountArea.removeChild(recountArea.firstChild);
	}

	lastCountOfRecount = recountArea.children.length;
	orderProducts.forEach((RProduct) => {
		let p = document.createElement('P');
		p.className = 'recParagraph';
		p.innerHTML = `${RProduct[2]} -- ${RProduct[0]} -- $${parseInt(RProduct[1]) * parseInt(RProduct[2])} `;
		recountArea.append(p);
	});

	if (cantidadProductos >= 1 && needDesech) {
		let p = document.createElement('P');
		p.className = 'recParagraph';
		p.innerHTML = `${cantidadDesechable} - Desechables -- $${cantidadDesechable * 3}`;
		recountArea.append(p);

		p = document.createElement('P');
		p.className = 'recParagraph';
		p.innerHTML = `Envio -- $${envio}`;
		recountArea.append(p);

		sumaTotal += (cantidadDesechable * 3);
	}

	campoPrecio.value = '$' + sumaTotal;

	//! this controls the money received and change to deliver

	if (campoEntregado.value > 0) {
		campoCambio.value = '$' + (campoEntregado.value - sumaTotal);
	}

}

function btn500() {
	campoEntregado.value = 500;
	campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$','')));
}

function btn200() {
	campoEntregado.value = 200;
	campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$','')));
}

function btn100() {
	campoEntregado.value = 100;
	campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$','')));
}

/*  este pequeno script simplemente limpia los campos  */
function clearAll() {

	while (recountArea.children.length > 0) {
		recountArea.removeChild(recountArea.firstChild);
	}

	cantidadProductos = 0;
	needDesech = false;
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
	campoNotas.value = '';
	campoDirecc.value = '';
}


// aqui no le muevas
function createTicket(isCopy){
	const now = new Date().toString();

	const TimeArr = now.split(' ');
	let myFecha = `${TimeArr[2]}-${TimeArr[1]}-${TimeArr[3]} ${TimeArr[4]}`;

	let dataPrint = [];

	dataPrint.push(
		{type:'text', value:`num: ${numPedido}      ${myFecha}`,style:{fontFamily:'Arial' , marginBottom:'20px', marginTop:'100px'}}
	);

	if (!isCopy) {
		numPedido++;
	}

	for (let i = 0; i < orderProducts.length; i++) {
		const product = orderProducts[i];
		dataPrint.push(
			{type:'text', value:`${product[2]}--${product[0]}----$${product[2] * product[1]}`, style:{fontFamily:'Arial'}}
		);
	}

	if (needDesech) {
		dataPrint.push(
			{type:'text', value:`Desechable: $${cantidadProductos * 3}`, style:{fontFamily:'Arial', marginTop:'10px'}}
		);
	}

	if (envio > 0) {
		dataPrint.push(
			{type:'text', value:`Envio: ${envio}`, style:{fontFamily:'Arial'}}
		);
	}

	dataPrint.push(
		{type:'text', value:`Notas: ${campoNotas.value}`, style:{fontFamily:'Arial', marginTop:'10px' ,marginBottom:'10px'}}
	);

	dataPrint.push(
		{type:'text', value:`Direccion: ${campoDirecc.value}`, style:{fontFamily:'Arial',marginBottom:'10px'}}
	);

	dataPrint.push(
		{type:'text', value:`Total: ${campoPrecio.value}`, style:{fontFamily:'Arial'}}
	);

	if (campoEntregado.value > 0) {
		dataPrint.push(
			{type:'text', value:`Recibido: ${campoEntregado.value}`, style:{marginTop:'10px', fontFamily:'Arial'}}
		);
	}

	if (campoCambio.value > 0) {
		dataPrint.push(
			{type:'text', value:`Cambio: ${campoCambio.value}`, style:{marginTop:'10px', fontFamily:'Arial'}}
		);
	}

	if (!isCopy){
		window.mainView.saveOrder({
			orders: orderProducts,
			cost: campoPrecio.value,
			address: campoDirecc.value,
			numOrder: numPedido
		});
	}

	window.mainView.print(dataPrint);
}

function openReq(){
	window.mainView.openReq();
}

// don't touch this please, this is a listener for put information on notes and direction inputs
window.mainView.setInfoListener();


const printOriginal = document.querySelector('#printOg');
const printCopuy = document.querySelector('#printCopy');
const plusTotal = document.querySelector('#plus-total');
const clearProducts = document.querySelector('#clear-products');

printOriginal.addEventListener('click', () => {
	createTicket(false);
});

printCopuy.addEventListener('click', () => {
	createTicket(true);
});

plusTotal.addEventListener('click', () => {
	plusAllProducts();
});

clearProducts.addEventListener('click', () => {
	clearAll();
});