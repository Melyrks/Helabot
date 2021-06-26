const { User } = require("discord.js");

const hasRole = (member, id) => {
    return member.roles.cache.find(role => role.id === id);
}

module.exports = {
    name: 'purge',
    description: 'Delete messages.',
    async execute(message, args) {

    if (!hasRole(message.member, '658665374077812747')) {
        return message.channel.send("C'est une commande staff, elle est pas pour toi **DEBILUS**")
    }

      const amount = parseInt(args[0]) + 1;
  
      if (isNaN(amount)) {
        return message.reply("Ce n'est pas un nombre valide !");
      }
      else if (amount <= 1 || amount > 100) {
        return message.reply("Tu dois saisir un nombre compris entre 1 et 99 !");
      }
  
      message.channel.bulkDelete(amount)
        .then(messages => console.log(`${messages.size - 1} messages supprimés.`))
    }
  };