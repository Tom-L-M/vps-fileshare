module.exports = function nocache (req, res, next) {
    // Prevent client-side caching
    res.set('Cache-Control', 'no-cache');
    next();
}
