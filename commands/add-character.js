const charactermodel = require("../characters/model.json")
const skillmodel = require("../characters/model-skills.json")
const jobsmodel = require('../characters/model-metier.json')
const _ = require("lodash");
const fs = require("fs")
const Discord = require("discord.js");
const { filter } = require("lodash");



module.exports = {
  name: "add-character",
  description: "Permet d'enrengistrer le character de la personne",
  async execute(message, args) {
    try {
      let creatorID = message.author.id
      // https://lodash.com/docs/#snakeCase
      const nameFile = _.kebabCase(message.content.trim().slice(15))
      const filter = (response) => response.author.id === creatorID
      const newCharFilePath = `${__dirname}/../characters/${nameFile}.json`
      await fs.promises.writeFile(newCharFilePath, JSON.stringify(charactermodel))
      await message.channel.send('Création d\'un nouveau personnage : ' + nameFile + '.')
      await message.channel.send('Vous avez 5 minutes pour compléter chaque champ. La création se fait par message privé.')

      /**
       * Ask for character's property, then update the character's file
       * @param {string} sendMessage the message sent to the user by DM
       * @param {string} key the character's property name to update
       * @param {string} type the property's type. Allowed types are `string` (default), `number` and `array`.
       */
      const collect = async (sendMessage, key, type = 'string') => {
        await message.channel.send(sendMessage)
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 280000, errors: ['time'] })
        if (type === 'string') {
          charactermodel[key] = collected.first().content
        } else if (type === 'number') {
          charactermodel[key] = +collected.first().content
          if (isNaN(charactermodel[key])) {
            await message.channel.send("Tu dois envoyer un nomnbre brut, du genre 35 ou 150, maintenant recommence toute la procédure sans te planter *débilus*")
            throw "UN NOMBRE BRUT J'AI DIS, UN NOMBRE BRUT, BRUT, GENRE 1 OU 2, DEBILUS, maintenant tu a plus qu'a tout recommencer"
          }
        } else if (type === 'array') {
          jobsmodel.name = collected.first().content
          charactermodel.metier.push(jobsmodel)
        } /*else if (type === 'picture') {
          charactermodel[key] = +collected.first().content
          function  isValidHttpUrl(charactermodel[key]){
            let url;
            try {
              url = new url(charactermodel[key]);
            } catch (_) {
              return false;
            }
            return url.protocol === 'http:' || url.protocol === "https:";
          } */
          // if content is not an url valid => throw
          // else if content is not aucune => throw
          // else (url est valide ou il y a aucune) => charactermodel.image = content0
        }
        await fs.promises.writeFile(newCharFilePath, JSON.stringify(charactermodel))
      

      await collect('**Prénom :**', 'name')
      await collect('**Nom de famille :**', 'surname')
      await collect('**Race :**', 'race')
      await collect('**Sexe :**', 'sexe')
      await collect('**Age :**', 'age')
      await collect('**Date de naissance :**', 'born')
      await collect('**Type de sang :**', 'blood')
      await collect('**Génération :**', 'gen')
      await collect('**Orientation :**', 'orientation')
      await collect('**Taille :**', 'taille')
      await collect('**Poids :**', 'poids')
      await collect('**Description Physique : (résumé)**', 'descPhy')
      await collect('**Adresse :**', 'adresse')
      await collect('**Competence :**', 'competence')
      await collect('**Magie :**', 'magie')
      await collect('**Description Vestimentaire  :(résumé)**', 'descVest')
      await collect('**Metier :**', 'metier',)
      await collect('**Argent de poche : (Veuillez mettre des nombres brut)**', 'money', 'number')
      await collect('**Argent dans la banque : (Veuillez mettre des nombres brut)**', 'bankMoney', 'number')
      await collect('**Autre :**', 'other')
      await collect('**Image** : /!\\ Attention vous devez envoyez une URL si vous avez une image, sinon, mettez "aucune"', 'image')

      await message.channel.send("Création du personnage " + nameFile + " terminé, vous pouvez l'afficher en faisant &character " + nameFile)
    } catch (e) {
      console.log(`error`, e)
    }
  }
}