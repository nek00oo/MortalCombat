const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const HERO_NAME = {
    SCORPION: "./assets/players/fightingStance/scorpion.gif",
    SUBZERO: "./assets/players/fightingStance/subzero.gif",
    CYRAX: "./assets/players/fightingStance/cyrax.gif",
    ERMAC: "./assets/players/fightingStance/ermac.gif",
    JADE: "./assets/players/fightingStance/jade.gif",
    JAX: "./assets/players/fightingStance/jax.gif",
    KABAL: "./assets/players/fightingStance/kabal.gif",
    KANO: "./assets/players/fightingStance/kano.gif",
    KITANA: "./assets/players/fightingStance/kitana.gif",
    KUNGLAO: "./assets/players/fightingStance/kunglao.gif",
    LIUKANG: "./assets/players/fightingStance/liukang.gif",
    MILEENA: "./assets/players/fightingStance/mileena.gif",
    MOTARO: "./assets/players/fightingStance/motaro.gif",
    NIGTHWULF: "./assets/players/fightingStance/nigthwulf.gif",
    NOOBSAIBOT: "./assets/players/fightingStance/noobsaibot.gif",
    RAIN: "./assets/players/fightingStance/rain.gif",
    REPTILE: "./assets/players/fightingStance/reptile.gif",
    SEKTOR: "./assets/players/fightingStance/sektor.gif",
    SHANGTSUNG: "./assets/players/fightingStance/shangtsung.gif",
    SHAOKAHN: "./assets/players/fightingStance/shaokahn.gif",
    SHEEVA: "./assets/players/fightingStance/sheeva.gif",
    SINDEL: "./assets/players/fightingStance/sindel.gif",
    SMOKE: "./assets/players/fightingStance/smoke.gif",
    SONYA: "./assets/players/fightingStance/sonya.gif",
    STRYKER: "./assets/players/fightingStance/stryker.gif",
}

const HIT = {
    head: 70,
    body: 35,
    foot: 25,
}
const ATTACK = ['head', 'body', 'foot'];

const arenasElement = document.querySelector('.arenas');
const formControlElement = document.querySelector('.control');
const chatElement = document.querySelector('.chat');

/**
 * Creates an HTML element with the specified tag, class name, and children.
 *
 * @param {string} [tag='div'] - The HTML tag name to create (e.g., 'div', 'span', 'p').
 * @param {string} [className] - The CSS class name(s) to add to the element. Defaults to `undefined`.
 * @param {Array<HTMLElement> | string} [content] - An array of child HTML elements or string to append to the created element. Defaults to `undefined`.
 * @returns {HTMLElement} - The newly created HTML element with the specified properties.
 */
const createHtmlElement = (tag = 'div', className, content) => {
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

const getRandomNumber = (min = 1, max = 20) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(`.player${this.id} .life`)
}

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

const createPlayer = (player) => {
    const imageElement = createHtmlElement("img")
    imageElement.setAttribute("src", player.img);

    const nameElement = createHtmlElement("div", "name", player.name)
    const lifeElement = createHtmlElement("div", "life")
    lifeElement.style.width = `${player.hp}%`;

    const characterElement = createHtmlElement("div", "character", [imageElement])
    const progressbarElement = createHtmlElement("div", "progressbar", [lifeElement, nameElement])
    const playerElement = createHtmlElement("div", `player${player.id}`, [progressbarElement, characterElement])

    arenasElement.appendChild(playerElement);
}

const renderPlayerWin = (name) => {
    const result = name ? `${name} wins` : "draw"

    const resultTitle = createHtmlElement("div", "winTitle", result);
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
    const reloadButtonElement = createReloadButton()

    reloadButtonElement.addEventListener('click', () => {
        window.location.reload();
    })

    if (player1.hp === 0 || player2.hp === 0) {
        reloadButtonElement.style.display = 'block';
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
    }
}

const formattedTime = (time) => time < 10 ? `0${time}` : time;

const getTime = () => {
    const date = new Date();

    return `${formattedTime(date.getHours())}:${formattedTime(date.getMinutes())}:${formattedTime(date.getSeconds())}`;
}

const actionLogResult = (actionType, text, player1, player2, damage) => {
    const formatTime = getTime()

    switch (actionType) {
        case 'start':
            return text
                .replace('[time]', formatTime)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
        case 'end':
            return `${formatTime} - ${text}`
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
        case 'hit':
            return `${formatTime} - ${text} [-${damage}] [${player2.hp}/100]`
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
        case 'defence':
            return `${formatTime} - ${text}`
                .replace('[playerDefence]', player1.name)
                .replace('[playerKick]', player2.name);
        default:
            return  "Unexpected type in generateLogs:" + actionType;
    }
}

const generateLogs = (type, player1, player2, damage = 0) => {

    const text = type.includes("start", "draw")
        ? LOGS[type]
        : LOGS[type][getRandomNumber(0, LOGS[type].length - 1)]
    const log = actionLogResult(type, text, player1, player2, damage);

    const logMessage = document.createElement("p");
    logMessage.textContent = log;

    chatElement.insertAdjacentElement('afterbegin', logMessage);
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

formControlElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack(formControlElement);

    roundResult(enemy.hit, attack.defence, player1, player2, enemy.value);
    roundResult(attack.hit, enemy.defence, player2, player1, attack.value);

    if (player1.hp === 0 || player2.hp === 0) {
        showResult(formControlElement, player1, player2);
    }
});


player1 = {
    id: 1,
    name: "SCORPION",
    hp: 100,
    img: HERO_NAME.SCORPION,
    weapon: ["sword", "gun"],
    changeHP,
    elHP,
    renderHP,
};

player2 = {
    id: 2,
    name: "SUB-ZERO",
    hp: 100,
    img: HERO_NAME.SUBZERO,
    weapon: ["sword", "gun"],
    changeHP,
    elHP,
    renderHP,
};


createPlayer(player1);
createPlayer(player2);
generateLogs("start", player1, player2);

