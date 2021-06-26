const config = require('../config.json')
const fs = require("fs")

module.exports = {
    name: 'inventory',
    description: '',
    execute(message, args) {
        let charname = args[0]
        const charFileName = charname
        console.log(charFileName)
        var character = require(`${__dirname}/../characters/${charFileName}.json`)

        console.log(character)

        var inventaire_array = JSON.parse(character.invent_new), inventaire_display = ""
        for (var i = 0; i < inventaire_array.length; i++) {
            inventaire_display = inventaire_display + "\n[" + i + "] " + inventaire_array[i]
        }
        console.log(character.invent_new)
        console.log(inventaire_display)

        var inventaire_embed = (
            {
                embed: {
                    title: "Inventaire de " + args[0],
                    color: "#a6dcd5",
                    fields: [
                        {
                            "name": "Contenue",
                            "value": inventaire_display ,
                            "inline": true
                        }
                    ]
                }
            }
        )

        return message.channel.send(inventaire_embed)
    }
}