
const { remote, ipcRenderer } = require("electron");

ipcRenderer.send('loadClientsWindow');

ipcRenderer.on('fillData', function (evt, message) {
	alert(message[data]); // Returns: {'SAVED': 'File Saved'}
});