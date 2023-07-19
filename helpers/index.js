

const fs = require('fs');

const fileName = process.env.FILENAME;


fs.mkdirSync(`${__dirname}/../src/views/${fileName}`);

fs.writeFileSync(`${__dirname}/../src/views/${fileName}/${fileName}.html`, `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n\t<link rel="stylesheet" href="./${fileName}.css">\n</head>\n<body>\n\n\t</body>\n<script src="./${fileName}.js"></script>\n</html>\n`);

fs.writeFileSync(`${__dirname}/../src/views/${fileName}/${fileName}.css`, '* {\nmargin:0;\npadding:0;}');

fs.writeFileSync(`${__dirname}/../src/views/${fileName}/${fileName}.js`, `console.log('${fileName} works!!')`);

fs.writeFileSync(`${__dirname}/../src/preloads/${fileName}.preload.js`, `const { contextBridge , ipcRenderer } = require('electron');\n\n\ncontextBridge.exposeInMainWorld('${fileName}', {\n\n});`);




