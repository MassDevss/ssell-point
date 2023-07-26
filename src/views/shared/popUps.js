
const body = document.getElementsByTagName('body');


function messageModal(isDanger){
	// if is danger is good show and icon or similar

	const modalBase = document.createElement('DIV');
	modalBase.className = 'base-modal';
	
	const modalBody = document.createElement('ARTICLE');
	modalBody.className = 'body-modal';

}


/**
 * 
 * @param {string} question -> question to show in modal
 * @param {function} onCancel 
 * @param {function} onApprove 
 */
function questionModal(question, onCancel, onApprove) {

	const modalBase = document.createElement('DIV');
	modalBase.className = 'base-modal';
	
	const modalBody = document.createElement('ARTICLE');
	modalBody.className = 'body-modal';


	const buttonCancel = document.createElement('BUTTON');
	const buttonApporve = document.createElement('BUTTON');
	
	buttonCancel.addEventListener('click', () => {
		onCancel();
	});

	buttonApporve.addEventListener('click', () => {
		onApprove();
	});

}


