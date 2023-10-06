import { _decorator, Color, Component, Graphics, RichText, UITransform, Vec2 } from 'cc';


import { BorderPoint, compareVectors, generateTessellation, insertInto, round, splitEdge, splitEdgeTessPoints, TessPoint, TessTriangle, Triangle, updateBorderPoints } from '../../Tesselation/Tessellation';
import { earcut } from '../../DelaunayPackage/earcut';
import { UTest } from '../../UTest';

const { ccclass, property, executeInEditMode } = _decorator;

function isString(value: unknown): asserts value is string {
    if (typeof value !== "string") { throw new Error("Not a string") }
    else {
        console.info("ES STRING")
    }
}



function Testeable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // a reference to our original method
    const originalMethod = descriptor.value;
 /*
    if (tests.indexOf(originalMethod) < 0) {
        tests.push(originalMethod)
    }
*/
}


function drawTriangles(triangles: Triangle[], gr:Graphics) {

 
    gr.strokeColor = new Color(250, 250, 250)
    for (let i = 0; i < triangles.length; i++) {
        gr.moveTo(triangles[i].getVertexA().x, triangles[i].getVertexA().y)
        gr.lineTo(triangles[i].getVertexB().x, triangles[i].getVertexB().y)
        gr.lineTo(triangles[i].getVertexC().x, triangles[i].getVertexC().y)
        gr.lineTo(triangles[i].getVertexA().x, triangles[i].getVertexA().y)
    }
    gr.stroke()
}


function drawTessTriangles(triangles: TessTriangle[], gr:Graphics) {

  
    gr.strokeColor = new Color(250, 250, 250)
    for (let i = 0; i < triangles.length; i++) {
        gr.moveTo(triangles[i].getTessPointA().getPos().x, triangles[i].getTessPointA().getPos().y)
        gr.lineTo(triangles[i].getTessPointB().getPos().x, triangles[i].getTessPointB().getPos().y)
        gr.lineTo(triangles[i].getTessPointC().getPos().x, triangles[i].getTessPointC().getPos().y)
        gr.lineTo(triangles[i].getTessPointA().getPos().x, triangles[i].getTessPointA().getPos().y)
    }
    gr.stroke()
}

function drawCircles(point: Vec2, percent: number ,gr :Graphics) {

    console.log("PERCENT: " + percent)
    
    gr.strokeColor = new Color(255 * (1 - percent), 255 * percent * 0.8, 0)
    gr.circle(point.x, point.y, 0.5 + 6 * percent)
    gr.stroke()
}


