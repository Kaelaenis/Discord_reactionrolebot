const { count } = require("console");
const Discord = require("discord.js");
require('dotenv').config()

const token = process.env.TOKEN;

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ], 
    partials: [
        "MESSAGE",
        "USER",
        "CHANNEL",
        "REACTION"
    ]
    
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === "reactionrole"){
            client.commands.get('reactionrole').execute(message, args, Discord, client);
    }
});







client.login(token);