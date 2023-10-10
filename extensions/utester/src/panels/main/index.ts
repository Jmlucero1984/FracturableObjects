import { readFileSync } from 'fs-extra';
import { join } from 'path';
import packageJSON from '../../../package.json';
import { CreateNodeOptions, ExecuteComponentMethodOptions, ExecuteSceneScriptMethodOptions } from '../../../@types/packages/scene/@types/public';
import { runInNewContext, runInThisContext } from 'vm';
import { methods } from '../../main';
const fs = require('fs');
const path = require('path');
/**
 * @es Puede añadir debajo el codigo que se compatible con versiones anteriores a 3.3
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
var stringToCode: string
var testAvailable: string[] = []
var uuidTestNode: string;
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


  
            let innerResults=""
            var promises:any[]=[]
            Editor.Message.request('scene', 'query-node-tree',this.$.textArea?.getAttribute("value")).then(t => {
               console.log("TREE NODE DATA")
               console.log(t)
               Editor.Message.request('scene', 'query-classes',{extends:'UTest'}).then(cc=> {
                console.log("CLASSES3")
                console.log(cc)})
            
              let  tstFuncs:Function[]=[]
              const options: ExecuteComponentMethodOptions = {
                uuid: t.components[1].value,//String(this.$.textArea?.getAttribute("value")),//String(assetUuid),
                name: 'getInstance',
                args: [""]
              }
              let chainedString="";
            //Editor.Message.send('scene','execute-scene-script', options)
              function chainedExecute(uTestUuid:string, elems:string[], current:number,field:HTMLElement ) {
                
                let icon="";
                let msg="";
                let opt: ExecuteComponentMethodOptions = {
                    uuid: uTestUuid,
                    name: elems[current],
                    args: [""]
                };
                Editor.Message.request('scene', 'execute-component-method', opt).then(rr => {

                    icon = rr[0] ? "success" : "error";
                    msg = rr[1];
                    console.log("ITER: "+current)
                    console.log("RESULT: " + rr)
                    /*
                    <div><ui-icon color value="success" style="font-size: 12px;"></ui-icon> Equality Test</div>
                    <div><ui-icon color value="error" style="font-size: 12px;"></ui-icon> Inequality Test</div>
                    <div><ui-icon color value="warn" style="font-size: 12px;"></ui-icon> Same Version Test</div>
                    */

                    chainedString += '<div><ui-icon color value="' + icon + '" style="font-size: 12px;"></ui-icon>  '+ elems[current] + ' :: ' + msg + '</div>\n';
                    current++
                    if(current<elems.length-1){
                          chainedExecute(uTestUuid,  elems , current,field) 
                    }
                    field.innerHTML=chainedString
                    console.log("EN TEORI AESTO ES LO QUE SE IRIA ACUMULANDO" )
                    console.log(chainedString)
               })
            
            }
           
              Editor.Message.request('scene', 'execute-component-method', options).then( j=>{
                console.log("CANTIDAD DE FUNCIONES REGRESADAS: "+j.length)
 
                    console.log("AVAILABLE!")
                    if(this.$.scrollableResults){ 
                        chainedExecute( t.components[1].value,j,0,this.$.scrollableResults ) 
               
                     }
    
 
            }) 
       
 

            })
                        
         
        })
               
            
        }
        if (this.$.dropScript) {
            this.$.dropScript.addEventListener('change', async (event) => {
                // change value
                const theAssetUuid = this.$.dropScript?.getAttribute("value")

                let rootNode: string
                Editor.Message.request('scene', 'query-node-tree').then(t => {
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
                            assetUuid: String(theAssetUuid)
                        }
                        Editor.Message.request('scene', 'create-node', creationOptions).then(t => {
                            uuidTestNode = t
                            console.log(uuidTestNode)
                        } )
                    }

                }).then(() => {
                    console.log("uuidTesNode: " + uuidTestNode)
                    let trueName = ""
                    let classId = ""
                    Editor.Message.request('asset-db', 'query-asset-info', theAssetUuid).then(t => {
                        trueName = t.name
                        classId = t.uuid
                        if (testAvailable.indexOf(trueName) < 0) {
                            testAvailable.push(trueName)
                        }
                        let innerList = ""
                        for (let i = 0; i < testAvailable.length; i++) {
                            innerList += '<option value="' + (i + 1) + '">' + testAvailable[i] + '</option>\n'
                        }
                        if (this.$.availableTestsList) {
                            this.$.availableTestsList.innerHTML = innerList
                        }
                    }).then(() => {
                        console.log("CLASSID: " + classId)
                        console.log("uuidTesNode: " + uuidTestNode)
                   
 
                        let className =trueName.substring(0,trueName.lastIndexOf("."))  
                            const CreateComponentOptions = {
                                uuid: uuidTestNode,
                                component: className//classId  //{string} classId (cid) (is recommended) or className
                            }
                           
                            Editor.Message.request('scene', 'create-component', CreateComponentOptions).then(t=> {
                                console.log("THE NEW UUID: "+ t)
                            })
                        
                    })
                })

                Editor.Message.send('scene', 'set-grid-visible', false)
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
            this.$.firstButton.addEventListener('change', (event) => {
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
