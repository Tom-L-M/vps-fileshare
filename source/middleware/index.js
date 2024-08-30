module.exports = {
    auth: require('./auth.middleware'),
    logger: require('./logger.middleware'),
    moment: require('./moment.middleware'),
    nocache: require('./nocache.middleware'),
    ratelimit: require('./ratelimit.middleware')
}
