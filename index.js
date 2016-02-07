var NodeRSA = require('node-rsa')
var moment = require('moment')

var millisInOneYear = 365 * 24 * 60 * 60 * 1000
var defaultExpirationMillis = millisInOneYear * 5

function keyFromOptions(options) {
	var actualKey
	if (options.privateKeyString) {
		if (typeof options.privateKeyString !== 'string') {
			throw 'options.privateKeyString must be typeof string'
		}
		actualKey = new NodeRSA(options.privateKeyString)
		if (!actualKey.isPrivate()) {
			throw 'given key is not private'
		}
	} else if (options.nodeRsaPrivateKey) {
		actualKey = options.nodeRsaPrivateKey
		if (!actualKey.isPrivate()) {
			throw 'given key is not private'
		}
	} else {
		actualKey = new NodeRSA({ b: 2048 })
	}
	return actualKey
}

module.exports = function(options) {
	options = options || {}

	var actualKey = keyFromOptions(options)

	if (actualKey.getKeySize() !== 2048) {
		throw 'key size must be `2048` but was ' + actualKey.getKeySize()
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
			key: actualKey.exportKey('pkcs8-private-pem')
		}
	}
}
