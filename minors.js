'use strict';
const fs = require("fs");
const Utils = require('./utils');

let Minors = function() {

    const fileName = 'data/items.json';
    let list;

    fs.readFile(fileName, (err, data) => {
        list = JSON.parse(data);
    });

    let getFullList = () => {
        let fullList = [];
        for (let type in list) {
            fullList.push(...list[type]);
        }
        return fullList;
    };

    let getTypeFromIndex = (randIndex, list) => {
        let start = 0;
        for (let type in list) {
            if (randIndex <= start + list[type].length) {
                return type;
            } else {
                start = start + list[type].length + 1;
            }
        }
    };

    let randomizeAll = () => {
        let fullList = getFullList();
        let randIndex = Utils.getRandomInt(0, fullList.length - 1);
        let type = getTypeFromIndex(randIndex, list);

        return {
            item: fullList[randIndex],
            type
        }
    };

    let randomizeType = (type) => {
        let items = list[type];
        if (items) {
            let randIndex = Utils.getRandomInt(0, items.length - 1);

            return {
                item: items[randIndex],
                type
            };    
        }

        return {};
    };

    let randomize = (type) => {
        return type ? randomizeType(type) : randomizeAll();
    };

    let getTypes = () => {
        let types = [];
        for (let type in list) {
            types.push(type);
        }
        return types;
    };

    return {
        randomize,
        getTypes
    }
};

module.exports = new Minors();