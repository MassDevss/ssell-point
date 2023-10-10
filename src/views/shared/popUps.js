
import { newTag } from './helpers.js';

const body = document.querySelector('#body');


/**
 * @param {string} title -> title to show in modal
 * @param {string} message -> message to show in modal
 * 
 * @param {function} onApprove  ------ recives event argument
 */
export const messagePopUp = (title, message, onAccept = () => {}) => {

	const popWrap = document.createElement('div');
	popWrap.className = 'pop-up-wrap';
	popWrap.id = 'pop-up-container';

	const popBody = document.createElement('div');
	popBody.className = 'pop-up-body';

	const popDivTitle = document.createElement('div');
	popDivTitle.className = 'pop-up-title';
	const popTitle = document.createElement('p');
	popTitle.textContent = title;
	popDivTitle.append(popTitle);
	popBody.append(popDivTitle);

	const popDivText = document.createElement('div');
	popDivText.className = 'pop-up-text';
	const popText = document.createElement('p');
	popText.textContent = message;
	popDivText.append(popText);
	popBody.append(popDivText);

	const popDivButtons = document.createElement('div');
	popDivButtons.className = 'pop-up-buttons';

	const acceptBtn = document.createElement('button');
	acceptBtn.textContent = 'Aceptar';
	acceptBtn.className = 'btn btn-primary';
	acceptBtn.addEventListener('click', (ev) => {
		onAccept(ev);

		popWrap.style.opacity = 0;
		setTimeout(() => {
			popWrap.remove(); // remove the popUp from view
		}, 150);
	});
	popDivButtons.append(acceptBtn);

	popBody.append(popDivButtons);
	popWrap.append(popBody);

	body.append(popWrap);
};


/**
 * 
 * @param {string} question -> question to show in modal
 * 
 * @param {function} onCancel ------ recives event argument
 * @param {function} onApprove  ------ recives event argument
 */
export const questionPopUp = (title, question, onCancel = null, onApprove = null) => {

	const popWrap = document.createElement('div');
	popWrap.className = 'pop-up-wrap';
	popWrap.id = 'pop-up-container';

	const popBody = document.createElement('div');
	popBody.className = 'pop-up-body';

	const popDivTitle = document.createElement('div');
	popDivTitle.className = 'pop-up-title';
	const popTitle = document.createElement('p');
	popTitle.textContent = title;
	popDivTitle.append(popTitle);
	popBody.append(popDivTitle);

	const popDivText = document.createElement('div');
	popDivText.className = 'pop-up-text';
	const popText = document.createElement('p');
	popText.textContent = question;
	popDivText.append(popText);
	popBody.append(popDivText);

	const popDivButtons = document.createElement('div');
	popDivButtons.className = 'pop-up-buttons';


	let callbacks = 0;

	if (onCancel) 
		callbacks++;
	if (onApprove)
		callbacks++;

	if (callbacks > 0 && callbacks < 2)
		throw new Error('Must be onCanlcel And onApprove, the two callbacks are required');

	const cancelBtn = document.createElement('button');
	cancelBtn.textContent = 'Cancelar';
	cancelBtn.className = 'btn btn-secondary';
	cancelBtn.addEventListener('click', (ev) => {
		onCancel(ev);

		popWrap.remove(); // remove the popUp from view
	});

	const approveBtn = document.createElement('button');
	approveBtn.className = 'btn btn-primary';
	approveBtn.textContent = 'Confirmar';
	approveBtn.addEventListener('click', (ev) => {
		onApprove(ev);

		popWrap.remove(); // remove the popUp from view
	});

	popDivButtons.append(cancelBtn);
	popDivButtons.append(approveBtn);
	

	popBody.append(popDivButtons);
	popWrap.append(popBody);

	body.append(popWrap);
};


/**
 * 
 * @param {string} title -> the name of product
 * 
 * 
 * 
 */
export const productsPopUp = (title, onCancel = () => {}, onApprove = () => {}) => {

	/*
	<div class="pop-up-wrap" id="pop-up-container">
		<div class="pop-up-body">
			<div class="w-100 d-flex justify-content-end">
				<button class="btn btn-danger mb-1">X</button>
			</div>
			<div class="pop-up-product">
				<img class="w-100 rounded" src="productsimages://2.jpg" alt="">
			</div>
			<div class="pop-up-title text-center mt-3">
				<p>Tiburón</p>
			</div>
			<div class="pop-up-buttons-product d-flex justify-content-center">
				<button class="btn btn-primary"> - </button>
				<input type="text" class="form-control w-25 text-center" placeholder="0">
				<button class="btn btn-primary"> + </button>
			</div>
			<div class="pop-up-text mt-3">
				<p class="m-0">Notas</p>
				<textarea class="form-control text-area-notes rounded w-100 p-1" rows="2"></textarea>
			</div>
		</div>
	</div>
	 */

	const popWrap = document.createElement('div');
	popWrap.className = 'pop-up-wrap';
	popWrap.id = 'pop-up-container';

	const popBody = document.createElement('div');
	popBody.className = 'pop-up-body';

	const popDivClose = newTag('div');
	popDivClose.className = 'w-100 d-flex justify-content-end';

	const closeBtn = newTag('button');
	closeBtn.className = 'btn btn-danger mb-1';
	closeBtn.textContent = 'X';
	closeBtn.addEventListener('click', (ev) => {

		popWrap.style.opacity = 0;
		setTimeout(() => {
			popWrap.remove(); // remove the popUp from view
		}, 150); // remove the popUp from view
	});
	
	popDivClose.append(closeBtn);
	popBody.append(popDivClose);

	const popDivProduct = document.createElement('div');
	popDivProduct.className = 'pop-up-product';
	const popText = document.createElement('p');
	popText.textContent = '';
	popDivProduct.append(popText);
	popBody.append(popDivProduct);

	const prodImg = newTag('img');
	prodImg.className = 'w-100 rounded';
	prodImg.src = 'productsimages://2.jpg';
	prodImg.setAttribute('alt', '');
	popDivProduct.append(prodImg);

	const popDivTitle = document.createElement('div');
	popDivTitle.className = 'pop-up-title';
	const popTitle = document.createElement('p');
	popTitle.textContent = title;
	popDivTitle.append(popTitle);
	popBody.append(popDivTitle);


	const popDivButtons = document.createElement('div');
	popDivButtons.className = 'pop-up-buttons-product';

	let callbacks = 0;

	const minusBtn = document.createElement('button');
	minusBtn.textContent = 'Cancelar';
	minusBtn.className = 'btn btn-secondary';
	minusBtn.addEventListener('click', (ev) => {
		
	});

	const inputNotes = newTag('input');
	inputNotes.type = 'text';
	inputNotes.className = 'form-control w-25 text-center';
	inputNotes.setAttribute('placeholder', '0');

	const plusBtn = document.createElement('button');
	plusBtn.className = 'btn btn-primary';
	plusBtn.textContent = 'Confirmar';
	plusBtn.addEventListener('click', (ev) => {
		
	});

	popDivButtons.append(minusBtn);
	popDivButtons.append(inputNotes);
	popDivButtons.append(plusBtn);
	

	popBody.append(popDivButtons);
	popWrap.append(popBody);

	body.append(popWrap);
};
