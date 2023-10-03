import { _decorator, assert, assertID, Color, Component, Gradient, Graphics, Node, RichText, TextAsset, UITransform, Vec2, VerticalTextAlignment } from 'cc';
import { earcut } from './earcut';
import { resizer } from '../ScrollContentSizer';

const { ccclass, property, executeInEditMode } = _decorator;

function isString(value: unknown): asserts value is string {
    if (typeof value !== "string") { throw new Error("Not a string") }
    else {
        console.info("ES STRING")
    }
}

function splitEdge(init:Vec2, end:Vec2, rndPrecision:number) {
    return new Vec2(round((end.x+init.x)/2,rndPrecision),round((end.y+init.y)/2,rndPrecision))
}



function Testeable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // a reference to our original method
    const originalMethod = descriptor.value;
    //  console.log(originalMethod)
    console.log("PROPERTY KEY: " + propertyKey)
    tests.push(originalMethod)

}


function drawTriangles(triangles:Triangle[]) {
    
    let gr=UnitTest_2.testGraphics;
    gr.strokeColor= new Color(25,25,25)
    for(let i =0 ; i<triangles.length; i++) {
        gr.moveTo(triangles[i].getVertexA().x,triangles[i].getVertexA().y)
        gr.lineTo(triangles[i].getVertexB().x,triangles[i].getVertexB().y)
        gr.lineTo(triangles[i].getVertexC().x,triangles[i].getVertexC().y)
        gr.lineTo(triangles[i].getVertexA().x,triangles[i].getVertexA().y)
    }
    gr.stroke()
}

function drawCircles(point:Vec2, percent:number) {
 
    console.log("PERCENT: " + percent)
    let gr=UnitTest_2.testGraphics;
    gr.strokeColor= new Color(255*(1-percent),255*percent*0.8,0)
     gr.circle(point.x,point.y,0.5+6*percent)
    gr.stroke()
}



 

function insertInto<T>(vectorV:T[],  index:number,value:T)  {
    if(index>=0&&index<=vectorV.length) {
    vectorV.push(value)
    for(let i = vectorV.length-1;i>index; i-- ){
        vectorV[i]=vectorV[i-1]
    }
    vectorV[index]=value;
    }
}

function compareVectors(vect1: any[], vect2: any[]): boolean {
    if (vect1.length != vect2.length) return false;
    for (let i = 0; i < vect1.length; i++) { if (vect1[i] != vect2[i]) return false; }
    return true;
}

function round(value:number, decimals:number){
    let magnitud=Math.pow(10,decimals);
    return Math.round(value*magnitud)/magnitud;
}


 function sameVector(v1:Vec2, v2:Vec2) {
    if(v1.x-v2.x==0 && v1.y-v2.y==0) return true;
    return false;
 }
function updateBorderPoints(borderPoints:BorderPoint[], points:Vec2[]) {
    for(let i=0; i<borderPoints.length; i++ ) {
  
        if(sameVector(borderPoints[i].getPoint(), points[0])&&sameVector(borderPoints[i].getSucesor(),points[1])) {
        let newBorderPoint =new BorderPoint(splitEdge(points[0],points[1],0), borderPoints[i].getSucesor())
        borderPoints[i].setSucesor(newBorderPoint.getPoint())
        insertInto(borderPoints,i+1,newBorderPoint)     
        }
    } 
}

const tests: Function[] = [];
const vectores: Vec2[] = [];
const angulos: Number[] = [];
const envolCoords: Vec2[] = []

class BorderPoint {
    point:Vec2;
    sucesor:Vec2;
 

    public constructor(point:Vec2, sucesor:Vec2 ){
       
        this.point=point;
        this.sucesor = sucesor;
    }

    public setSucesor(sucesor:Vec2) {
        this.sucesor=sucesor;
    }

    public getSucesor() {
        return this.sucesor;
    }

    public getPoint() {
         return this.point;
    }

