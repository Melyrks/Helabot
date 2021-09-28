const charactermodel = require("./characters/model.json")
 
const jobsmodel = require('./characters/model-metier.json')
 
//const { filter } = require("lodash");
 
/**
 * Ask for character's property, then update the character's file
 * @param {string} sendMessage the message sent to the user by DM
 * @param {string} key the character's property name to update
 * @param {string} type the property's type. Allowed types are `string` (default), `number` and `array`.
 */
 
 
const collect = async (message, sendMessage, key, type = 'string') => {
  let creatorID = message.author.id
  const filter = (response) => response.author.id === creatorID
  await message.channel.send(sendMessage)
  const collected = await message.channel.awaitMessages(filter, { max: 1, time: 280000, errors: ['time'] })
  if (type === 'string') {
    charactermodel[key] = collected.first().content
    console.log(charactermodel[key])
    console.log(  )
  } else if (type === 'number') {
    console.log(collected.first)
    parseInt(collected.first)
    console.log(collected.first)
    charactermodel[key] = +collected.first().content
    if (isNaN(charactermodel[key])) {
      await message.channel.send("Tu dois envoyer un nombre brut, du genre 35 ou 150")
      throw "UN NOMBRE BRUT J'AI DIS, UN NOMBRE BRUT, BRUT, GENRE 1 OU 2, DEBILUS, maintenant tu a plus qu'a tout recommencer"
    }
  } else if (type === 'array') {
    jobsmodel.name = collected.first().content
    charactermodel.metier.push(jobsmodel)
  } else if (type === 'picture') {
   
  }
 
}
 
module.exports = {
  collectPrenom: async (message) => await collect(message, '**Prénom :**', 'name'),
  collectName: async (message) => await collect(message, '**Nom de famille :**', 'surname'),
  collectRace: async (message) => await collect(message, '**Race :**', 'race'),
  collectSexe: async (message) => await collect(message, '**Sexe :**', 'sexe'),
  collectAge: async (message) => await collect(message, '**Age :**', 'age'),
  collectNaissance: async (message) => await collect(message, '**Date de naissance :**', 'born'),
  collectSang: async (message) => await collect(message, '**Type Sanguin :**', 'blood'),
  collectGeneration: async (message) => await collect(message, '**Génération :**', 'gen'),
  collectOrientation: async (message) => await collect(message, '**Orientation :**', 'orientation'),
  collectTaille: async (message) => await collect(message, '**Taille :**', 'taille'),
  collectPoids: async (message) => await collect(message, '**Poids :**', 'poids'),
  collectDescPhy: async (message) => await collect(message, '**Description Physique : (résumé)**', 'descPhy'),
  collectAdresse: async (message) => await collect(message, '**Adresse :**', 'adresse'),
  collectCompetence: async (message) => await collect(message, '**Competence :**', 'competence'),
  collectMagie: async (message) => await collect(message, '**Magie :**', 'magie'),
  collectDescVest: async (message) => await collect(message, '**Description Vestimentaire  :(résumé)**', 'descVest'),
  collectMetier: async (message) => await collect(message, '**Metier :**', 'metier',),
  collectArgentPoche: async (message) => await collect(message, '**Argent de poche : (Veuillez mettre des nombres brut)**', 'money', 'number'),
  collectArgentBanque: async (message) => await collect(message, '**Argent dans la banque : (Veuillez mettre des nombres brut)**', 'bankMoney', 'number'),
  collectAutre: async (message) => await collect(message, '**Autre :**', 'other'),
  collectImage: async (message) => await collect(message, '**Image** : /!\\ Attention vous devez envoyez une URL si vous avez une image, sinon, mettez "aucune"', 'image'),
}