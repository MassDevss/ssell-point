const { remote, ipcRenderer } = require("electron");
const main = remote.require('./main')


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

// allProduct arreglo que contiene todos los productos
// sea o no sea mayor a 0 su cantidad
let needDesech = false;
let cantidadProductos = 0;
let orderProducts = [];
let envio = 0;
let lastCountOfRecount = 20;


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
					element.nombre !== "Queso-Extra" && element.nombre !== "HotDog" &&
					element.nombre !== "HotDog-papas"){
						if (element.type === "PromosLoads" && element.nombre !== "Clasica-Boneless" ){
							cantidadProductos += parseInt(campo.value) * 2;
						} else {
							cantidadProductos += parseInt(campo.value);
						}
				}
			orderProducts.push([element.nombre, element.precio, campo.value])
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
		p.innerHTML = `${RProduct[2]} -- ${RProduct[0]} -- $${parseInt(RProduct[1]) * parseInt(RProduct[2])} `
		recountArea.append(p);
	})

	if (cantidadProductos >= 1 && needDesech) {
		let p = document.createElement("p");
		p.className = 'recParagraph';
		p.innerHTML = `${cantidadProductos} - Desechables -- $${cantidadProductos * 3}`
		recountArea.append(p);

		p = document.createElement("p");
		p.className = 'recParagraph';
		p.innerHTML = `Envio -- $${envio}`
		recountArea.append(p);

		sumaTotal += (cantidadProductos * 3);
	}

	campoPrecio.value = "$" + sumaTotal;
	ipcRenderer.send('pickData:onNewOrder', orderProducts)

	//! this controls the money received and change to deliver

	if (campoEntregado.value > 0) {
		campoCambio.value = "$" + (campoEntregado.value - sumaTotal);
	}

}

function btn500() {
	campoEntregado.value = 500;
	campoCambio.value = "$" + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace("$","")));
}

function btn200() {
	campoEntregado.value = 200;
	campoCambio.value = "$" + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace("$","")));
}

function btn100() {
	campoEntregado.value = 100;
	campoCambio.value = "$" + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace("$","")));
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

	const TimeArr = now.split(" ")
	let myFecha = `${TimeArr[2]}-${TimeArr[1]}-${TimeArr[3]} ${TimeArr[4]}`;

	let dataPrint = [
	]

	dataPrint.push(
		{type:'text', value:`num: ${numPedido}      ${myFecha}`,style:{fontFamily:"Arial" , marginBottom:"20px", marginTop:"100px"}}
	)

	if (!isCopy) {
		numPedido++;
	}

	for (let i = 0; i < orderProducts.length; i++) {
		const product = orderProducts[i];
		dataPrint.push(
			{type:'text', value:`${product[2]}--${product[0]}----$${product[2] * product[1]}`, style:{fontFamily:"Arial"}}
		)
	}

	if (needDesech) {
		dataPrint.push(
			{type:'text', value:`Desechable: $${cantidadProductos * 3}`, style:{fontFamily:"Arial", marginTop:"10px"}}
		)
	}

	if (envio > 0) {
		dataPrint.push(
			{type:'text', value:`Envio: ${envio}`, style:{fontFamily:"Arial"}}
		)
	}

	dataPrint.push(
		{type:'text', value:`Notas: ${campoNotas.value}`, style:{fontFamily:"Arial", marginTop:"10px" ,marginBottom:"10px"}}
	)

	dataPrint.push(
		{type:'text', value:`Direccion: ${campoDirecc.value}`, style:{fontFamily:"Arial",marginBottom:"10px"}}
	)

	dataPrint.push(
		{type:'text', value:`Total: ${campoPrecio.value}`, style:{fontFamily:"Arial"}}
	)

	if (campoEntregado.value > 0) {
		dataPrint.push(
			{type:'text', value:`Recibido: ${campoEntregado.value}`, style:{marginTop:"10px", fontFamily:"Arial"}}
		)
	}

	if (campoCambio.value > 0) {
		dataPrint.push(
			{type:'text', value:`Cambio: ${campoCambio.value}`, style:{marginTop:"10px", fontFamily:"Arial"}}
		)
	}

	//! this is the event for print
	ipcRenderer.send('printTime', JSON.stringify(dataPrint));
}
