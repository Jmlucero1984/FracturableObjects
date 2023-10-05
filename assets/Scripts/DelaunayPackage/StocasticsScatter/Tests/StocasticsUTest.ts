import { _decorator, Color, Component,  Graphics,   RichText, UITransform, Vec2 } from 'cc';
import { UTest } from '../../../UTest';
 

const { ccclass, property, executeInEditMode } = _decorator;

function Testeable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // a reference to our original method
    const originalMethod = descriptor.value;
    //  console.log(originalMethod)
    console.log("PROPERTY KEY: " + propertyKey)
    tests.push(originalMethod)

}

const tests: Function[] = [];
 
function getEnvolvCoords() {
    let  envolCoords: Vec2[] = []
    envolCoords.push(new Vec2(0, 0))
     envolCoords.push(new Vec2(20, 0))
     envolCoords.push(new Vec2(20, 20))
     envolCoords.push(new Vec2(40, 20))
     envolCoords.push(new Vec2(40, 40))
     envolCoords.push(new Vec2(0, 40))
     return envolCoords;
 }

 function generateVectors() {
    let vectores: Vec2[] = [];
    vectores.push(new Vec2(0, 0))
    vectores.push(new Vec2(2, 0))
    vectores.push(new Vec2(1, 2))
    vectores.push(new Vec2(1, 1))
    return vectores
 }

 function generateAngles() {
     let angulos: Number[] = [];
     angulos.push(0);
     angulos.push(20)
     angulos.push(56.7)
     return angulos
 }




@ccclass('StocasticsUTest')
@executeInEditMode
export class StocasticsUTest extends UTest {
  
 

    static optRTx: RichText;
    static outputRichtText_unmasked: RichText;
    static testGraphics: Graphics

    
    onLoad() {
      
 
    }

    launch(){
        StocasticsUTest.optRTx = this.richtText;
        StocasticsUTest.outputRichtText_unmasked = this.richtText_unmasked;
        StocasticsUTest.testGraphics = this.testGrp;
        console.log("on Start")
        StocasticsUTest.optRTx.string = "<color=#ffffff> - - - - - - -  RUNNING TESTS  - - - - - - -\n\n</color>"
        console.log("CANTIDAD DE TESTS: " + tests.length)
      this.launchTest(0,tests.length-1)

    }

    launchTest(i: number, total: number) {
        let tlcl= Color.CYAN.toHEX() // Title color
        let fdcl= Color.RED.toHEX() // Failed color
        let sfcl= Color.GREEN.toHEX() // Success color
 
        StocasticsUTest.optRTx.string += "<color=#"+tlcl+">● " + tests[i].name + "\n</color>"
        let rslt = tests[i]();
      
        StocasticsUTest.optRTx.string += rslt[0]?"<color=#"+sfcl+">>PASSED\n" + rslt[1] + "\n\n</color>":"<color=#"+fdcl+">>FAILED\n" + rslt[1] + "\n\n</color>"

        let newHeight = StocasticsUTest.optRTx.getComponent(UITransform).height;

        StocasticsUTest.optRTx.node.parent.getComponent(UITransform).height = newHeight
        StocasticsUTest.outputRichtText_unmasked.string = StocasticsUTest.optRTx.string;
        if (i < total) {
            setTimeout(() => {
                this.launchTest(++i, total)
            }, 100)
        }
    }
    @Testeable
    Tess_ExpectedTrianglesTest_Test(): [boolean, string] {
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        let testResult=true;
        return [testResult, testResult ? successful : failed]
    }


}


