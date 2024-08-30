const path = require('node:path');
const rpath = path.resolve(process.env.FSJS_LOGS_LOCATION);
const expiration = parseInt(process.env.FSJS_LOGS_DURATION_DAYS);

module.exports = { terminal: true, dir: rpath, expiration };
