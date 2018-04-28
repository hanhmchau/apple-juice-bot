const DiceRoller = require("./diceroller");
const Renderer = require("./renderer");

let Dispatcher = function() {
    const prefix = '~';
    const methods = {};
    const renderer = new Renderer();

    let getCommand = content => {
        const args = content.slice(prefix.length).trim().split(/ +/g);
        return args.shift().toLowerCase();
    };

    methods.bugstats = message => {
        const diceRoller = new DiceRoller();
        let results = diceRoller.getStatArray();

        renderer.renderStats(results, message);
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