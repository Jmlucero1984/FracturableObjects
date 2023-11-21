import { _decorator, Component, Node } from 'cc';
 
 
import { Graphics } from 'cc';
import { generateTessellation, TessPoint, TessTriangle } from '../Tessellation';
import { Color } from 'cc';
import { MeshRenderData } from 'cc';
import { Vec2 } from 'cc';
import { CucutaTestBase, CustomMeshData } from './CucutaTestBase';
 
const { ccclass, property } = _decorator;

@ccclass('CharSTest')
export class CharSTest extends CucutaTestBase {
   start() {

    }

    update(deltaTime: number) {
        
    }

    charS_Test():[boolean, string, CustomMeshData] {
        let envolCoords: Vec2[] = []
 
   
                  envolCoords.push(new Vec2(4.51,6.17))
                  envolCoords.push(new Vec2(6.52,179.53))
                  envolCoords.push(new Vec2(8.52,207.59))
                  envolCoords.push(new Vec2(30.57,228.63))
                  envolCoords.push(new Vec2(48.61,207.59))
                  envolCoords.push(new Vec2(276.08,205.59))
                  envolCoords.push(new Vec2(294.12,228.63))
                  envolCoords.push(new Vec2(318.17,204.58))
                  envolCoords.push(new Vec2(317.17,180.53))
                  envolCoords.push(new Vec2(320.17,13.19))
                  envolCoords.push(new Vec2(267.06,13.19))
                  envolCoords.push(new Vec2(264.05,79.32))
                  envolCoords.push(new Vec2(221.97,139.45))
                  envolCoords.push(new Vec2(165.85,151.47))
                  envolCoords.push(new Vec2(104.72,132.43))
                  envolCoords.push(new Vec2(64.64,87.34))
                  envolCoords.push(new Vec2(61.63,9.18))
       
        
        this.reOriginCoords(envolCoords,true)
        envolCoords.forEach(element => {
            console.log("X: "+element.x+"     Y: "+element.y)
        });



        let iters: number = 1;
      let triangles: TessTriangle[] = generateTessellation(envolCoords, iters)
        let allPoints = new Set<TessPoint>();
        let firstPoint = [...triangles[0].getTessPoints()].filter(item => item.isBorder)[0]
        /// Y SI NUNCA COINCIDENNNNN LAS CORRDENADAS?? EH??
      /*  do {firstPoint = firstPoint.getSucessor()
        } while (!(firstPoint.getPos().x == 0 && firstPoint.getPos().y == 0))*/
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
        let meshData = this.drawTessTriangles(triangles);
       //  console.log(JSON.stringify(triangles)) // CRICULAR REFERENCE
     
 
        return [true,"Ok",meshData]
    }

    reOriginCoords(coords:Vec2[],fit:boolean) {
        let minx=Number.MAX_VALUE
        let miny=Number.MAX_VALUE
        let maxX=Number.MIN_VALUE
        let maxY=Number.MIN_VALUE
        coords.forEach(element => {
            if(element.x<minx) minx = element.x
            if(element.y<miny) miny= element.y
            if(element.x>maxX) maxX = element.x
            if(element.y>maxY) maxY= element.y
        });
     
        if(fit) {
            let maxWidth=500
            let maxHeigth=500
            let scalex=(maxX-minx)/maxWidth
            let scaley=(maxY-miny)/maxHeigth
            coords.forEach(element=>{
                element.x*=scalex
                element.y*=scaley
            })
            coords.forEach(element=>{
                element.x-=((maxX-minx)*scalex)/2
                element.y-=((maxY-miny)*scaley)/2
            })
        } else {
            coords.forEach(element=>{
                element.x-=minx
                element.y-=miny
            })
        }

      

    }
    customStringify(triangles: TessTriangle[]) {
        let allPoints = new Set<TessPoint>();
        let firstPoint = [...triangles[0].getTessPoints()].filter(item => item.isBorder)[0]
        /*do {

            firstPoint = firstPoint.getSucessor()
        } while (!(firstPoint.getPos().x == 0 && firstPoint.getPos().y == 0))*/
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


