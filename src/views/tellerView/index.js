
import { newTag } from '../shared/helpers.js';


(async () => {

	const dataCat = await fetch('../mocks/types.json');
	const categoriesJson = await dataCat.json();
	let actualCategory = categoriesJson[0];

	const dataProd = await fetch('../mocks/prices.json');
	const allProducts = await dataProd.json();

	// the html elements to render the corresponding data
	const chargeCategories = document.querySelector('#categories-bar');
	const chargeProducts = document.querySelector('#products-view');

	const createProductOnView = (product) => {
		const wrap = newTag('div');
		wrap.className = 'prod-card rounded-0 border-0';
		wrap.style.width = '18rem';

		const img = newTag('img');
		img.className = 'card-img-top rounded-0';
		img.src = 'productsimages://2.jpg';

		const title = newTag('h5');
		title.className = 'p-2';
		title.textContent = product.name;

		const divQuantity = newTag('div');
		divQuantity.className = 'product-quantity-value';

		const quantity = newTag('input');
		quantity.value = 0;
		quantity.setAttribute('disabled', true);

		const plusBtn = newTag('button');
		plusBtn.textContent = '+';
		plusBtn.className = 'btn btn-primary';
		plusBtn.addEventListener('click', () => {
			quantity.value = parseInt(quantity.value) + 1;
		});

		const minusBtn = newTag('button');
		minusBtn.textContent = '-';
		minusBtn.className = 'btn btn-primary';
		minusBtn.addEventListener('click', () => {
			if (parseInt(quantity.value) > 0){
				quantity.value = parseInt(quantity.value) - 1;
			}
		});

		divQuantity.append(minusBtn);
		divQuantity.append(quantity);
		divQuantity.append(plusBtn);

		wrap.append(img);
		wrap.append(title);
		wrap.append(divQuantity);

		// wrap.addEventListener('click', () => {
		// 	productsPopUp('Producto agregado', 'El producto se agrego correctamente', () => {});
		// });

		return wrap;
	};


	/**
	 * renders the products of the actual category
	 */
	const renderProductsByCategory = () => {
		const organizedProds = allProducts.filter(prod => prod.type === actualCategory.name);
		chargeProducts.innerHTML = '';
			
		organizedProds.forEach((prod) => {
			// TODO: make a design for products in UI
			chargeProducts.append(createProductOnView(prod));
		});
	};

	/**
	 * change the category to render and render the products of the category 
	 *
	 * @param {object} categoryData like this { id: 1, name: 'categoryName' }
	 */
	const setCategory = (categoryData) => {
		actualCategory = categoryData;
		renderProductsByCategory();
	};

	setCategory(actualCategory);

	// generating the categories in UI
	categoriesJson.forEach((category) => {
		const button = newTag('BUTTON');
		button.textContent = category.name;
		button.addEventListener('click', () => setCategory(category));
		chargeCategories.append(button);		
	});


	//!notas
	const campoNotas = document.getElementById('notasInput');
	const campoDirecc = document.getElementById('directionInput');

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


	// gets the total of products and the total of desechables
	function plusAllProducts() {
		cantidadProductos = 0;
		cantidadDesechable = 0;
		let checkControls = 0;
		needDesech = false;

		orderProducts = [];
		let sumaTotal = 0;
		for (let i = 0; i < allProducts.length; i++) {
			const element = allProducts[i];
			let campo = document.querySelector(`#cantidad-${element.nombre}`);
			if (campo.value > 0) {
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
			let p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `${RProduct[2]} -- ${RProduct[0]} -- $${parseInt(RProduct[1]) * parseInt(RProduct[2])} `;
			recountArea.append(p);
		});

		if (cantidadProductos >= 1 && needDesech) {
			let p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `${cantidadDesechable} - Desechables -- $${cantidadDesechable * 3}`;
			recountArea.append(p);

			p = newTag('P');
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
		campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$', '')));
	}

	function btn200() {
		campoEntregado.value = 200;
		campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$', '')));
	}

	function btn100() {
		campoEntregado.value = 100;
		campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$', '')));
	}

	/*  este pequeno script simplemente limpia los campos  */
	function clearAll() {

		// cleaning the div of recount area
		recountArea.innerHTML = '';

		cantidadProductos = 0;
		needDesech = false;

		// !!!! DEPRECATED !!!!
		// TODO: Change this method to a new more efficient using the new orderProducts array
		for (let i = 0; i < allProducts.length; i++) {
			const element = allProducts[i];
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
	function createTicket(isCopy) {
		const now = new Date().toString();

		const TimeArr = now.split(' ');
		let myFecha = `${TimeArr[2]}-${TimeArr[1]}-${TimeArr[3]} ${TimeArr[4]}`;

		let dataPrint = [];

		dataPrint.push(
			{ type: 'text', value: `num: ${numPedido}      ${myFecha}`, style: { fontFamily: 'Arial', marginBottom: '20px', marginTop: '100px' } }
		);

		if (!isCopy) {
			numPedido++;
		}

		for (let i = 0; i < orderProducts.length; i++) {
			const product = orderProducts[i];
			dataPrint.push(
				{ type: 'text', value: `${product[2]}--${product[0]}----$${product[2] * product[1]}`, style: { fontFamily: 'Arial' } }
			);
		}

		if (needDesech) {
			dataPrint.push(
				{ type: 'text', value: `Desechable: $${cantidadProductos * 3}`, style: { fontFamily: 'Arial', marginTop: '10px' } }
			);
		}

		if (envio > 0) {
			dataPrint.push(
				{ type: 'text', value: `Envio: ${envio}`, style: { fontFamily: 'Arial' } }
			);
		}

		dataPrint.push(
			{ type: 'text', value: `Notas: ${campoNotas.value}`, style: { fontFamily: 'Arial', marginTop: '10px', marginBottom: '10px' } }
		);

		dataPrint.push(
			{ type: 'text', value: `Direccion: ${campoDirecc.value}`, style: { fontFamily: 'Arial', marginBottom: '10px' } }
		);

		dataPrint.push(
			{ type: 'text', value: `Total: ${campoPrecio.value}`, style: { fontFamily: 'Arial' } }
		);

		if (campoEntregado.value > 0) {
			dataPrint.push(
				{ type: 'text', value: `Recibido: ${campoEntregado.value}`, style: { marginTop: '10px', fontFamily: 'Arial' } }
			);
		}

		if (campoCambio.value > 0) {
			dataPrint.push(
				{ type: 'text', value: `Cambio: ${campoCambio.value}`, style: { marginTop: '10px', fontFamily: 'Arial' } }
			);
		}

		if (!isCopy) {
			window.mainView.saveOrder({
				orders: orderProducts,
				cost: campoPrecio.value,
				address: campoDirecc.value,
				numOrder: numPedido
			});
		}

		window.mainView.print(dataPrint);
	}

	function openReq() {
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



})();