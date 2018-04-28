const Discord = require("discord.js");

let Renderer = function() {

    let renderStats = (stats, message) => {
        let statString = '`' + stats.join('  ') + '`';
        let statSum = stats.reduce((a, b) => a + b);

        const embed = new Discord.RichEmbed()
            .setAuthor('Dice of Bug', message.author.displayAvatarURL)
            .setColor(message.member.colorRole.color)
            .setFooter(`Total: ${statSum}`)
            .setDescription(statString);
        message.channel.send({embed});
    };

    return {
        renderStats
    };
};

module.exports = Renderer;