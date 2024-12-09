import {getRandomNumber, getTime} from "../utils";
import {LOGS} from "../constants";

/**
 * Manages and logs actions in the chat.
 *
 * @class
 */
class Logs {
    /**
     * Creates an instance of the Logs class.
     *
     * @param {HTMLElement} chat - The container element where logs will be displayed.
     */
    constructor(chat) {
        this.root = chat;
    }

    /**
     * Generates a log message based on the action performed in the game.
     *
     * @param {string} actionType - The type of action performed (e.g., 'start', 'hit', 'defence', 'end', 'draw').
     * @param {Object} [player1] - The first player's details.
     * @param {string} [player1.name] - The name of the first player.
     * @param {Object} [player2] - The second player's details.
     * @param {string} [player2.name] - The name of the second player.
     * @param {number} [player2.hp] - The current health points of the second player.
     * @param {number} [damage] - The damage dealt in the action (for 'hit' actions).
     * @returns {string} The formatted log message.
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
     * Generates and displays a log message in the chat container.
     *
     * @param {string} type - The type of action to log.
     * @param {Object} [player1] - The first player's details.
     * @param {string} [player1.name] - The name of the first player.
     * @param {Object} [player2] - The second player's details.
     * @param {string} [player2.name] - The name of the second player.
     * @param {number} [damage] - The damage dealt in the action.
     */
    generateLogs = (type, player1, player2, damage = 0) => {
        const log = this.actionLogResult(type, player1, player2, damage);

        const logMessage = document.createElement("p");
        logMessage.textContent = log;
        this.root.insertAdjacentElement("afterbegin", logMessage);
    }
}

export default Logs;


