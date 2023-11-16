import { _decorator, Component, Node, PolygonCollider2D, Vec2 } from 'cc';
import { DelaunayAssembler } from './DelaunayAssembler';
import { linkNode, plainVertex } from './DelaunaySplitter';
const { ccclass, property,executeInEditMode } = _decorator;

@ccclass('DelaunayAssemblerImplementer')
 //@executeInEditMode
export class DelaunayAssemblerImplementer extends DelaunayAssembler {
 
 
    customLoad(polPoints:Vec2[]){
        super.onLoad();
        this.polygon =polPoints
        this.modifyPoints(polPoints);
        this.stroke();
    }
 
  

    start() {
        this.stroke();
    }

    update(deltaTime: number) {
    }
}