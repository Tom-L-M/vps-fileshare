// File Management: (requires auth)
    // File download        GET    /file/<filename>
    // File upload          POST   /file/<filename>     (send file data in body)
    // File removal         DELETE /file/<filename>
    // File rename          PATCH  /file/<filename>     { message: '{new-name-string}' }


const router = require('slower').Router();
const controllers = require('../controllers/file.controllers');

    router.head('/:filename', controllers.file_probe);

    router.get('/:filename', controllers.file_download);

    router.post('/:filename', controllers.file_upload);

    router.delete('/:filename', controllers.file_remove);

    router.patch('/:filename', controllers.file_rename)

    router.use(controllers.file_e404);

module.exports = router;
