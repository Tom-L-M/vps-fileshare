// File Management: (requires auth)
    // File download        GET    /file/<filename>
    // File upload          POST   /file/<filename>     (send file data in body)
    // File removal         DELETE /file/<filename>
    // File rename          PATCH  /file/<filename>     { message: '{new-name-string}' }

// Resources Accountancy: (requires auth)
    // File listing         GET    /api/files
    // Server status        GET|HEAD    /api/status
    // Total storage use    GET    /api/usage
    // Total file count     GET    /api/count


const PORT = process.env.PORT;
const HOST = process.env.HOST;

console.log(`> Using environment: ${process.env.NODE_ENV}`);

const configure = require('./config/environment');
const fileRouter = require('./routes/file.routes');
const apiRouter = require('./routes/api.routes');
const middleware = require('./middleware');
const slower = require('slower');
const app = slower();

configure();

app.use(middleware.ratelimit);

app.use(middleware.nocache);

app.use(middleware.moment);

app.use(middleware.logger);

app.use(middleware.auth);

app.useRouter(apiRouter, '/api');

app.useRouter(fileRouter, '/file');

app.listen(PORT, HOST, () =>
    console.log(`> Listening on: http://${HOST}:${PORT}/\n`)
);
