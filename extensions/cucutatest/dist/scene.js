"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.unload = exports.load = void 0;
const path_1 = require("path");
const fs = require('fs');
const path = require('path');
module.paths.push((0, path_1.join)(Editor.App.path, 'node_modules'));
function load() { }
exports.load = load;
;
function unload() { }
exports.unload = unload;
;
exports.methods = {
    getFiles() {
        const directoryPath = path.resolve(__dirname, './userFiles');
        let firstFile;
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
            // Filter out directories from the list of files
            const fileList = files.filter((file) => {
                return fs.statSync(path.join(directoryPath, file)).isFile();
            });
            console.log('Files in the directory:');
            fileList.forEach((file) => {
                console.log(file);
            });
            firstFile = fileList[0];
        });
        const logo = fs.readFileSync(path.resolve(__dirname, './userFiles/file1.txt'), 'utf-8');
        console.log("CONTENT");
        console.log(logo);
    },
    listFiles() {
        console.log(" === Listing Files === ");
        const files = [];
        const dir = '../';
        const fileList = fs.readdirSync(dir);
        // Create the full path of the file/directory by concatenating the passed directory and file/directory name
        for (const file of fileList) {
            const name = `${dir}/${file}`;
            // Check if the current file/directory is a directory using fs.statSync
            if (fs.statSync(name).isDirectory()) {
                // If it is a directory, recursively call the getFiles function with the directory path and the files array
                // getFiles(name, files)
            }
            else {
                // If it is a file, push the full path to the files array
                files.push(name);
            }
        }
        console.log("---LOADED----");
        for (const file of files) {
            console.log(file);
        }
    }
};
