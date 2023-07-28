

const table = document.querySelector('#products-table');

const saveProducts = document.querySelector('#save-products');
const addProduct = document.querySelector('#add-product');
const delProduct = document.querySelector('#del-product');

const productNames = [];


fetch('../mocks/prices.json')
	.then(data => data.json())
	.then(products => {
		
		products.forEach(product => {
			const tr = document.createElement('TR');
			tr.setAttribute('type', product.type);

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
	});


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

/*
(async () => {
	const allProducts = await fetch('../mocks/prices.json').then(data => data.json()).then(products => products);
	const copy = JSON.parse(JSON.stringify(allProducts));

	const saveProducts = document.querySelector('#save-products-btn');
	
	console.log(allProducts[0]);

	console.log(allProducts === allProducts);

	allProducts[0].nombre = 'juan';

	console.log(copy[0]);
	console.log(allProducts[0]);

})();
*/