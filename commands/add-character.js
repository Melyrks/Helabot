const _ = require("lodash");
const fs = require("fs")
const collectFunctions = require("../collect")
const charactermodel = require("../characters/model.json")

module.exports = {
  name: "add-character",
  description: "Permet d'enrengistrer le character de la personne",
  async execute(message, args) {
    try {
      // https://lodash.com/docs/#snakeCase
      const nameFile = _.kebabCase(message.content.trim().slice(15))
      const newCharFilePath = `${__dirname}/../characters/${nameFile}.json`
      await message.channel.send('Création d\'un nouveau personnage : ' + nameFile + '.')
      await message.channel.send('Vous avez 5 minutes pour compléter chaque champ. La création se fait par message privé.')

      //A voire pour simplifier le code, ce que ça veux faire c'est de suprimer le gros patée de "await collectFunction.[...]"
      /*Object.keys(collectFunctions).reduce(async (memo, key) => {
        await memo
        await collectFunctions[key]()
      }, undefined
      )*/
      /**await Promise.all(Object.keys(collectFunctions).map(async (key) => {
        await collectFunctions[key](message)
      }
      ))*/

      await collectFunctions.collectPrenom(message)
      await collectFunctions.collectName(message)
      await collectFunctions.collectRace(message)
      await collectFunctions.collectSexe(message)
      await collectFunctions.collectAge(message)
      await collectFunctions.collectNaissance(message)
      await collectFunctions.collectSang(message)
      await collectFunctions.collectGeneration(message)
      await collectFunctions.collectOrientation(message)
      await collectFunctions.collectTaille(message)
      await collectFunctions.collectPoids(message)
      await collectFunctions.collectDescPhy(message)
      await collectFunctions.collectAdresse(message)
      await collectFunctions.collectCompetence(message)
      await collectFunctions.collectMagie(message)
      await collectFunctions.collectDescVest(message)
      await collectFunctions.collectMetier(message)
      await collectFunctions.collectArgentPoche(message)
      await collectFunctions.collectArgentBanque(message)
      await collectFunctions.collectAutre(message)
      await collectFunctions.collectImage(message)

      await fs.promises.writeFile(newCharFilePath, JSON.stringify(charactermodel))

      await message.channel.send("Création du personnage " + nameFile + " terminé, vous pouvez l'afficher en faisant &character " + nameFile)
    } catch (e) {
      console.log(`error`, e)
    }
  }
}