/*const Discord = require('discord.js')
const firstMessage = require('./first-message')

module.exports = client => {
    const channelID = '834960454262063176'

    /*const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        debilus: 'debilus',
    }

    const reactions = []

    let emojiText = `Vous avez un problème avec une autre personne du serveur ? Une demande particulière ? Appuyez sur la réaction pour ouvrir un ticket et parler nous en !`

    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)
    };

     embedText = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Todo list')
        .setDescription(`Liste des commandes, celle avec ✅ sont réaliser et opérationelle et celle avec ❌ ne sont pas encore réalisé/en cours de réalisation`)
        .addFields(
            {
                name: `HRP-autre`, value: `
                &ticket  ✅
                &roll (comme roll20) ❌	
                &météo ❌
                &Luna❌
                &purge✅`},

            {
                name: `Money system ❌`, value: `
                - &withdraw (pour enlever) 
                - &add-money
                - &remove-money
                - &setsalaire 
                - &money`},

            {
                name: `Inventory-system ❌`, value: `
                - &add-inventory 
                - &remove-inventory
                - &inventory {character-name} `},

            {
                name: `Character-system ❌`, value: `
                - &add-character 
                - &remove-character 
                - &edit-character
                - &characters  
                - &character {character-name}`},

            {
                name: `Skill-system ❌`, value: `
                Compétences : 
                - &sort
                - &sort {character-name}`},
        );
    
    
    firstMessage(client, channelID, embedText)
    console.log(embedText)

    console.log(firstMessage)

}*/