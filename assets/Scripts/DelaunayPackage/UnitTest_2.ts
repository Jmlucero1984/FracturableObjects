import { _decorator, assert, assertID, Component, Node, RichText, TextAsset, UITransform, Vec2 } from 'cc';
import { earcut } from './earcut';
import { resizer } from '../ScrollContentSizer';

const { ccclass, property, executeInEditMode } = _decorator;

function isString(value: unknown): asserts value is string {
    if (typeof value !== "string") { throw new Error("Not a string") }
    else {
        console.info("ES STRING")
    }
}

const tests: Function[] = [];
const vectores: Vec2[] = [];
const angulos: Number[] = [];

function Testeable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  
    // a reference to our original method
    const originalMethod = descriptor.value;
 
  //  console.log(originalMethod)
     console.log("PROPERTY KEY: "+propertyKey)
 
     tests.push(originalMethod)
     console.log(originalMethod())
  }
  
@ccclass('UnitTest2')
@executeInEditMode
export class UnitTest_2 extends Component {

    @property(RichText)
    richtText: RichText

    static outputRichtText: RichText;

    onLoad() {
        UnitTest_2.outputRichtText = this.richtText;
        console.log("ON LOAD UNIT TEST 2")
        vectores.push(new Vec2(0, 0))
        vectores.push(new Vec2(2, 0))
        vectores.push(new Vec2(1, 2))
        vectores.push(new Vec2(1, 1))
        angulos.push(0);
        angulos.push(20)
        angulos.push(56.7)
    }

    onEnable() {
        console.log("on Start")
        UnitTest_2.outputRichtText.string = "<color=#ffffff> - - - - - - - -  RUNNING TESTS  - - - - - - - -\n\n</color>"
        console.log("CANTIDAD DE TESTS: "+tests.length)
        tests.forEach(t => {
            UnitTest_2.outputRichtText.string += "<color=#1e81b0>● " + t.name + "\n</color>"
            let result=t();
            if (result[0]) {
                UnitTest_2.outputRichtText.string += "<color=#00ff00>>PASSED\n"+result[1]+"\n\n</color>"
             
 
            } else {
                UnitTest_2.outputRichtText.string += "<color=#ff0000>>FAILED\n"+result[1]+"\n\n</color>"
            }
        }) 
 
       
        let newHeight=UnitTest_2.outputRichtText.getComponent(UITransform).height;
  
        UnitTest_2.outputRichtText.node.parent.getComponent(UITransform).height=newHeight 
        
    }

   

    @Testeable
    SimpleTest2():[boolean,string]  {
        let successful = "Coinciden las dimensiones de angulos y vectores"
        let failed= "No coinciden"
        let nums: number[] = [];
        vectores.forEach(t => {
            console.log(t)
        })
        let testResult = vectores.length==angulos.length+1;
        return [testResult,testResult?successful:failed]
    }

    @Testeable
    EarcutPolygonTest():[boolean,string] {
        let successful = "Triangula con puntos internos"
        let failed= "No triangula con puntos internos"
        let nums: number[] = [];
        vectores.forEach(v => {
           nums.push(v.x)
           nums.push(v.y)
        })
        let indexes = earcut(nums,null,2)
        console.log("INDEXES: " +indexes)
        let testResult=  indexes.length==9
        return [testResult,testResult?successful:failed]
   
    }
}

