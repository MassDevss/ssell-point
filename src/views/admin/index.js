
import {newTag} from '../shared/helpers.js';
import {messagePopUp, questionPopUp} from '../shared/popUps.js';

(async() => {
	
	/**
	 * 1 -> add
	 * 2 -> modify
	 * 3 -> delete
	 * @type {number}
	 */
	let crudMode = 1;
	const modeLabel = document.querySelector('#mode-label');
	
	const fieldName = document.querySelector('#product-name');
	const fieldPrice = document.querySelector('#product-price');
	const fieldDisposable = document.querySelector('#product-disposable');
	const fieldCategorie = document.querySelector('#product-type');
	
	const tableCharge = document.querySelector('#charge-products');

	let products = await window.mainView.getProductsAndCategory();
	
	function reloadProducts() {
		tableCharge.innerHTML = '';
		products.forEach((prod) => {

			const tr = newTag('tr');
			const tdId = newTag('td');
			const tdName = newTag('td');
			const tdCost = newTag('td');
			const tdDisposable = newTag('td');
			const tdType = newTag('td');
			const tdActions = newTag('td');

			tdId.textContent = prod.id;
			tdName.textContent = prod.name;
			tdCost.textContent = prod.price;
			tdDisposable.textContent = prod.disposable;
			tdType.textContent = prod.product_type;

			const modify = newTag('button');
			modify.textContent = 'Modificar';
			modify.className = 'btn btn-primary';
			const deleteProd = newTag('button');
			deleteProd.className = 'btn btn-danger';
			deleteProd.textContent = 'Eliminar';

			tdActions.append(modify)
			tdActions.append(deleteProd)

			modify.addEventListener('click', () => {

			});
			deleteProd.addEventListener('click', () => {
				questionPopUp('Eliminar Producto', `¿Estas segur@ de eliminar el producto: ${prod.name}?`, () => {}, async () => {
					await window.mainView.deleteProduct(prod.id);
					messagePopUp('Completado', `El producto ${ prod.name } fue eliminado correctamente.`);
					products = await window.mainView.getProductsAndCategory();
					reloadProducts();
				});
			});

			tr.append(tdId);
			tr.append(tdName);
			tr.append(tdCost);
			tr.append(tdDisposable);
			tr.append(tdType);
			tr.append(tdActions);

			tableCharge.append(tr);

		});
	}

	reloadProducts();
	
	const searchInput = document.querySelector('#products-search');
	
	function search(searchString) {
		const lowerSearch = searchString.toLowerCase();
		products = products.filter(prod => prod.name.toLowerCase().includes(lowerSearch));
		reloadProducts();
	}
	
	searchInput.addEventListener('keydown', async (ev) => {
		if (ev.key === 'Enter') {
			if (ev.target.value === '') {
				products = await window.mainView.getProductsAndCategory();
				reloadProducts();
			}
			else {
				search(ev.target.value);
			}
		}
	});
	
})()
