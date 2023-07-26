

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


saveProducts.addEventListener('click', () => {
	const stringProducts = JSON.stringify(generateProductsJson());

	window.mainView.writeProducts(stringProducts);
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