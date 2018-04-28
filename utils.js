let Utils = function() {

    let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    let getRandom = (times, dice) => {
        let total = 0;
        for (let i = 0; i < times; i++) {
            total += getRandomInt(1, dice);
        }
        return total;
    };

    let executeRoll = (string) => {
        let times = parseInt(RegExp(/^\d+/).exec(string)[0]);
        let dice = parseInt(RegExp(/d\d+/).exec(string)[0].slice(1));

        let modifierStr = RegExp(/[+-].*/).exec(string);
        let modifier = modifierStr ? parseInt(eval(modifierStr)) : 0;

        return getRandom(times, dice) + modifier;
    };

    return  {
        getRandomInt,
        executeRoll
    };
};

module.exports = new Utils();