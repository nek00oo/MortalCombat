import {createHtmlElement} from "../utils";

class Player {
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

    changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`)
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

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