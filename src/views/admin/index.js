
const table = document.querySelector('#products-table');

const ctx = document.getElementById('products-chart');

const saveProducts = document.querySelector('#save-products');
const addProduct = document.querySelector('#add-product');
const delProduct = document.querySelector('#del-product');

const productNames = [];

let productsList;
let productsStats;

// const jsonProducts = JSON.parse(window.mainView.getProducts());

(async () => {

	productsList = JSON.parse(await window.mainView.getProducts());
	productsStats = await window.mainView.getProductsStats();

	// loads the products in the table
	productsList.forEach(product => {
		const tr = document.createElement('TR');
		tr.setAttribute('type', product.type);
		tr.className = 'select-control';

		productNames.push(product.nombre);
		
		const tdName = document.createElement('TH'); // th for bootstrap bold font
		const inputName = document.createElement('INPUT');
		inputName.className = 'product-table-inp';
		inputName.value = product.nombre;
		tdName.append(inputName);

		const tdPrice = document.createElement('TD');
		const inputPrice = document.createElement('INPUT');
		inputPrice.className = 'product-table-inp';
		inputPrice.value = '$' + product.precio;
		tdPrice.append(inputPrice);

		const tdDisponsable = document.createElement('TD');
		const inputDisponsable = document.createElement('INPUT');
		inputDisponsable.className = 'product-table-inp';
		inputDisponsable.value = product.desch;
		tdDisponsable.append(inputDisponsable);

		tr.append(tdName);
		tr.append(tdPrice);
		tr.append(tdDisponsable);

		table.append(tr);
	});

	// ! MOVE ALL THIS TO ANALYTICS
	// const namesData = [];
	// const sellData = [];

	// productNames.forEach((name) => {
	// 	namesData.push(name);
	// 	sellData.push(productsStats[name] ? productsStats[name].selled : 0);
	// });

	// // eslint-disable-next-line no-undef
	// const productsChart = new Chart(ctx, {
	// 	type: 'doughnut',
	// 	data: {
	// 		labels: namesData,
	// 		datasets: [
	// 			{
	// 				label: 'vendidas',
	// 				data: sellData,
	// 				borderWidth: 1,
	// 			},
	// 		],
	// 	},
	// 	options: {
	// 		scales: {
	// 			y: {
	// 				beginAtZero: true,
	// 			},
	// 		},
	// 	},
	// });

	

})();



const generateProductsJson = () => {

	const productsCollection = [];

	console.log(table.childNodes);
	
	table.childNodes.forEach(row => {

		if (row.nodeName !== '#text'){
			const type = row.getAttribute('type');
			const name = row.childNodes[0].childNodes[0].value;
			const cost = row.childNodes[1].childNodes[0].value.replace('$', '');
			const disposable = row.childNodes[2].childNodes[0].value;

			productsCollection.push({
				nombre: name,
				precio: cost,
				type:  type,
				desch: disposable
			});
		}

	});

	return productsCollection;
};

/**
 * 
 * analize the row and 'td' inside it , to be sure they are not empty
 * 
 * @param {HTMLTrElement} row 
 */
const checkRowData = (row) => {
	
	const name = row.childNodes[0].childNodes[0].value;
	const price = row.childNodes[1].childNodes[0].value;
	const dispp = row.childNodes[2].childNodes[0].value;

	if (name === '' || price === '' || dispp === ''){
		return false;
	}

	return true;
};

saveProducts.addEventListener('click', () => {

	const allRows = table.childNodes;
	let existMissings = false;

	allRows.forEach(row => {
		if (row.nodeName !== '#text')
			if (!checkRowData(row)) 
				existMissings = true;
	});

	if (!existMissings){
		const stringProducts = JSON.stringify(generateProductsJson());
		window.mainView.writeProducts(stringProducts);
	}
	else {
		// TODO make here and alert

		// eslint-disable-next-line no-undef
		messagePopUp('Producto mal llenado', 'Ningun producto debe contener ningun espacio vacio..', () => {});

	}

});

addProduct.addEventListener('click', () => {
	
	const newRow = document.createElement('TR');

	const thName = document.createElement('TH');
	const newInpName = document.createElement('INPUT');
	newInpName.className = 'product-table-inp';
	thName.append(newInpName);

	const thPrice = document.createElement('TH');
	const newInpPrice = document.createElement('INPUT');
	newInpPrice.className = 'product-table-inp';
	thPrice.append(newInpPrice);

	const thDispp = document.createElement('TH');
	const newInpDispp = document.createElement('INPUT');
	newInpDispp.className = 'product-table-inp';
	thDispp.append(newInpDispp);

	newRow.append(thName);
	newRow.append(thPrice);
	newRow.append(thDispp);

	table.prepend(newRow);


});

