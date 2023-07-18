const {contextBridge, ipcRenderer} = require('electron');

let name = "";
let externPhone = "";
let direction = ""

contextBridge.exposeInMainWorld('reqClient', {

	getClient: (phone) => {
		ipcRenderer.invoke('getClient', phone)
			.then(data => {

				console.log(data[0])
				const rData = data[0];

				const nameClientSearch = document.getElementById('nameClient');
				const directionSearch = document.getElementById('direction');

				nameClientSearch.value = rData.nombre;
				directionSearch.value = rData.direccion;

				name = rData.nombre;
				direction = rData.direccion;
				externPhone = phone;
			});
	},

	newClient: () => {

		// add inputs
		const nameClientAdd = document.getElementById('nameClientAdd');
		const cellphoneAdd = document.getElementById('cellphoneAdd');
		const directionAdd = document.getElementById('directionAdd');

		let alertMsg = [];

		if (nameClientAdd.value === "") {
			alertMsg.push("Nombre") ;
		}
		if (cellphoneAdd.value === "" || cellphoneAdd.value.length !== 10) {
			alertMsg.push("Telefono");
		}
		if (directionAdd.value === "") {
			alertMsg.push("Direccion");
		}

		if (alertMsg.length > 0){

			let myMsg = alertMsg.length > 1 ? "Los sig. campos estan vacios o incorrectamente llenados: " : "El sig. campo esta vacio o incorrectamente llenado: ";

			alertMsg.forEach((msg) => {
				myMsg += msg + ", ";
			})

			myMsg.slice(0, -2);

			myMsg += " por favor llenalos para continuar";
			alert(myMsg)

			return;
		}

		ipcRenderer.invoke('newClient', {
			"name": nameClientAdd.value, "phone": cellphoneAdd.value, "direction": directionAdd.value
		}).then(data => {
			console.log(data);
		});

		alert("Cliente registrado");

	},


	setClient: () => {
		// sending to main process
		ipcRenderer.send("apllyClient", {
			"name": name, "direction": direction, "phone": externPhone
		});
	}

});