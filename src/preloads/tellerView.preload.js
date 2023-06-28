
const { contextBridge , ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('mainView', {

	print: (data) => {
		ipcRenderer.send('printTime', JSON.stringify(data));
	},

	setInfoListener: () => {

		const notes = document.getElementById('notasInput');
		const direction = document.getElementById('direccionInput');

		ipcRenderer.on("replyClient", (event, data) => {

			notes.value = data['name'] + ", " + data['phone'];
			direction.value = data['direction'];

		});

	},

	openReq: () => {
		ipcRenderer.send('openClients');
	},

	saveOrder: (orderData) => {
		ipcRenderer.send('saveOrder', orderData);
	}

});