function getEnvolvCoords() {
    let envolCoords: Vec2[] = []
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



 



@ccclass('TessellationTest')
@executeInEditMode
export class TessellationTest extends UTest {




 

    onLoad() {
   

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
        let envolCoords = getEnvolvCoords();
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
        let envolCoords = getEnvolvCoords();
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

    /*
    =======================================================================================
        In this first approach we are gonna attemp to  dip our toe in, just
        to sketch the nuts and bolts of the strucure.
    =======================================================================================
    */

    @Testeable
    Tess_TesselateSubTriangles_Test(): [boolean, string] {
        let successful = "" // Defined later
        let failed = "" //Definde later
        let nums: number[] = [];
        let borderPoints: BorderPoint[] = [];
        let envolCoords = getEnvolvCoords();
        // Consider using a DoubleLinkedList for this
        for (let i = 0; i < envolCoords.length; i++) {
            nums.push(envolCoords[i].x)
            nums.push(envolCoords[i].y)
            let sucesor: Vec2;
            if (i == envolCoords.length - 1) {
                sucesor = envolCoords[0]
            } else {
                sucesor = envolCoords[i + 1]
            }
            borderPoints.push(new BorderPoint(envolCoords[i], sucesor))
        }

        let indexes = earcut(nums, null, 2)
        let triangles: Triangle[] = [];

        //Assuming earcut returns counterclockwised indexes.
        for (let i = 0; i < indexes.length; i += 3) {
            triangles.push(new Triangle([envolCoords[indexes[i]], envolCoords[indexes[i + 1]], envolCoords[indexes[i + 2]]]))
        }
        let newTriangles: Triangle[] = triangles
        let previousTriangles: Triangle[] = []
        let iters = 2;
        for (let it = 0; it < iters; it++) {
            previousTriangles = newTriangles;
            newTriangles = []
            for (let i = 0; i < previousTriangles.length; i++) {
                let vxA = previousTriangles[i].vertexA
                let vxB = previousTriangles[i].vertexB
                let vxC = previousTriangles[i].vertexC

                let ab_InterPoint = splitEdge(vxA, vxB, 0)
                updateBorderPoints(borderPoints, [vxA, vxB])
                let bc_InterPoint = splitEdge(vxB, vxC, 0)
                updateBorderPoints(borderPoints, [vxB, vxC])
                let ca_InterPoint = splitEdge(vxC, vxA, 0)
                updateBorderPoints(borderPoints, [vxC, vxA])

                newTriangles.push(new Triangle([vxA, ab_InterPoint, ca_InterPoint]))
                newTriangles.push(new Triangle([ab_InterPoint, vxB, bc_InterPoint]))
                newTriangles.push(new Triangle([bc_InterPoint, vxC, ca_InterPoint]))
                newTriangles.push(new Triangle([ca_InterPoint, ab_InterPoint, bc_InterPoint]))
            }
        }
        /*
       drawTriangles(newTriangles);
       let percent=0
       let increment = 1/borderPoints.length
       borderPoints.forEach(element => {
           percent+=increment;
           drawCircles(element.getPoint(),percent);
       });
       */
        let cantVerts = envolCoords.length;
        let expectedTriangles = Math.pow(cantVerts - 2, 1 + iters)
        successful = `Theoretical triangles cant: ${expectedTriangles} is equal to actual cant: ${newTriangles.length}`
        failed = `Theoretical triangles cant: ${expectedTriangles} is NOT equal to actual cant: ${newTriangles.length}`
        let testResult = expectedTriangles == newTriangles.length
        return [testResult, testResult ? successful : failed]
    }


    /*
    =======================================================================================
        Now we are gonna try tu improve the entities to implement a later
        "relaxation algorigthm" in order to try to smooth the topology
    =======================================================================================
    */

    @Testeable
    Tess_TessAlgorithmImprovement_Test(): [boolean, string] {
        let successful = "" // Defined later
        let failed = "" //Definde later
        let nums: number[] = [];
        let borderTessPoints: TessPoint[] = [];
        let envolCoords = getEnvolvCoords();
        // Consider using a DoubleLinkedList for this
        for (let i = 0; i < envolCoords.length; i++) {
            nums.push(envolCoords[i].x)
            nums.push(envolCoords[i].y)

            borderTessPoints.push(new TessPoint(envolCoords[i], true))
            if (i > 0) {
                borderTessPoints[i - 1].setSucesor(borderTessPoints[i])
            }
        }
        borderTessPoints[borderTessPoints.length - 1].setSucesor(borderTessPoints[0])

        let indexes = earcut(nums, null, 2)
        let triangles: TessTriangle[] = [];

        //Assuming earcut returns counterclockwised indexes.
        for (let i = 0; i < indexes.length; i += 3) {
            triangles.push(new TessTriangle([borderTessPoints[indexes[i]], borderTessPoints[indexes[i + 1]], borderTessPoints[indexes[i + 2]]]))
        }


        let newTriangles: TessTriangle[] = triangles
        let previousTriangles: TessTriangle[] = []
        let iters = 2;
        let alreadyPlacedTessPoints: TessPoint[] = borderTessPoints

        for (let it = 0; it < iters; it++) {
            previousTriangles = newTriangles;
            newTriangles = []
            for (let i = 0; i < previousTriangles.length; i++) {
                let tpA = previousTriangles[i].getTessPointA()
                let tpB = previousTriangles[i].getTessPointB()
                let tpC = previousTriangles[i].getTessPointC()

                let ab_InterTessPoint = splitEdgeTessPoints(borderTessPoints, alreadyPlacedTessPoints, tpA, tpB, 0)
                let bc_InterTessPoint = splitEdgeTessPoints(borderTessPoints, alreadyPlacedTessPoints, tpB, tpC, 0)
                let ca_InterTessPoint = splitEdgeTessPoints(borderTessPoints, alreadyPlacedTessPoints, tpC, tpA, 0)

                newTriangles.push(new TessTriangle([tpA, ab_InterTessPoint, ca_InterTessPoint]))
                newTriangles.push(new TessTriangle([ab_InterTessPoint, tpB, bc_InterTessPoint]))
                newTriangles.push(new TessTriangle([bc_InterTessPoint, tpC, ca_InterTessPoint]))
                newTriangles.push(new TessTriangle([ca_InterTessPoint, ab_InterTessPoint, bc_InterTessPoint]))
            }
        }

        newTriangles.forEach(tessTri => {
            tessTri.getTessPointA().addTessPointToLinks(tessTri.getTessPointB())
            tessTri.getTessPointA().addTessPointToLinks(tessTri.getTessPointC())
            tessTri.getTessPointB().addTessPointToLinks(tessTri.getTessPointA())
            tessTri.getTessPointB().addTessPointToLinks(tessTri.getTessPointC())
            tessTri.getTessPointC().addTessPointToLinks(tessTri.getTessPointA())
            tessTri.getTessPointC().addTessPointToLinks(tessTri.getTessPointB())
        })
        /*
                newTriangles.forEach(tessTri => {
                    console.log("LINKS de " + tessTri.getTessPointA().getPos())
                    console.log("LINKS de " + tessTri.getTessPointA().getLinks().size)
                    if (!tessTri.getTessPointA().isBorder()) {
                        let pos = tessTri.getTessPointA().getPos()
                        tessTri.getTessPointA().setPos(new Vec2(pos.x + Math.random() * 2, pos.y + Math.random() * 2))
                    }
                })
                drawTessTriangles(newTriangles);
                  let percent=0
                   let increment = 1/borderPoints.length
                   borderPoints.forEach(element => {
                       percent+=increment;
                       drawCircles(element.getPoint(),percent);
                   });*/
        let cantVerts = envolCoords.length;
        let expectedTriangles = Math.pow(cantVerts - 2, 1 + iters)
        successful = `Theoretical triangles cant: ${expectedTriangles} is equal to actual cant: ${newTriangles.length}`
        failed = `Theoretical triangles cant: ${expectedTriangles} is NOT equal to actual cant: ${newTriangles.length}`
        let testResult = expectedTriangles == newTriangles.length
        return [testResult, testResult ? successful : failed]
    }

    @Testeable
    Tess_Relaxation_Test(): [boolean, string] {
        let envolCoords = getEnvolvCoords();
        let successful = "" // Defined later
        let failed = "" //Definde later
        let iters = 2;
        let triangles: TessTriangle[] = generateTessellation(envolCoords, iters)

        /*   let percent=0
           let increment = 1/borderPoints.length
           borderPoints.forEach(element => {
               percent+=increment;
               drawCircles(element.getPoint(),percent);
           });*/
        let coeff = 0.1;
        triangles.forEach(tt => {
            tt.getTessPoints().forEach(tp => {
                if (!tp.border) {
                    let sumx = 0;
                    let sumy = 0;
                    tp.getLinks().forEach(link => {
                        sumx += link.getPos().x - tp.getPos().x
                        sumy += link.getPos().y - tp.getPos().y
                    })
                    tp.setPos(new Vec2(tp.getPos().x + sumx * coeff, tp.getPos().y + sumy * coeff))

                }
            })
        })

        drawTessTriangles(triangles, UTest.testGraphics);
        let cantVerts = envolCoords.length;
        let expectedTriangles = Math.pow(cantVerts - 2, 1 + iters)
        successful = `Theoretical triangles cant: ${expectedTriangles} is equal to actual cant: ${triangles.length}`
        failed = `Theoretical triangles cant: ${expectedTriangles} is NOT equal to actual cant: ${triangles.length}`
        let testResult = expectedTriangles == triangles.length
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
        let actual = round(10.251846, 2).toString()
        console.log("EXPECTED: " + expected)
        console.log("ACTUAL: " + actual)

        let testResult = actual == expected
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    RoundValue_3Decimals_Test(): [boolean, string] {
        let successful = "Successfully rounded"
        let failed = "Failed to round"
        let expected = "10.689"
        let actual = round(10.6889, 3).toString()
        console.log("EXPECTED: " + expected)
        console.log("ACTUAL: " + actual)

        let testResult = actual == expected
        return [testResult, testResult ? successful : failed]

    }


    @Testeable
    ArrayInsertionFirt_Test(): [boolean, string] {
        let successful = "Successfully first place inserted"
        let failed = "Failed.."

        let expected = [0, 1, 2, 3, 4, 5]
        insertInto(expected, 0, -1);
        let testResult = compareVectors(expected, [-1, 0, 1, 2, 3, 4, 5])
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    ArrayInsertionAmong_Test(): [boolean, string] {
        let successful = "Successfully among place inserted"
        let failed = "Failed..."
        let expected = [0, 1, 2, 3, 4, 5]
        insertInto(expected, 3, 2.5);
        let testResult = compareVectors(expected, [0, 1, 2, 2.5, 3, 4, 5])
        return [testResult, testResult ? successful : failed]

    }
    @Testeable
    ArrayInsertionLast_Test(): [boolean, string] {
        let successful = "Successfully last place inserted"
        let failed = "Failed..."

        let expected: number[] = [0, 1, 2, 3, 4, 5]
        insertInto(expected, expected.length, 6);
        let testResult = compareVectors(expected, [0, 1, 2, 3, 4, 5, 6])
        return [testResult, testResult ? successful : failed]

    }

    //@Testeable
    SimpleTest2(): [boolean, string] {
        let successful = "Coinciden las dimensiones de angulos y vectores"
        let failed = "No coinciden"
        let nums: number[] = [];
        let vectores = generateVectors()
        let angulos = generateAngles()
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
        let vectores = generateVectors()
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

