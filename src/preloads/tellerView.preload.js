
const { contextBridge , ipcRenderer } = require('electron');



contextBridge.exposeInMainWorld('mainView', {

	//! teller view
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
	},

	//! orders pane
	getOrders: () => {
    ipcRenderer.invoke('getOrders').then((orders) => {
      const table = document.getElementById('tbodypa');
      orders.forEach(ord => {
        buildRow(ord, table);
      });
    })
  },


});


//! this functions dont manage data and dont use Events of type IPC

const nTag = (name) => {
  return document.createElement(name);
}

const buildRow = (order, table) => {
  const id = order.id;
  const cost = order.cost;
  const products = order.products;
  const address = order.address;

  const tr = nTag('TR');

  const thId = nTag('TH');
  thId.textContent = id;

  const tdCost = nTag('TD');
  tdCost.textContent = cost;

  const tdProducts = nTag('TD');
  tdProducts.textContent = products;

  const tdAddress = nTag('TD');
  tdAddress.textContent = address;

  tr.append(thId);
  tr.append(tdCost);
  tr.append(tdProducts);
  tr.append(tdAddress);

  table.append(tr);
}