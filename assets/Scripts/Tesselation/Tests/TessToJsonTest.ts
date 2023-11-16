import { _decorator, Component, Node } from 'cc';
import { UTest, CustomMeshData } from '../../UTest';
import { generateTessellation, TessPoint, TessTriangle } from '../Tessellation';
import { Vec2 } from 'cc';
import { MeshRenderData } from 'cc';
import { Graphics } from 'cc';
import { Color } from 'cc';
import { link } from 'fs';
const { ccclass, property } = _decorator;

@ccclass('TessToJsonTest')
export class TessToJsonTest extends UTest {
    start() {

    }

    update(deltaTime: number) {

    }



    Tess_Basic_Test(): [boolean, string, CustomMeshData?] {
        let successful = "Both JSON Match" // Defined later
        let failed = "Differences between JSONs" //Definde later

        let envolCoords: Vec2[] = []
        envolCoords.push(new Vec2(0, 0))
        envolCoords.push(new Vec2(40, 0))
        envolCoords.push(new Vec2(40, 40))
        envolCoords.push(new Vec2(0, 40))
        let iters: number = 1;
        let expectedOutput =
            '[{"x":0,"y":0,"border":true,"links":[{"x":20,"y":20,"_angle":0.785}]},{"x":20,"y":0,"border":true,"links":[{"x":20,"y":20,"_angle":1.571},{"x":40,"y":20,"_angle":0.785}]},{"x":40,"y":0,"border":true,"links":[null]},{"x":40,"y":20,"border":true,"links":[{"x":20,"y":0,"_angle":3.927},{"x":20,"y":20,"_angle":3.142}]},{"x":40,"y":40,"border":true,"links":[{"x":20,"y":20,"_angle":3.927}]},{"x":20,"y":40,"border":true,"links":[{"x":20,"y":20,"_angle":4.712},{"x":0,"y":20,"_angle":3.927}]},{"x":0,"y":40,"border":true,"links":[null]},{"x":0,"y":20,"border":true,"links":[{"x":20,"y":40,"_angle":0.785},{"x":20,"y":20,"_angle":0}]},{"x":20,"y":20,"border":false,"links":[{"x":40,"y":40,"_angle":0.785},{"x":20,"y":40,"_angle":1.571},{"x":0,"y":20,"_angle":3.142},{"x":0,"y":0,"_angle":3.927},{"x":20,"y":0,"_angle":4.712},{"x":40,"y":20,"_angle":0}]}]'
        /*  Object.getOwnPropertyDescriptors(obj,"function").map(item => properties.add(item))
           
                return [...properties.keys()].filter(item => typeof item === 'function')
                */
        let triangles: TessTriangle[] = generateTessellation(envolCoords, iters)
        let allPoints = new Set<TessPoint>();
        let firstPoint = [...triangles[0].getTessPoints()].filter(item => item.isBorder)[0]
        do {firstPoint = firstPoint.getSucessor()
        } while (!(firstPoint.getPos().x == 0 && firstPoint.getPos().y == 0))
        do {
            allPoints.add(firstPoint)
            firstPoint = firstPoint.getSucessor()
        } while (!allPoints.has(firstPoint))

        triangles.forEach(element => {
            [...element.getTessPoints()].forEach(el => {
                if (!el.isBorder()) allPoints.add(el)
            });
        });

        console.log("JSON")
        console.log(this.customStringify(triangles))
        console.log("\n")

        // console.log(JSON.stringify(triangles)) // CRICULAR REFERENCE
        let meshData = this.drawTessTriangles(triangles);
        let testResult = this.customStringify(triangles) == expectedOutput;
        return [testResult, testResult ? successful : failed, meshData]
    }
    Tess_Basic2_Test(): [boolean, string, CustomMeshData?] {
        let successful = "Both JSON Match" // Defined later
        let failed = "Differences between JSONs" //Definde later
        let testResult=true;
        
        let envolCoords: Vec2[] = []
        envolCoords.push(new Vec2(0, 0))
        envolCoords.push(new Vec2(20, 0))
        envolCoords.push(new Vec2(20, 40))
        envolCoords.push(new Vec2(120, 40))
        envolCoords.push(new Vec2(120, 0))
        envolCoords.push(new Vec2(140, 0))
        envolCoords.push(new Vec2(140, 60))
        envolCoords.push(new Vec2(0, 60))
        
        let triangles: TessTriangle[] = generateTessellation(envolCoords, 1)
        let allPoints = new Set<TessPoint>();
        let firstPoint = [...triangles[0].getTessPoints()].filter(item => item.isBorder)[0]
        do {firstPoint = firstPoint.getSucessor()
        } while (!(firstPoint.getPos().x == 0 && firstPoint.getPos().y == 0))
        do {
            allPoints.add(firstPoint)
            firstPoint = firstPoint.getSucessor()
        } while (!allPoints.has(firstPoint))

        triangles.forEach(element => {
            [...element.getTessPoints()].forEach(el => {
                if (!el.isBorder()) allPoints.add(el)
            });
        });

        console.log("JSON")
        console.log(this.customStringify(triangles))
        console.log("\n")
        return [testResult, testResult ? successful : failed]
    }


    Equals_Basic_Test(): [boolean, string, CustomMeshData?] {
        let successful = "Casa==Casa" // Defined later
        let failed = "ERROR Casa==Casa" //Definde later
        let testResult = "Casa" == "Casa"

        let envolCoords: Vec2[] = []
        return [testResult, testResult ? successful : failed]
    }

