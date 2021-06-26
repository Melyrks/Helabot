module.exports = {
    name: 'ping',
    description: 'renvoie le ping du bot',
    execute(message, args) {
        message.channel.send('pong !')
    }
}