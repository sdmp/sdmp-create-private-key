# sdmp-create-private-key

This module will create a `private_key` container object according
to the specifications in the [SDMP](http://sdmp.io) protocol.

You can call this module to get a new `private_key` object which
conforms to the SDMP specifications, or you can pass in an existing
private key and generate the `private_key` object.

This module uses the [node-rsa](https://github.com/rzcoder/node-rsa)
module to generate RSA private keys, which is a pure-JavaScript
implementation of the RSA cryptographic functions.

## install

This module is made to use [npm](https://www.npmjs.com/). Install
the normal `npm` way:

	npm install sdmp-create-private-key

## use it

Use it like this:

	var create = require('sdmp-create-private-key')
	var container = create()
	// container is a valid private_key container object, e,g,
	console.log(container.private_key.key) // => -----BEGIN RSA PRIVATE KEY-----...

## api

In all cases, calling the function will either return a new
container object, or throw an exception.

Calling the function:

### `create(options)`

The parameter `options` is optional. If it is present, the
following properties are recognized:

###### `options.privateKeyString` *(optional, `string`)*

Pass in a pre-existing PEM encoded RSA private key, as a string,
and the container object will contain that key.

###### `options.unixOffsetToExpire` *(optional, `integer`)*

Pass in the unix offset (milliseconds since Unix Epoch) and the
UTC expiration date will be set to that exact date.

If this value is not set, the expiration date will be set to
five years in the future.

## license

Published and released under the [Very Open License](http://veryopenlicense.com/).

`<3`
