
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs/promises');
const { constants } = require('node:fs');



const platform = process.platform;
const user = os.userInfo().username;
const homeDir = os.userInfo().homedir;

const myAppDir = path.join(homeDir, 'mySStore');
const productsAppDir = path.join(myAppDir, 'products');
const imgAppDir = path.join(productsAppDir, 'images');

/**
 * checks if a dir or path exists and if not, creates it
 * 
 * @param {string} dir 
 * @returns 
 */
const checkDirAndBuild = async (dir) => {
	try {
		await fs.access(dir, constants.F_OK);
	}
	catch (err) {
		await fs.mkdir(dir);
	}
	return 1;
};

/**
 * check if dirs exist and create them if not, is async because i need check and make them for the correctly work of app and i need to wait for check all dirs
 */
const checkAppDirs = async () => {
	await checkDirAndBuild(myAppDir);
	await checkDirAndBuild(productsAppDir);
	await checkDirAndBuild(imgAppDir);
};

const AppDirs = {
	checkAppDirs: checkAppDirs,
	os: platform,
	user: user,
	home: homeDir,
	app: myAppDir,
	products: productsAppDir,
	productsImages: imgAppDir
}; 

module.exports = AppDirs;