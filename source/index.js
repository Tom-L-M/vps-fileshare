// File Management: (requires auth)
    // File download        GET    /file/<filename>
    // File upload          POST   /file/<filename>     (send file data in body)
    // File removal         DELETE /file/<filename>
    // File rename          PATCH  /file/<filename>     { message: '{new-name-string}' }

// Resources Accountancy: (requires auth)
    // Server status        GET|HEAD    /api/status
    // File listing         GET    /api/files
    // Total file count     GET    /api/count
    // Total storage use    GET    /api/usage
    // Last log lines       GET    /api/logs  ?lines=X
    // Logfiles listing     GET    /api/logfiles


const PORT = process.env.PORT;
const HOST = process.env.HOST;

const configure = require('./config/environment');
configure();

console.log(`> Using environment: ${process.env.NODE_ENV}`);

const fileRouter = require('./routes/file.routes');
const apiRouter = require('./routes/api.routes');
const middleware = require('./middleware');
const slower = require('slower');
const app = slower();


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
