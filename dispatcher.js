'use strict';

const DiceRoller = require("./diceroller");
const Renderer = require("./renderer");
const DeckOfManyThings = require("./deck");

let Dispatcher = function() {
    const prefix = ['/', '~'];
    const methods = {};
    const renderer = new Renderer();
    const deck = new DeckOfManyThings();

    let getCommand = content => {
        const args = content.slice(1).trim().split(/ +/g);
        return args.shift().toLowerCase();
    };

    methods.bugstats = message => {
        const diceRoller = new DiceRoller();
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

    let dispatch = message => {
        let method = methods[getCommand(message.content)];
        if (method) {
            method(message);
        }
    };

    return {
        dispatch
    }
};

module.exports = Dispatcher;