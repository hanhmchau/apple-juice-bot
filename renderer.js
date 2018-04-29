'use strict';

const Discord = require("discord.js");
const Utils = require('./utils');

let Renderer = function() {

    let _getEmbed = (message) => {
        let DEFAULT_COLOR = 12961221;
        let colorRole = message.member.colorRole;
        let color = colorRole ? colorRole.color : DEFAULT_COLOR;

        return new Discord.RichEmbed()
            .setColor(color);
    };

    let renderStats = (stats, message) => {
        let statString = '`' + stats.join('  ') + '`';
        let statSum = stats.reduce((a, b) => a + b);

        const embed = _getEmbed(message)
            .setAuthor('Dice of Bug', message.author.displayAvatarURL)
            .setFooter(`Total: ${statSum}`)
            .setDescription(statString);
        message.channel.send({embed});
    };

    let substituteDice = (description) => {
        let regex = /\[\[.*\]\]/;
        let match = description.match(regex);
        if (match) {
            let diceRoll = match[0].slice(2, match[0].length - 2);
            let replaceValue = Utils.executeRoll(diceRoll);
            return description.replace(regex, replaceValue);
        }
        return description;
    };

    let renderCard = (results = {}, message) => {
        let embed = _getEmbed(message);
        let card = results.chosenCard;
        if (card) {
            embed.setAuthor(card.name, message.author.displayAvatarURL)
                .setThumbnail(card.image ? card.image : '')
                .setDescription(substituteDice(card.description))
                .setFooter(`${results.remaining} card${(results.remaining > 1 ? 's' : '')} remaining | ~resetDeck to reset.`);
        } else {
            embed.setAuthor('No card left in deck', message.author.displayAvatarURL)
                .setDescription('Deck has been reset! Try drawing again!');
        }

        message.channel.send({embed});
    };

    let renderResetDeck = (message) => {
        let embed = _getEmbed(message)
            .setAuthor('Deck reset!', message.author.displayAvatarURL)
        message.channel.send({embed});
    };

    return {
        renderStats,
        renderCard,
        renderResetDeck
    };
};

module.exports = Renderer;