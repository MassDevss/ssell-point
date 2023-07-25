

const getDate = () => {
	const date = new Date();
	const arrDate = date.toLocaleDateString().split('/');

	const checkLen = (date) => {
		return `${date}`.length > 1 ? `${date}` : `0${date}`;
	};

	const hours = checkLen(date.getHours() - 1);
	const minutes = checkLen(date.getMinutes());

	const getActualDate = (wTime) => {

		if (wTime){
			return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(arrDate[1])} ${hours}:${minutes}:00`;
		}

		if (date.getHours() === 0){
			return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(parseInt(arrDate[1]) - 1)}`;
		}
		
		return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(arrDate[1])}`;
		
	};

	return getActualDate();
};



/**
 *  global Object hoo contains all the filters has been used in orders search
 * 
 */
let filters = {
	date: {
		from: null,
		to: null
	},
	address: null,
	time: null,
	cost: {
		min: null,
		max: null
	},
	contains: null
};


const cleanFilters = () => {
	filters = {
		date: {
			from: null,
			to: null
		},
		address: null,
		time: null,
		cost: {
			min: null,
			max: null
		},
		contains: null
	};
};


/**
 * warning pane is actually builded in the html if you needed is the code of below
 */

// const alertPane = document.querySelector('#warning-pane')
// const alertMsg = document.querySelector('#alert-message')

// const showWarningPane = (msg) => {
// 	alertMsg.textContent = msg
// 	alertPane.style.display = 'flex'
// }

// const hideWaringPane = () => {
// 	alertPane.style.display = 'none'
// }

// const hiderBtn = document.querySelector('#hider-pane-btn')

// hiderBtn.addEventListener('click', () => {
// 	hidePane()
// })

const dangerPane = document.querySelector('#danger-pane');
const dangerText = document.querySelector('#danger-text');

const showDangerPane = (msg) => {
	passwordField.value = '';
	dangerText.textContent = msg;
	dangerPane.style.display = 'flex';
};

const hideDangerPane = () => {
	dangerPane.style.display = 'none';
};


const passwordField = document.querySelector('#password-input');
const cancelBtn = document.querySelector('#cancel-danger');
const confirmBtn = document.querySelector('#confirm-danger');


const badMsg = document.querySelector('.bad-password');
const mode = document.querySelector('#mode-danger-pane');

const checkPassword = async () => {
	return await window.mainView.checkPassword(passwordField.value);
};

const checkAndDo = async () => {

	const result = await checkPassword();

	if (result){
		
		if (parseInt(mode.value) === 0){
			// delete event
			window.mainView.delOrder();
			hideDangerPane();
		}
		else if (parseInt(mode.value) === 1){
			// mod event
			window.mainView.modOrder();
			hideDangerPane();
		}

		location.reload();

	}else {
		badMsg.style.opacity = 1;
		passwordField.classList.add('bad-password-mark');

		setTimeout(() => {
			passwordField.classList.remove('bad-password-mark');
		}, 500);
	}
};

passwordField.addEventListener('keydown', (ev) => {
	if(ev.key === 'Enter'){
		checkAndDo();
	}
});

confirmBtn.addEventListener('click', () => {
	checkAndDo();
});

cancelBtn.addEventListener('click', () => { hideDangerPane(); });

const deleteOrder = document.querySelector('#delete-order');
const saveOrder = document.querySelector('#save-order');

deleteOrder.addEventListener('click', () => {
	mode.value = 0;
	showDangerPane('Para eliminar una orden necesitas la contraseña del gerente/encargado del local.');
});

saveOrder.addEventListener('click', () => {
	mode.value = 1 ;
	showDangerPane('Para modificar una orden necesitas la contraseña del gerente/encargado del local.');
});


// show orders in first instance
window.mainView.getOrders(filters);


//* form fields and logic

const editHour = document.querySelector('#field-i-hour');
const editCost = document.querySelector('#field-i-cost');
const editProducts = document.querySelector('#field-i-products');
const editAddress = document.querySelector('#field-i-address');

const fromField = document.querySelector('#from-date');
const toField = document.querySelector('#to-date');

const now = new Date();
const day = ('0' + now.getDate()).slice(-2);
const month = ('0' + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear()+'-'+(month)+'-'+(day) ;

const addressField = document.querySelector('#address-order');
const costMin = document.querySelector('#cost-order');
const costMax = document.querySelector('#cost-to-order');

const filterBtn = document.querySelector('#filter-btn');

const allInputs = [
	editHour,
	editCost,
	editProducts,
	editAddress,

	fromField,
	toField,
	addressField,
	costMin,
	costMax
];

const clearFields = () => {
	allInputs.forEach( (field) => {field.value = '';});
};


filterBtn.addEventListener('click', () => {

	cleanFilters();

	filters.date.from = fromField.value || null;
	filters.date.to = toField.value || null;
	filters.address = addressField.value || null;
	filters.cost.min = costMin.value || null;
	filters.cost.max = costMax.value || null;

	window.mainView.getOrders(filters);
});


clearFields();


window.addEventListener('load', () => {
	fromField.value = today;
	toField.value = today;
});