const { ipcRenderer } = require("electron");

const tickerBody = document.querySelector('.tickerBody')

ipcRenderer.on('pickData:returnOrder', (event, data) => {
  let text = document.createElement('h1')
  text.innerHTML = data
  tickerBody.append(text)
})