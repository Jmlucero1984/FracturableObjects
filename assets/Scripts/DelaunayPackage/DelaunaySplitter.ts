import { _decorator, Vec2, Vec3 } from 'cc';
import { filterNulls, getRelativeAngle, removeOutRunners } from './Delaunay';
const { ccclass, property } = _decorator;

export class plainVertex extends Vec2 {
    public x = 0;
    public y = 0;
    public border: boolean = false;
    public links: linkNode[] = []
    constructor(x: number, y: number, border: boolean = false) {
        super();

        this.x = x;
        this.y = y;
        this.border = border;
    }
}

export class linkNode extends Vec2 {
    public x = 0;
    public y = 0;
    public _angle = 0;
    constructor(x: number, y: number, angle: number) {
        super();
        this.x = x;
        this.y = y;
        this._angle = angle;
    }
}

function ab_cross_ac(a, b, c) //The cross product of ab and ac
{
    return cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
}

function rnd(x: number) {
    return Math.round(x * 1000) / 1000;
}

export function polygonToString(polygon: Vec2[]) {
    let output: string = "this.gr.moveTo(" + rnd(polygon[0].x) + "," + rnd(polygon[0].y) + ");"
    for (let i = 1; i < polygon.length; i++) {
        output += "this.gr.lineTo(" + rnd(polygon[i].x) + "," + rnd(polygon[i].y) + ");"
    }
    output += "this.gr.close();"
}


function calculateCenterMass(poly: Vec2[]) {
    let sumx = 0;
    let sumy = 0;
    let cant = poly.length;
    poly.forEach(element => {
        sumx += element.x;
        sumy += element.y;
    });
    return new Vec2(sumx / cant, sumy / cant);
}
function dot(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
}
function cross(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
}


