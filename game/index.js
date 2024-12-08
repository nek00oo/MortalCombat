import {generateLogs} from "../logs";
import {ATTACK, HERO_NAME, HIT} from "../constants";
import {createHtmlElement, getRandomNumber} from "../utils";
import Player from "../Player";

class Game {
    constructor({root}) {
        this.root = root;
        this.form = root.querySelector('.control');

        this.player1 = new Player({
            id: 1,
            name: "CYRAX",
            img: HERO_NAME.CYRAX,
            rootSelector: "arenas"
        });

        this.player2 = new Player({
            id: 2,
            name: "NIGHTWOLF",
            img: HERO_NAME.NIGHTWOLF,
            rootSelector: "arenas"
        })
    }

    start = () => {
        this.root.appendChild(this.player1.createPlayer());
        this.root.appendChild(this.player2.createPlayer());

        this.submitResult();

        generateLogs("start", this.player1, this.player2);
    }

    submitResult = () => {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
            const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = this.playerAttack();

            this.roundResult(hitEnemy, defencePlayer, this.player1, this.player2, valueEnemy);
            this.roundResult(hitPlayer, defenceEnemy, this.player2, this.player1, valuePlayer);

            if (this.player1.hp === 0 || this.player2.hp === 0) {
                this.showResult(this.player1, this.player2);
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
            generateLogs("defence", playerDefense, playerAttack);
        } else {
            playerDefense.changeHP(damage);
            playerDefense.renderHP();

            generateLogs("hit", playerAttack, playerDefense, damage);
        }
    }

    showResult = (player1, player2) => {
        const reloadButtonElement = this.createReloadButton();

        reloadButtonElement.addEventListener("click", () => {
            window.location.reload();
        })

        if (player1.hp === 0 || player2.hp === 0) {
            reloadButtonElement.style.display = "block";
            for (let item of this.form) {
                item.disabled = true;
            }
        }

        if (player1.hp <= 0 && player2.hp > 0) {
            this.renderPlayerWin(player2.name);
            generateLogs("end", player2, player1);
        } else if (player2.hp <= 0 && player1.hp > 0) {
            this.renderPlayerWin(player1.name);
            generateLogs("end", player1, player2);
        } else {
            this.renderPlayerWin();
            generateLogs("draw");
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
}

export default Game