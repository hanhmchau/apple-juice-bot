'use strict';
const fs = require("fs");
const Utils = require('./utils');

let DeckOfManyThings = function() {

    const fileName = 'data/deck.json';
    let drawnCards = [];
    let unremovableCards = ['Fool', 'Jester'];
    let deck;

    fs.readFile(fileName, (err, data) => {
        deck = JSON.parse(data).deck;
    });

    let drawCard = () => {
        if (deck.length) {
            let chosenIndex = Utils.getRandomInt(0, deck.length - 1);
            let chosenCard = deck[chosenIndex];

            //check if the chosen Card is the Fool or the Jester, which will not be removed from the deck
            if (!unremovableCards.includes(chosenCard.name)) {
                deck.splice(chosenIndex, 1)[0];
                drawnCards.push(chosenCard);    
            }

            return {
                chosenCard,
                remaining: deck.length
            };
        } else {
            reset();
        }
    };

    let reset = () => {
        deck = deck.concat(drawnCards);
        drawnCards = [];
    };

    return {
        drawCard,
        reset
    }
};

module.exports = DeckOfManyThings;