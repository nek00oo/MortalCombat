export const getRandomNumber = (min = 1, max = 20) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Creates an HTML element with the specified tag, class name, and children.
 *
 * @param {string} [tag='div'] - The HTML tag name to create (e.g., 'div', 'span', 'p').
 * @param {string} [className] - The CSS class name(s) to add to the element. Defaults to `undefined`.
 * @param {Array<HTMLElement> | string} [content] - An array of child HTML elements or string to append to the created element. Defaults to `undefined`.
 * @returns {HTMLElement} - The newly created HTML element with the specified properties.
 */
export const createHtmlElement = (tag = 'div', className, content) => {
    const element = document.createElement(tag);

    if (className) {
        element.classList.add(className);
    }

    if (typeof content === 'string') {
        element.textContent = content;
    }

    if (Array.isArray(content)) {
        content.forEach((item) => {
            element.appendChild(item)
        })
    }

    return element;
}

const formattedTime = (time) => time < 10 ? `0${time}` : time;

/**
 * Gets the current time in the format 'HH:mm:ss'.
 *
 * @function
 * @returns {string} The current time.
 */
export const getTime = () => {
    const date = new Date();

    return `${formattedTime(date.getHours())}:${formattedTime(date.getMinutes())}:${formattedTime(date.getSeconds())}`;
}

