
import { newTag } from '../shared/helpers.js';
import { SideBarProduct } from './SideBarProduct.js';
import {deliveryTypes, payMethods, tablesCount} from './orderPopUpConfigurations.js';

(async () => {

	let orderNum = await window.mainView.nexNumOrder();

	let orderArray = [];

	const allCategories = await window.mainView.getCategories();
	let actualCategory = allCategories[0];
	
	const allProducts = await window.mainView.getProducts();

	// sideBar ticket
	const sideBarTicket = document.querySelector('.order-elements');
	const confirmTicketBtn = document.querySelector('#confirm-ticket');


	confirmTicketBtn.addEventListener('click', () => {
		const products = sideBarTicket.children;
		
		
	});
	
	
	
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
		wrap.addEventListener('click', () => {
			const ProductForSideBar = new SideBarProduct(product);
			
			sideBarTicket.appendChild(ProductForSideBar.Build());
		});
		// wrap.style.width = '18rem';

		// const img = newTag('img');
		// img.className = 'card-img-top rounded-0';
		// img.src = 'productsimages://2.jpg';

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
			if (parseInt(quantity.value) > 0) {
				quantity.value = parseInt(quantity.value) - 1;
				updateOrder(product, quantity.value);
			}
		});

		// divQuantity.append(minusBtn);
		// divQuantity.append(quantity);
		// divQuantity.append(plusBtn);

		// wrap.append(img);
		wrap.append(title);
		wrap.append(divQuantity);

		return wrap;
	};


	/**
	 * renders the products of the actual category
	 */
	const renderProductsByCategory = () => {
		const organizedProds = allProducts.filter(prod => prod.product_type === actualCategory.id);
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

	// generating the categories in UI
	allCategories.forEach((category) => {
		const button = newTag('BUTTON');
		button.textContent = category.name;
		button.addEventListener('click', () => setCategory(category));
		chargeCategories.append(button);
	});

	setCategory(actualCategory);
	
	// Set up delivery options
	const deliverySelect = document.querySelector('#delivery-type');
	const deliveryKeys = Object.keys(deliveryTypes);
	
	deliveryKeys.forEach(key => {
		const option = newTag('option');
		option.textContent = deliveryTypes[key];
		option.setAttribute('value', key);
		deliverySelect.append(option);
	});
	
	// Set up Tables
	const tableSelection = document.querySelector('#table-select');
	
	for (let i = 0; i < tablesCount; i++) {
		const stringedNum = (i + 1).toString();
		const option = newTag('option');
		option.textContent = stringedNum;
		option.setAttribute('value', stringedNum);
		tableSelection.append(option);
	}
	
	// Set up Pay Methods
	const uniquePayMethod = document.querySelector('#pay-method');
	const methodsKeys = Object.keys(payMethods);
	
	methodsKeys.forEach(key => {
		const option = newTag('option');
		option.textContent = payMethods[key];
		option.setAttribute('value', key);
		uniquePayMethod.append(option);
	});
	

	//! notas
	const campoNotas = document.getElementById('notasInput');
	const campoDirecc = document.getElementById('directionInput');

	//! elements and physical widgets
	const radiosDelivery = [
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

	const pushToRecount = (content) => {
		let p = newTag('P');
		p.className = 'recParagraph';
		p.innerHTML = content;
		recountArea.append(p);
	};

	//! change buttons
	const change500 = document.querySelector('#btn-500');
	const change200 = document.querySelector('#btn-200');
	const change100 = document.querySelector('#btn-100');


	let needDisposable = false;
	let cantidadProductos = 0;
	let cantidadDesechable = 0;
	let orderProducts = [];
	let delivery = 0;

	// gets the total of products and the total of desechables
	function plusAllProducts() {
		delivery = 0;
		cantidadProductos = 0;
		cantidadDesechable = 0;
		needDisposable = false;

		orderProducts = [];
		let sumaTotal = 0;

		orderArray.forEach((product) => {
			if (product.quantity > 0) {
				sumaTotal += (product.price * product.quantity);

				cantidadProductos += parseInt(product.quantity);
				cantidadDesechable += (product.disposable * product.quantity);

				orderProducts.push([product.name, product.price, product.quantity]);
			}
		});

		// cleaning recountArea
		recountArea.innerHTML = '';

		radiosDelivery.forEach((radio) => {
			if (radio.checked) {
				delivery = parseInt(radio.value);
				needDisposable = true;
			}
		});

		if (checkComedor.checked) {
			needDisposable = false;
		}

		if (checkRecogen.checked) {
			needDisposable = true;
		}

		orderProducts.forEach((RProduct) => {
			let p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `${RProduct[2]} -- ${RProduct[0]} -- $${parseInt(RProduct[1]) * parseInt(RProduct[2])}`;
			recountArea.append(p);
		});

		if (needDisposable) {
			let p = newTag('P');
			p.className = 'recParagraph';
			p.innerHTML = `${cantidadDesechable} - Desechables -- $${cantidadDesechable * 3}`;
			recountArea.append(p);

			if (!checkRecogen.checked) {
				p = newTag('P');
				p.className = 'recParagraph';
				p.innerHTML = `Envió -- $${delivery}`;
				recountArea.append(p);
			}

			sumaTotal += (cantidadDesechable * 3);
			sumaTotal += delivery;
		}

		campoPrecio.value = '$' + sumaTotal;

		//! this controls the money received and change to deliver

		if (campoEntregado.value > 0) {
			campoCambio.value = '$' + (campoEntregado.value - sumaTotal);
		}


	}

	/**
	 * @param {number} value 
	 */
	const changeButton = (value) => {
		campoEntregado.value = `$${value}`;
		campoCambio.value = '$' + (parseInt(value) - parseInt(campoPrecio.value.replace('$', '') | 0));
	};

	change500.addEventListener('click', () => changeButton(500));
	change200.addEventListener('click', () => changeButton(200));
	change100.addEventListener('click', () => changeButton(100));

	/*  este script simplemente limpia los campos  */
	function clearAll() {

		const allProdsInView = document.querySelectorAll('.product-input-in-view');

		allProdsInView.forEach((input) => input.value = 0);

		// cleaning the div of recount area
		recountArea.innerHTML = '';

		orderArray = [];
		cantidadProductos = 0;
		needDisposable = false;

		campoPrecio.value = '$0';
		campoEntregado.value = '';
		campoCambio.value = '';

		radiosDelivery.forEach(radio => radio.checked = false);

		checkRecogen.checked = false;
		checkComedor.checked = false;
		campoNotas.value = '';
		campoDirecc.value = '';
	}


	const cashMethod = document.querySelector('#method-cash-check');
	const cardMethod = document.querySelector('#method-card-check');
	const transferMethod = document.querySelector('#method-transfer-check');

	const validatingOrder = () => {

		const validateScheme = {
			valid: true,
			selectedMethod: null
		};

		if (orderProducts.length === 0) {
			alert('No has seleccionado ningún producto..');
			validateScheme.valid = false;
		}

		if (needDisposable && !checkRecogen.checked) {
			if (campoDirecc.value === '') {
				alert('No hay una dirección colocada...');
				validateScheme.valid = false;
			}
		}

		let methodCount = 0;

		if (cashMethod.checked) {
			methodCount++;
			validateScheme.selectedMethod = 'Efectivo';
		}
		if (cardMethod.checked) {
			methodCount++;
			validateScheme.selectedMethod = 'Tarjeta';
		}
		if (transferMethod.checked) {
			methodCount++;
			validateScheme.selectedMethod = 'Transferencia';
		}

		if (validateScheme.selectedMethod === null || methodCount > 1) {
			alert('Selecciona un método de pago para continuar...');
			validateScheme.valid = false;
		}

		return validateScheme;
	};


	/**
	 * @param {Boolean} isCopy 
	 */
	async function createTicket(isCopy) {
		const now = new Date().toString();

		const TimeArr = now.split(' ');
		let myFecha = `${TimeArr[2]}-${TimeArr[1]}-${TimeArr[3]} ${TimeArr[4]}`;

		let dataPrint = [];

		const validateData = validatingOrder();

		if (!validateData.valid) {
			return;
		}

		if (!isCopy) {

			orderNum = await window.mainView.nexNumOrder();

			// datos rfc
			dataPrint.push(
				{ type: 'text', value: 'TIBURÓN BURGER', style: { fontFamily: 'Arial', fontSize: '15px', marginTop: '20px' } }
			);

			dataPrint.push(
				{ type: 'text', value: 'VICTOR SAMANIEGO SERRANO', style: { fontFamily: 'Arial', fontSize: '10px' } }
			);

			dataPrint.push(
				{ type: 'text', value: 'ORQUÍDEA 1586 JARDINES DE ZACATECAS', style: { fontFamily: 'Arial', fontSize: '10px' } }
			);
			dataPrint.push(
				{ type: 'text', value: 'CP: 81249', style: { fontFamily: 'Arial', fontSize: '10px' } }
			);
			dataPrint.push(
				{ type: 'text', value: 'RFC: SASV9911134C9', style: { fontFamily: 'Arial', fontSize: '10px' } }
			);
			dataPrint.push(
				{ type: 'text', value: '6681277878', style: { fontFamily: 'Arial', fontSize: '10px' } }
			);
		}

		dataPrint.push(
			{ type: 'text', value: `num: ${orderNum[0].next}          ${myFecha}`, style: { fontFamily: 'Arial', marginBottom: '10px', marginTop: '20px' } }
		);

		let deliveryStatus;

		if (checkComedor.checked) {
			deliveryStatus = 'Comedor';
		}
		else if (checkRecogen.checked) {
			deliveryStatus = 'Recogen';
		}
		else {
			deliveryStatus = 'Envió';
		}

		dataPrint.push(
			{ type: 'text', value: deliveryStatus, style: { fontFamily: 'Arial', marginBottom: '20px' } }
		);

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
				{ type: 'text', value: `Envió: $${delivery}`, style: { fontFamily: 'Arial' } }
			);
		}

		dataPrint.push(
			{ type: 'text', value: `Notas: ${campoNotas.value}`, style: { fontFamily: 'Arial', marginTop: '10px', marginBottom: '10px' } }
		);


		if (!isCopy) {

			dataPrint.push(
				{ type: 'text', value: `Dirección: ${campoDirecc.value}`, style: { fontFamily: 'Arial', marginBottom: '10px' } }
			);

			dataPrint.push(
				{ type: 'text', value: `Total: ${campoPrecio.value}`, style: { fontFamily: 'Arial' } }
			);

			if (parseFloat(campoEntregado.value.replace('$', '')) > 0) {
				dataPrint.push(
					{ type: 'text', value: `Recibido: ${campoEntregado.value}`, style: { marginTop: '10px', fontFamily: 'Arial' } }
				);
			}

			if (parseFloat(campoCambio.value.replace('$', '')) > 0) {
				dataPrint.push(
					{ type: 'text', value: `Cambio: ${campoCambio.value}`, style: { marginTop: '10px', fontFamily: 'Arial' } }
				);
			}

			window.mainView.saveOrder({
				orders: orderProducts,
				cost: campoPrecio.value,
				address: campoDirecc.value,
				numOrder: orderNum[0].next,
				payMethod: validateData.selectedMethod
			});
		}

		window.mainView.print(dataPrint);
	}

	const searchBtn = document.querySelector('#openReq');
	searchBtn.addEventListener('click', () => window.mainView.openReq());

	// don't touch this please, this is a listener for put information on notes and direction inputs
	window.mainView.setInfoListener();


	const printOriginal = document.querySelector('#print-original');
	const printCopy = document.querySelector('#print-copy');
	const plusTotal = document.querySelector('#plus-total');
	const clearProducts = document.querySelector('#clear-products');

	printOriginal.addEventListener('click', () => {
		createTicket(false);
	});

	printCopy.addEventListener('click', () => {
		createTicket(true);
	});

	plusTotal.addEventListener('click', () => {
		plusAllProducts();
	});

	clearProducts.addEventListener('click', () => {
		clearAll();
	});


})();