'use strict';
const fs = require("fs");
const Utils = require('./utils');

let Minors = function() {

    const fileName = 'data/items.json';
    let list;

    fs.readFile(fileName, (err, data) => {
        list = JSON.parse(data);
    });

    let randomizeAll = () => {

    };

    let randomizeType = (type) => {

    };

    let randomize = (type) => {
        let items = list[type];
        if (items) {
            let randIndex = Utils.getRandomInt(0, items.length - 1);
            
            return items[randIndex];    
        }
    };

    return {
        randomize
    }
};

module.exports = new Minors();