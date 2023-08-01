
const body = document.querySelector('#body');



/**
 * 
 * @param {string} question -> question to show in modal
 * 
 * @param {function} onCancel ------ recives event argument
 * @param {function} onApprove  ------ recives event argument
 */
function messagePopUp(title, msg, onAccept = null, onCancel = null, onApprove = null) {

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
	popText.textContent = msg;
	popDivText.append(popText);
	popBody.append(popDivText);

	const popDivButtons = document.createElement('div');
	popDivButtons.className = 'pop-up-buttons';

	const acceptBtn = document.createElement('button');
	acceptBtn.textContent = 'Aceptar';
	acceptBtn.className = 'btn btn-primary';
	acceptBtn.addEventListener('click', (ev) => {
		onAccept(ev);

		popWrap.remove(); // remove the popUp from view
	});
	popDivButtons.append(acceptBtn);

	popBody.append(popDivButtons);
	popWrap.append(popBody);

	body.append(popWrap);
}


/**
 * 
 * @param {string} question -> question to show in modal
 * 
 * @param {function} onCancel ------ recives event argument
 * @param {function} onApprove  ------ recives event argument
 */
function questionPopUp(title, question, onCancel = null, onApprove = null) {

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
}


