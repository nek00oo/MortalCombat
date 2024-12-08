import {HERO_NAME} from "../constants";

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = '../assets/players/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

class Player {
    constructor({
                    id,
                    name,
                    img,
                    avatar,
                }) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.avatar = avatar;
    }
}

const playerData = [
    { name: "RAIN", img: HERO_NAME.RAIN },
    { name: "REPTILE", img: HERO_NAME.REPTILE },
    { name: "SHAOKAHN", img: HERO_NAME.SHAOKAHN },
    { name: "ERMAC", img: HERO_NAME.ERMAC },
    { name: "NIGHTWOLF", img: HERO_NAME.NIGHTWOLF },
    { name: "JADE", img: HERO_NAME.JADE },
    { name: "NOOBSAIBOT", img: HERO_NAME.NOOBSAIBOT },
    { name: "SONYA", img: HERO_NAME.SONYA },
    { name: "JAX", img: HERO_NAME.JAX },
    { name: "REPTILE", img: HERO_NAME.REPTILE },
    { name: "REPTILE", img: HERO_NAME.REPTILE },
    { name: "STRYKER", img: HERO_NAME.STRYKER },
    { name: "SUBZERO", img: HERO_NAME.SUBZERO },
    { name: "KUNGLAO", img: HERO_NAME.KUNGLAO },
    { name: "SEKTOR", img: HERO_NAME.SEKTOR },
    { name: "KITANA", img: HERO_NAME.KITANA },
    { name: "SCORPION", img: HERO_NAME.SCORPION },
    { name: "SCORPION", img: HERO_NAME.SCORPION },
    { name: "CYRAX", img: HERO_NAME.CYRAX },
    { name: "KABAL", img: HERO_NAME.KABAL },
    { name: "SINDEL", img: HERO_NAME.SINDEL },
    { name: "SMOKE", img: HERO_NAME.SMOKE },
    { name: "LIUKANG", img: HERO_NAME.LIUKANG },
    { name: "SHANGTSUNG", img: HERO_NAME.SHANGTSUNG }
];

const players = [];

for (let i = 0; i < playerData.length; i++) {
    const player = new Player({
        id: i + 1,
        name: playerData[i].name,
        img: playerData[i].img,
        hp: 100,
        avatar: `../assets/players/avatar/${i + 1}.png`
    });
    players.push(player);
}

async function init() {
    localStorage.removeItem('player1');

    let imgSrc = null;
    createEmptyPlayerBlock();


    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            item.id = 1;
            localStorage.setItem('player1', JSON.stringify(item));

            el.classList.add('active');

            setTimeout(() => {
                window.location.pathname = "../MK/arena.html"
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