export function isInPolygon(checkPoint: Vec2, polygonPoints: Vec2[]) {
    var counter = 0;
    var i: number;
    var xinters;
    var p1: Vec2, p2: Vec2;
    var pointCount = polygonPoints.length;
    p1 = polygonPoints[0];
    for (i = 1; i <= pointCount; i++) {
        p2 = polygonPoints[i % pointCount];
        if (checkPoint.x > Math.min(p1.x, p2.x) && checkPoint.x <= Math.max(p1.x, p2.x)) {
            if (checkPoint.y <= Math.max(p1.y, p2.y)) {
                if (p1.x != p2.x) {
                    xinters = (checkPoint.x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;
                    if (p1.y == p2.y || checkPoint.y <= xinters) {
                        counter++;
                    }
                }
            }
        }
        p1 = p2;
    }
    if (counter % 2 == 0) { return false; }
    return true;
}

export class DelaunayFracture {
    private contactPoint: Vec2;
    private normal: Vec2;
    private pointA: number;
    private pointB: number;
    private fracturePoints: plainVertex[];
    private envolvent: Vec2[];
    private extremePoints: Vec2[];
    private delaunayPoints: plainVertex[];
    public constructor(ctPt: Vec2, normal: Vec2, envd: Vec2[], plainVertexs: plainVertex[]) {
        this.contactPoint = ctPt;
        this.normal = normal;
        this.envolvent = envd;
        this.delaunayPoints = plainVertexs;
    }
    public getDelaunayPoints() { return this.delaunayPoints }
    public setDelaunayPoints(dPoints: plainVertex[]) { this.delaunayPoints = dPoints }
    public getPointA() { return this.pointA; }
    public getExtremePoints() { return this.extremePoints; }
    public setExtremePoints(extPts: Vec2[]) { this.extremePoints = extPts; }
    public getPointB() { return this.pointB; }
    public getNormal() { return this.normal; }
    public getContactPoint() { return this.contactPoint; }
    public getFracturePts() { return this.fracturePoints; }
    public getEnvolvent() { return this.envolvent; }
    public setPointA(ptA: number) { this.pointA = ptA; }
    public setPointB(ptB: number) { this.pointB = ptB; }
    public setFracturePts(fctPts: plainVertex[]) {
        this.fracturePoints = fctPts;
    }
}


function invertVector(vec: Vec2) {
    return new Vec2(-1 * vec.x, -1 * vec.y)
}


export function findFracture(fracture: DelaunayFracture) {
    let points: plainVertex[] = [];
 
    let direction = invertVector(fracture.getNormal());
    let nearestIndex = 0;
    let minDistance = 10000;
    for (let i = 0; i < fracture.getDelaunayPoints().length; i++) {
        let element = fracture.getDelaunayPoints()[i]
        let distance = lengthVector(fracture.getContactPoint(), new Vec2(element.x, element.y))
        if (distance < minDistance && element.links.length > 0 && element.border) {
            minDistance = distance
            nearestIndex = i;
        }
    }
    points.push(fracture.getDelaunayPoints()[nearestIndex])

    let nextPv: plainVertex;
    let founded = false;
    let firstDir = false;
    while (!founded) {
        let last = points[points.length - 1]
        let actualLinks = last.links
        
        let relAngle=getRelativeAngle(new Vec2(1, 0), direction);
        console.log("REL ANGLE: "+relAngle)
        console.log("ACTUAL LINKS")
        console.log(actualLinks)
        let indBestFit = findClosestAngle(relAngle, actualLinks)
        if (indBestFit == null) {
            return false;
        }
        console.log("BEST FIT INDEX:  "+indBestFit)
        console.log("BEST FIT INDEX INSIDE LINKS:  "+actualLinks[indBestFit])
        let closesdtIndex = findClosestIndex(actualLinks[indBestFit], fracture.getDelaunayPoints())
        console.log("CLOSEST INDEX: "+ closesdtIndex)
        nextPv = fracture.getDelaunayPoints()[closesdtIndex];
        if (nextPv == null) {

            return false;
        }
     
        if (!firstDir) {
            console.log("FIRST DIRECTION " + direction)
            firstDir = true;
            direction = redireccion(points[0], new Vec2(nextPv.x, nextPv.y))
            console.log("NEW DIRECTION " + direction)
        }
        points.push(nextPv)
        if (nextPv.border) founded = true;
    }


    let aIndex = findClosestIndex(points[0], fracture.getDelaunayPoints())
    let bIndex = findClosestIndex(points[points.length - 1], fracture.getDelaunayPoints())
    console.log("FRACTURA!!!")
    console.log(points)
    fracture.setPointA(aIndex)
    fracture.setPointB(bIndex)
    if (aIndex > bIndex) {
        console.log("REVIRTIENDO")
        fracture.setPointB(aIndex)
        fracture.setPointA(bIndex)
        reverse(points)
    }
    console.log("FRACTURA POINTS: ")
    console.log(fracture.getFracturePts)
    fracture.setFracturePts(points);
    return true;
}



function redireccion(vecA: Vec2, vecB: Vec2) {
    let nuevaDir=new Vec2(vecB.x-vecA.x,vecB.y-vecA.y);
    console.log("NUEVA DIR: "+nuevaDir)
    return unitaryVector(new Vec2(0,0),nuevaDir);

}



export function getFracturable(fracture: DelaunayFracture) {

    let ret: plainVertex[][] = [];
    // findFracture(fracture)
    let internals = deepCopy(fracture.getDelaunayPoints(), false);

    let partA: plainVertex[] = []
    let partB: plainVertex[] = []
    const externals = deepCopy(fracture.getDelaunayPoints(), true);
    let fractPoints = fracture.getFracturePts();
    removeVertexs(fractPoints, internals)
    let i = 0
    let continuar = true;
    let pointA = fracture.getPointA();
    let pointB = fracture.getPointB();
    while (continuar) {

        if (i == pointA) {

            fractPoints.forEach(element => {
                let k = cloneVertexPlain(element)
                k.border = true;
                partA.push(k)
            });

            for (let j = pointA; j <= pointB - 1; j++) {
                partB.push(cloneVertexPlain(externals[j]));
            }
            for (let j = fractPoints.length - 1; j > 0; j--) {
                let k = cloneVertexPlain(fractPoints[j])
                k.border = true;
                partB.push(k)
            }

            i = pointB + 1;
            for (let index = i; index < externals.length; index++) {
                partA.push(cloneVertexPlain(externals[index]))
            }
            continuar = false;
        }
        if (continuar) partA.push(cloneVertexPlain(externals[i]))
        i++
    }

    if (partA.length > 3) {
        internals.forEach(element => { partA.push(cloneVertexPlain(element)) })
    }

    if (partB.length > 3) {
        internals.forEach(element => { partB.push(cloneVertexPlain(element)) })
    }

    removeOutRunners(partA)
    removeOutRunners(partB)
    if(partA.length>2&&partB.length>2) { 

    ret.push(partA)
    ret.push(partB)
    return ret}
    else {
        return null
    }
}

function removeVertexs(targets: plainVertex[], container: plainVertex[]) {
    for (let i = 0; i < targets.length; i++) {
        let index = indexOfVertex(targets[i], container);
        if (index != -1) {
            container[index] = null;
        }
    }

    filterNulls(container);

}

function indexOfVertex(vt: plainVertex, vtArr: plainVertex[]) {
    for (let i = 0; i < vtArr.length; i++) {
        if (vtArr[i] != null) {
            if (vtArr[i].x == vt.x && vtArr[i].y == vt.y) {

                return i;
            }
        }
    }
    return -1;
}

function reverse(pVs: plainVertex[]) {
    for (let index = 0; index < pVs.length / 2; index++) {
        let element = pVs[index];
        pVs[index] = pVs[pVs.length - 1 - index];
        pVs[pVs.length - 1 - index] = element;
    }
}

function findClosestIndex(pos: Vec2, pVs: plainVertex[]) {
    for (let index = 0; index < pVs.length; index++) {
        let element = pVs[index];
        if (Math.abs(element.x - pos.x) < 0.001 && Math.abs(element.y - pos.y) < 0.001) {
            return index;
        }
    }
}




export function findClosestAngle(angle: number, linkNodes: linkNode[]) {
    const PI = 3.141592654
    let minAngle = PI * 2;
    let index = 0;
    for (let i = 0; i < linkNodes.length; i++) {
        if (linkNodes[i] == null) return null;
        let diff = Math.abs(angle - linkNodes[i]._angle)
        if (diff > (3 / 2) * PI) { diff = (2 * PI - diff) }
        if (diff < minAngle) {
            minAngle = diff;
            index = i;
        }
    }
    return index;
}

function unitaryVector(posA: Vec2, posB: Vec2) {
    let length = lengthVector(posA, posB);
    return new Vec2((posB.x - posA.x) / length, (posB.y - posA.y) / length);
}


function isBorder(point: Vec2, pVs: plainVertex[]) {
    let isBorder = false;
    pVs.forEach(el => {
        if (el.border) {
            if (point.x == el.x && point.y == el.y) {
                isBorder = true;
            }
        }
    })
    return isBorder
}


function lengthVector(a: Vec2, b: Vec2) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}




