const utils = require('./utils.js')

// Count occourences of the same item and return the highest one
module.exports.getMostSold = async function () {
  const purchases = await utils.getData('purchases')

  // Accumulator is the object that will be returned with the itemName as key and count as value
  let itemOccurences = purchases.reduce((accumulator, curr) => (accumulator[curr.item] = ++accumulator[curr.item] || 1, accumulator), {})

  // This doesn't handle if we have 2 items with the same count (but was getting the job done in this case)
  // let mostSoldItem = Object.keys(itemOccurences).reduce((a, b) => {
  //   return itemOccurences[a] > itemOccurences[b] ? a : b
  // })

  // TODO we can probably avoid this double iteration... but for now is more readable this way.
  // Get max count
  let maxCount = 0
  Object.keys(itemOccurences).forEach(itemName => {
    maxCount = maxCount < itemOccurences[itemName] ? itemOccurences[itemName] : maxCount
  })

  // Create array with all the items sold maxCount times
  let mostSoldItems = []
  Object.keys(itemOccurences).forEach(itemName => {
    if (itemOccurences[itemName] === maxCount) {
      mostSoldItems.push(itemName)
    }
  })

  return mostSoldItems.join(',')
}

module.exports.getTotalSpend = async function (email) {
  const purchases = await utils.getData('purchases')
  const users = await utils.getData('users')
  const user = users.filter(u => u.email === email)[0]

  if (!user) {
    throw `No user has registered with the email: ${email}`
  }

  return utils.getTotalSpent(purchases, user.id)
}

module.exports.getMostLoyal = async function () {
  const purchases = await utils.getData('purchases')
  let users = await utils.getData('users')

  users.forEach(user => {
    // TODO editing the source data, not the best way, not a big deal in this case.
    user.totalSpent = utils.getTotalSpent(purchases, user.id)
  })

  users.sort((a, b) => {
    return b.totalSpent - a.totalSpent
  })

  return users[0].email
}