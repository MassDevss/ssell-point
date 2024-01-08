
import { newTag } from '../shared/helpers.js';


export class SideBarProduct {
	
	product;
	notesElement;
	_wrapperElement;

	constructor(product) {
		this.product = product;

		const wrapper = newTag('div');
		wrapper.className = 'product-in-order py-2 text-white rounded mb-1';
		const topProduct = newTag('div');
		topProduct.className = 'top-product px-2';
		const qualityNamePrice = newTag('p');
		qualityNamePrice.className = 'm-0';
		qualityNamePrice.textContent = `1 - ${this.product.name} - $${this.product.price}`;

		const buttonsProduct = newTag('div');
		buttonsProduct.className = 'buttons-product';

		const delBtn = newTag('button');
		delBtn.className = 'btn btn-danger p-1';
		delBtn.title = 'Eliminar el pedido de la orden';
		delBtn.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
				<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
			</svg>`;
		delBtn.addEventListener('click', () => wrapper.remove());

		const notesContainer = newTag('div');
		notesContainer.className = 'text-start px-2';
		const noteElement = newTag('input');
		noteElement.setAttribute('type', 'text');
		noteElement.className = 'mt-1 w-100 rounded outline-none border-0 p-1';
		noteElement.setAttribute('contenteditable', 'true');
		noteElement.setAttribute('placeholder', 'Notas del producto...');

		this.notesElement = noteElement;
		this._wrapperElement = wrapper;

		wrapper.appendChild(topProduct);
		topProduct.appendChild(qualityNamePrice);
		topProduct.appendChild(buttonsProduct);
		buttonsProduct.appendChild(delBtn);
		wrapper.appendChild(notesContainer);
		notesContainer.appendChild(noteElement);

	}

	Build() {
		return this._wrapperElement;
	}
	
}