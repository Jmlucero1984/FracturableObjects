import { readFileSync } from 'fs-extra';
import { join } from 'path';
import packageJSON from '../../../package.json';
import { CreateNodeOptions, ExecuteComponentMethodOptions, ExecuteSceneScriptMethodOptions } from '../../../@types/packages/scene/@types/public';
import { Context, runInNewContext, runInThisContext } from 'vm';
import { methods } from '../../main';
 
import { Node } from '../../../@types/packages/engine-extends/@types/glTF';
import { uuid } from '../../../@types/packages/engine/@types/editor-extends/utils/uuid';
import bind from '../../../@types/packages/scene/@types/cce/3d/manager/camera/listener';
const fs = require('fs');
const path = require('path');
/**
 * @es Puede añadir debajo el codigo que se compatible con versiones anteriores a 3.3
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
var stringToCode: string

var testAvailable: Map<String, String> = new Map()

class CustomMeshData {
    public vc:number=0;
    public ic:number=0;
    public stride:number=0;
    public vData:Float32Array=new Float32Array
    public iData:Uint16Array = new Uint16Array
    public indexStart:number=0;
 
    public constructor(vc:number,ic:number,stride:number,vData:Float32Array,iData:Uint16Array,indexStart:number) {
     this.iData=iData;
     this.ic=ic;
     this.vc=vc;
     this.stride=stride;
     this.vData=vData;
     this.indexStart=indexStart
 
    }
 
 }
 
var selectedTest: string;
const testNodeName = "~~ CucutaTest Node ~~"
var testNodeUuid="";
var canvasElement:HTMLCanvasElement;
var context2d:CanvasRenderingContext2D|null
var cvsW:number;
var cvsH:number;
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('showing'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/main/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/main/index.css'), 'utf-8'),

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


        function drawReturnedMeshData(meshData: CustomMeshData) {
       
            if(context2d){
            
                context2d.lineWidth=0;
              
                context2d.clearRect(0,0,cvsW,cvsH)
                console.log(meshData.iData)

                let st=meshData.stride-1

                let offsetx=cvsW/2
                let offsety=cvsH/2
   
          
                for(let i=0;i<=meshData.indexStart-3;i+=3) {
               
                    context2d.beginPath();
                    let r= Math.round((meshData.vData[meshData.iData[i]*st+3]+meshData.vData[meshData.iData[i+1]*st+3]+meshData.vData[meshData.iData[i+2]*st+3])*(255/3))
                    let g= Math.round((meshData.vData[meshData.iData[i]*st+4]+meshData.vData[meshData.iData[i+1]*st+4]+meshData.vData[meshData.iData[i+2]*st+4])*(255/3))
                    let b= Math.round((meshData.vData[meshData.iData[i]*st+5]+meshData.vData[meshData.iData[i+1]*st+5]+meshData.vData[meshData.iData[i+2]*st+5])*(255/3))
            
                    context2d.fillStyle  =`rgb(${r},${g},${b})` 
                    context2d.moveTo(meshData.vData[meshData.iData[i]*st]+offsetx,meshData.vData[meshData.iData[i]*st+1]*-1+offsety);
                    context2d.lineTo(meshData.vData[meshData.iData[i+1]*st]+offsetx,meshData.vData[meshData.iData[i+1]*st+1]*-1+offsety);
                    context2d.lineTo(meshData.vData[meshData.iData[i+2]*st]+offsetx,meshData.vData[meshData.iData[i+2]*st+1]*-1+offsety);
                    context2d.closePath()
                    context2d.fill()
                   

                }
            }
        }

        const setContext = () => {
            if(this.$.canvas) {
                canvasElement = (<HTMLCanvasElement> (this.$.canvas))
                cvsW= canvasElement.width;
                cvsH=canvasElement.height;
                context2d = (<HTMLCanvasElement> (this.$.canvas)).getContext("2d",undefined)
  
            }
        }
        setContext()
        async function initTestNode() {
            await Editor.Message.request('scene', 'query-node-tree').then(async t => {
                let isPresent = false;
                t.children.forEach((ee: any) => {
                    if (ee.name === testNodeName) {
                        testNodeUuid = ee.uuid
                        isPresent = true;
                    }
                })

                if (!isPresent) {
                    console.log("EL ROOT: " + t.name)
                    console.log("EL UUID: " + t.uuid)
                    const creationOptions: CreateNodeOptions = {
                        parent: String(t.uuid),
                        components: [],
                        name: testNodeName,
                        dump: undefined,
                        keepWorldTransform: true,
                        type: "cc.Script",
                        canvasRequired: false,
                        unlinkPrefab: true,
                        assetUuid: undefined
                    }
                    testNodeUuid = await Editor.Message.request('scene', 'create-node', creationOptions)
                } else {
                    updateListAndDropDown()

                }
            })
        }

  

        const updateListAndDropDown = async () => {
           await Editor.Message.request('scene', 'query-node-tree', testNodeUuid).then(infoTree => {
                let innerList = ""
 
                infoTree.components.forEach((element: any) => {
                    
                    testAvailable.set(element.type, element.value)
                    innerList += '<option value="' + element.type + '">' + element.type + '</option>\n'
 
                });
                if (this.$.availableTestsList) {
                    this.$.availableTestsList.innerHTML = innerList
                }
            })
        }
        initTestNode();

        if (this.$.app) {
            this.$.app.innerHTML = 'CucutaTest';
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
                console.log("Selected Test: " + selectedTest)
                if(this.$.progressBar) {
                    this.$.progressBar.setAttribute("value", "0" )
                }
               if(this.$.scrollableResults) this.$.scrollableResults.innerHTML=""

                this.$.testResultsSection?.removeAttribute("expand")
               

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
                        if (element.name === testNodeName) {
                            console.log("EXIST!")
                            elementNode = element
                            testNodeUuid = element.uuid
                        }
                    });
                    if (testNodeUuid === "") {
                        console.log("NO EXISTE EL NODO PRINCIPAL")
                    }
                    return elementNode
                }).then(async (elementNode: any) => {
       
                    console.log("SELECTED :" + selectedTest)
 
                    let targetUuid= String(testAvailable.get(selectedTest))
                    console.log("THE SELECTED: "+targetUuid)
                    const options: ExecuteComponentMethodOptions = {
                        uuid: targetUuid,//String(this.$.textArea?.getAttribute("value")),//String(assetUuid),
                        name: 'getInstance',
                        args: [""]
                    }


                  
                        
                    let chainedString = "";
                    //Editor.Message.send('scene','execute-scene-script', options)
                    async function chainedExecute(uTestUuid: string, elems: string[], current: number, field: HTMLElement, progress:HTMLElement) {
                        let icon = "";
                        let msg = "";
                        let graphics;
                        let opt: ExecuteComponentMethodOptions = {
                            uuid: uTestUuid,
                            name: elems[current],
                            args: [""]
                        };
                       await Editor.Message.request('scene', 'execute-component-method', opt).then(rr => {
                            icon = rr[0] ? "success" : "error";
                            msg = rr[1];
                            if(rr[2]) {
                              //  console.log("LLEGO DATA PARA DIBUJAR")
                              //  console.log(rr[2])
                                drawReturnedMeshData(rr[2])
                            }
                            chainedString += '<div><ui-icon color value="' + icon + '" style="font-size: 12px;"></ui-icon>  ' + elems[current] + ' :: ' + msg + '</div>\n';
 
                            current++
                            let newActualProgress = Math.ceil((((current)*100)/elems.length))
                            if(newActualProgress>100) newActualProgress=100;
                            progress.setAttribute("value",String(newActualProgress) )
                            if (current < elems.length) {
                                chainedExecute(uTestUuid, elems, current, field, progress)
                            }
                            field.innerHTML = chainedString
                        })
                    }
                   await Editor.Message.request('scene', 'execute-component-method', options).then(async j => {
                     
                        if (this.$.scrollableResults && this.$.progressBar) {
                           await chainedExecute(targetUuid, j, 0, this.$.scrollableResults, this.$.progressBar)
                        }
                    })

                    this.$.testResultsSection?.focus();
                    this.$.testResultsSection?.setAttribute("expand","true")
                })
            })
        }
        if (this.$.dropScript) {
            this.$.dropScript.addEventListener('change', async (event: any) => {
                // change value
                const theAssetUuid = this.$.dropScript?.getAttribute("value")
 
                    console.log("uuidTesNode: " + testNodeUuid) // EL NODO DONDE SE CARGAN LOS TESTS
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
                            const CreateComponentOptions = {
                                uuid: testNodeUuid,
                                component: trueName//classId  //{string} classId (cid) (is recommended) or className
                            }
                            result = await Editor.Message.request('scene', 'create-component', CreateComponentOptions)
                        }
                    }).then(() => {
                       updateListAndDropDown();
                    })
                })


                const options: ExecuteComponentMethodOptions = {
                    uuid: "51ZeE3jk5Dq7XN6M2qfZ5v",//String(assetUuid),
                    name: 'tarkan',
                    args: ["somekind of script being or been executed"]
                };
                //Editor.Message.send('scene','execute-scene-script', options)
                let result = Editor.Message.send('scene', 'execute-component-method', options)
            
        }
        if (this.$.firstButton) {
            this.$.firstButton.addEventListener('change', (event: any) => {
                Editor.Message.send('scene', runInThisContext(stringToCode));
            })
            const options2: ExecuteSceneScriptMethodOptions = {
                //  name: "utester",
                name: packageJSON.name,
                method: 'listFiles',
                args: []
            };

           // let result3 = Editor.Message.request('scene', 'execute-scene-script', options2)
        };
        
        
        
        
        
        
        
        
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


 
