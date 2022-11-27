const {createWindow, secondWindow} = require('./main')
const {app } = require('electron')

app.allowRendererProcessReuse = false;

app.whenReady().then(() => {
  createWindow();
})


