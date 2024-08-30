const fs = require('node:fs');
const path = require('node:path');

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

function api_e404 (req, res, next) {
    return res.status(404).json({ error:"Could not locate resource", status: 404 });
}

module.exports = {
    api_status_HEAD,
    api_status, 
    api_file_listing, 
    api_file_count, 
    api_storage_usage,
    api_e404
};
