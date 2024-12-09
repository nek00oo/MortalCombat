import Player from "../class/Player.js";


class PlayersRepository {
    #players = [];

    constructor(heroes) {
        const heroEntries = Object.entries(heroes);

        for (let i = 0; i < heroEntries.length; i++) {
            if (i === 10) continue;
            let [name, img] = heroEntries[i];
            const player = new Player({
                id: i + 1,
                name: name,
                img: img,
                hp: 100,
                avatar: `../assets/players/avatar/${i + 1}.png`
            });

            this.#players.push(player);
        }
    }

    getPlayers = () => this.#players;
}

export default PlayersRepository;
