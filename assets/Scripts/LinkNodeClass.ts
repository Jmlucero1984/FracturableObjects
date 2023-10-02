import { Vec2, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass('linkNode')
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
