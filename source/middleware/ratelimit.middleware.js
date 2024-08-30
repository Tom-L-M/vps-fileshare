const config = require('../config/ratelimit');

function buildRateLimiter () {
    const window_ms = config.RL_TIME || config.WINDOW_MS;
    const max_requests = config.RL_MAXR || config.MAX_REQUESTS;

    // Rate limiting settings
    const Store = new Map();

    return function (req, res, next) {
        const ip = req.ip;
        const now = Date.now();
        const resetIP = (ip) => Store.set(ip, { requests: 1, startTime: now });

        if (!Store.has(ip)) {
            resetIP(ip);
            return next();
        }

        const stored = Store.get(ip);
        const deltaTime = now - stored.startTime;

        if (deltaTime < window_ms) {
            stored.requests++;
    
            if (stored.requests > max_requests)
                return res.status(429).json({ error: 'Too many requests. Please try again later.', status: 429 });
    
            return next();
        }

        // Reset rate limit for IP after window passes
        resetIP(ip);
        return next();
    }
}

module.exports = buildRateLimiter();
