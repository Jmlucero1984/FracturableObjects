"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const package_json_1 = __importDefault(require("../../../package.json"));
const vm_1 = require("vm");
const main_1 = require("../../main");
const fs = require('fs');
const path = require('path');
/**
 * @es Puede añadir debajo el codigo que se compatible con versiones anteriores a 3.3
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
var stringToCode;
var testAvailable = new Map();
var uuidTestNode;
var selectedTest;
var historyString = "";
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('showing'); },
        hide() { console.log('hide'); },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/second/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/second/index.css'), 'utf-8'),
    $: {
        app: '#app',
        dropUTest: '#dropUTest',
        firstButton: '#firstButton',
        dropScript: "#dropScript",
        textArea: '#textArea',
        testCodeButton: '#testCodeButton',
        codeArea: '#codeArea',
        button1: "#button1",
        button2: "#button2",
        button3: "#button3",
        scrollableResults: '#scrollableResults'
    },
    methods: {
        hello() {
            if (this.$.app) {
                this.$.app.innerHTML = 'hedfllo';
                console.log('[cocos-panel-html.default]: hello');
            }
        },
        printString(msg) {
            let elem = this.$.codeArea;
            if (elem) {
                historyString += "\n" + msg;
                elem.innerHTML = historyString;
                setTimeout(() => {
                    if (elem) {
                        let be = "smooth";
                        const ScrollToOptions = {
                            behavior: be,
                            top: elem.scrollHeight - 100,
                            left: 0
                        };
                        elem === null || elem === void 0 ? void 0 : elem.scroll(ScrollToOptions);
                    }
                }, 100);
            }
        }
    },
    ready() {
        if (this.$.codeArea) {
            this.$.codeArea.addEventListener('scroll', (event) => {
                var _a, _b, _c;
                console.log("---------------------------------------");
                console.log((_a = this.$.codeArea) === null || _a === void 0 ? void 0 : _a.scrollHeight);
                console.log((_b = this.$.codeArea) === null || _b === void 0 ? void 0 : _b.scrollTop);
                console.log((_c = this.$.codeArea) === null || _c === void 0 ? void 0 : _c.getAttribute("height"));
                console.log("---------------------------------------");
            });
        }
        if (this.$.button1) {
            this.$.button1.addEventListener('click', (event) => {
                console.log("BUTTON 1 CLICKED");
                console.log(event);
                let numItems = 0;
                Editor.Message.request('scene', 'query-node-tree').then(nodeTree => {
                    nodeTree.children.forEach((element) => {
                        numItems++;
                        console.log("CHILDREN");
                        console.log(element);
                    });
                });
                console.log("TOTAL ELEMENTOS: " + numItems);
                this.printString("Button 1 Clicked\nCantidad de Elementos: " + numItems);
            });
        }
        if (this.$.button2) {
            this.$.button2.addEventListener('click', async (event) => {
                console.log("BUTTON 2 CLICKED");
                console.log(event);
                let numItems = 0;
                await Editor.Message.request('scene', 'query-node-tree').then(nodeTree => {
                    nodeTree.children.forEach((element) => {
                        numItems++;
                        console.log("CHILDREN");
                        console.log(element);
                    });
                });
                console.log("TOTAL ELEMENTOS: " + numItems);
                this.printString("Button 2 Clicked\nCantidad de Elementos: " + numItems);
            });
        }
        if (this.$.app) {
            this.$.app.innerHTML = 'Listo para cargar los tests.';
        }
        if (this.$.textArea) {
            this.$.textArea.addEventListener('change', (event) => {
                var _a;
                stringToCode = String((_a = this.$.textArea) === null || _a === void 0 ? void 0 : _a.getAttribute("value"));
                if (this.$.codeArea) {
                    this.$.codeArea.innerHTML = stringToCode;
                }
            });
        }
        if (this.$.testCodeButton) {
            this.$.testCodeButton.addEventListener('change', (event) => {
                Editor.Message.send('scene', (0, vm_1.runInThisContext)(stringToCode));
            });
        }
        if (this.$.firstButton) {
            this.$.firstButton.addEventListener('change', (event) => {
                main_1.methods.methodOP();
                const contextObject = {
                    animal: 'cat',
                    count: 2
                };
                Editor.Message.send('scene', (0, vm_1.runInNewContext)('count += 1; name = "kitty"', contextObject));
                console.log(contextObject);
                const options2 = {
                    //  name: "utester",
                    name: package_json_1.default.name,
                    method: 'getFiles',
                    args: []
                };
                let result3 = Editor.Message.request('scene', 'execute-scene-script', options2);
            });
        }
    },
    beforeClose() { },
    close() { },
});
function printString() {
    throw new Error('Function not implemented.');
}
