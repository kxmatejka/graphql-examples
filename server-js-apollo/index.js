const server = require('./src/server')

server.listen().then(({url}) => console.log(`listening at ${url}`))
