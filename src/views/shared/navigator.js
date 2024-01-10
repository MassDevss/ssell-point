
import { newTag } from './helpers.js';

const PAGES = [
	{pageName: 'Cobro', folderName: 'tellerView'},
	{pageName: 'Comandas', folderName: 'commands'},
	{pageName: 'Pedidos', folderName: 'orders'},
	{pageName: 'Administrador', folderName: 'admin'},
];


const filePath = location.href;

/**
 * @param {string} pageName // for 'A' element textContent
 * @param {string} pageFolderName // for link
 * @param {string} htmlFileName  //! for link but is set deafult to `index.js`
 * 
 * @returns {HTMLAElement}
 * 
 * build each `<a></a>` link of nav
 * 
 */
const createNavLink = (pageName, pageFolderName, htmlFileName='index.html') => {
	const aWrap = newTag('A');

	aWrap.textContent = pageName;
	aWrap.className = `nav-linkk ${filePath.includes(pageFolderName) ? 'marked' : ''}`;
	aWrap.href = `../${pageFolderName}/${htmlFileName}`;

	return aWrap;
};

const navBar = document.querySelector('.navigator');

const navBody = newTag('DIV');
navBody.className = 'navigator-body';

PAGES.forEach((link) => {
	const pageName = link.pageName;
	const dirName = link.folderName;
	const fileName = link.fileName || 'index.html';

	navBody.append(createNavLink(pageName, dirName, fileName));
});

navBar.append(navBody);