    public toString = () : string => {
        return `POINT (${this.point})   SUCESOR (${this.sucesor})`;
    }
}
 
 class Triangle {
    vertexA:Vec2;
    vertexB:Vec2;
    vertexC:Vec2;

    constructor(vertexs:[Vec2,Vec2,Vec2]) {
        this.vertexA=vertexs[0]
        this.vertexB=vertexs[1]
        this.vertexC=vertexs[2]
console.log(this.vertexA.x + "  "+this.vertexA.y)
    }

    public getVertexs() {
        return [this.vertexA,this.vertexB,this.vertexC]
    }

    public getVertexA() {
        return this.vertexA;
    }
    public getVertexB() {
        return this.vertexB;
    }
    public getVertexC() {
        return this.vertexC;
    }
}


 

@ccclass('UnitTest2')
@executeInEditMode
export class UnitTest_2 extends Component {

    @property(RichText)
    richtText: RichText

    @property(RichText)
    richtText_unmasked: RichText

    @property(Graphics)
    testGrp: Graphics

    static outputRichtText: RichText;
    static outputRichtText_unmasked: RichText;
    static testGraphics: Graphics
    onLoad() {
        UnitTest_2.outputRichtText = this.richtText;
        UnitTest_2.outputRichtText_unmasked = this.richtText_unmasked;
        UnitTest_2.testGraphics = this.testGrp;

        console.log("ON LOAD UNIT TEST 2")
        vectores.push(new Vec2(0, 0))
        vectores.push(new Vec2(2, 0))
        vectores.push(new Vec2(1, 2))
        vectores.push(new Vec2(1, 1))
        angulos.push(0);
        angulos.push(20)
        angulos.push(56.7)
        envolCoords.push(new Vec2(0, 0))
        envolCoords.push(new Vec2(20, 0))
        envolCoords.push(new Vec2(20, 20))
        envolCoords.push(new Vec2(40, 20))
        envolCoords.push(new Vec2(40, 40))
        envolCoords.push(new Vec2(0, 40))
    }

    onEnable() {
        console.log("on Start")
        UnitTest_2.outputRichtText.string = "<color=#ffffff> - - - - - - -  RUNNING TESTS  - - - - - - -\n\n</color>"
        console.log("CANTIDAD DE TESTS: " + tests.length)
        tests.forEach(t => {
            UnitTest_2.outputRichtText.string += "<color=#1e81b0>● " + t.name + "\n</color>"
            let result = t();
            if (result[0]) {
                UnitTest_2.outputRichtText.string += "<color=#00ff00>>PASSED\n" + result[1] + "\n\n</color>"


            } else {
                UnitTest_2.outputRichtText.string += "<color=#ff0000>>FAILED\n" + result[1] + "\n\n</color>"
            }
        })


        let newHeight = UnitTest_2.outputRichtText.getComponent(UITransform).height;

        UnitTest_2.outputRichtText.node.parent.getComponent(UITransform).height = newHeight
        UnitTest_2.outputRichtText_unmasked.string = UnitTest_2.outputRichtText.string;

    }
    @Testeable
    Tess_ExpectedTrianglesTest_Test(): [boolean, string] {
        let successful = "Triangles lenght as expected"
        let failed = "Triangles length did't matched"
        /*
             __________
            |          |
            |     _____|
            |    |
            |____|

        */
        let nums: number[] = [];
        envolCoords.forEach(v => {
            nums.push(v.x)
            nums.push(v.y)
        })
        let indexes = earcut(nums, null, 2)
        console.log("INDEXES: " + indexes)
        let numTrianglesExpected = 4
        let testResult = indexes.length == numTrianglesExpected * 3
        return [testResult, testResult ? successful : failed]
    }


