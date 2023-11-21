"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const package_json_1 = __importDefault(require("../../../package.json"));
const vm_1 = require("vm");
const fs = require('fs');
const path = require('path');
/**
 * @es Puede añadir debajo el codigo que se compatible con versiones anteriores a 3.3
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
var stringToCode;
var testAvailable = new Map();
class CustomMeshData {
    constructor(vc, ic, stride, vData, iData, indexStart) {
        this.vc = 0;
        this.ic = 0;
        this.stride = 0;
        this.vData = new Float32Array;
        this.iData = new Uint16Array;
        this.indexStart = 0;
        this.iData = iData;
        this.ic = ic;
        this.vc = vc;
        this.stride = stride;
        this.vData = vData;
        this.indexStart = indexStart;
    }
}
var selectedTest;
const testNodeName = "~~ CucutaTest Node ~~";
var testNodeUuid = "";
var canvasElement;
var context2d;
var cvsW;
var cvsH;
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('showing'); },
        hide() { console.log('hide'); },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/main/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/main/index.css'), 'utf-8'),
    $: {
        app: '#app',
        dropUTest: '#dropCucutaTest',
        firstButton: '#firstButton',
        dropScript: "#dropScript",
        textArea: '#textArea',
        testCodeButton: '#testCodeButton',
        codeArea: '#codeArea',
        dropFile: '#dropFile',
        availableTestsList: '#availableTestsList',
        scrollableResults: '#scrollableResults',
        progressBar: '#progressBar',
        testResultsSection: '#testResults',
        canvas: '#myCanvas'
    },
    methods: {
        hello() {
            if (this.$.app) {
                this.$.app.innerHTML = 'CucutaTest';
            }
        },
    },
    ready() {
        function drawReturnedMeshData(meshData) {
            if (context2d) {
                context2d.lineWidth = 0;
                context2d.clearRect(0, 0, cvsW, cvsH);
                console.log(meshData.iData);
                let st = meshData.stride - 1;
                let offsetx = cvsW / 2;
                let offsety = cvsH / 2;
                for (let i = 0; i <= meshData.indexStart - 3; i += 3) {
                    context2d.beginPath();
                    let r = Math.round((meshData.vData[meshData.iData[i] * st + 3] + meshData.vData[meshData.iData[i + 1] * st + 3] + meshData.vData[meshData.iData[i + 2] * st + 3]) * (255 / 3));
                    let g = Math.round((meshData.vData[meshData.iData[i] * st + 4] + meshData.vData[meshData.iData[i + 1] * st + 4] + meshData.vData[meshData.iData[i + 2] * st + 4]) * (255 / 3));
                    let b = Math.round((meshData.vData[meshData.iData[i] * st + 5] + meshData.vData[meshData.iData[i + 1] * st + 5] + meshData.vData[meshData.iData[i + 2] * st + 5]) * (255 / 3));
                    context2d.fillStyle = `rgb(${r},${g},${b})`;
                    context2d.moveTo(meshData.vData[meshData.iData[i] * st] + offsetx, meshData.vData[meshData.iData[i] * st + 1] * -1 + offsety);
                    context2d.lineTo(meshData.vData[meshData.iData[i + 1] * st] + offsetx, meshData.vData[meshData.iData[i + 1] * st + 1] * -1 + offsety);
                    context2d.lineTo(meshData.vData[meshData.iData[i + 2] * st] + offsetx, meshData.vData[meshData.iData[i + 2] * st + 1] * -1 + offsety);
                    context2d.closePath();
                    context2d.fill();
                }
            }
        }
        const setContext = () => {
            if (this.$.canvas) {
                canvasElement = (this.$.canvas);
                cvsW = canvasElement.width;
                cvsH = canvasElement.height;
                context2d = (this.$.canvas).getContext("2d", undefined);
            }
        };
        setContext();
        async function initTestNode() {
            await Editor.Message.request('scene', 'query-node-tree').then(async (t) => {
                let isPresent = false;
                t.children.forEach((ee) => {
                    if (ee.name === testNodeName) {
                        testNodeUuid = ee.uuid;
                        isPresent = true;
                    }
                });
                if (!isPresent) {
                    console.log("EL ROOT: " + t.name);
                    console.log("EL UUID: " + t.uuid);
                    const creationOptions = {
                        parent: String(t.uuid),
                        components: [],
                        name: testNodeName,
                        dump: undefined,
                        keepWorldTransform: true,
                        type: "cc.Script",
                        canvasRequired: false,
                        unlinkPrefab: true,
                        assetUuid: undefined
                    };
                    testNodeUuid = await Editor.Message.request('scene', 'create-node', creationOptions);
                }
                else {
                    updateListAndDropDown();
                }
            });
        }
        const updateListAndDropDown = async () => {
            await Editor.Message.request('scene', 'query-node-tree', testNodeUuid).then(infoTree => {
                let innerList = "";
                infoTree.components.forEach((element) => {
                    testAvailable.set(element.type, element.value);
                    innerList += '<option value="' + element.type + '">' + element.type + '</option>\n';
                });
                if (this.$.availableTestsList) {
                    this.$.availableTestsList.innerHTML = innerList;
                }
            });
        };
        initTestNode();
        if (this.$.app) {
            this.$.app.innerHTML = 'CucutaTest';
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
        if (this.$.availableTestsList) {
            this.$.availableTestsList.addEventListener('change', (event) => {
                var _a, _b;
                selectedTest = String((_a = this.$.availableTestsList) === null || _a === void 0 ? void 0 : _a.getAttribute("value"));
                console.log("Selected Test: " + selectedTest);
                if (this.$.progressBar) {
                    this.$.progressBar.setAttribute("value", "0");
                }
                if (this.$.scrollableResults)
                    this.$.scrollableResults.innerHTML = "";
                (_b = this.$.testResultsSection) === null || _b === void 0 ? void 0 : _b.removeAttribute("expand");
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
                var _a;
                console.log("BUTTON PRESSED");
                console.log((_a = this.$.textArea) === null || _a === void 0 ? void 0 : _a.getAttribute("value"));
                let innerResults = "";
                var promises = [];
                Editor.Message.request('scene', 'query-node-tree').then(nodes => {
                    let testNodeUuid = "";
                    let elementNode;
                    nodes.children.forEach((element) => {
                        if (element.name === testNodeName) {
                            console.log("EXIST!");
                            elementNode = element;
                            testNodeUuid = element.uuid;
                        }
                    });
                    if (testNodeUuid === "") {
                        console.log("NO EXISTE EL NODO PRINCIPAL");
                    }
                    return elementNode;
                }).then(async (elementNode) => {
                    var _a, _b;
                    console.log("SELECTED :" + selectedTest);
                    let targetUuid = String(testAvailable.get(selectedTest));
                    console.log("THE SELECTED: " + targetUuid);
                    const options = {
                        uuid: targetUuid,
                        name: 'getInstance',
                        args: [""]
                    };
                    let chainedString = "";
                    //Editor.Message.send('scene','execute-scene-script', options)
                    async function chainedExecute(uTestUuid, elems, current, field, progress) {
                        let icon = "";
                        let msg = "";
                        let graphics;
                        let opt = {
                            uuid: uTestUuid,
                            name: elems[current],
                            args: [""]
                        };
                        await Editor.Message.request('scene', 'execute-component-method', opt).then(rr => {
                            icon = rr[0] ? "success" : "error";
                            msg = rr[1];
                            if (rr[2]) {
                                //  console.log("LLEGO DATA PARA DIBUJAR")
                                //  console.log(rr[2])
                                drawReturnedMeshData(rr[2]);
                            }
                            chainedString += '<div><ui-icon color value="' + icon + '" style="font-size: 12px;"></ui-icon>  ' + elems[current] + ' :: ' + msg + '</div>\n';
                            current++;
                            let newActualProgress = Math.ceil((((current) * 100) / elems.length));
                            if (newActualProgress > 100)
                                newActualProgress = 100;
                            progress.setAttribute("value", String(newActualProgress));
                            if (current < elems.length) {
                                chainedExecute(uTestUuid, elems, current, field, progress);
                            }
                            field.innerHTML = chainedString;
                        });
                    }
                    await Editor.Message.request('scene', 'execute-component-method', options).then(async (j) => {
                        if (this.$.scrollableResults && this.$.progressBar) {
                            await chainedExecute(targetUuid, j, 0, this.$.scrollableResults, this.$.progressBar);
                        }
                    });
                    (_a = this.$.testResultsSection) === null || _a === void 0 ? void 0 : _a.focus();
                    (_b = this.$.testResultsSection) === null || _b === void 0 ? void 0 : _b.setAttribute("expand", "true");
                });
            });
        }
        if (this.$.dropScript) {
            this.$.dropScript.addEventListener('change', async (event) => {
                var _a;
                // change value
                const theAssetUuid = (_a = this.$.dropScript) === null || _a === void 0 ? void 0 : _a.getAttribute("value");
                console.log("uuidTesNode: " + testNodeUuid); // EL NODO DONDE SE CARGAN LOS TESTS
                let createNew = true;
                let trueName = "";
                let classId = "";
                Editor.Message.request('asset-db', 'query-asset-info', theAssetUuid).then(t => {
                    console.log("TRUE NAME? " + t.name);
                    trueName = t.name.substring(0, t.name.lastIndexOf("."));
                    classId = t.uuid;
                    if (testAvailable.has(trueName)) {
                        createNew = false;
                    }
                }).then(async () => {
                    if (createNew) {
                        const CreateComponentOptions = {
                            uuid: testNodeUuid,
                            component: trueName //classId  //{string} classId (cid) (is recommended) or className
                        };
                        result = await Editor.Message.request('scene', 'create-component', CreateComponentOptions);
                    }
                }).then(() => {
                    updateListAndDropDown();
                });
            });
            const options = {
                uuid: "51ZeE3jk5Dq7XN6M2qfZ5v",
                name: 'tarkan',
                args: ["somekind of script being or been executed"]
            };
            //Editor.Message.send('scene','execute-scene-script', options)
            let result = Editor.Message.send('scene', 'execute-component-method', options);
        }
        if (this.$.firstButton) {
            this.$.firstButton.addEventListener('change', (event) => {
                Editor.Message.send('scene', (0, vm_1.runInThisContext)(stringToCode));
            });
            const options2 = {
                //  name: "utester",
                name: package_json_1.default.name,
                method: 'listFiles',
                args: []
            };
            // let result3 = Editor.Message.request('scene', 'execute-scene-script', options2)
        }
        ;
        /*
        if (this.$.firstButton) {
            this.$.firstButton.addEventListener('change', (event: any) => {
                methods.methodOP()
                const contextObject = {
                    animal: 'cat',
                    count: 2
                };

                Editor.Message.send('scene', runInNewContext('count += 1; name = "kitty"', contextObject));
                console.log(contextObject);
                const options2: ExecuteSceneScriptMethodOptions = {
                    //  name: "utester",
                    name: packageJSON.name,
                    method: 'getFiles',
                    args: []
                };

                let result3 = Editor.Message.request('scene', 'execute-scene-script', options2)
            });
        }
        */
    },
    beforeClose() { },
    close() { },
});
