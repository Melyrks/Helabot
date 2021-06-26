const Discord = require("discord.js")

module.exports = {
    name: "ticket",
    aliases: [],
    permissions: [],
    description: 'Open a ticket for character sheet and problem with other member',
    async execute(message, args, cmd, client, discord) {

        let embedText;
        if (args[0] === "character") {
            embedText = new Discord.MessageEmbed()
                .setColor('0099ff')
                .setTitle(`Dit ce que tu voudras  dans l'embed préseiement norowa`)
                .setDescription('Merci de nous avoir contacter, description')
        } else if (args[0] === "support") {
            embedText = new Discord.MessageEmbed()
                .setColor('0099ff')
                .setTitle(`wesh c'est pour le support cette merde`)
                .setDescription('Merci de nous avoir contacter, description')

        } else {
            await message.channel.send(`Il faut mettre "character" ou support" après la commande sinon ca va pas fonctionner DEBILUS`)
            throw new Error('invalid command'); //Permet de break la
        }

        const autorizedID = await message.guild.roles.fetch('658665374077812747')
        const channel = await message.guild.channels.create(`ticket : ${message.author.tag}`);
        channel.setParent('658672120963923980') //Id de la catégorie "ticket"

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });

        channel.updateOverwrite(autorizedID, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });

        const reactionMessage = await channel.send(embedText) //Message qui va être mis dans le salon crée

        try {
            await reactionMessage.react("🔇")
            await reactionMessage.react("⛔")
        } catch (err) {
            channel.send("Erreur dans l'envoie des emotes")
            throw err;
        }

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
            { dispose: true }
        );

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                case "🔇":
                    channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                    break;
                case "⛔":
                    channel.send("Le channel va être surprimer dans les 5 secondes qui vienne")
                    setTimeout(() => channel.delete(), 5000);
                    break;
            }
        });

        message.channel
            .send(`Ton support a été crée, merci d'allez dans ${channel}`)
            .then((msg) => { //foutre le message qui apparait dans le channel ou la commande a été fait
                setTimeout(() => msg.delete(), 7000)
                setTimeout(() => message.delete(), 3000)
        })
        .catch((err) => {
            throw err;
        });

        /*try {
            const msg = await message.channel.send("Please worl ;_;");
            //setTimeout(() => msg.delete(), 7000)
            //setTimeout(() => message.delete(), 3000)

            await message.delete();
            setTimeout(() => {
                 msg.delete();
            }, 7000)
        } catch (err) {
            throw err;
        }*/

    },
}