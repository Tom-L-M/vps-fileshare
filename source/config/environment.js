const fs = require('node:fs');

module.exports = function () {
    if (!fs.existsSync(process.env.FSJS_LOGS_LOCATION))
        fs.mkdirSync(process.env.FSJS_LOGS_LOCATION);

    if (!fs.existsSync(process.env.FSJS_STORAGE_LOCATION))
        fs.mkdirSync(process.env.FSJS_STORAGE_LOCATION);

    if (!fs.existsSync(process.env.FSJS_ACTIVE_TOKEN_HASHES)) {
        fs.mkdirSync(process.env.FSJS_ACTIVE_TOKEN_HASHES.split('/').slice(0, -1).join('/'));
        fs.writeFileSync(process.env.FSJS_ACTIVE_TOKEN_HASHES, JSON.stringify({ user: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" }));
    }
}
