const { remote, ipcRenderer } = require("electron");
const main = remote.require('./main')
const fs = require('fs');

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

var numPedido = 1;

// allProduct arreglo que contiene todos los productos
// sea o no sea mayor a 0 su cantidad
var needDesech = false;
var cantidadProductos = 0;
var orderProducts = [];

var lastCountOfRecount = 20;

// funcion para sacar la suma total de productos y de costo
function plusAllProducts() {
	cantidadProductos = 0;
	let checkControls = 0;
	needDesech = false;

	orderProducts = [];
	let sumaTotal = 0;
	for(let i = 0; i < allProduct.length; i++) {
		const element = allProduct[i];
		let campo = document.querySelector(`#cantidad-${element.nombre}`);
		if (campo.value > 0){
			sumaTotal += (element.precio * campo.value);
			if (element.nombre !== "Agua-Te" && element.nombre !== "Refresco" &&
				element.nombre !== "Agua-litro" && element.nombre !== "Carne-Extra" &&
				element.nombre !== "Queso-Extra"){
				cantidadProductos += parseInt(campo.value);
			}
			orderProducts.push([element.nombre, element.precio, campo.value])
		}
	}

	if (check5.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check5.value);
	}
	if (check10.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check10.value);
	}
	if (check15.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check15.value);
	}
	if (check20.checked) {
		checkControls++;
		needDesech = true;
		sumaTotal += parseInt(check20.value);
	}
	if (checkComedor.checked) {
		checkControls++;
	}
	if (checkRecogen.checked) {
		needDesech = true;
		checkControls++;
	}

	if (checkControls >= 2) {
		alert("selecciona solo una casilla");
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
		let p = document.createElement("p");
		p.className = 'recParagraph';
		p.innerHTML = `${RProduct[2]} -- ${RProduct[0]} -- ${parseInt(RProduct[1]) * parseInt(RProduct[2])} `
		recountArea.append(p);
	})

	if (cantidadProductos >= 1) {
		let p = document.createElement("p");
		p.className = 'recParagraph';
		p.innerHTML = `${cantidadProductos} - Desechables: $${cantidadProductos * 3}`
		recountArea.append(p);
	}

	if (needDesech) {
		console.log(cantidadProductos);
		sumaTotal += (cantidadProductos * 3);
	}

	campoPrecio.value = "$" + sumaTotal;
	ipcRenderer.send('pickData:onNewOrder', orderProducts)

	//! this controls the money received and change to deliver

	if (campoEntregado.value > 0) {
		campoCambio.value = "$" + (sumaTotal - campoEntregado.value);
	}

}

function btn500() {
	campoEntregado.value = 500;
	campoCambio.value = "$" + (parseInt(campoPrecio.value.replace("$","")) - parseInt(campoEntregado.value));
}

function btn200() {
	campoEntregado.value = 200;
	campoCambio.value = "$" + (parseInt(campoPrecio.value.replace("$","")) - parseInt(campoEntregado.value));
}

function btn100() {
	campoEntregado.value = 100;
	campoCambio.value = "$" + (parseInt(campoPrecio.value.replace("$","")) - parseInt(campoEntregado.value));
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
}

function createTicket(){
	let dataPrint = [
	]

	dataPrint.push(
		{type:'text', value:`num: ${numPedido}`,style:{fontFamily:"Arial" , marginBottom:"20px", marginTop:"100px"}}
	)

	numPedido++;

	for (let i = 0; i < orderProducts.length; i++) {
		const product = orderProducts[i];
		dataPrint.push(
			{type:'text', value:`${product[2]}--${product[0]}----$${product[2] * product[1]}`, style:{fontFamily:"Arial"}}
		)
	}

	if (needDesech) {
		dataPrint.push(
			{type:'text', value:`Desechable: $${cantidadProductos * 3}`, style:{fontFamily:"Arial", marginTop:"10px",marginBottom:"20px"}}
		)
	}

	dataPrint.push(
		{type:'text', value:`Notas: ${campoNotas.value}`, style:{fontFamily:"Arial", marginBottom:"10px"}}
	)

	dataPrint.push(
		{type:'text', value:`Direccion: ${campoDirecc.value}`, style:{fontFamily:"Arial",marginBottom:"10px"}}
	)

	dataPrint.push(
		{type:'text', value:`Total: ${campoPrecio.value}`, style:{fontFamily:"Arial"}}
	)
	//! this is the event for print
	ipcRenderer.send('printTime', JSON.stringify(dataPrint));
}
