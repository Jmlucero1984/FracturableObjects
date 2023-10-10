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
var testAvailable = [];
var uuidTestNode;
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('showing'); },
        hide() { console.log('hide'); },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/main/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/main/index.css'), 'utf-8'),
    $: {
        app: '#app',
        dropUTest: '#dropUTest',
        firstButton: '#firstButton',
        dropScript: "#dropScript",
        textArea: '#textArea',
        testCodeButton: '#testCodeButton',
        codeArea: '#codeArea',
        dropFile: '#dropFile',
        availableTestsList: '#availableTestsList',
        scrollableResults: '#scrollableResults'
    },
    methods: {
        hello() {
            if (this.$.app) {
                this.$.app.innerHTML = 'hedfllo';
                console.log('[cocos-panel-html.default]: hello');
            }
        },
    },
    ready() {
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
        if (this.$.dropFile) {
            this.$.dropFile.addEventListener('change', (event) => {
                var _a, _b;
                let theFile;
                theFile = (_b = (_a = this.$.dropFile) === null || _a === void 0 ? void 0 : _a.getAttribute("value")) === null || _b === void 0 ? void 0 : _b.toString();
                console.log("FILE: " + theFile);
                stringToCode = fs.readFileSync(theFile, 'utf-8');
            });
        }
        if (this.$.testCodeButton) {
            /* this.$.testCodeButton.addEventListener('change', (event) => {
                 Editor.Message.send('scene', runInThisContext(stringToCode));
             })*/
            this.$.testCodeButton.addEventListener('change', (event) => {
                var _a, _b;
                console.log("BUTTON PRESSED");
                console.log((_a = this.$.textArea) === null || _a === void 0 ? void 0 : _a.getAttribute("value"));
                let innerResults = "";
                var promises = [];
                Editor.Message.request('scene', 'query-node-tree', (_b = this.$.textArea) === null || _b === void 0 ? void 0 : _b.getAttribute("value")).then(t => {
                    console.log("TREE NODE DATA");
                    console.log(t);
                    Editor.Message.request('scene', 'query-classes', { extends: 'UTest' }).then(cc => {
                        console.log("CLASSES3");
                        console.log(cc);
                    });
                    let tstFuncs = [];
                    const options = {
                        uuid: t.components[1].value,
                        name: 'getInstance',
                        args: [""]
                    };
                    let chainedString = "";
                    //Editor.Message.send('scene','execute-scene-script', options)
                    function chainedExecute(uTestUuid, elems, current, field) {
                        let icon = "";
                        let msg = "";
                        let opt = {
                            uuid: uTestUuid,
                            name: elems[current],
                            args: [""]
                        };
                        Editor.Message.request('scene', 'execute-component-method', opt).then(rr => {
                            icon = rr[0] ? "success" : "error";
                            msg = rr[1];
                            console.log("ITER: " + current);
                            console.log("RESULT: " + rr);
                            /*
                            <div><ui-icon color value="success" style="font-size: 12px;"></ui-icon> Equality Test</div>
                            <div><ui-icon color value="error" style="font-size: 12px;"></ui-icon> Inequality Test</div>
                            <div><ui-icon color value="warn" style="font-size: 12px;"></ui-icon> Same Version Test</div>
                            */
                            chainedString += '<div><ui-icon color value="' + icon + '" style="font-size: 12px;"></ui-icon>  ' + elems[current] + ' :: ' + msg + '</div>\n';
                            current++;
                            if (current < elems.length - 1) {
                                chainedExecute(uTestUuid, elems, current, field);
                            }
                            field.innerHTML = chainedString;
                            console.log("EN TEORI AESTO ES LO QUE SE IRIA ACUMULANDO");
                            console.log(chainedString);
                        });
                    }
                    Editor.Message.request('scene', 'execute-component-method', options).then(j => {
                        console.log("CANTIDAD DE FUNCIONES REGRESADAS: " + j.length);
                        console.log("AVAILABLE!");
                        if (this.$.scrollableResults) {
                            chainedExecute(t.components[1].value, j, 0, this.$.scrollableResults);
                        }
                    });
                });
            });
        }
        if (this.$.dropScript) {
            this.$.dropScript.addEventListener('change', async (event) => {
                var _a;
                // change value
                const theAssetUuid = (_a = this.$.dropScript) === null || _a === void 0 ? void 0 : _a.getAttribute("value");
                let rootNode;
                Editor.Message.request('scene', 'query-node-tree').then(t => {
                    let isPresent = false;
                    t.children.forEach((ee) => {
                        if (ee.name === "~~ UTester Node ~~") {
                            uuidTestNode = ee.uuid;
                            isPresent = true;
                        }
                    });
                    if (!isPresent) {
                        console.log("EL ROOT: " + t.name);
                        console.log("EL UUID: " + t.uuid);
                        const creationOptions = {
                            parent: String(t.uuid),
                            components: [],
                            name: "~~ UTester Node ~~",
                            dump: undefined,
                            keepWorldTransform: true,
                            type: "cc.Script",
                            canvasRequired: false,
                            unlinkPrefab: true,
                            assetUuid: String(theAssetUuid)
                        };
                        Editor.Message.request('scene', 'create-node', creationOptions).then(t => {
                            uuidTestNode = t;
                            console.log(uuidTestNode);
                        });
                    }
                }).then(() => {
                    console.log("uuidTesNode: " + uuidTestNode);
                    let trueName = "";
                    let classId = "";
                    Editor.Message.request('asset-db', 'query-asset-info', theAssetUuid).then(t => {
                        trueName = t.name;
                        classId = t.uuid;
                        if (testAvailable.indexOf(trueName) < 0) {
                            testAvailable.push(trueName);
                        }
                        let innerList = "";
                        for (let i = 0; i < testAvailable.length; i++) {
                            innerList += '<option value="' + (i + 1) + '">' + testAvailable[i] + '</option>\n';
                        }
                        if (this.$.availableTestsList) {
                            this.$.availableTestsList.innerHTML = innerList;
                        }
                    }).then(() => {
                        console.log("CLASSID: " + classId);
                        console.log("uuidTesNode: " + uuidTestNode);
                        let className = trueName.substring(0, trueName.lastIndexOf("."));
                        const CreateComponentOptions = {
                            uuid: uuidTestNode,
                            component: className //classId  //{string} classId (cid) (is recommended) or className
                        };
                        Editor.Message.request('scene', 'create-component', CreateComponentOptions).then(t => {
                            console.log("THE NEW UUID: " + t);
                        });
                    });
                });
                Editor.Message.send('scene', 'set-grid-visible', false);
                const options = {
                    uuid: "51ZeE3jk5Dq7XN6M2qfZ5v",
                    name: 'tarkan',
                    args: ["chupador de pija en la cara de un puma"]
                };
                //Editor.Message.send('scene','execute-scene-script', options)
                let result = Editor.Message.send('scene', 'execute-component-method', options);
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
