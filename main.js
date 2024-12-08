import {getRandomNumber, createHtmlElement, getTime} from "./utils";
import {HERO_NAME, HIT, ATTACK} from "./constants";
import Player from "./Player";
import {generateLogs} from "./logs";
import Game from "./game";

const arenasElement = document.querySelector('.arenas');
const formControlElement = document.querySelector('.control');

/**
 *
 * @param {string} [winnerName]
 */
const renderPlayerWin = (winnerName) => {
    const resultTitleText = winnerName ? `${winnerName} wins` : "draw"

    const resultTitle = createHtmlElement("div", "winTitle", resultTitleText);
    arenasElement.appendChild(resultTitle);
}

const createReloadButton = () => {
    const reloadButtonElement = createHtmlElement("button", "button", "Restart");
    const reloadButtonContainer = createHtmlElement("div", "reloadWrap", [reloadButtonElement]);

    arenasElement.appendChild(reloadButtonContainer);

    return reloadButtonElement;
}

const enemyAttack = () => {
    const hit = ATTACK[getRandomNumber(0, ATTACK.length - 1)];
    const defence = ATTACK[getRandomNumber(0, ATTACK.length - 1)];

    return {
        value: getRandomNumber(0, HIT[hit]),
        hit,
        defence,
    };
}

const playerAttack = (formControlElement) => {
    const attack = {};

    for (let item of formControlElement) {
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

const showResult = (formControlElement, player1, player2) => {
    const reloadButtonElement = createReloadButton();

    reloadButtonElement.addEventListener("click", () => {
        window.location.reload();
    })

    if (player1.hp === 0 || player2.hp === 0) {
        reloadButtonElement.style.display = "block";
        for (let item of formControlElement) {
            item.disabled = true;
        }
    }

    if (player1.hp <= 0 && player2.hp > 0) {
        renderPlayerWin(player2.name);
        generateLogs("end", player2, player1);
    } else if (player2.hp <= 0 && player1.hp > 0) {
        renderPlayerWin(player1.name);
        generateLogs("end", player1, player2);
    } else {
        renderPlayerWin();
        generateLogs("draw");
    }
}

const roundResult = (Hit, Defence, playerDefense, playerAttack, damage) => {
    if (Hit === Defence) {
        generateLogs("defence", playerDefense, playerAttack);
    } else {
        playerDefense.changeHP(damage);
        playerDefense.renderHP();

        generateLogs("hit", playerAttack, playerDefense, damage);
    }
}

formControlElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
    const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = playerAttack(formControlElement);

    roundResult(hitEnemy, defencePlayer, player1, player2, valueEnemy);
    roundResult(hitPlayer, defenceEnemy, player2, player1, valuePlayer);

    if (player1.hp === 0 || player2.hp === 0) {
        showResult(formControlElement, player1, player2);
    }
});


const player1 = new Player({
    id: 1,
    name: "SCORPION",
    hp: 100,
    img: HERO_NAME.SCORPION,
    rootSelector: "arenas"
});

const player2 = new Player({
    id: 2,
    name: "SUB-ZERO",
    hp: 100,
    img: HERO_NAME.SUBZERO,
    rootSelector: "arenas"
});

function init() {

    player1.createPlayer();
    player2.createPlayer();

    generateLogs("start", player1, player2);
}

init()


// const game = new Game({root: arenasElement});
//
// game.start();


