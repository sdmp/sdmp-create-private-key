# sdmp-create-private-key

This module will create a [`private_key`](http://sdmp.io/spec/0.13/schema/private_key/)
container object according to the specifications in the
[SDMP](http://sdmp.io) protocol.

## install

This module is made to use [npm](https://www.npmjs.com/). Install
the normal `npm` way:

	npm install sdmp-create-private-key

## use it

You must pass in a [node-rsa](https://github.com/rzcoder/node-rsa)
object containing a private key of `2048` bits:

	var create = require('sdmp-create-private-key')
	var container = create(privateKey)
	// container is a valid `private_key` container object, e,g,
	console.log(container.private_key.key) // => -----BEGIN RSA PRIVATE KEY-----...

## node-rsa

The node-rsa module is an RSA crypto module implemented in pure
JavaScript. This gives maximum portability, but generating keys
in JS is not as fast as system-native libraries.

You can create a `node-rsa` object any of the following ways:

### new key

	var NodeRSA = require('node-rsa')
	var privateKey = new NodeRSA({ b: 2048 })

### from PEM encoded string

	var NodeRSA = require('node-rsa')
	var pemKey = '-----BEGIN RSA PRIVATE KEY-----\n...'
	var privateKey = new NodeRSA(pemKey)

## api `create(privateKey[, unixOffsetToExpire])`

In all cases, calling the function will either return a new
container object, or throw an exception.

###### `privateKey` *(required)*

The parameter `privateKey` must be a [node-rsa](https://github.com/rzcoder/node-rsa)
equivalent object, containing a private key of `2048` bytes.

###### `unixOffsetToExpire` *(optional, `integer`)*

Pass in the unix offset (milliseconds since Unix Epoch) and the
UTC expiration date will be set to that exact date.

If this value is not set, the expiration date will be set to
five years in the future.

## license

Published and released under the [Very Open License](http://veryopenlicense.com/).

`<3`
