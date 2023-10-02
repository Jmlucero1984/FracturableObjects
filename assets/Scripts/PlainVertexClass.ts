import { Vec2, _decorator } from "cc";
import { linkNode } from "./DelaunaySplitter";
const { ccclass, property } = _decorator;


@ccclass('plainVertex')
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