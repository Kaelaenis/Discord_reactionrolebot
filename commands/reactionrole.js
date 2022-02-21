module.exports = {
    name: 'reactionrole',
    description: "Ajout d'un role selon une réaction",
    async execute(message, args, Discord, client) {
        const channel = "936055429597888562";
        const BlueTeam = message.guild.roles.cache.find(
            (role) => role.name === "BlueTeam"
            );
        const RedTeam = message.guild.roles.cache.find(
            (role) => role.name === "RedTeam"
            );
        const BlueTeamEmoji = '🫐';
        const RedTeamEmoji = '🍎';

        let embed = new Discord.MessageEmbed()
        .setColor('#000')
        .setTitle('Choisis une équipe !')
        .setDescription('Choisir une équipe te permettra de parler dans certains channels ! \n\n'
        +`${BlueTeamEmoji} pour l'équipe bleue\n`
        +`${RedTeamEmoji} pour l'équipe rouge`);

        let messageEmbed = await message.channel.send({embeds: [embed]});
        messageEmbed.react(BlueTeamEmoji);
        messageEmbed.react(RedTeamEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === BlueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(BlueTeam);
                }
                if (reaction.emoji.name === RedTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(RedTeam);
                }
            } else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === BlueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(BlueTeam);
                }
                if (reaction.emoji.name === RedTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(RedTeam);
                }
            } else {
                return;
            }
        });
    }

    
}