import { _decorator, Vec2 } from 'cc';
import { earcut } from '../DelaunayPackage/earcut';
 

 
export function splitEdge(init: Vec2, end: Vec2, rndPrecision: number) {
    return new Vec2(round((end.x + init.x) / 2, rndPrecision), round((end.y + init.y) / 2, rndPrecision))
}

export function splitEdgeTessPoints(borderTessPts: TessPoint[], alreadyPlacedTessPoints: TessPoint[], init: TessPoint, end: TessPoint, rndPrecision: number) {

    let tentativeNewTessPoint: TessPoint = null
    let newPos = new Vec2(round((end.getPos().x + init.getPos().x) / 2, rndPrecision), round((end.getPos().y + init.getPos().y) / 2, rndPrecision))
    let newTessPoint = new TessPoint(newPos)
    for (let i = 0; i < alreadyPlacedTessPoints.length; i++) {
        if (sameTessPoint(alreadyPlacedTessPoints[i], newTessPoint)) {
            tentativeNewTessPoint = alreadyPlacedTessPoints[i];
        }
    }
    if (tentativeNewTessPoint == null) {
        tentativeNewTessPoint = newTessPoint;
    }

    if (init.isBorder() && end.isBorder()) {
        for (let i = 0; i < borderTessPts.length; i++) {

            if (sameTessPoint(borderTessPts[i], init) && sameTessPoint(borderTessPts[i].getSucesor(), end)) {

                tentativeNewTessPoint.setSucesor(borderTessPts[i].getSucesor())
                borderTessPts[i].setSucesor(tentativeNewTessPoint)
                tentativeNewTessPoint.setBorder(true)
                insertInto(borderTessPts, i + 1, tentativeNewTessPoint)

            }
        }
    }


    alreadyPlacedTessPoints.push(tentativeNewTessPoint)
    return tentativeNewTessPoint
}



export function insertInto<T>(vectorV: T[], index: number, value: T) {
    if (index >= 0 && index <= vectorV.length) {
        vectorV.push(value)
        for (let i = vectorV.length - 1; i > index; i--) {
            vectorV[i] = vectorV[i - 1]
        }
        vectorV[index] = value;
    }
}

export function compareVectors(vect1: any[], vect2: any[]): boolean {
    if (vect1.length != vect2.length) return false;
    for (let i = 0; i < vect1.length; i++) { if (vect1[i] != vect2[i]) return false; }
    return true;
}

export function round(value: number, decimals: number) {
    let magnitud = Math.pow(10, decimals);
    return Math.round(value * magnitud) / magnitud;
}


export function sameVector(v1: Vec2, v2: Vec2) {
    if (v1.x - v2.x == 0 && v1.y - v2.y == 0) return true;
    return false;
}



export function sameTessPoint(tp1: TessPoint, tp2: TessPoint) {
    if (tp1.getPos().x - tp2.getPos().x == 0 && tp1.getPos().y - tp2.getPos().y == 0) return true;
    return false;
}
export function updateBorderPoints(borderPoints: BorderPoint[], points: Vec2[]) {
    for (let i = 0; i < borderPoints.length; i++) {

        if (sameVector(borderPoints[i].getPoint(), points[0]) && sameVector(borderPoints[i].getSucesor(), points[1])) {
            let newBorderPoint = new BorderPoint(splitEdge(points[0], points[1], 0), borderPoints[i].getSucesor())
            borderPoints[i].setSucesor(newBorderPoint.getPoint())
            insertInto(borderPoints, i + 1, newBorderPoint)
        }
    }
}

export function generateTessellation(envolCoords:Vec2[], iters:number):TessTriangle[] {
    let nums: number[] = [];
    let borderTessPoints: TessPoint[] = [];

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

    return newTriangles
}

export class BorderPoint {
    point: Vec2;
    sucesor: Vec2;
    public constructor(point: Vec2, sucesor: Vec2) {

        this.point = point;
        this.sucesor = sucesor;
    }

    public setSucesor(sucesor: Vec2) {
        this.sucesor = sucesor;
    }

    public getSucesor() {
        return this.sucesor;
    }

    public getPoint() {
        return this.point;
    }

    public toString = (): string => {
        return `POINT (${this.point})   SUCESOR (${this.sucesor})`;
    }
}

export class TessPoint {
    point: Vec2;
    sucesor: TessPoint;
    links: Set<TessPoint> = new Set()
    border: boolean


    public constructor(point: Vec2, border?: boolean, sucesor?: TessPoint, links?: TessPoint[]) {

        this.point = point;
        this.border = border;
        this.sucesor = sucesor;
        if (links != null) {
            links.forEach(tp => {
                this.links.add(tp)
            })
        }
    }
    public setBorder(border: boolean) {
        this.border = border;
    }

    public isBorder() {
        return this.border
    }
    public setSucesor(sucesor: TessPoint) {
        this.sucesor = sucesor;
    }

    public addTessPointToLinks(tp: TessPoint) {
        this.links.add(tp)
    }

    public addMultipleTessPointToLinks(tps?: TessPoint[]) {
        tps.forEach(tp => {
            this.links.add(tp)
        })
    }

    public getSucesor() {
        return this.sucesor;
    }

    public getLinks() {
        return this.links
    }

    public getPos() {
        return this.point;
    }

    public setPos(pos: Vec2) {
        this.point = pos
    }

    public toString = (): string => {
        return `POINT (${this.point})   SUCESOR (${this.sucesor})`;
    }
}


export class TessTriangle {
    tessPointA: TessPoint;
    tessPointB: TessPoint;
    tessPointC: TessPoint;

    constructor(tessPoints: [TessPoint, TessPoint, TessPoint]) {
        this.tessPointA = tessPoints[0]
        this.tessPointB = tessPoints[1]
        this.tessPointC = tessPoints[2]

    }

    public getTessPoints() {
        return [this.tessPointA, this.tessPointB, this.tessPointC]
    }

    public getTessPointA() {
        return this.tessPointA;
    }
    public getTessPointB() {
        return this.tessPointB;
    }
    public getTessPointC() {
        return this.tessPointC;
    }
}

export class Triangle {
    vertexA: Vec2;
    vertexB: Vec2;
    vertexC: Vec2;

    constructor(vertexs: [Vec2, Vec2, Vec2]) {
        this.vertexA = vertexs[0]
        this.vertexB = vertexs[1]
        this.vertexC = vertexs[2]
        console.log(this.vertexA.x + "  " + this.vertexA.y)
    }

    public getVertexs() {
        return [this.vertexA, this.vertexB, this.vertexC]
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





