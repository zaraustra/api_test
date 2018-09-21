const https = require('https')

const actions = require('./actions.js')

const COMMANDS = [
  {name: 'most_sold', action: actions.getMostSold},
  {name: 'total_spend', mandatoryParam: 'email', action: actions.getTotalSpend},
  {name: 'most_loyal', action: actions.getMostLoyal}
]

module.exports.validateArgs = function (commandArg, param) {
  if (!commandArg) {
    throw 'Script needs a command in order to be executed! eg. node app most_sold'
  }

  const commandObj = COMMANDS.find(command => command.name === commandArg)

  if (!commandObj) {
    throw 'Unsupported command. Try with: most_sold, total_spend or most_loyal.'
  }

  if (commandObj.mandatoryParam && !param) {
    throw `${commandObj.name} needs parameter "${commandObj.mandatoryParam}" in order to return a result. eg node app total_spend john.bill@email.dom`
  }

  return {commandObj, param}
}

module.exports.getData = async function (endpoint) {
  return new Promise((resolve, reject) => {
    https.get(`https://driftrock-dev-test.herokuapp.com/${endpoint}`, res => {
      res.on('data', data => {
        resolve(JSON.parse(data.toString('utf8')).data)
      })
    }).on('error', (e) => {
      reject(e)
    });
  })
}

module.exports.getTotalSpent = function (purchases, userId) {
  let totalSpent = 0
  purchases.forEach(purchase => {
    if (purchase.user_id === userId) {
      totalSpent += +purchase.spend
    }
  })
  return totalSpent
}