    @Testeable
    Tess_DetectEdges_Test(): [boolean, string] {
        let successful = "Edges were detected succesfully"
        let failed = "Edges were not treated as expected"

        let nums: number[] = [];
        let edges: number[] = [];
        envolCoords.forEach(v => {
            nums.push(v.x)
            nums.push(v.y)
        })
        let indexes = earcut(nums, null, 2)
        //Assuming earcut returns counterclockwised indexes.
        for (let i = 0; i < indexes.length; i += 3) {
            let subsegment = [indexes[i], indexes[i + 1], indexes[i + 2], indexes[i]]
            for (let j = 0; j < 3; j++) {
                if (subsegment[j + 1] == subsegment[j] + 1 || subsegment[j] == envolCoords.length - 1 && subsegment[j + 1] == 0) {
                    edges.push(subsegment[j])
                    edges.push(subsegment[j + 1])
                }
            }
        }
        edges.sort((a, b) => a - b)
        let expectedOutput = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
        let testResult = compareVectors(expectedOutput, edges)
        return [testResult, testResult ? successful : failed]
    }


    @Testeable
    Tess_TesselateSubTriangles_Test(): [boolean, string] {
        let successful = "" // Defined later
        let failed = "" //Definde later
        let nums: number[] = [];
        let borderPoints:BorderPoint[]=[];

        // Consider using a DoubleLinkedList for this
        for(let i=0;i<envolCoords.length;i++ ) {
            nums.push(envolCoords[i].x)
            nums.push(envolCoords[i].y)
           let sucesor:Vec2;
            if(i==envolCoords.length-1) {
                sucesor= envolCoords[0]
            } else{
                sucesor= envolCoords[i+1] 
            }
            borderPoints.push(new BorderPoint(envolCoords[i],sucesor))
        }
 
        let indexes = earcut(nums, null, 2)
        let triangles:Triangle[]=[];
    
        //Assuming earcut returns counterclockwised indexes.
        for (let i = 0; i < indexes.length; i += 3) {
            triangles.push(new Triangle([envolCoords[indexes[i]],envolCoords[indexes[i+1]],envolCoords[indexes[i+2]]]))
        }
        let newTriangles:Triangle[]=triangles
        let previousTriangles:Triangle[]=[]
        let iters = 2;
        for(let it=0; it<iters; it++) {
            previousTriangles = newTriangles;
            newTriangles=[]
            for(let i = 0; i<previousTriangles.length;i ++ ) {
                let vxA=previousTriangles[i].vertexA
                let vxB=previousTriangles[i].vertexB
                let vxC=previousTriangles[i].vertexC
    
                let ab_InterPoint = splitEdge(vxA, vxB,0)
                updateBorderPoints(borderPoints,[vxA,vxB])
                let bc_InterPoint = splitEdge(vxB, vxC,0)
                updateBorderPoints(borderPoints,[vxB,vxC])
                let ca_InterPoint = splitEdge(vxC, vxA,0)
                updateBorderPoints(borderPoints,[vxC,vxA])

                newTriangles.push(new Triangle([vxA,ab_InterPoint,ca_InterPoint]))
                newTriangles.push(new Triangle([ab_InterPoint,vxB,bc_InterPoint]))
                newTriangles.push(new Triangle([bc_InterPoint,vxC,ca_InterPoint]))
                newTriangles.push(new Triangle([ca_InterPoint,ab_InterPoint,bc_InterPoint]))
            } 
        }
 
        drawTriangles(newTriangles);
        let percent=0
        let increment = 1/borderPoints.length

        borderPoints.forEach(element => {
        
            percent+=increment;

            drawCircles(element.getPoint(),percent);
        });

        let cantVerts=envolCoords.length;
        let expectedTriangles = Math.pow(cantVerts-2,1+iters)
        successful=`Theoretical triangles cant: ${expectedTriangles} is equal to actual cant: ${newTriangles.length}`
        failed =`Theoretical triangles cant: ${expectedTriangles} is NOT equal to actual cant: ${newTriangles.length}`
        let testResult = expectedTriangles==newTriangles.length
        return [testResult, testResult ? successful : failed]
    }


 

