'use strict';

const Utils = require('./utils');
const Consts = require('./consts');

let Scheduler = function() {

    let schedule = [];

    let setMessage = (message, date) => {
        // schedule.set(message, date);
        schedule.push({
            date,
            message
        });
    };

    let initialize = () => {
        schedule = []
    };

    let getDatePossibleForTeam1 = () => {
        for (el of schedule) {
            let yesReactions = el.message.reactions.filter(react => react.emoji.name === Consts.YES_EMOJI);
            if (yesReactions == Consts.GAME.MAIN_TEAM.required) {
                return el.date;
            }
        }
    };

    let getDatePossibleForBackup = () => {
        for (el of schedule) {
            let yesReactions = el.message.reactions.filter(react => react.emoji.name === Consts.YES_EMOJI);
            if (yesReactions == Consts.GAME.BACKUP.required) {
                return el.date;
            }
        }
    };

    let add = (reaction, user) => {
        let message = reaction.message;
        if (schedule.some(el => el.message.id === message.id) && user.id !== Consts.THIS_BOT) {
            let previousChoice = message.reactions.filter(react => react.emoji.name !== reaction.emoji.name);
            previousChoice.forEach(choice => {
                choice.remove(user)
                    .catch(err => console.log(err));
            });
        }
    };

    let remove = (reaction, user) => {
    };

    initialize();

    return {
        initialize,
        setMessage,
        add,
        remove
    }
};

module.exports = new Scheduler();