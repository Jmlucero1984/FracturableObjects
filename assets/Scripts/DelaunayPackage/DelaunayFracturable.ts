import { _decorator, Component, Node, Vec2 } from 'cc';
import { DelaunayAssemblerImplementer } from './DelaunayAssemblerImplementer';
const { ccclass, property } = _decorator;

@ccclass('DelaunayFracturable')
export class DelaunayFracturable extends Component {
    
  
    private polygon:Vec2[]=[];

    onLoad() {
    }

    update(deltaTime: number) {
        
    }
}


