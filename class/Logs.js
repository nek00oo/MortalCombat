import {getRandomNumber, getTime} from "../utils";
import {LOGS} from "../constants";


class Logs {
    constructor(chat) {
        this.root = chat;
    }

    /**
     *
     * @param actionType
     * @param [player1Name]
     * @param [player2Name]
     * @param [hp]
     * @param [damage]
     * @returns {*|string}
     */
    actionLogResult = (actionType, {name: player1Name} = {}, {name: player2Name, hp} = {}, damage) => {
        const formatTime = getTime()

        const text = actionType === "start" || actionType === "draw"
            ? LOGS[actionType]
            : LOGS[actionType][getRandomNumber(0, LOGS[actionType].length - 1)]

        switch (actionType) {
            case "start":
                return text
                    .replace("[time]", formatTime)
                    .replace("[player1]", player1Name)
                    .replace("[player2]", player2Name);
            case "end":
                return `${formatTime} - ${text}`
                    .replace("[playerWins]", player1Name)
                    .replace("[playerLose]", player2Name);
            case "hit":
                return `${formatTime} - ${text} [-${damage}] [${hp}/100]`
                    .replace("[playerKick]", player1Name)
                    .replace("[playerDefence]", player2Name);
            case "defence":
                return `${formatTime} - ${text}`
                    .replace("[playerDefence]", player1Name)
                    .replace("[playerKick]", player2Name);
            case "draw":
                return `${formatTime} - ${text}`
            default:
                return "Unexpected type in generateLogs:" + actionType;
        }
    }

    /**
     *
     * @param {string} type
     * @param [player1]
     * @param [player2]
     * @param [damage]
     */
    generateLogs = (type, player1, player2, damage = 0) => {
        const log = this.actionLogResult(type, player1, player2, damage);

        const logMessage = document.createElement("p");
        logMessage.textContent = log;
        this.root.insertAdjacentElement("afterbegin", logMessage);
    }
}

export default Logs;


