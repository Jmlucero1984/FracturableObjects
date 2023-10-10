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
    rotateCamera() {
        const { director } = require('cc');
        let mainCamera = director.getScene().getChildByName("Main Camera");
        if (mainCamera) {
            let euler = mainCamera.eulerAngles;
            euler.y += 10;
            mainCamera.setRotationFromEuler(euler);
            return true;
        }
        console.log("LLMARON AL SCRIP");
        return false;
    },
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
    }
};
