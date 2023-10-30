
import {newTag} from '../shared/helpers.js';
import {messagePopUp, questionPopUp} from '../shared/popUps.js';

(async() => {
	
	
	let crudMode = 1;
	const modeLabel = document.querySelector('#mode-label');
	
	const tableCharge = document.querySelector('#charge-products');

	let products = await window.mainView.getProductsAndCategory();
	const categories = await  window.mainView.getCategories();
	let tableProducts = products;
	
	function reloadProducts() {
		tableCharge.innerHTML = '';
		tableProducts.forEach((prod) => {

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
			modify.className = 'btn btn-primary me-1';
			const deleteProd = newTag('button');
			deleteProd.className = 'btn btn-danger ms-1';
			deleteProd.textContent = 'Eliminar';

			tdActions.append(modify)
			tdActions.append(deleteProd)

			modify.addEventListener('click', () => {
				crudMode = 2;
				
				fieldId.value = prod.id;
				fieldName.value = prod.name;
				fieldPrice.value = prod.price;
				fieldDisposable.value = prod.disposable;
				fieldCategories.value = categories.find(cat => cat.name === prod.product_type).id;
				
				openForm(crudMode);
			});
			
			deleteProd.addEventListener('click', () => {
				questionPopUp('Eliminar Producto', `¿Estas segur@ de eliminar el producto: ${prod.name}?`, () => {}, async () => {
					await window.mainView.deleteProduct(prod.id);
					messagePopUp('Completado', `El producto ${ prod.name } fue eliminado correctamente.`);
					tableProducts = products;
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
		tableProducts = products;
		const lowerSearch = searchString.toLowerCase();
		tableProducts = products.filter(prod => prod.name.toLowerCase().includes(lowerSearch) || prod.product_type.toLowerCase().includes(lowerSearch));
		reloadProducts();
	}
	
	searchInput.addEventListener('keydown', async (ev) => {
		if (ev.key === 'Enter') {
			if (ev.target.value === '') {
				tableProducts = products;
				reloadProducts();
			}
			else {
				search(ev.target.value);
			}
		}
	});
	
	
	// floating form
	const floatingForm = document.querySelector('#floating-form');
	floatingForm.style.display = 'none';
	
	function closeForm() {
		floatingForm.style.display = 'none';	
	}

	/**
	 * 
	 * @param {number} mode -> the crud mode 1 equals add, 2 equals modify
	 */
	function openForm(mode) {
		
		if (mode !== 1 && mode !== 2){
			throw new Error('Incompatible modes...');
		}
		
		if (mode === 1) {
			fieldId.value = 0;
			modeLabel.innerText = 'Agregar Producto:';
		}
		else {
			modeLabel.innerText = 'Modificar Producto:';
		}
		
		floatingForm.style.display = 'flex';
	}
	
	// this is a hidden Input element
	const fieldId = document.querySelector('#product-id');
	const fieldName = document.querySelector('#product-name');
	const fieldPrice = document.querySelector('#product-price');
	const fieldDisposable = document.querySelector('#product-disposable');
	const fieldCategories = document.querySelector('#product-type');
	
	const openFormBtn = document.querySelector('#open-form');
	const saveFormBtn = document.querySelector('#save-form-btn');
	const closeFormBtn = document.querySelector('#close-btn')

	openFormBtn.addEventListener('click', () => {
		crudMode = 1;
		openForm(crudMode)
	});

	closeFormBtn.addEventListener('click', () => closeForm());
	
	saveFormBtn.addEventListener('click', async () => {
		
		const productInfo = {
			crudMode,
			id: fieldId.value,
			name: fieldName.value,
			price: fieldPrice.value,
			disposable: fieldDisposable.value,
			productType: fieldCategories.value
		};
		
		// validate
		let existError = false;
		
		if (crudMode === 2 && productInfo.id === 0 || productInfo.id === '') {
			messagePopUp('Error', 'No se puede actualizar un producto con id 0.');
			existError = true;
		}
		
		else if (productInfo.name === '') {
			messagePopUp('Error', 'El producto necesita un nombre para ser guardado.', () => existError = true);
			existError = true;
		}
		
		else if (productInfo.price === '' || productInfo.price === 0) {
			messagePopUp('Error', 'El producto necesita un precio para ser guardado.', () => existError = true);
			existError = true;
		}
		
		else if (productInfo.disposable === '') {
			messagePopUp('Error', 'El producto necesita una cantidad de desechables para ser guardado.', () => existError = true);
			existError = true;
		}
		
		else if (productInfo.productType === '' || productInfo.productType === 0) {
			messagePopUp('Error', 'El producto necesita un tipo para ser guardado.', () => existError = true);
			existError = true;
		}
		
		if (!existError){
			
			const result = await window.mainView.saveProduct(productInfo);
			
			if (result) {
				messagePopUp('Guardado', 'Producto guardado con exito!!')
				location.reload();
			} else {
				messagePopUp('Error', 'Hubo un problema al guardar el producto..')
			}

			closeForm();
		}
		
	});
	
	categories.forEach((categorie) => {
		const optionElement = newTag('option');
		optionElement.setAttribute('value', categorie.id)
		optionElement.innerText = categorie.name;
		fieldCategories.append(optionElement);
	})
	
	
	
})()