    Equals_Basic2_Test(): [boolean, string, CustomMeshData?] {
        let successful = "Casa===Casa" // Defined later
        let failed = "ERROR Casa===Casa" //Definde later
        let testResult = "Casa" === "Casa"

        let envolCoords: Vec2[] = []
        return [testResult, testResult ? successful : failed]
    }
   
    customStringify(triangles: TessTriangle[]) {
        let allPoints = new Set<TessPoint>();
        let firstPoint = [...triangles[0].getTessPoints()].filter(item => item.isBorder)[0]
        do {

            firstPoint = firstPoint.getSucessor()
        } while (!(firstPoint.getPos().x == 0 && firstPoint.getPos().y == 0))
        do {
            allPoints.add(firstPoint)
            firstPoint = firstPoint.getSucessor()
        } while (!allPoints.has(firstPoint))

        triangles.forEach(element => {
            [...element.getTessPoints()].forEach(el => {
                if (!el.isBorder()) allPoints.add(el)
            });
        });
        let output: String = "["
        let allpointArr = [...allPoints]
        for (let i = 0; i < allpointArr.length; i++) {

            let pp = allpointArr[i]
            console.log("PUNTO: " + i)
            console.log(pp.getPos())
            if (pp.isBorder()) console.log("PREDECESSOR: " + pp.getPredecessor().getPos() + "   SUCESSOR: " + pp.getSucessor().getPos())
            output += "{"
            output += `"x":${pp.getPos().x},"y":${pp.getPos().y},"border":${pp.isBorder()},"links":[`
            //let links = [...pp.getLinks()].filter(item => pp.isBorder()?!item.isBorder():true)
            let links = [...pp.getLinks()].filter(item => {
                if (pp.isBorder() && item === pp.getSucessor() || item === pp.getPredecessor()) {
                    return false
                } else return true;
            })

            if (links.length == 0) {
                output += "null"
            } else {
                for (let j = 0; j < links.length; j++) {
                    let ll = links[j]
                    let vector = this.unitaryVector(new Vec2(pp.getPos().x, pp.getPos().y), new Vec2(ll.getPos().x, ll.getPos().y))
                    let angle = this.getRelativeAngle(new Vec2(1, 0), vector)
                    output += `{"x":${ll.getPos().x},"y":${ll.getPos().y},"_angle":${angle}}`
                    if (j != links.length - 1) output += ","
                }
            }
            output += "]}"
            if (i != allPoints.size - 1) output += ","



            //  {"x":20,"y":0,"border":true,"links":[{"x":20,"y":20,"_angle":1.570},{"x":40,"y":20,"_angle":0.785}]},'

        }
        output += "]"
        return output;


    }
    lengthVector(a: Vec2, b: Vec2) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }

    unitaryVector(posA: Vec2, posB: Vec2) {
        let length = this.lengthVector(posA, posB);
        return new Vec2((posB.x - posA.x) / length, (posB.y - posA.y) / length);
    }
    // getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v1)))
    getRelativeAngle(vecA: Vec2, vecB: Vec2) {
        let rads = this.getRads(vecA)
        let transformedVectorB = new Vec2(vecB.x * Math.cos(rads) + vecB.y * Math.sin(rads), -1 * vecB.x * Math.sin(rads) + vecB.y * Math.cos(rads));
        return this.round(this.getRads(transformedVectorB), 3);
    }

    getRads(vecA: Vec2) {
        const constPI = 3.14159265359
        if (vecA.x < 0.001 && vecA.x > -0.001) {
            if (vecA.y > 0) { return constPI / 2 } else { return constPI * (3 / 2) }
        }
        if (vecA.y < 0.001 && vecA.y > -0.001) {
            if (vecA.x > 0) { return 0 } else { return constPI }
        }
        let baseAngle = Math.atan((vecA.y) / (vecA.x))
        if (vecA.x < 0 && vecA.y > 0) baseAngle = (constPI + baseAngle)
        if (vecA.x < 0 && vecA.y < 0) baseAngle = constPI + baseAngle
        if (vecA.x > 0 && vecA.y < 0) baseAngle = 2 * constPI + baseAngle
        return baseAngle

    }
    round(n: number, decimals: number) {
        return Math.round(n * Math.pow(10, decimals)) / (Math.pow(10, decimals));
    }



    drawTessTriangles(triangles: TessTriangle[]): CustomMeshData {

        let gr = new Graphics()

        gr.strokeColor = Color.RED
        gr.lineWidth = 1;
        gr.lineJoin = 1  /* BEVEL =0 , ROUND = 1 , MITTER= 2*/
        gr.lineCap = 1   /* BUTT = 0, ROUND = 1, SQUARE = 2 */
        for (let i = 0; i < triangles.length; i++) {
            gr.moveTo(triangles[i].getTessPointA().getPos().x, triangles[i].getTessPointA().getPos().y)
            gr.lineTo(triangles[i].getTessPointB().getPos().x, triangles[i].getTessPointB().getPos().y)
            gr.lineTo(triangles[i].getTessPointC().getPos().x, triangles[i].getTessPointC().getPos().y)
            gr.lineTo(triangles[i].getTessPointA().getPos().x, triangles[i].getTessPointA().getPos().y)
        }
        gr.stroke()
        let md: MeshRenderData[] = gr.impl.getRenderDataList()

        /*
    
        - Warning! What if the graphics data is too much large to fit into a single element? maybe we should deal with more parts
        md[1]..md[2] and so on
        - It would be better if we strip 0 values?
        - What about JSON? 
            -> JSON with coordinates?
            -> JSON with "translated draw instructions? (Graphics -> Canvas.Context2d)"
    
        */

        return new CustomMeshData(md[0].indexCount, md[0].vertexCount, md[0].floatStride, md[0].vData, md[0].iData, md[0].indexStart)
    }

}



