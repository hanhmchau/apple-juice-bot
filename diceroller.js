'use strict';

const Utils = require('./utils');

let DiceRoller = function() {

    const ARRAY_SIZE = 6; //6 stats: Str, Dex, Con, Int, Wis, Cha
    const DICE_MAX = 6; //4d6D1
    const DICE_MIN = 1; //4d6D1
    const NUMBER_OF_DICE = 4; //4d6D1
    const PRE_RACIAL_STAT_MIN = 8;
    const PRE_RACIAL_STAT_MAX = 16;

    let getRandomArray = () => {
        let array = [];
        for (let i = 0; i < NUMBER_OF_DICE; i++) {
            array.push(Utils.getRandomInt(DICE_MIN, DICE_MAX));
        }
        return array;
    };

    let getStat = array => array.reduce((a, b) => a + b) - Math.min(...array);

    let getStatArray = () => {
        let array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            let stat = getRandomArray();
            let total = getStat(stat);
            //min stat is 8, max stat is 16 pre-racial (homebrew rule)
            // let adjustedTotal = Math.min(Math.max(PRE_RACIAL_STAT_MIN, total), PRE_RACIAL_STAT_MAX);
            // array.push(adjustedTotal);
            array.push(total);
        }
        array.sort((a, b) => b - a);
        return array;
    };

    return {
        getStatArray
    }
};

module.exports = new DiceRoller();