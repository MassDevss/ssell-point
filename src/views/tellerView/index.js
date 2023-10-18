
import { newTag } from '../shared/helpers.js';


(async () => {

	let orderArray = [];

	const dataCat = await fetch('../mocks/types.json');
	const categoriesJson = await dataCat.json();
	let actualCategory = categoriesJson[0];

	const dataProd = await fetch('../mocks/prices.json');
	const allProducts = await dataProd.json();

	// the html elements to render the corresponding data
	const chargeCategories = document.querySelector('#categories-bar');
	const chargeProducts = document.querySelector('#products-view');

	const updateOrder = (product, newValue) => {

		const prodIndex = orderArray.findIndex((prod) => prod.name === product.name);

		if (prodIndex === -1)
			orderArray.push({
				...product,
				quantity: newValue
			});
		else 
			orderArray[prodIndex].quantity = newValue;
	};

	const createProductOnView = (product) => {

		const indexInOrder = orderArray.findIndex((arrayProd) => arrayProd.name === product.name);

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
		quantity.setAttribute('disabled', true);
		quantity.className = 'product-input-in-view';

		if (indexInOrder !== -1) {
			quantity.value = orderArray[indexInOrder].quantity;
		} else {
			quantity.value = 0;
		}


		const plusBtn = newTag('button');
		plusBtn.textContent = '+';
		plusBtn.className = 'btn btn-primary';
		plusBtn.addEventListener('click', () => {
			quantity.value = parseInt(quantity.value) + 1;
			updateOrder(product, quantity.value);
		});

		const minusBtn = newTag('button');
		minusBtn.textContent = '-';
		minusBtn.className = 'btn btn-primary';
		minusBtn.addEventListener('click', () => {
			if (parseInt(quantity.value) > 0){
				quantity.value = parseInt(quantity.value) - 1;
				updateOrder(product, quantity.value);
			}
		});

		divQuantity.append(minusBtn);
		divQuantity.append(quantity);
		divQuantity.append(plusBtn);

		wrap.append(img);
		wrap.append(title);
		wrap.append(divQuantity);

		return wrap;
	};


	/**
	 * renders the products of the actual category
	 */
	const renderProductsByCategory = () => {
		const organizedProds = allProducts.filter(prod => prod.type === actualCategory.name);
		console.log(organizedProds);
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


	//! notas
	const campoNotas = document.getElementById('notasInput');
	const campoDirecc = document.getElementById('directionInput');

	//! elements and physical widgets
	const radiosDelivery = [
		document.getElementById('check5'),
		document.getElementById('check10'),
		document.getElementById('check15'),
		document.getElementById('check20')
	];

	const checkRecogen = document.getElementById('checkRecogen');
	const checkComedor = document.getElementById('checkComedor');

	//! total price
	const campoPrecio = document.querySelector('.total');

	const campoEntregado = document.querySelector('#entregado');
	const campoCambio = document.querySelector('#cambio');

	// field of products recount
	const recountArea = document.querySelector('.recount');

	//! change buttons
	const change500 = document.querySelector('#btn-500');
	const change200 = document.querySelector('#btn-200');
	const change100 = document.querySelector('#btn-100');


	let numPedido = 1;

	let needDisposable = false;
	let cantidadProductos = 0;
	let cantidadDesechable = 0;
	let orderProducts = [];
	let delivery = 0;


	// gets the total of products and the total of desechables
	function plusAllProducts() {
		cantidadProductos = 0;
		cantidadDesechable = 0;
		needDisposable = false;

		orderProducts = [];
		let sumaTotal = 0;

		orderArray.forEach((product) => {
			if (product.quantity > 0) {
				sumaTotal += (product.price * product.quantity);

				cantidadProductos += parseInt(product.quantity);
				cantidadDesechable += (product.disponsable * product.quantity);

				orderProducts.push([product.name, product.price, product.quantity]);
			}
		});


		radiosDelivery.forEach((radio) => {

			// por defecto es para comedor
			needDisposable = false;
			sumaTotal += parseInt(radio.value);
			delivery = parseInt(radio.value);
		});

		if (checkComedor.checked) {
			needDisposable = false;
		}

		if (checkRecogen.checked) {
			needDisposable = true;
		}
		
		// cleaning recountArea
		recountArea.innerHTML = '';

		orderProducts.forEach((RProduct) => {
			let p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `${RProduct[2]} -- ${RProduct[0]} -- $${parseInt(RProduct[1]) * parseInt(RProduct[2])} `;
			recountArea.append(p);
		});

		if (cantidadProductos >= 1 && needDisposable) {
			let p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `${cantidadDesechable} - Desechables -- $${cantidadDesechable * 3}`;
			recountArea.append(p);

			p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `Envio -- $${delivery}`;
			recountArea.append(p);

			sumaTotal += (cantidadDesechable * 3);
		}

		campoPrecio.value = '$' + sumaTotal;

		//! this controls the money received and change to deliver

		if (campoEntregado.value > 0) {
			campoCambio.value = '$' + (campoEntregado.value - sumaTotal);
		}

	}

	/**
	 * 
	 * @param {number} value 
	 */
	const changeButton = (value) => {
		campoEntregado.value = value;
		campoCambio.value = '$' + (parseInt(campoEntregado.value) - parseInt(campoPrecio.value.replace('$', '')));
	};

	change500.addEventListener(() => changeButton(500));
	change200.addEventListener(() => changeButton(200));
	change100.addEventListener(() => changeButton(100));

	/*  este script simplemente limpia los campos  */
	function clearAll() {

		const allProdsInView = document.querySelectorAll('.product-input-in-view');

		allProdsInView.forEach((input) => input.value = '');

		// cleaning the div of recount area
		recountArea.innerHTML = '';

		orderArray = [];
		cantidadProductos = 0;
		needDisposable = false;

		campoPrecio.value = '';
		campoEntregado.value = '';
		campoCambio.value = '';
		
		radiosDelivery.forEach(radio => radio.checked = false);

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

		if (needDisposable) {
			dataPrint.push(
				{ type: 'text', value: `Desechable: $${cantidadProductos * 3}`, style: { fontFamily: 'Arial', marginTop: '10px' } }
			);
		}

		if (delivery > 0) {
			dataPrint.push(
				{ type: 'text', value: `Envio: ${delivery}`, style: { fontFamily: 'Arial' } }
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