'use strict';

const diceRoller = require("./diceroller");
const renderer = require("./renderer");
const deck = require("./deck");
const minors = require("./minors");

let Dispatcher = function() {
    const prefix = ['/', '~'];
    const methods = {};

    let getCommand = content => {
        const args = content.slice(1).trim().split(/ +/g);
        return args.shift().toLowerCase();
    };

    methods.bugstats = message => {
        let results = diceRoller.getStatArray();

        renderer.renderStats(results, message);
    };

    methods.draw = message => {
        let results = deck.drawCard();

        renderer.renderCard(results, message);
    };

    methods.resetdeck = message => {
        deck.reset();

        renderer.renderResetDeck(message);
    };

    methods.minor = message => {
        let type = null;

        let getType = content => {
            const args = content.slice(1).trim().split(/ +/g);
            if (args.length > 1) {
                return args[1].toLowerCase();
            }
        };

        type = getType(message.content);

        if (type === 'help') {
            let types = minors.getTypes();
            renderer.renderMinorHelp(types, message);
        } else {
            let results = minors.randomize(type);
            renderer.renderMinorItem(results.item, message, results.type);    
        }
    };

    methods.bugschedule = message => {
        renderer.renderScheduleMessage(message);
    };

    methods.info = message => {
        console.log(message.guild.members);
    };

    let dispatch = message => {
        if (message.content && prefix.includes(message.content[0])) {
            let method = methods[getCommand(message.content)];
            if (method) {
                method(message);
            }
        }
    };

    return {
        dispatch
    }
};

module.exports = new Dispatcher();