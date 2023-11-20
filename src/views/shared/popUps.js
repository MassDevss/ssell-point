
import { newTag } from './helpers.js';

const body = document.querySelector('#body');


/**
 * @param {string} title -> title to show in modal
 * @param {string} message -> message to show in modal
 * 
 * @param {function} onAccept  ------ recives event argument
 */
export const messagePopUp = (title, message, onAccept = () => {}) => {

	const popWrap = newTag('div');
	popWrap.className = 'pop-up-wrap';
	popWrap.id = 'pop-up-container';

	const popBody = newTag('div');
	popBody.className = 'pop-up-body';

	const popDivTitle = newTag('div');
	popDivTitle.className = 'pop-up-title';
	const popTitle = newTag('p');
	popTitle.textContent = title;
	popDivTitle.append(popTitle);
	popBody.append(popDivTitle);

	const popDivText = newTag('div');
	popDivText.className = 'pop-up-text';
	const popText = newTag('p');
	popText.textContent = message;
	popDivText.append(popText);
	popBody.append(popDivText);

	const popDivButtons = newTag('div');
	popDivButtons.className = 'pop-up-buttons';

	const acceptBtn = newTag('button');
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

	const popWrap = newTag('div');
	popWrap.className = 'pop-up-wrap';
	popWrap.id = 'pop-up-container';

	const popBody = newTag('div');
	popBody.className = 'pop-up-body';

	const popDivTitle = newTag('div');
	popDivTitle.className = 'pop-up-title';
	const popTitle = newTag('p');
	popTitle.textContent = title;
	popDivTitle.append(popTitle);
	popBody.append(popDivTitle);

	const popDivText = newTag('div');
	popDivText.className = 'pop-up-text';
	const popText = newTag('p');
	popText.textContent = question;
	popDivText.append(popText);
	popBody.append(popDivText);

	const popDivButtons = newTag('div');
	popDivButtons.className = 'pop-up-buttons';


	let callbacks = 0;

	if (onCancel) 
		callbacks++;
	if (onApprove)
		callbacks++;

	if (callbacks > 0 && callbacks < 2)
		throw new Error('Must be onCanlcel And onApprove, the two callbacks are required');

	const cancelBtn = newTag('button');
	cancelBtn.textContent = 'Cancelar';
	cancelBtn.className = 'btn btn-secondary';
	cancelBtn.addEventListener('click', (ev) => {
		onCancel(ev);

		popWrap.remove(); // remove the popUp from view
	});

	const approveBtn = newTag('button');
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

