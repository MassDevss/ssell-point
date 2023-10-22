
window.addEventListener('load', () => {

	/**
	 * * @type {number} mode ->
	 * 		0 -> mode 0 == mode Search
	 *
	 * 		1 -> mode 1 == mode Add new Client
	 */
	let mode = 0;

	const getElem = (selector) => {
		return document.querySelector(selector);
	};

	const title = document.getElementById('search-add-clients');

	const sarchMode = document.getElementById('changeModeS');
	const addMode = document.getElementById('changeModeA');

	const sCellPhone = document.getElementById('cellphone');
	const searchButton = document.getElementById('search-button');

	const applyButton = document.getElementById('apply-search');

	const regClient = document.getElementById('registClien');


	const setMode = (num) => {
		mode = num;
		build();
	};

	const build = () => {

		if (mode === 0){
			title.innerHTML = 'Clientes | Modo Busqueda';
			getElem('#search-mode').style.display = 'block';

			getElem('.search-button').style.backgroundColor = '#383838';
			getElem('.add-button').style.backgroundColor = '#212323';

			getElem('#add-mode').style.display = 'none';
		}
		else if (mode === 1){
			title.innerHTML = 'Clientes | Modo Agregar';
			getElem('#add-mode').style.display = 'block';

			getElem('.add-button').style.backgroundColor = '#383838';
			getElem('.search-button').style.backgroundColor = '#212323';

			getElem('#search-mode').style.display = 'none';
		}

	};

	/**
	 *
	 * @param ids {string[]}
	 */
	const animateInput = (ids) => {

		ids.forEach((id) => {
			getElem(id).addEventListener('focus', (ev) => {
				let clearId = id.replace(/[.#]/, '');

				const elem = getElem(`label[for=${clearId}]`);
				elem.style.letterSpacing = '1px';

				ev.target.style.scale = '1.04';
			});

			getElem(id).addEventListener('blur', (ev) => {
				let clearId = id.replace(/[.#]/, '');

				const elem = getElem(`label[for=${clearId}]`);
				elem.style.letterSpacing = '0px';
				
				ev.target.style.scale = '1';
			});
		});

	};

	const searchClient = (phone) => {
		if (phone.length === 10){
			const client = window.reqClient.getClient(phone);
			if (!client){
				alert('El cliente no existe')
			}
		} else {
			alert(`El numero de telefono tiene una longitud incorrecta: ${phone.length}`);
		}
	};

	sarchMode.addEventListener('click', () => setMode(0));
	addMode.addEventListener('click', () => setMode(1));
	setMode(0);


	sCellPhone.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter'){
			searchClient(sCellPhone.value);
		}
	});

	searchButton.addEventListener('click', () => {
		searchClient(sCellPhone.value);
	});

	applyButton.addEventListener('click', () => {
		window.reqClient.setClient();
	});

	regClient.addEventListener('click', () => {
		window.reqClient.newClient();
	});

	const forAnimateInputs = [
		'#nameClient',
		'#cellphone',
		'#direction',
		'#nameClientAdd',
		'#cellphoneAdd',
		'#directionAdd'
	];

	animateInput(forAnimateInputs);

});






