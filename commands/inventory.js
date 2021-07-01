const config = require('../config.json')
const fs = require("fs")
const Discord = require("discord.js");


module.exports = {
    name: 'inventory',
    description: '',
    execute(message, args) {
        let charname = args[0]
        const charFileName = charname
        console.log(charFileName)
        const character = require(`${__dirname}/../characters/${charFileName}.json`)

        let inventaire_array = JSON.parse(character.invent_new), inventaire_display = ""
        for (let i = 0; i < inventaire_array.length; i++) {
            inventaire_display = inventaire_display + "\n[" + i + "] " + inventaire_array[i]
        }

        console.log(inventaire_display)

        const embedText = new Discord.MessageEmbed()
        .setColor("#a6dcd5")
        .addFields(
            ({
                name: `Inventaire de ${charname}`, value: inventaire_display
            })
        )

        return message.channel.send(embedText)
    }
}