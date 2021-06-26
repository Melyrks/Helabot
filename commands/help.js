const description = require("../help.json")
const Discord = require("discord.js")

module.exports = {
    name: 'help',
    description: 'send help message for helping the player',

    execute (message) {
        const embedText = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Todo list')
        .setDescription(`Voici la liste des commandes du serveur avec leur explication !\n Les choses entre {} sont les données qu'il faut vous mettiez à l'intéieurs comme montrar dans les exemples`)
        .addFields(
            {
                name: "Commande HRP", value: `${description.hrpCommand}`
            },
            {
                name: "Commande Character", value: `${description.characterCommand}`
            },
            {
                name: "Commande Inventaire", value: `${description.inventoryCommand}`
            },
            {
                name: "Commande Money", value: `${description.moneyCommand}`
            }
        )
        .setFooter("Dev note : *Faite attention a se que vous mettez en arguement ça risque de tout casser et je serais pas content <_< et je viendrais vous tappez dessus* ")

    console.log(embedText)

    message.channel.send(embedText)
    }
}