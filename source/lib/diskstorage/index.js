const fs = require('node:fs');
const path = require('node:path');

class DiskStorage {
    constructor (directory) {
        this.directory = directory;
    }

    isValidName (filename) {
        const rg1 = /^[^\\/:\*\?"<>\|\[\]]+$/; // forbidden characters \ / : * ? " < > |
        const rg2 = /^(nul|prn|con|com|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
        return rg1.test(filename) && !rg2.test(filename);
    }

    resolve (filename) {
        return path.join(this.directory, filename);
    }

    exists (filename) {
        const fpath = this.resolve(filename);
        return fs.existsSync(fpath);
    }

    remove (filename) {
        const fpath = this.resolve(filename);
        try {
            fs.rmSync(fpath);  
            return true;
        } catch (err) {
            return false;
        }
    }

    rename (filename, newname) {
        const fpath = this.resolve(filename);
        const npath = this.resolve(newname);
        try {
            fs.renameSync(fpath, npath);  
            return true;
        } catch (err) {
            return false;
        }
    }


    save (filename, data) {
        const fpath = this.resolve(filename);
        try {
            fs.writeFileSync(fpath, data);
            return true;
        } catch (err) {
            return false;
        }
    }
}

// methods should return true if success, or false if error

module.exports = DiskStorage;
