import Game from "./class/Game.js";

const arenasElement = document.querySelector('.arenas');
const chatElement = document.querySelector('.chat');

const game = new Game({root: arenasElement, chat: chatElement});

game.start();


