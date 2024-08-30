const path = require('node:path');
const rpath = path.resolve(process.env.FSJS_ACTIVE_TOKEN_HASHES);

const AuthorizationPool = require('../lib/authpool');
const AuthPool = new AuthorizationPool(rpath);
module.exports = AuthPool;
