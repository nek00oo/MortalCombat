import {generateLogs} from "../logs";

class Game {
    constructor({root}) {
        this.root = root;
        this.form = root.querySelector('.control');
    }

    start = () => {
        this.root.appendChild();
        this.root.appendChild();

        this.submitResult();

        generateLogs("start", player1, player2);
    }

    submitResult = () => {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
            const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = playerAttack(formControlElement);

            roundResult(hitEnemy, defencePlayer, player1, player2, valueEnemy);
            roundResult(hitPlayer, defenceEnemy, player2, player1, valuePlayer);

            if (player1.hp === 0 || player2.hp === 0) {
                showResult(formControlElement, player1, player2);
            }
        });
    }
}

export default Game