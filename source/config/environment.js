const fs = require('node:fs');

module.exports = function () {
    if (!fs.existsSync(process.env.FSJS_LOGS_LOCATION))
        fs.mkdirSync(process.env.FSJS_LOGS_LOCATION);

    if (!fs.existsSync(process.env.FSJS_STORAGE_LOCATION))
        fs.mkdirSync(process.env.FSJS_STORAGE_LOCATION);
}
