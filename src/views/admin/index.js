

const table = document.querySelector('#products-table');


/**
 * modify dinamyc the boostrap class to change the color,
 * if data in table not be modifyed not change the color
 * by default set grey, on activate some more resaltable
 */
const saveProducts = document.querySelector('#save-products-btn');


fetch('../mocks/prices.json')
	.then(data => data.json())
	.then(products => {
		
		products.forEach(product => {
			const tr = document.createElement('TR');

			const tdName = document.createElement('TH'); // th for bootstrap bold font
			tdName.textContent = product.nombre;
			const tdPrice = document.createElement('TD');
			tdPrice.textContent = '$' + product.precio;
			const tdDisponsable = document.createElement('TD');
			tdDisponsable.textContent = product.desch;

			tr.append(tdName);
			tr.append(tdPrice);
			tr.append(tdDisponsable);

			const tdButtons = document.createElement('TD');
			const buttonDel = document.createElement('BUTTON');
			buttonDel.className = 'btn btn-danger';
			buttonDel.innerHTML = 'TRASH ICON';


			tdButtons.append(buttonDel);

			tr.append(tdButtons);

			table.append(tr);
		});
	});

