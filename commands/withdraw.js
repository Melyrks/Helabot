const Discord = require("discord.js")
const fs = require("fs")
const _ = require("lodash");

module.exports = {
    name: "withdraw",
    description: "retire le montant voulue d'un caractère",
    execute(message, args) {
        try {
            let charname = args[0]            
            let amout = Number(args [1])
            let type = args [2]
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

                if (type === "poche"){
                    char.money -= amout
                    fs.writeFile(charFilePathA, JSON.stringify(char), (err) => console.error)
                    message.channel.send(`${amout} ont été retirer a ${charFileName}, ils possède maintenant ${char.money} sur lui`)
                    
                }else if (type === "banque"){
                    char.bankMoney -= amout
                    fs.writeFile(charFilePathA, JSON.stringify(char), (err) => console.error)
                    message.channel.send(`${amout} ont été retirer a ${charFileName}, ils possède maintenant ${char.bankMoney} dans sa banque`)
                    
                } else {
                    message.channel.send("Vous avez mal écrit la commande")
                }               
            }
        } catch (e) {
            console.log(`error`, e)
        }
    }
}