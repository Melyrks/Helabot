const Discord = require("discord.js")
const fs = require("fs")
const _ = require("lodash");


module.exports = {
    name: "money",
    description: "Affiche l'argent s enrengistrer dans le json en embed",
    execute(message, args) {
        
        try {
            let charname = args[0]
            /*let test = _.kebabCase(args)
            console.log(test)*/
            console.log(charname)
            if (charname === undefined) {
                message.channel.send("Vous devez rentrer le nom d'un personnage")
            } else {
                const charFileName = charname
                console.log(charFileName)
                const charFilePathA = `${__dirname}/../characters/${charFileName}.json`
                const charFilePath = `../characters/${charFileName}.json`
                //Rajouter un message pour dire que il a rentrer le mauvais noms, ici c'est pas undefind
                const char = require(charFilePath)
                console.log(charFilePathA)
               /*let fichier = fs.readFileSync(charFilePathA)
               let personne = JSON.parse(fichier)
               console.log(personne)*/
                          
            
            const embedText = new Discord.MessageEmbed()
            .setColor("#a6dcd5")
            .setTitle(`Argent de ${charFileName}`)
            .addFields(
                {
                    name: "Poche", value: char.money
                },
                {
                    name: "Banque", value: char.bankMoney
                },
                {
                    name: "Salaire", value: char.salary
                }
            )
            console.log(embedText)
            message.channel.send(embedText)
            }
        }catch (e) {
            console.log(`error`, e)
        }
    }
}