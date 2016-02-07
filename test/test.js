var createPrivateKeyContainer = require('../')
var exampleKeys = require('sdmp-example-keys')
var test = require('tape')
var NodeRSA = require('node-rsa')

test('generating a private_key container works with defaults', function(t) {
	var privateKeyContainerWithDefaults = createPrivateKeyContainer()
	// basically just making sure it works here
	t.equals(privateKeyContainerWithDefaults.sdmp.schemas.length, 1, 'there should only be the one schema')
	t.equals(privateKeyContainerWithDefaults.sdmp.schemas[0], 'private_key', 'the schema should be correct')

	// make sure the key is valid
	t.ok(privateKeyContainerWithDefaults.private_key.expires, 'expiration string should exist')
	t.ok(privateKeyContainerWithDefaults.private_key.key, 'key string should exist')
	var key = new NodeRSA(privateKeyContainerWithDefaults.private_key.key)
	t.ok(key.isPrivate(), 'should be a private key')

	t.end()
})

test('generating a private_key container with specific expiration', function(t) {
	var privateKeyContainerWithDefaults = createPrivateKeyContainer({
		unixOffsetToExpire: 1486095035064
	})
	t.ok(privateKeyContainerWithDefaults.private_key.expires, 'key string should exist')
	t.equals(privateKeyContainerWithDefaults.private_key.expires, '2017-02-03T04:10:35.064Z', 'expiration date should be this')

	t.end()
})

test('generating a private_key container with existing key', function(t) {
	var privateKeyContainerWithDefaults = createPrivateKeyContainer({
		privateKeyString: exampleKeys.privateKey
	})

	// make sure the key is valid
	t.ok(privateKeyContainerWithDefaults.private_key.expires, 'expiration string should exist')
	t.ok(privateKeyContainerWithDefaults.private_key.key, 'key string should exist')

	t.end()
})

test('use the NodeRSA object directly', function(t) {
	var key = new NodeRSA(exampleKeys.privateKey)

	var privateKeyContainerWithDefaults = createPrivateKeyContainer({
		nodeRsaPrivateKey: key
	})

	// make sure the key is valid
	t.ok(privateKeyContainerWithDefaults.private_key.expires, 'expiration string should exist')
	t.ok(privateKeyContainerWithDefaults.private_key.key, 'key string should exist')

	t.end()
})
