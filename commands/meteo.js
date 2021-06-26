const Discord = require("discord.js");

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
const event = require("../Meteo-event/meteo-event.json")
const description = require("../Meteo-event/meteo-description.json")
const hasRole = (member, id) => {
    return member.roles.cache.find(role => role.id === id);
}

module.exports = {
    name: 'meteo',

    execute(message, args) {
        if (!hasRole(message.member, '658665374077812747')) {
            return message.channel.send("C'est une commande staff, elle est pas pour toi **DEBILUS**")
        }
        let dice_result_morging = random(1, 101)
        let dice_result_afternoon = random(1, 101)
        let dice_result_noon = random(1, 101)
        let eventChoose = random(1, 101)


        let temperature;

        const good_time = "Beau temps"
        const so_so_time = "Temps moyen"
        const bad_time = "Temps mauvais"
        const very_bad_time = "Très mauvais temps"

        let toSayMorning = ""
        let toSayAfternoon = ""
        let toSayNoon = ""
        let toSaySeason = ""
        let toSayGeneraly = ""
        let currentSaison;
        let currentFrequence;
        let toSayMorningDescription = ""
        let toSayAfternoonDescription = ""
        let toSayNoonDescription = ""

        let choiceDescription;

        
        /**
         * This method returns a random choice....
         * @param {string} type1  the first optionnal type in which pick up the random choice
         * @param {string} type2 the second...
         * @returns A FUCKING RANDOM CHOICE
         */
        const getToSay = (type1, type2) => {
            let currentChoix1 = [];
            let currentChoix2 = [];
            if (type1) {
                const currentType1 = currentFrequence.types.find((item) => item.type === type1);
                if (currentType1) {
                    currentChoix1 = currentType1.choix;
                }
            }
            if (type2) {
                const currentType2 = currentFrequence.types.find((item) => item.type === type2);
                if (currentType2) {
                    currentChoix2 = currentType2.choix;
                }
            }
            if (currentChoix1.length === 0 && currentChoix2.lenght === 0) {
                return undefined;
            }
            const finalChoices = [...currentChoix1, ...currentChoix2];
            const maxRangeFinal = finalChoices.length
            return finalChoices[random(0, maxRangeFinal)]
        }

        const getToSayDescription = (type) => {
            choiceDescription = description.find((item) => item.name === type)
            if (!choiceDescription) {
                throw `La description est undefined pour ${type}`
            }
            const {description: currentDescription} = choiceDescription; 
            return currentDescription
        }
        

        const saison = args[0]
        //("1 : Hiver; 2 : Printemps; 3 : Eté; 4 : Automne"))

        const date = args[1]
        console.log(date)

        if (saison == 1) {
            temperature = random(-30, -4)
            toSaySeason = "Hiver"
            currentSaison = event.winter
        }
        else if (saison == 2) {
            temperature = random(-5, 16)
            toSaySeason = "Printemps"
            currentSaison = event.spring
        }
        else if (saison == 3) {
            temperature = random(15, 41)
            toSaySeason = "Eté"
            currentSaison = event.summer
        }
        else if (saison == 4) {
            temperature = random(5, 21)
            toSaySeason = "Automne"
            currentSaison = event.fall
        }
            console.log(currentSaison)
                

        if (eventChoose >= 1 && eventChoose < 6) {
            currentFrequence = currentSaison.find((item) => item.frequence === 'veryrare')
        } else if (eventChoose >= 6 && eventChoose < 16){
            currentFrequence = currentSaison.find((item) => item.frequence === 'rare')
        }else if (eventChoose >= 16 && eventChoose < 51){
            currentFrequence = currentSaison.find((item) => item.frequence === 'moyennementFrequent')
        }else if (eventChoose >= 51 && eventChoose < 101){
            currentFrequence = currentSaison.find((item) => item.frequence === 'frequent')
        }

        console.log(currentFrequence)



        //Partie Matin
        if (dice_result_morging >= 1 && dice_result_morging <= 25) {
            
            toSayMorning = getToSay('goodTime', 'goodTimeDay')
            toSayMorningDescription = getToSayDescription(toSayMorning)
            dice_result_afternoon -= 10

        } else if (dice_result_morging >= 26 && dice_result_morging < 51) {

            toSayMorning = getToSay('neutralTime', 'neutralTimeDay')
            toSayMorningDescription = getToSayDescription(toSayMorning)
            dice_result_afternoon -= 5

        } else if (dice_result_morging >= 51 && dice_result_morging < 76) {
            
            
            toSayMorning = getToSay('badTime', 'badTimeDay')
            toSayMorningDescription = getToSayDescription(toSayMorning)
            dice_result_afternoon += 5

           
        } else if (dice_result_morging >= 76 && dice_result_morging <= 100) {
            
            toSayMorning = getToSay('veryBadTime', 'veryBadTimeDay')
            toSayMorningDescription = getToSayDescription(toSayMorning)
            dice_result_afternoon += 10
             /*TypeError: Cannot read property 'types' of undefined
    at getToSay (D:\Programe\bot\Helabot\commands\meteo.js:51:55)
    at Object.execute (D:\Programe\bot\Helabot\commands\meteo.js:142:28)
    at Client.<anonymous> (D:\Programe\bot\Helabot\index.js:40:38)
    at Client.emit (events.js:315:20)
    at MessageCreateAction.handle (D:\Programe\bot\Helabot\node_modules\discord.js\src\client\actions\MessageCreate.js:31:14)
    at Object.module.exports [as MESSAGE_CREATE] (D:\Programe\bot\Helabot\node_modules\discord.js\src\client\websocket\handlers\MESSAGE_CREATE.js:4:32)
    at WebSocketManager.handlePacket (D:\Programe\bot\Helabot\node_modules\discord.js\src\client\websocket\WebSocketManager.js:384:31)
    at WebSocketShard.onPacket (D:\Programe\bot\Helabot\node_modules\discord.js\src\client\websocket\WebSocketShard.js:444:22)
    at WebSocketShard.onMessage (D:\Programe\bot\Helabot\node_modules\discord.js\src\client\websocket\WebSocketShard.js:301:10)
    at WebSocket.onMessage (D:\Programe\bot\Helabot\node_modules\ws\lib\event-target.js:132:16)*/
        }
        console.log(getToSay)
        console.log(dice_result_morging)
        console.log(toSayMorning)
        console.log(toSayMorningDescription)


        //Partie après-midi
        if (dice_result_afternoon <= 0){
            toSayAfternoon = getToSay('burningBadTime')
            if (!toSayAfternoon){
                toSayAfternoon = getToSay('goodTime', 'goodTimeDay')
                
            }
            dice_result_noon -= 15
            toSayAfternoonDescription = getToSayDescription(toSayAfternoon)

        }else if (dice_result_afternoon >= 1 && dice_result_afternoon < 25) {

            dice_result_noon -= 10
            toSayAfternoon = getToSay('goodTime', 'goodTimeDay')
            toSayAfternoonDescription = getToSayDescription(toSayAfternoon)

        }else if (dice_result_afternoon >= 25 && dice_result_afternoon < 50) {

            dice_result_noon -= 5
            toSayAfternoon = getToSay('neutralTime', 'neutralTimeDay')
            toSayAfternoonDescription = getToSayDescription(toSayAfternoon)

        }else if (dice_result_afternoon >= 50 && dice_result_afternoon < 76) {

            dice_result_noon += 5
            toSayAfternoon = getToSay('badTime', 'badTimeDay')
            toSayAfternoonDescription = getToSayDescription(toSayAfternoon)

        }else if (dice_result_afternoon >= 76 && dice_result_afternoon <= 100) {

            dice_result_noon += 10
            toSayAfternoon = getToSay('veryBadTime', 'veryBadTimeDay')
            toSayAfternoonDescription = getToSayDescription(toSayAfternoon)


        }else if (dice_result_afternoon >= 100) {

            toSayAfternoon = getToSay('burningBadTime')
            if (!toSayAfternoon){
                toSayAfternoon = getToSay('veryBadTime', 'veryBadTimeDay')
            }
            dice_result_noon += 15
            toSayAfternoonDescription = getToSayDescription(toSayAfternoon)

        }
        console.log(getToSay)
        console.log(dice_result_afternoon)
        console.log(toSayAfternoon)
        console.log(toSayAfternoonDescription)

        if (dice_result_noon <= 0){

            toSayNoon = getToSay('burningBadTime')
            if (!toSayNoon){
                toSayNoon = getToSay('goodTime', 'goodTimeNight')
            }
            dice_result_noon -= 15
            
            toSayNoonDescription = getToSayDescription(toSayNoon)

        }else if (dice_result_noon >= 1 && dice_result_noon < 25) {

            toSayNoon = getToSay('goodTime', 'goodTimeNight')
            
            toSayNoonDescription = getToSayDescription(toSayNoon)

        }
        else if (dice_result_noon >= 25 && dice_result_noon < 50) {
           
            toSayNoon = getToSay('neutralTime', 'neutralTimeNight')
            
            toSayNoonDescription = getToSayDescription(toSayNoon)

        }
        else if (dice_result_noon >= 50 && dice_result_noon < 76) {

            toSayNoon = getToSay('badTime', 'badTimeNight')
            
            toSayNoonDescription = getToSayDescription(toSayNoon)

        }
        else if (dice_result_noon >= 76 && dice_result_noon <= 100) {


            toSayNoon = getToSay('veryBadTime', 'veryBadTimeNight')
            
            toSayNoonDescription = getToSayDescription(toSayNoon)


        } else if (dice_result_noon > 100) {

            toSayNoon = getToSay('burningBadTime')
            if (!toSayNoon){
                toSayNoon = getToSay('veryBadTime', 'veryBadTimeNight')
            }
            
            toSayNoonDescription = getToSayDescription(toSayNoon)

        }  
        console.log(getToSay)
        console.log(dice_result_noon)
        console.log(toSayNoon)
        console.log(toSayNoonDescription)


        const day = [dice_result_morging, dice_result_afternoon, dice_result_noon]

        const during_the_day = average(...day)

        // average([10, 20, 93])
        // average(...day)
        // average(10, 20, 93)

        console.log(during_the_day)
        


        console.log(temperature)

        /**
         * Ici quand l'avarage est supérieur a 100 ou inférieur a 1 cela casse, regler ce problème 
         */
        if (during_the_day <= 0) {
            toSayGeneraly = good_time + " généralement"
            temperature += 15
            console.log(temperature)
        }
        else if (during_the_day >= 1 && during_the_day < 25) {
            toSayGeneraly = good_time + " généralement"
            temperature += 10
            console.log(temperature)
        }
        else if (during_the_day >= 25 && during_the_day < 50) {
            toSayGeneraly = so_so_time + " généralement"
            temperature += 5
            console.log(temperature)
        }
        else if (during_the_day >= 50 && during_the_day < 76) {
            toSayGeneraly = bad_time + " généralement"
            temperature -= 5
            console.log(temperature)
        }
        else if (during_the_day >= 76 && during_the_day <= 100) {
            toSayGeneraly = very_bad_time + " généralement"
            temperature -= 10
            console.log(temperature)
        }
        else if (during_the_day > 100){
            toSayGeneraly =  very_bad_time + " généralement"
            temperature -= 15
            console.log(temperature)
        }

        console.log("////////////////////////////////////////////////////////////////////")

        let playerRole = message.guild.roles.cache.find(role => role.id === '658682975805898767')
        console.log(playerRole)

            const embedText = new Discord.MessageEmbed()
                .setColor("#a6dcd5")
                .setTitle(`Bilan météo du ${date} après B.S`)
                .addFields( 
                    {   
                        name: "Température", value: ` ${temperature}`, inline: true
                    },
                    {
                        name: "Saison", value: `${toSaySeason}`, inline: true
                    },
                    { 
                        name: "Matin", value: `${toSayMorning} ! ${toSayMorningDescription.join('\n\n')}`
                    },
                    { 
                        name: "Après-midi", value: `${toSayAfternoon} ! ${toSayAfternoonDescription.join('\n\n')}`
                    },
                    { 
                        name: "Soir", value: `${toSayNoon} ! ${toSayNoonDescription.join('\n\n')}`
                    },
                    {
                        name: "Résumé", value: `${toSayGeneraly}`
                    }

                )

                /** /!\ A remettre a la fin des tests
                 * message.channel.send(`${playerRole}`)
                
                */


            console.log(embedText)
            message.channel.send(embedText)
            
            setTimeout(() => message.delete(), 5000)


        }
    }
