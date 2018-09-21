const utils = require('./utils.js')

async function main () {
  // Validate and select proper action
  let args
  try {
     args = utils.validateArgs(process.argv[2], process.argv[3])
  } catch (e) {
    console.error('Error:', e)
    return
  }
  const {commandObj, param} = args

  // Execute action with optional param
  let result
  try {
    result = await commandObj.action(param)
  } catch(e) {
    console.error('Error', e)
    return
  }

  // Print result
  console.log(result)
}

main()