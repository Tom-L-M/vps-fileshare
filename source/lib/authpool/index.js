const crypto = require('node:crypto');

class AuthorizationPool {
    constructor (credentials_file) {
        this.token_list = require(credentials_file);
    }

    #hash (data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    match (user, password) {
        return this.token_list[user] && this.token_list[user] === this.#hash(password);
    }
}

module.exports = AuthorizationPool;
