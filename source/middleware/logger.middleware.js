const fs = require('node:fs');
const path = require('node:path');

const config = require('../config/logger');
const terminal = config.terminal || false;
const dir = config.dir || null;
const expiration = config.expiration || null;

function cleanlogdir (dir, expirationDays) {
    const files = fs.readdirSync(dir);
    const today = new Date().getDate();
    for (let file of files) {
        const datestring = file.slice(0, file.lastIndexOf('.')).replaceAll('_',':');
        const day = new Date(datestring).getDate();
        if (today - day >= expirationDays)
            fs.rmSync(path.resolve(dir, file));
    }
    return;
}

function buildRequestLogger () {
    let stream;
    if (dir) {
        if (!fs.existsSync(dir))
            throw new Error(`middleware:logRequest - Invalid directory path for logging[${dir}]`);
        else {
            const fname = (new Date().toISOString() + '.log').replaceAll(':', '_');
            stream = fs.createWriteStream(path.join(dir, fname));
        }
    }

    if (expiration) {
        // runs at first start and then runs every 12 hours, and checks if there are any logs to remove
        cleanlogdir(dir, expiration);
        setTimeout(() => cleanlogdir(dir, expiration), 1000 * 60 * 60 * 12);
    }

    return function (req, res, next) {
        const initial = Date.now();
        // :remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms

        res.on('close', () => {
            const content = res.getHeader('Content-Length');
            const string = `${req.ip || req.socket.remoteAddress} - - ${new Date().toISOString()} ` + 
                `"${req.method.toUpperCase()} ${req.url} HTTP/` + 
                `${req.httpVersionMajor + '.' + req.httpVersionMinor}" ` +
                `${res.statusCode} ${content ? content + ' ' : ''}- ${Date.now() - initial} ms`
            ;
            if (dir) stream.write(string + '\n');
            if (terminal) console.log(string);
        });
        next();
    }
}

module.exports = buildRequestLogger();
