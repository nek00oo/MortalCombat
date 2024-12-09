import {createHtmlElement} from "../utils";

/**
 * Represents a player in the game.
 *
 * @class
 */
class Player {
    /**
     * Creates an instance of Player.
     *
     * @param {Object} options - The options for the player.
     * @param {number} options.id - The unique identifier for the player.
     * @param {string} options.name - The name of the player.
     * @param {string} options.img - The path to the player's image.
     * @param {string} options.avatar - The path to the player's avatar.
     * @param {number} [options.hp=100] - The player's health points (HP).
     */
    constructor({
                    id,
                    name,
                    img,
                    avatar,
                    hp,
                }) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.avatar = avatar;
        this.selector = `player${this.id}`;
        this.hp = hp ? hp : 100;
    }

    /**
     * Changes the player's health points by a given damage amount.
     *
     * @param {number} damage - The amount of damage to apply to the player.
     */
    changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    /**
     * Selects the HTML element that displays the player's health.
     *
     * @returns {HTMLElement} The element representing the player's health.
     */
    elHP = () => {
        return document.querySelector(`.${this.selector} .life`)
    }


    /**
     * Renders the player's current health visually in the progress bar.
     */
    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    /**
     * Creates the player's HTML representation.
     *
     * @returns {HTMLElement} The HTML element representing the player.
     */
    createPlayer = () => {
        const imageElement = createHtmlElement("img")
        imageElement.setAttribute("src", this.img);

        const nameElement = createHtmlElement("div", "name", this.name);
        const lifeElement = createHtmlElement("div", "life")
        lifeElement.style.width = `${this.hp}%`;

        const characterElement = createHtmlElement("div", "character", [imageElement])
        const progressbarElement = createHtmlElement("div", "progressbar", [lifeElement, nameElement])
        const playerElement = createHtmlElement("div", this.selector, [progressbarElement, characterElement])

        return playerElement;
    }
}

export default Player;