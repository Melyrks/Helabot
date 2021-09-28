const Discord = require("discord.js")
const fs = require("fs")
const _ = require("lodash");
const config = require('../config.json')

module.exports = {
    name: "add-inventory",
    description: "Ajoute un objet dans l'inventaire d'un caractère voulue",
    async execute(message, args) {
        try {
            let charname = args[0]
            console.log(charname)
            if (charname === undefined) {
                message.channel.send("Vous devez rentrer le nom d'un personnage")
            } else {
                const charFileName = charname
                console.log(charFileName)
                
                let character = require(`${__dirname}/../characters/${charFileName}.json`)
                console.log(character) 

                let character_inventaire = character.inventory
                content = message.content.slice(config.prefix.length + 15 + charFileName.length)
                character_inventaire.push(content)
                character.inventory = character_inventaire

                await fs.promises.writeFile(`./characters/${charFileName}.json`, JSON.stringify(character))

                message.channel.send(`${content} a été ajouter a l'inventaire de ${charFileName}, pour afficher sont inventaire vieullez tapper la commande : "&inventory ${charFileName}"`)

            }
        } catch (e) {
            console.log(`error`, e)
        }
    }
}
