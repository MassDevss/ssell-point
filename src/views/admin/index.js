
import {newTag} from '../shared/helpers.js';

(async() => {
	
	const fieldName = document.querySelector('#');
	const fieldPrice = document.querySelector('#');
	const fieldDisposable = document.querySelector('#');
	const fieldCategorie = document.querySelector('#');

	const tableCharge = document.querySelector('#charge-products');

	const products = await window.mainView.getProducts();
	
	products.forEach((prod) => {
		
		const tr = newTag('tr');
		const tdName = newTag('td');
		const tdCost = newTag('td');
		const tdDisposable = newTag('td');
		const tdType = newTag('td');
		
		tdName.textContent = prod.name;
		tdCost.textContent = prod.price;
		tdDisposable.textContent = prod.disposable;
		tdType.textContent = prod.product_type;
		
		tr.append(tdName);
		tr.append(tdCost);
		tr.append(tdDisposable);
		tr.append(tdType);

		tableCharge.append(tr);
		
	});
	
})()
