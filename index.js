var NodeRSA = require('node-rsa')
var moment = require('moment')

var millisInOneYear = 365 * 24 * 60 * 60 * 1000
var defaultExpirationMillis = millisInOneYear * 5

module.exports = function(options) {
	options = options || {}

	var pemEncoded
	if (options.privateKeyString) {
		if (typeof options.privateKeyString !== 'string') {
			throw 'options.privateKeyString must be typeof string'
		}
		var key = new NodeRSA(options.privateKeyString)
		if (!key.isPrivate()) {
			throw 'given key is not private'
		}
		pemEncoded = options.privateKeyString
	} else {
		var key = new NodeRSA({ b: 2048 })
		pemEncoded = key.exportKey('pkcs8-private-pem')
	}

	var expiration
	if (options.unixOffsetToExpire) {
		expiration = moment(options.unixOffsetToExpire).toISOString()
	} else {
		expiration = moment().add(defaultExpirationMillis, 'milliseconds').toISOString()
	}

	return {
		sdmp: {
			version: '0.13',
			schemas: [ 'private_key' ]
		},
		private_key: {
			expires: expiration,
			key: pemEncoded
		}
	}
}
