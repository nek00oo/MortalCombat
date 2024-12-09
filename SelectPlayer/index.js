import PlayersRepository from "./PlayersRepository.js";
import {HERO_MAP} from "../constants";

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const playersRepository = new PlayersRepository(HERO_MAP);

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


function init() {
    localStorage.removeItem('player1');

    let imgSrc = null;
    createEmptyPlayerBlock();

    playersRepository.getPlayers().forEach(item => {
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
