import { Vec2, _decorator } from "cc";
import { plainVertex } from "./DelaunaySplitter";
const { ccclass, property } = _decorator;


@ccclass('DelaunayFractureClass')
export class DelaunayFractureClass {
    contactPoint: Vec2;
    normal: Vec2;
    pointA: number;
    pointB: number;
    fracturePoints: plainVertex[];
    envolvent: Vec2[];
    extremePoints: Vec2[];
    delaunayPoints: plainVertex[];
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