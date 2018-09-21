const utils = require('./utils.js');

const purchases = require('./mockPurchases.json').data
// const users = require('./mockUsers.json').data

test('should calculate the correct totalSpent', () => {
  const result = utils.getTotalSpent(purchases, 'KZHR-1H35-2IH8-JXYN')
  expect(result).toBe(245.01)
})

test('should throw an error if the first argument is missing', () => {
  expect(() => utils.validateArgs(undefined, undefined)).toThrow()
})

test('should throw an error if the first argument is an unknow command', () => {
  expect(() => utils.validateArgs('unknow command', undefined)).toThrow()
})

test('should throw an error if the command is "total_spend" and we do not provide an email', () => {
  expect(() => utils.validateArgs('total_spend', undefined)).toThrow()
})