const {createWindow, secondWindow} = require('./main')
const {app } = require('electron')


app.whenReady().then(() => {
  createWindow();
})


