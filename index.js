/*
---------------------------------------------------------------------------------------------------------------------------------------------
    |\                -===>                                    MADE BY: 
  =[_|H)--.______                                             Melyrks
  =[+--,-------'         -===>                               
   [|_/"
----------------------------------------------------------------------------------------------------------------------------------------------
*/

const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({partials: ["MESSAGE ", "CHANNEL", "REACTION"]});
const fs = require('fs');
const { prefix, token } = require('./config.json');
const todoList = require('./todo-list');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready to go')

})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Une erreur s'est produite pendant l'exécution de la commande !");
    }
})

client.login(config.token)