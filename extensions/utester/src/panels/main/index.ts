import { readFileSync } from 'fs-extra';
import { join } from 'path';
import packageJSON from '../../../package.json';
import { CreateNodeOptions, ExecuteComponentMethodOptions, ExecuteSceneScriptMethodOptions } from '../../../@types/packages/scene/@types/public';
import { runInNewContext, runInThisContext } from 'vm';
import { methods } from '../../main';
import { Node } from '../../../@types/packages/engine-extends/@types/glTF';
import { uuid } from '../../../@types/packages/engine/@types/editor-extends/utils/uuid';
const fs = require('fs');
const path = require('path');
/**
 * @es Puede añadir debajo el codigo que se compatible con versiones anteriores a 3.3
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
var stringToCode: string

var testAvailable: Map<String, String> = new Map()
var uuidTestNode: string;
var selectedTest: string;
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('showing'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/main/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/main/index.css'), 'utf-8'),

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
                stringToCode = String(this.$.textArea?.getAttribute("value"))
                if (this.$.codeArea) {
                    this.$.codeArea.innerHTML = stringToCode
                }
            })
        }
        if (this.$.availableTestsList) {
            this.$.availableTestsList.addEventListener('change', (event) => {
                selectedTest = String(this.$.availableTestsList?.getAttribute("value"))
                console.log("TEST SELECCIONADO: " + selectedTest)

            })
        }
        if (this.$.dropFile) {
            this.$.dropFile.addEventListener('change', (event) => {
                let theFile;
                theFile = this.$.dropFile?.getAttribute("value")?.toString()
                console.log("FILE: " + theFile)
                stringToCode = fs.readFileSync(theFile, 'utf-8')
            })
        }

        if (this.$.testCodeButton) {
            /* this.$.testCodeButton.addEventListener('change', (event) => {
                 Editor.Message.send('scene', runInThisContext(stringToCode));
             })*/
            this.$.testCodeButton.addEventListener('change', (event) => {
                console.log("BUTTON PRESSED")
                console.log(this.$.textArea?.getAttribute("value"))
                let innerResults = ""
                var promises: any[] = []
                Editor.Message.request('scene', 'query-node-tree').then(nodes => {
                    let testNodeUuid = ""
                    let elementNode: any
                    nodes.children.forEach((element: any) => {
                        if (element.name === "~~ UTester Node ~~") {
                            console.log("EXIST!")
                            elementNode = element
                            testNodeUuid = element.uuid
                        }
                    });
                    if (testNodeUuid === "") {
                        console.log("NO EXISTE EL NODO PRINCIPAL")
                    }
                    return elementNode
                }).then((elementNode: any) => {
                    console.log("ELEMENT NODE uuid " + elementNode.uuid)
                    console.log("ELEMENT NODE name " + elementNode.name)
                    console.log("SELECTED :" + selectedTest)
                    testAvailable.forEach((value, key) => {
                        console.log("KEY " + key)
                        console.log("VALUE " + value)
                    })

                    
                    let targetUuid= String(testAvailable.get(selectedTest))
                    console.log("THE SELECTED: "+targetUuid)
                    const options: ExecuteComponentMethodOptions = {

                        uuid: targetUuid,//String(this.$.textArea?.getAttribute("value")),//String(assetUuid),
                        name: 'getInstance',
                        args: [""]
                    }
                    let chainedString = "";
                    //Editor.Message.send('scene','execute-scene-script', options)
                    function chainedExecute(uTestUuid: string, elems: string[], current: number, field: HTMLElement) {
                        let icon = "";
                        let msg = "";
                        let opt: ExecuteComponentMethodOptions = {
                            uuid: uTestUuid,
                            name: elems[current],
                            args: [""]
                        };
                        Editor.Message.request('scene', 'execute-component-method', opt).then(rr => {
                            icon = rr[0] ? "success" : "error";
                            msg = rr[1];
                            console.log("ITER: " + current)
                            console.log("RESULT: " + rr)
                            chainedString += '<div><ui-icon color value="' + icon + '" style="font-size: 12px;"></ui-icon>  ' + elems[current] + ' :: ' + msg + '</div>\n';
                            current++
                            if (current < elems.length - 1) {
                                chainedExecute(uTestUuid, elems, current, field)
                            }
                            field.innerHTML = chainedString
                            console.log("EN TEORI AESTO ES LO QUE SE IRIA ACUMULANDO")
                            console.log(chainedString)
                        })
                    }
                    Editor.Message.request('scene', 'execute-component-method', options).then(j => {
                        console.log("CANTIDAD DE FUNCIONES REGRESADAS: " + j.length)
                        if (this.$.scrollableResults) {
                            chainedExecute(targetUuid, j, 0, this.$.scrollableResults)
                        }
                    })
                })
            })
        }
        if (this.$.dropScript) {
            this.$.dropScript.addEventListener('change', async (event: any) => {
                // change value
                const theAssetUuid = this.$.dropScript?.getAttribute("value")

                let rootNode: string
                Editor.Message.request('scene', 'query-node-tree').then(async t => {
                    let isPresent = false;
                    t.children.forEach((ee: any) => {
                        if (ee.name === "~~ UTester Node ~~") {
                            uuidTestNode = ee.uuid
                            isPresent = true;
                        }
                    })

                    if (!isPresent) {
                        console.log("EL ROOT: " + t.name)
                        console.log("EL UUID: " + t.uuid)
                        const creationOptions: CreateNodeOptions = {
                            parent: String(t.uuid),
                            components: [],
                            name: "~~ UTester Node ~~",
                            dump: undefined,
                            keepWorldTransform: true,
                            type: "cc.Script",
                            canvasRequired: false,
                            unlinkPrefab: true,
                            assetUuid: undefined
                        }
                        uuidTestNode = await Editor.Message.request('scene', 'create-node', creationOptions)
                    }

                }).then(() => {
                    console.log("uuidTesNode: " + uuidTestNode) // EL NODO DONDE SE CARGAN LOS TESTS
                    let createNew = true;
                    let trueName = ""
                    let classId = ""
                    Editor.Message.request('asset-db', 'query-asset-info', theAssetUuid).then(t => {
                        console.log("TRUE NAME? "+t.name)
                        trueName = t.name.substring(0,t.name.lastIndexOf("."))
                        classId = t.uuid
                        if ( testAvailable.has(trueName)) {

                            createNew = false;
                        }
                    
                    }).then(async ( ) => {
                        if (createNew) {
                            console.log("CLASSID: " + classId)
                            console.log("uuidTesNode: " + uuidTestNode)
                       
                            const CreateComponentOptions = {
                                uuid: uuidTestNode,
                                component: trueName//classId  //{string} classId (cid) (is recommended) or className
                            }
                            result = await Editor.Message.request('scene', 'create-component', CreateComponentOptions)
                        }
                    }).then(() => {
                        console.log("IIIINNNFOOOOOO")
                        Editor.Message.request('scene', 'query-node-tree', uuidTestNode).then(infoTree => {
                            let innerList = ""
                            console.log("INFO TREE")
                            console.log(infoTree)
                            console.log("..............")
                            infoTree.components.forEach((element: any) => {
                                
                                testAvailable.set(element.type, element.value)
                                innerList += '<option value="' + element.type + '">' + element.type + '</option>\n'
                                // console.log(element)
                                /*type: 'TessellationTest',
                                    value: 'd3QqIVkf9NKZVWv08I5Z1j',
                                    extends: [ 'UTest', 'cc.Component', 'cc.Object' ]*/
                            });
                            if (this.$.availableTestsList) {
                                this.$.availableTestsList.innerHTML = innerList
                            }
                        })
                    })
                })


                const options: ExecuteComponentMethodOptions = {
                    uuid: "51ZeE3jk5Dq7XN6M2qfZ5v",//String(assetUuid),
                    name: 'tarkan',
                    args: ["chupador de pija en la cara de un puma"]
                };
                //Editor.Message.send('scene','execute-scene-script', options)
                let result = Editor.Message.send('scene', 'execute-component-method', options)
            })
        }
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
    },
    beforeClose() { },
    close() { },
});
