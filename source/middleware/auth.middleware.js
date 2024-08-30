const AuthPool = require('../config/authpool');

function decodeToken (token) {
    let buff = Buffer.from(token, 'base64').toString();
        buff = buff.split(':');
    let usr = buff.shift();
    let psw = buff.join(':');
    return [ usr, psw ];
}

module.exports = function authenticate (req, res, next) {
    const header = req.headers?.["authorization"];

    // If there is no token sent, drop the request
    if (!header || !header.startsWith('Basic')) {
        return res.status(401).json({
            error: "Unauthorized: Missing credentials from 'Authorization' header",
            status: 401
        });
    }

    const r_token = header.split(/\s+/).pop();
    const [ user, pass ] = decodeToken(r_token);

    // If the token is invalid, drop the request
    if (!AuthPool.match(user, pass)) {
        res.status(403).json({
            error: "Forbidden: Invalid bearer token from 'Authorization' header", 
            status: 403
        });
    }

    // If the token is valid, continue
    else {
        req.authenticated = true;
        next();
    }
}