function deepCopy(pv: plainVertex[], externalBorder: boolean) {
    let output: plainVertex[] = [];
    pv.forEach(pv_el => {
        if (pv_el.border == externalBorder) {
            let newPv = new plainVertex(pv_el.x, pv_el.y, pv_el.border);
            let newLinkNodes: linkNode[] = [];

            pv_el.links.forEach(ln => {
                if (ln != null) {
                    let newlinkNode = new linkNode(ln.x, ln.y, ln._angle);
                    newLinkNodes.push(newlinkNode)
                }
            });

            newPv.links = newLinkNodes
            output.push(newPv)
        }
    });
    return output;
}


function promediardireccion(vecA: Vec2, vecB: Vec2) {
    return unitaryVector(new Vec2(0, 0), new Vec2(vecB.x - vecA.x, vecB.y - vecA.y));

}

function cloneVertexPlain(ver: plainVertex) {
    let newPv = new plainVertex(ver.x, ver.y, ver.border)
    ver.links.forEach(element => {
        if (element != null) {
            let newLNode = new linkNode(element.x, element.y, roundValue(element._angle))
            newPv.links.push(newLNode);
        }
    });
    return newPv
}

function roundValue(val: number) {
    return (Math.round(val * 1000)) / 1000
}


export function calculateEnvolArea(indexes: number[], coords: number[], jump: number) {
 
    let area = 0;
    for (let i = 0; i < indexes.length; i += jump) {
        let x1 = coords[indexes[i + 1] * jump] - coords[indexes[i] * jump]
        let y1 = coords[indexes[i + 1] * jump + 1] - coords[indexes[i] * jump + 1]
        let x2 = coords[indexes[i + 2] * jump] - coords[indexes[i] * jump]
        let y2 = coords[indexes[i + 2] * jump + 1] - coords[indexes[i] * jump + 1]
       
        let triangleArea = Math.abs(cross(x1, y1, x2, y2) / 2)
        area += triangleArea;
    }
    return area;
}

export function calculateEnvolArea2D(indexes: number[], coords: number[]) {
 

    let area = 0;
    for (let i = 0; i < indexes.length; i += 3) {
        let x1 = coords[indexes[i+1]*2] - coords[indexes[i] * 2]
        let y1 = coords[indexes[i+1]*2+1]  - coords[indexes[i] * 2 + 1]
        let x2 = coords[indexes[i + 2] * 2 ] - coords[indexes[i] * 2]
        let y2 = coords[indexes[i + 2] * 2 + 1] - coords[indexes[i] * 2 + 1]
 
        let triangleArea = Math.abs(cross(x1, y1, x2, y2) / 2)
        area += triangleArea;
    }
    return area;
}
export function calcAproxArea(points: Vec2[]) {
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    points.forEach(e => {
        if (e.x > maxX) maxX = e.x;
        if (e.x < minX) minX = e.x;
        if (e.y > maxY) maxY = e.y;
        if (e.y < minY) minY = e.y;
    });
    return (maxX - minX) * (maxY - minY)
}
