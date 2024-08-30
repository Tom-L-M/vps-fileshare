// File Management: (requires auth)
    // File download        GET    /file/<filename>
    // File upload          POST   /file/<filename>     (send file data in body)
    // File removal         DELETE /file/<filename>
    // File rename          PATCH  /file/<filename>     { message: '{new-name-string}' }

const DiskStorage = require('../config/diskstorage');


function file_probe (req, res, next) {
    const filename = req.params.filename;
    if (!filename || !DiskStorage.exists(filename)) 
         res.status(404).end();
    else res.status(200).end();
}

function file_download (req, res, next) {
    const filename = req.params.filename;
    if (!filename || !DiskStorage.exists(filename)) 
        return res.status(404).json({ error:`Could not locate resource ${filename}`, status: 404 });
    const result = DiskStorage.exists(filename);
    const fpath = DiskStorage.resolve(filename);
    if (!result)
        return res.status(404).json({ error:`Could not fetch resource ${filename}`, status: 404 });
    return res.status(200).file(fpath);
}

function file_upload (req, res, next) {
    const filename = req.params.filename;
    const data = req.body.buffer;
    if (!DiskStorage.isValidName(filename))
        return res.status(422).json({ error: 'Unprocessable content: invalid filename for upload', status:422 });
    const result = DiskStorage.save(filename, data);
    if (!result) 
        return res.status(404).json({ error:`Could not create resource ${filename}`, status: 404 });
    return res.status(200).json({ message: 'File created', status: 200 });
}

function file_remove (req, res, next) {
    const filename = req.params.filename;
    if (!filename || !DiskStorage.exists(filename)) 
        return res.status(404).json({ error:`Could not locate resource ${filename}`, status: 404 });
 
    const result = DiskStorage.remove(filename);
    if (!result) 
        return res.status(404).json({ error:`Could not remove resource ${filename}`, status: 404 });
    return res.status(200).json({ message: 'File removed', status: 200 });
}

function file_rename (req, res, next) {
    const filename = req.params.filename;
    const body = req.body.json();

    if (!body || !body.message || !filename || !DiskStorage.exists(filename)) 
        return res.status(404).json({ error:`Could not locate resource ${filename}`, status: 404 });

    if (!DiskStorage.isValidName(body.message))
        return res.status(422).json({ error: 'Unprocessable content: invalid filename for renaming', status:422 });

    const result = DiskStorage.rename(filename, body.message);
    if (!result) 
        return res.status(404).json({ error:`Could not rename resource ${filename}`, status: 404 });
    return res.status(200).json({ message: 'File renamed', status: 200 });
}

function file_e404 (req, res, next) {
    const filename = req.params.filename;
    return res.status(404).json({ error:`Could not locate resource ${filename || ''}`.trim(), status: 404 });
}


module.exports = {
    file_probe,
    file_download, 
    file_upload, 
    file_remove, 
    file_rename,
    file_e404
};
