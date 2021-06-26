const Discord = require('discord.js')
const hasRole = (member, id) => {
    return member.roles.cache.find(role => role.id === id);
}
module.exports = {
    name: 'todo-list',
    description: 'test',
    execute(message, args) {
        if (!hasRole(message.member, '834958702268121119')) {
            return message.channel.send("C'est une commande staff, elle est pas pour toi **DEBILUS**")
        }
        const embedText = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Todo list')
            .setDescription(`Liste des commandes, celle avec ✅ sont réaliser et opérationelle et celle avec ❌ ne sont pas encore réalisé/en cours de réalisation`)
            .addFields(
                {
                    name: `HRP-autre`, value: `
                &ticket  ✅
                &roll (comme roll20) ✅	
                &météo ✅
                &purge✅`},

                {
                    name: `Money system ✅`, value: `
                - &withdraw (pour enlever) ✅
                - &add-money ✅
                - &set-salaire ✅
                - &money ✅`},

                {
                    name: `Inventory-system     ✅`, value: `
                - &add-inventory ✅
                - &remove-inventory ✅
                - &inventory {character-name} ✅`},

                { //Principal 
                    name: `Character-system ✅`, value: ` 
                - &add-character ✅
                - &remove-character ✅
                - &edit-character ✅
                - &characters  ✅
                - &character {character-name}✅`} 
            );

        console.log(embedText)

        message.channel.send(embedText)
    }
}
