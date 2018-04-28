'use strict';

const Discord = require("discord.js");

let Renderer = function() {

    let DEFAULT_COLOR = 12961221;

    let renderStats = (stats, message) => {
        let statString = '`' + stats.join('  ') + '`';
        let statSum = stats.reduce((a, b) => a + b);

        let colorRole = message.member.colorRole;
        let color = colorRole ? colorRole.color : DEFAULT_COLOR;

        const embed = new Discord.RichEmbed()
            .setAuthor('Dice of Bug', message.author.displayAvatarURL)
            .setColor(color)
            .setFooter(`Total: ${statSum}`)
            .setDescription(statString);
        message.channel.send({embed});
    };

    return {
        renderStats
    };
};

module.exports = Renderer;