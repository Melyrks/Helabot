const Discord = require("discord.js")
const fs = require("fs")
const _ = require("lodash");

module.exports = {
    name: "add-salary",
    description: "Ajoute le montant voulue d'un caractère",
    execute(message, args) {
        try {
            let charname = args[0]            
            let amout = Number(args [1])

            console.log(charname)
            if (charname === undefined) {
                message.channel.send("Vous devez rentrer le nom d'un personnage")
            } else {
                const charFileName = charname
                console.log(charFileName)
                const charFilePathA = `${__dirname}/../characters/${charFileName}.json`
                const charFilePath = `../characters/${charFileName}.json`
                const char = require(charFilePath)
                console.log(charFilePathA)
                console.log(char.money)
                console.log(amout)

                console.log(type)

                    char.salaire += amout
                    fs.writeFile(charFilePathA, JSON.stringify(char), (err) => console.error)
                    message.channel.send(`Le salaire de ${charFileName} est de ${amout}`)             
            }
        } catch (e) {
            console.log(`error`, e)
        }
    }
}