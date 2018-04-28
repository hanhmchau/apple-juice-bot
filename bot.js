// JavaScript Document
const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");
const Dispatcher = require("./dispatcher");

fs.readFile('auth.json', (err, data) => {
    let token = JSON.parse(data).token;
    client.login(token).then(() => {
        const dispatcher = new Dispatcher();
        client.on('message', message => {
            dispatcher.dispatch(message);
        });

    }).catch((reason) => {
        console.log(reason);
    });
});