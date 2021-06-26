const Discord = require("discord.js")
const fs = require("fs")
const _ = require("lodash");
const config = require('../config.json')

module.exports = {
    name: "add-inventory",
    description: "Ajoute le montant voulue d'un caractère",
    execute(message, args) {
        try {
            let charname = args[0]            
            let amout = args.slice(1)
            console.log(charname)
            if (charname === undefined) {
                message.channel.send("Vous devez rentrer le nom d'un personnage")
            } else {
                const charFileName = charname
                console.log(charFileName)
                const charFilePathA = `${__dirname}/../characters/${charFileName}.json`
                const charFilePath = `../characters/${charFileName}.json`
                /*const char = require(charFilePath)
                console.log(charFilePathA)
                console.log(char.inventory)
                console.log(amout)*/

                let character = require(`${__dirname}/../characters/${charFileName}.json`)
                if(character.invent_new === "" || character.invent_new === undefined){
                  character.invent_new = "[]"
                }else {

                let character_inventaire = JSON.parse(character.invent_new)
                content = message.content.slice(config.prefix.length + 15 + charFileName.length)
                character_inventaire.push(content)

                character.invent_new = JSON.stringify(character_inventaire)

                fs.writeFileSync(`./characters/${charFileName}.json`, JSON.stringify(character), (err) => console.error)

                let inventaire_array = JSON.parse(character.invent_new), inventaire_display = ""
                for (let i = 0; i < inventaire_array.length; i++) {
                  inventaire_display = inventaire_display + "\n["+i+"] "+inventaire_array[i]
                }
                console.log(character.invent_new)
                console.log(inventaire_display)
                console.log(inventaire_array)
                console.log(message.content.slice(config.prefix.length + 15 + charFileName.length))

                message.channel.send(`${content} a été ajouter a l'inventaire de ${charFileName}, pour afficher sont inventaire vieullez tapper la commande : "&inventory ${charFileName}"`)
            }

            ///Stringify le amount, crée ensuite des array comme dans le meteo-event.js, et mettre le amount dedans, différencier chacun amout enctrée
            }
        }catch (e) {
            console.log(`error`, e)
        }
    }
}
