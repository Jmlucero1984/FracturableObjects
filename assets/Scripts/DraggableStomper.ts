 


import { _decorator, CCBoolean, Component, EventKeyboard, EventMouse, EventTouch, input, Input, instantiate, KeyCode, Label, Node, Prefab, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DraggableStomper')
export class DraggableStomper extends Component {
    @property({ serializable: true })
    gravOnDrag: Boolean = false;
  

 



    start() {
       // console.clear();
     
    }

    update(deltaTime: number) {
   
    }

    setListeners() {
        this.node.on(Input.EventType.MOUSE_DOWN, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.MOUSE_UP, this.onTouchEnd, this);



    }
    onLoad() {
        this.setListeners();

    }

    //  this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);



    onTouchMove(e: EventMouse) {
        let mousePosition = e.getUILocation();


        // Convert the mouse position to the local node space
        //this.etiqueta.string="WORLD POS: "+this.node.worldPosition.x+" "+this.node.worldPosition.y;
        this.node.setWorldPosition(new Vec3(mousePosition.x, mousePosition.y, 0))

    }

    onTouchStart(event: EventMouse) {
  
       

    };

    onTouchEnd(event: EventTouch) {
   

    }


}
