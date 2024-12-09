import Logs from "./Logs.js";
import {ATTACK, HERO_MAP, HIT} from "../constants";
import {createHtmlElement, getRandomNumber} from "../utils";
import Player from "./Player.js";


class Game {
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

    start = () => {
        this.root.appendChild(this.player1.createPlayer());
        this.root.appendChild(this.player2.createPlayer());

        this.submitResult();

        this.logs.generateLogs("start", this.player1, this.player2);
    }

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

    enemyAttack = () => {
        const hit = ATTACK[getRandomNumber(0, ATTACK.length - 1)];
        const defence = ATTACK[getRandomNumber(0, ATTACK.length - 1)];

        return {
            value: getRandomNumber(0, HIT[hit]),
            hit,
            defence,
        };
    }

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

    roundResult = (Hit, Defence, playerDefense, playerAttack, damage) => {
        if (Hit === Defence) {
            this.logs.generateLogs("defence", playerDefense, playerAttack);
        } else {
            playerDefense.changeHP(damage);
            playerDefense.renderHP();

            this.logs.generateLogs("hit", playerAttack, playerDefense, damage);
        }
    }

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
     *
     * @param {string} [winnerName]
     */
    renderPlayerWin = (winnerName) => {
        const resultTitleText = winnerName ? `${winnerName} wins` : "draw"

        const resultTitle = createHtmlElement("div", "winTitle", resultTitleText);
        this.root.appendChild(resultTitle);
    }

    createReloadButton = () => {
        const reloadButtonElement = createHtmlElement("button", "button", "Restart");
        const reloadButtonContainer = createHtmlElement("div", "reloadWrap", [reloadButtonElement]);

        this.root.appendChild(reloadButtonContainer);

        return reloadButtonElement;
    }

    getRandomEnemy = () => {
        const heroEntries = Object.entries(HERO_MAP);
        const randomIndex = getRandomNumber(0, heroEntries.length - 1);
        const [name, img] = heroEntries[randomIndex];
        return { name, img };
    }
}

export default Game;