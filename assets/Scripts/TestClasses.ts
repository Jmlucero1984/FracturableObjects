import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

 
export class Triangle {
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

