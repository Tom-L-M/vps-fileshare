const fs = require('node:fs');
const path = require('node:path');
const loggerConfig = require('../config/logger');
const { version } = require('../../package.json');

function api_version (req, res, next) {
    return res.status(200).json({ message: version, status:200 });
}

function api_status_HEAD (req, res, next) {
    return res.status(200).end();
}

function api_status (req, res, next) {
    return res.status(200).json({ message: 'OK', status:200 });
}

function api_file_listing (req, res, next) {
    const dir = process.env.FSJS_STORAGE_LOCATION;
    const files = fs.readdirSync(dir, { recursive: true });
    const ffinal = files.map(v => v.replace(dir, ''));
    return res.status(200).json({ message: ffinal, status:200 });
}

function api_file_count (req, res, next) {
    const dir = process.env.FSJS_STORAGE_LOCATION;
    const files = fs.readdirSync(dir, { recursive: true });
    return res.status(200).json({ message: files.length, status:200 });
}

function api_storage_usage (req, res, next) {
    const dir = process.env.FSJS_STORAGE_LOCATION;
    const files = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
    let size = 0;
    for (let file of files) {
        const stat = fs.statSync(path.join(file.parentPath, file.name));
        size += stat.size;
    }
    return res.status(200).json({ message: { size, size_kb: size/1024, size_mb: size/1024/1024 }, status:200 });
}

function api_logs (req, res, next) {
    let lines = parseInt(req.query.lines) || 1000;  

    try {
        const files = fs.readdirSync(loggerConfig.dir);
        let last = 0;
        let lfile = '';
        for (let file of files) {
            const datestring = file.slice(0, file.lastIndexOf('.')).replaceAll('_',':');
            const day = new Date(datestring).getTime();
            if (day > last) { 
                last = day; 
                lfile = file 
            };
        }
        lfile = path.join(loggerConfig.dir, lfile);
        const data = fs.readFileSync(lfile, 'utf-8');
        const divided = data.split('\n');
        const actual = divided.slice(-lines);
        return res.status(200).json({ message: actual, status: 200 });

    } catch (err) {
        // If there is an error, return the "Internal Server Error" code
        return res.status(500).json({ error: "Internal Server Error: Could not process log request", status: 500 });
    }
}

function api_log_files (req, res, next) {
    try {
        const files = fs.readdirSync(loggerConfig.dir);
        return res.status(200).json({ message: files, status: 200 });
    } catch (err) {
        // If there is an error, return the "Internal Server Error" code
        return res.status(500).json({ error: "Internal Server Error: Could not process log request", status: 500 });
    }
}

function api_e404 (req, res, next) {
    return res.status(404).json({ error:"Could not locate resource", status: 404 });
}

module.exports = {
    api_version,
    api_status_HEAD,
    api_status, 
    api_file_listing, 
    api_file_count, 
    api_storage_usage,
    api_logs,
    api_log_files,
    api_e404
};
