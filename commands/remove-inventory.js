const config = require('../config.json')
const fs = require("fs")

module.exports = {
    name: 'remove-inventory',
    description: '',
    execute(message, args) {
        let charname = args[0]
        const charFileName = charname
        console.log(charFileName)
        let character = require(`${__dirname}/../characters/${charFileName}.json`)

        let character_inventaire = JSON.parse(character.invent_new)
        character_inventaire.splice(parseInt(args[1]), 1)
        //

        character.invent_new = JSON.stringify(character_inventaire)
        fs.writeFileSync(`./characters/${charname}.json`, JSON.stringify(character), (err) => console.error)
        let inventaire_array = JSON.parse(character.invent_new), inventaire_display = ""

        for (let i = 0; i < inventaire_array.length; i++) {
            inventaire_display = inventaire_display + "\n[" + i + "] " + inventaire_array[i]
        }

        var inventaire_embed = (
            {
                embed: {
                    title: "Inventaire de " + charname,
                    description: "",
                    color: 8311585,
                    footer: {
                        text: '(Données mises à jour)'
                    },
                    fields: [
                        {
                            "name": "[Num] [Contenu]",
                            "value": "**" + inventaire_display + "**",
                            "inline": true
                        }
                    ]
                }
            }
        )

        return message.channel.send(inventaire_embed)
    }
}
