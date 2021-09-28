const Roll = require('roll')

module.exports = {
  name:'roll',
  async execute (client, args, message) {
    const roll = new Roll()
    const {user} = await client.guild.members.fetch(client.author.id) //Permet de recuprer le truc qui me permet de ping l'user
    const userRoll = args[0]
    const userInput = `${user} Roll invalide`
    const valid = roll.validate(userRoll)
    
    if (valid) {
      // const dice = roll.roll(userRoll) ==> facon normal; je dois faire dice.rolled/result après
      const {rolled, result} = roll.roll(userRoll) // ==> facon simplifié (destructuring => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
      /*console.log(dice.rolled) 
      console.log(dice.result) 
      console.log(client)*/
      //console.log(person);
      client.channel.send(`${user} roll ${result} [${rolled}]`) 
    } else {
      console.error(userInput)

      // Faire le message embed
    }



  }
}

    /*let userRoll = args[0]

  // Validation du roll
  var valid = roll.validate(userRoll)

  if (valid) {
    // Roll
    var dice = roll.roll(userRoll)
    var bonus_malus = parseInt(dice.calculations[0]) - parseInt(dice.calculations[1]) 
    var rollResult = dice.result
    
    let separators = ['d', '\\\+', '-', '\\*', '/']
    let tokens = userRoll.split(new RegExp(separators.join('|'), 'g'))
    let size = 100
    if (tokens[0] == '') size = tokens[1]
    if (tokens[0] != '') size = tokens[0] * tokens[1]*/