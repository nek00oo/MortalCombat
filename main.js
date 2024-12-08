import Game from "./game";

const arenasElement = document.querySelector('.arenas');

const game = new Game({root: arenasElement});

game.start();


