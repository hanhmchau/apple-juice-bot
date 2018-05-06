'use strict';

const Discord = require("discord.js");
const Utils = require('./utils');

let Renderer = function () {

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
        message.channel.send({
            embed
        });
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

        message.channel.send({
            embed
        });
    };

    let renderResetDeck = (message) => {
        let embed = _getEmbed(message)
            .setAuthor('Deck reset!', message.author.displayAvatarURL)
        message.channel.send({
            embed
        });
    };

    let renderNoItem = (message, type) => {
        let embed = _getEmbed(message)
            .setAuthor('Wowza! Whatchamacallit?', message.author.displayAvatarURL)
            .setDescription('Try /minor help for a list of supported types.')

        message.channel.send({
            embed
        });
    };

    let renderMinorItem = (item, message, type) => {

        if (!item) {
            renderNoItem(message, type);
            return;
        }

        let title = `${Utils.capitalize(type)} ${item.suffix}`;
        let alternative = `${item.prefix} ${Utils.capitalize(type)}`;

        let embed = _getEmbed(message)
            .setAuthor(title, message.author.displayAvatarURL)
            .setDescription(`*Also known as: ${alternative}*`)
            .addField('Description', item.description);

        message.channel.send({
            embed
        });
    };

    let renderMinorHelp = (types, message) => {
        let description = types.reduce((prev, curr, i) => `${prev}\n${(i + 1)}. ${curr}`, ' ');
        let embed = _getEmbed(message)
            .setAuthor('Minor Item Types', message.author.displayAvatarURL)
            .setDescription(description);

        message.channel.send({
            embed
        });
    };

    return {
        renderStats,
        renderCard,
        renderResetDeck,
        renderMinorItem,
        renderMinorHelp
    };
};

module.exports = new Renderer();