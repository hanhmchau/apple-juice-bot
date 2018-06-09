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

    let recalculate = () => {
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