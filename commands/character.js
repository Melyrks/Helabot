const Discord = require("discord.js")
const fs = require("fs")
const _ = require("lodash");

module.exports = {
    name: "character",
    description: "Affiche La fiche de characters enrengistrer dans le json en embed",
    execute(message, args) {
        
        try {
            let charname = args[0]
            /*let test = _.kebabCase(args)
            console.log(test)*/
            console.log(charname)
            if (charname === undefined) {
                message.channel.send("Vous devez rentrer me nom d'un personnage")
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
            .setTitle(`Fiche de character de ${charname}`)
            .addFields(
                {
                    name: "Prénom", value: char.name, inline: true
                },
                {
                    name: "Nom", value: char.surname, inline: true
                },
                {
                    name: "Race", value: char.race, inline: true
                },
                {
                    name: "Sexe", value: char.sexe, inline: true
                },
                {
                    name: "Âge", value: char.age, inline: true
                },
                {
                    name: "DoB", value: char.born, inline: true
                },
                {
                    name: "Sang", value: char.blood, inline: true
                },
                {
                    name: "Gen", value: char.gen, inline: true
                },
                {
                    name: "orientation", value: char.orientation, inline: true
                },
                {
                    name: "Taille", value: char.taille, inline: true
                },
                {
                    name: "Poids", value: char.poids, inline: true
                },
                {
                    name: "Metier", value: `${char.metier} \n ${char.salary}`, inline: true
                },
                {
                    name: "Description Physique", value: char.descPhy, inline: false
                },
                {
                    name: "Adresse", value: char.adresse, inline: true
                },
                {
                    name: "Compétences", value: char.competence, inline: true
                },
                {
                    name: "Magie", value: char.magie, inline: true
                },
                {
                    name: "Description Vestimentaire", value: char.descVest, inline: false
                },
                {
                    name: "Autre", value: char.other, inline: false
                },
                {
                    name: "Image", value: "⠀", inline: false
                }
            )
            .setImage(`${char.image}`)

            console.log(embedText)
            message.channel.send(embedText)
            }
        } catch (e) {
            console.log(`error`, e)
        }
    }
}