    @Testeable
    CompareVectorsFunction_Test(): [boolean, string] {
        let successful = "Successfully compared (EQUAL)"
        let failed = "Failed comparing (MUST BE EQUAL)"

        let testResult = compareVectors([0, 2, 3, 5, 6, 4, 5, 6], [0, 2, 3, 5, 6, 4, 5, 6])
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    CompareVectorsFunction_2_Test(): [boolean, string] {
        let successful = "Successfully compared (NOT EQUAL)"
        let failed = "Failed comparing (MUST BE NOT EQUAL)"

        let testResult = !compareVectors([0, 2, 3, 5, 6, 4, 5], [0, 2, 3, 5, 6, 4, 5, 6])
        return [testResult, testResult ? successful : failed]

    }

    @Testeable
    CompareVectorsFunction_3_Test(): [boolean, string] {
        let successful = "Successfully compared (NOT EQUAL)"
        let failed = "Failed comparing (MUST BE NOT EQUAL)"

        let testResult = !compareVectors([0, 2, 3, 5, 6, 4, 5, 7], [0, 2, 3, 5, 6, 4, 5, 6])
        return [testResult, testResult ? successful : failed]

    }


    @Testeable
    RoundValue_2Decimals_Test(): [boolean, string] {
        let successful = "Successfully rounded"
        let failed = "Failed to round"
        let expected = "10.25"
        let actual = round(10.251846,2).toString()
        console.log("EXPECTED: " + expected)
        console.log("ACTUAL: "+ actual)

        let testResult = actual==expected
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    RoundValue_3Decimals_Test(): [boolean, string] {
        let successful = "Successfully rounded"
        let failed = "Failed to round"
        let expected = "10.689"
        let actual = round(10.6889,3).toString()
        console.log("EXPECTED: " + expected)
        console.log("ACTUAL: "+ actual)

        let testResult = actual==expected
        return [testResult, testResult ? successful : failed]

    }


    @Testeable
    ArrayInsertionFirt_Test(): [boolean, string] {
        let successful = "Successfully first place inserted"
        let failed = "Failed.."

        let expected = [0,1,2,3,4,5]
         insertInto(expected, 0,-1);
        let testResult = compareVectors(expected, [-1,0,1,2,3,4,5])
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    ArrayInsertionAmong_Test(): [boolean, string] {
        let successful = "Successfully among place inserted"
        let failed = "Failed..."
        let expected = [0,1,2,3,4,5]
        insertInto(expected,3,2.5);
        let testResult = compareVectors(expected, [0,1,2,2.5,3,4,5])
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    ArrayInsertionLast_Test(): [boolean, string] {
        let successful = "Successfully last place inserted"
        let failed = "Failed..."

        let expected:number[] = [0,1,2,3,4,5]
        insertInto(expected,expected.length,6);
        let testResult = compareVectors(expected, [0,1,2,3,4,5,6])
        return [testResult, testResult ? successful : failed]

    }

    //@Testeable
    SimpleTest2(): [boolean, string] {
        let successful = "Coinciden las dimensiones de angulos y vectores"
        let failed = "No coinciden"
        let nums: number[] = [];
        vectores.forEach(t => {
            console.log(t)
        })
        let testResult = vectores.length == angulos.length + 1;
        return [testResult, testResult ? successful : failed]
    }

    // @Testeable
    EarcutPolygonTest(): [boolean, string] {
        let successful = "Triangula con puntos internos"
        let failed = "No triangula con puntos internos"
        let nums: number[] = [];
        vectores.forEach(v => {
            nums.push(v.x)
            nums.push(v.y)
        })
        let indexes = earcut(nums, null, 2)
        console.log("INDEXES: " + indexes)
        let testResult = indexes.length == 9
        return [testResult, testResult ? successful : failed]

    }


}

