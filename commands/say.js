const config = require(`../config.json`)
const hasRole = (member, id) => {
  return member.roles.cache.find(role => role.id === id);
}//834958702268121119
module.exports = {
  name: 'say',

  execute(message, args) {

    if (!hasRole(message.member, '834958702268121119')) {
      return message.channel.send("C'est une commande staff, elle est pas pour toi **DEBILUS**")
    }
    console.log(message.content)
    // message = [ 'tevdyeved' ]
    let toSay = message.content.slice(config.prefix.length + 4)
    // let toSay = message.join(' ')
    console.log(toSay)
    message.delete()
    return message.channel.send(toSay)
  }
  /*  if (!message.member.roles.cache.find(role => ['| Staff |', '| Staff-test |', '| Staff-pause |'].includes(role.name)) && !config.authorizedID.includes(message.author.id)) {
      return message.channel.send('Vous n\'avez pas la permission de faire cela.')
    }  
      let toSay = message.content.slice(config.prefix.length + 4)
  
    message.delete()
    return message.channel.send(toSay)*/
}