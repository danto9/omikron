var crypto = require('crypto')

module.exports = [
	{
		id: crypto.pbkdf2Sync('testuser', 'salt', 4096, 32, 'sha256').toString('hex'),
		name: 'testuser',
		password: crypto.pbkdf2Sync('mysecretpassword', 'salt', 4096, 512, 'sha256').toString('hex')
	}
]