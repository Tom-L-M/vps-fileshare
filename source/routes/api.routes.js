// Resources Accountancy: (requires auth)
    // Server status        GET|HEAD    /api/status
    // File listing         GET    /api/files
    // Total file count     GET    /api/count
    // Total storage use    GET    /api/usage
    // Last log lines       GET    /api/logs  ?lines=X
    // Logfiles listing     GET    /api/logfiles

const controllers = require('../controllers/api.controllers');
const router = require('slower').Router();

    router.route('/status')
        .head(controllers.api_status_HEAD)
        .get(controllers.api_status)
    ;

    router.get('/files', controllers.api_file_listing);

    router.get('/count', controllers.api_file_count);

    router.get('/usage', controllers.api_storage_usage);

    router.get('/logs', controllers.api_logs);

    router.get('/logfiles', controllers.api_log_files);

    router.use(controllers.api_e404);

module.exports = router;
