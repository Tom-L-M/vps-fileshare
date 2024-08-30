module.exports = function moment (req, res, next) {
    // Add request time in MS and as an ISO date string
    req.moment = Date.now();
    req.datestring = new Date(req.moment).toISOString();
    if (!req.session) req.session = {};
    next();
}
