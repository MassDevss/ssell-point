
const { remote, ipcRenderer } = require("electron");


const main = remote.require("./main.js")


main.sayHello();