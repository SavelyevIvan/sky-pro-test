const Regions = require('./regions.json')
const fs = require('fs')

const aggregate = Regions.reduce((result, reg) => {
  result[reg.fias_id] = reg
  return result
}, {})

console.log(aggregate)

fs.writeFileSync('./regionsAggregate.json', JSON.stringify(aggregate))
