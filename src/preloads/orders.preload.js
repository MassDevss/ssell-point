
const { contextBridge , ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('orders', {

  getOrders: () => {

    ipcRenderer.invoke('getOrders').then((orders) => {

      const table = document.getElementById('tbodypa');

      orders.forEach(ord => {
        buildRow(ord, table);
      });

    })

  }

});

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


