var create = require('../')
var exampleKeys = require('sdmp-example-keys')
var test = require('tape')
var NodeRSA = require('node-rsa')

test('generating a private_key container', function(t) {
	var privateKey = new NodeRSA(exampleKeys.privateKey)
	var container = create(privateKey)

	// basically just making sure it works here
	t.equals(container.sdmp.schemas.length, 1, 'there should only be the one schema')
	t.equals(container.sdmp.schemas[0], 'private_key', 'the schema should be correct')

	// make sure the key is valid
	t.ok(container.private_key.expires, 'expiration string should exist')
	t.ok(container.private_key.key, 'key string should exist')
	var key = new NodeRSA(container.private_key.key)
	t.ok(key.isPrivate(), 'should be a private key')

	t.end()
})

test('generating a private_key container with expiration', function(t) {
	var privateKey = new NodeRSA(exampleKeys.privateKey)
	var container = create(privateKey, 1486095035064)
	t.equals(typeof container.private_key.expires, 'string', 'expiration string exists')
	t.equals(container.private_key.expires, '2017-02-03T04:10:35.064Z', 'expiration should be this')

	t.end()
})

test('should fail with public key', function(t) {
	var publicKey = new NodeRSA(exampleKeys.publicKey)
	var matcher = /key must be private/
	t.throws(function() { create(publicKey) }, matcher, 'should throw this')

	t.end()
})
