 
import { join } from 'path';
import packageJSON from '../package.json';
import { suma } from './main';
 
const fs = require('fs');
const path = require('path');
 

module.paths.push(join(Editor.App.path, 'node_modules'));

export function load() {};

export function unload() {};

export const methods = {
    rotateCamera() {
        const { director } = require('cc');
        let mainCamera = director.getScene().getChildByName("Main Camera");
        if(mainCamera){
            let euler = mainCamera.eulerAngles;
            euler.y += 10;
            mainCamera.setRotationFromEuler(euler);
            return true;
        }
        console.log("LLMARON AL SCRIP")
        return false;
    },
    getFiles() {
         
        const directoryPath = path.resolve(__dirname, './userFiles')
       let firstFile;
        fs.readdir(directoryPath, (err: any, files: any[]) => {
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
          firstFile=fileList[0]
        });
        const logo = fs.readFileSync( path.resolve(__dirname, './userFiles/file1.txt'),  'utf-8')
   
        console.log("CONTENT")
        console.log(logo)




  

    }
};