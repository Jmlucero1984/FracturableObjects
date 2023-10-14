import { _decorator, Color, Component,  Graphics,   RichText, UITransform, Vec2 } from 'cc';
import { UTest } from '../../../UTest';
import { System } from 'cc';
 

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

 const sleep = (ms) => new Promise(r => setTimeout(r, ms));
 
@ccclass('StocasticsUTest')
@executeInEditMode
export class StocasticsUTest extends UTest {
  
 

    static optRTx: RichText;
    static outputRichtText_unmasked: RichText;
    static testGraphics: Graphics

    
    onLoad() {
      
 
    }

 

 
    @Testeable
    Tess_ExpectedTrianglesTest_Test(): [boolean, string] {
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        let testResult=true;
        return [testResult, testResult ? successful : failed]
    }

    @Testeable
    Tess_2_ExpectedTrianglesTest_Test():  [boolean, string] {
        console.log("BEFORE")
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        let testResult=true;
        for(let i=0;i< 36450000; i++) {
            let c = Math.sqrt(i)
            if(i>36449998) {
                console.log(c)
            }
        }
        console.log("AFTER")
        return [testResult, testResult ? successful : failed]
    }

    @Testeable
    Tess_2_ExpectedTrissdfsdfTest_Test():  [boolean, string] {
        console.log("BEFORE")
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        let testResult=true;
        for(let i=0;i< 36450000; i++) {
            let c = Math.sqrt(i)
            if(i> 36449998) {
                console.log(c)
            }
        }
        console.log("AFTER")
        return [testResult, testResult ? successful : failed]
    }


    @Testeable
    async Tess_2_ExpectedTrissdasdasdfsdfTest_Test():  Promise<[boolean, string]> {
        console.log("BEFORE")
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        let testResult=true;
        await sleep(2000);
        console.log("AFTER")
        return [testResult, testResult ? successful : failed]
    }



  
}

 

