import Logs from "./Logs.js";
import {ATTACK, HERO_MAP, HIT} from "../constants";
import {createHtmlElement, getRandomNumber} from "../utils";
import Player from "./Player.js";

/**
 * Represents a game instance managing players, logs, and the game flow.
 *
 * @class
 */
class Game {
    /**
     * Creates an instance of the Game class.
     *
     * @param {Object} options - Configuration options for the game.
     * @param {HTMLElement} options.root - The root element where the game will be rendered.
     * @param {HTMLElement} options.chat - The chat element where logs will be displayed.
     */
    constructor({root, chat}) {
        this.root = root;
        this.form = root.querySelector('.control');
        this.logs = new Logs(chat);

        this.player1 = new Player(JSON.parse(localStorage.getItem("player1")));

        const {name, img} = this.getRandomEnemy();
        this.player2 = new Player({
            id: 2,
            name: name,
            img: img,
        })
    }

    /**
     * Starts the game by rendering players and setting up the result submission.
     */
    start = () => {
        this.root.appendChild(this.player1.createPlayer());
        this.root.appendChild(this.player2.createPlayer());

        this.submitResult();

        this.logs.generateLogs("start", this.player1, this.player2);
    }

    /**
     * Handles the submission of the attack results.
     */
    submitResult = () => {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
            const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = this.playerAttack();

            this.roundResult(hitEnemy, defencePlayer, this.player1, this.player2, valueEnemy);
            this.roundResult(hitPlayer, defenceEnemy, this.player2, this.player1, valuePlayer);

            if (this.player1.hp === 0 || this.player2.hp === 0) {
                this.showResult();
            }
        });
    }

    /**
     * Simulates an enemy attack and generates the attack details.
     *
     * @returns {Object} The details of the enemy attack, including hit type, defence type, and damage value.
     */
    enemyAttack = () => {
        const hit = ATTACK[getRandomNumber(0, ATTACK.length - 1)];
        const defence = ATTACK[getRandomNumber(0, ATTACK.length - 1)];

        return {
            value: getRandomNumber(0, HIT[hit]),
            hit,
            defence,
        };
    }

    /**
     * Handles the player's attack by reading the selected hits and defenses from the form.
     *
     * @returns {Object} The details of the player's attack, including hit type and defence type.
     */
    playerAttack = () => {
        const attack = {};

        for (let item of this.form) {
            if (item.checked && item.name === "hit") {
                attack.value = getRandomNumber(0, HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === "defence") {
                attack.defence = item.value;
            }

            item.checked = false;
        }

        return attack;
    }


    /**
     * Calculates and logs the result of a round based on hit and defence values.
     *
     * @param {string} Hit - The hit type during the round.
     * @param {string} Defence - The defence type during the round.
     * @param {Player} playerDefense - The defending player.
     * @param {Player} playerAttack - The attacking player.
     * @param {number} damage - The damage value inflicted.
     */
    roundResult = (Hit, Defence, playerDefense, playerAttack, damage) => {
        if (Hit === Defence) {
            this.logs.generateLogs("defence", playerDefense, playerAttack);
        } else {
            playerDefense.changeHP(damage);
            playerDefense.renderHP();

            this.logs.generateLogs("hit", playerAttack, playerDefense, damage);
        }
    }


    /**
     * Displays the result of the game and resets the game state if needed.
     */
    showResult = () => {
        const reloadButtonElement = this.createReloadButton();

        reloadButtonElement.addEventListener("click", () => {
            window.location.pathname = "MK/index.html";
        })

        if (this.player1.hp === 0 || this.player2.hp === 0) {
            reloadButtonElement.style.display = "block";
            for (let item of this.form) {
                item.disabled = true;
            }
        }

        if (this.player1.hp <= 0 && this.player2.hp > 0) {
            this.renderPlayerWin(this.player2.name);
            this.logs.generateLogs("end", this.player2, this.player1);
        } else if (this.player2.hp <= 0 && this.player1.hp > 0) {
            this.renderPlayerWin(this.player1.name);
            this.logs.generateLogs("end", this.player1, this.player2);
        } else {
            this.renderPlayerWin();
            this.logs.generateLogs("draw");
        }
    }

    /**
     * Renders the win message for the player or displays "draw".
     *
     * @param {string} [winnerName] - The name of the winning player. If no name is provided, "draw" will be shown.
     */
    renderPlayerWin = (winnerName) => {
        const resultTitleText = winnerName ? `${winnerName} wins` : "draw"

        const resultTitle = createHtmlElement("div", "winTitle", resultTitleText);
        this.root.appendChild(resultTitle);
    }

    /**
     * Creates and returns a reload button for restarting the game.
     *
     * @returns {HTMLElement} The reload button element.
     */
    createReloadButton = () => {
        const reloadButtonElement = createHtmlElement("button", "button", "Restart");
        const reloadButtonContainer = createHtmlElement("div", "reloadWrap", [reloadButtonElement]);

        this.root.appendChild(reloadButtonContainer);

        return reloadButtonElement;
    }

    /**
     * Selects a random enemy from the predefined HERO_MAP.
     *
     * @returns {Object} The randomly selected enemy's name and image.
     */
    getRandomEnemy = () => {
        const heroEntries = Object.entries(HERO_MAP);
        const randomIndex = getRandomNumber(0, heroEntries.length - 1);
        const [name, img] = heroEntries[randomIndex];
        return { name, img };
    }
}

export default Game;