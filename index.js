var moment = require('moment')

var millisInOneYear = 365 * 24 * 60 * 60 * 1000
var defaultExpirationMillis = millisInOneYear * 5

module.exports = function createPrivateKeyContainer(privateKey, unixOffsetToExpire) {
	if (!privateKey || typeof privateKey !== 'object') {
		throw 'property `privateKey` is required'
	}

	if (privateKey.getKeySize() !== 2048) {
		throw 'key size must be `2048`'
	}

	if (!privateKey.isPrivate()) {
		throw 'key must be private'
	}

	var expiration
	if (unixOffsetToExpire) {
		expiration = moment(unixOffsetToExpire)
	} else {
		expiration = moment().add(defaultExpirationMillis, 'milliseconds')
	}

	return {
		sdmp: {
			version: '0.13',
			schemas: [ 'private_key' ]
		},
		private_key: {
			expires: expiration.toISOString(),
			key: privateKey.exportKey('pkcs8-private-pem')
		}
	}
}
