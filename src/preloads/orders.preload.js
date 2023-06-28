
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


const buildRow = (order, table) => {

  const id = order.id;
  const cost = order.cost;
  const products = order.products;
  const address = order.address;

  const HTML = `<tr>
                  <th> $${ id } </th>
                  <td> ${ cost } </td>
                  <td> ${ products } </td>
                  <td> ${ address } </td>
                </tr>`;

  table.innerHTML+= HTML;

}


