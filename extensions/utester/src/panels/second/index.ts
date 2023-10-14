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
var historyString: string = ""
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('showing'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/second/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/second/index.css'), 'utf-8'),

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
        canvas: '#myCanvas',
 
        scrollableResults: '#scrollableResults'
    },
    methods: {
        hello() {
            if (this.$.app) {
                this.$.app.innerHTML = 'hedfllo';
                console.log('[cocos-panel-html.default]: hello');
            }
        },
        printString(msg:string) {
            let elem =this.$.codeArea
            if(elem) {
 
                historyString+="\n"+msg
                elem.innerHTML = historyString
             setTimeout(()=>{
                if(elem) {
                    let be:ScrollBehavior = "smooth"
                const ScrollToOptions  = {
                    behavior: be,
                    top: elem.scrollHeight-100,
                    left: 0 
                    
                }
                elem?.scroll(ScrollToOptions)
            }
             },100)
                 
  
            }
        }

    },

    ready() {
        if(this.$.codeArea) { 
            this.$.codeArea.addEventListener('scroll', (event)=>{
                console.log("---------------------------------------")
                console.log(this.$.codeArea?.scrollHeight)
                console.log(this.$.codeArea?.scrollTop)
                console.log(this.$.codeArea?.getAttribute("height"))
             
                console.log("---------------------------------------")
                
            })
        }
        if(this.$.button1) {
            this.$.button1.addEventListener('click', (event)=> {
                console.log("BUTTON 1 CLICKED")
                console.log(event)
                let numItems = 0
                Editor.Message.request('scene','query-node-tree').then(nodeTree => {
                    nodeTree.children.forEach((element:Object) => {
                        numItems++
                        console.log("CHILDREN")
                        console.log(element)
                    });
 
                })
                console.log("TOTAL ELEMENTOS: " + numItems)
                this.printString("Button 1 Clicked\nCantidad de Elementos: "+numItems)

            })
        }

        if(this.$.button2) {
            this.$.button2.addEventListener('click', async (event)=> {
                console.log("BUTTON 2 CLICKED")
                console.log(event)
                let numItems = 0
                await Editor.Message.request('scene','query-node-tree').then(nodeTree => {
                    nodeTree.children.forEach((element:Object) => {
                        numItems++
                        console.log("CHILDREN")
                        console.log(element)
                    });
 
                })
                console.log("TOTAL ELEMENTOS: " + numItems)
                this.printString("Button 2 Clicked\nCantidad de Elementos: "+numItems)


            })
        }
        if(this.$.button3) {
            this.$.button3.addEventListener('click', async (event)=> {
                console.log("BUTTON 3 CLICKED")
                console.log(event)

                if(this.$.canvas) {
             
           
                let ctx= (<HTMLCanvasElement> (this.$.canvas)).getContext("2d",undefined)
                ctx?.beginPath();
                ctx?.arc(95, 50, 40, 0, 2 * Math.PI);
                ctx?.stroke();
                }

            })
        }







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
        
        if (this.$.testCodeButton) {
         this.$.testCodeButton.addEventListener('change', (event) => {
                 Editor.Message.send('scene', runInThisContext(stringToCode));
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
function printString() {
    throw new Error('Function not implemented.');
}

