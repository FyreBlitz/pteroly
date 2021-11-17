const app    = require('./application/index.js')
const client = require('./client/index.js')

module.exports = {
	Client: client,
	Admin:  app,
}