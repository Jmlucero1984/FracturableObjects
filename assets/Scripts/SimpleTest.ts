import { _decorator, Component, Node } from 'cc';
import { Testeable, UTest } from './UTest';
const { ccclass, property,executeInEditMode } = _decorator;



@ccclass('SimpleTest')
@executeInEditMode
export class SimpleTest extends UTest {


    valor_x:number =15

 
    BasicComprobation2_Test():[boolean, string] {
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        let testResult = this.valor_x == 15;
        
        return [testResult, testResult ? successful : failed]
    }
 

}



