const DiskStorage = require('../lib/diskstorage');
const path = require('node:path');
const rpath = path.resolve(process.env.FSJS_STORAGE_LOCATION);

const Store = new DiskStorage(rpath);
module.exports = Store;
