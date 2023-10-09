
/**
 * 
 * creates a htmlElement an returns it
 * 
 * @param {string} tagName 
 * @returns {HTMLElement}
 */
export const newElement = (tagName) => {
	return document.createElement(tagName);
};

/**
 * 
 * @param {string} queryString
 * is the query to search an element, the function is the same of 
 * ```js
 * document.querySelector(queryString);
 * ```
 * So, you can use the same string how you used in querySelector
 * 
 * @returns {HTMLElement}
 * 
 */
export const getElement = (queryString) => {
	return document.querySelector(queryString);
};

