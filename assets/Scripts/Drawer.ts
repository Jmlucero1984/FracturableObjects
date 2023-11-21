import { EventMouse } from 'cc';
 
import { Vec2 } from 'cc';
 
import { KeyCode } from 'cc';
import { EventKeyboard } from 'cc';

import { input } from 'cc';
import { Color } from 'cc';
import { Graphics } from 'cc';
import { Vec3 } from 'cc';
import { Input } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Delaunay } from './DelaunayPackage/Delaunay';
import { Sprite } from 'cc';
 
const { ccclass, property, executeInEditMode } = _decorator;

interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) { }

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    getItems(): T[] | undefined {
        return this.storage;
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    peekFirst(): T | undefined {
        return this.storage[0]
    }

    size(): number {
        return this.storage.length;
    }
}
@ccclass('Drawer')
 
export class Drawer extends Component {

    @property(Graphics)
    canvasPoly: Graphics;
    @property(Graphics)
    canvasInternalPoints: Graphics;
    @property(Delaunay)
    delIntance:Delaunay

    externalPoints: Stack<Vec2> = new Stack();
    internalPoints: Stack<Vec2> = new Stack();
    shiftPressed: boolean=false;
 

    start() {
        console.log("DRAWER ON START")
        this.setListeners();
        
    }

    update(deltaTime: number) {

    }

    setListeners() {
     //   this.node.on(Input.EventType.KEY_DOWN, this.onTouchStart, this);
        // this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
     
       //this.node.on(Input.EventType.KEY_UP, this.eraseLast, this)
        this.node.on(Input.EventType.MOUSE_DOWN, this.onTouchEnd, this);
       // this.node.on(Input.EventType.KEY_PRESSING, this.keyPressed, this)
    }


  

    onKeyUp(event: EventKeyboard) {
      
    
        if( this.shiftPressed && event.keyCode == KeyCode.BACKSPACE ){
            this.internalPoints.pop()
            this.drawInternalPoints()
        }
        if (event.keyCode == KeyCode.BACKSPACE) {
            console.log("RIGHT")
            this.externalPoints.pop()
           
            this.drawPoly()
        }
        if (event.keyCode == KeyCode.SHIFT_LEFT) {
            console.log("SHIFT false")
            this.shiftPressed=false;
        }
        
      
    }

    onLoad() {
        console.log("onLoadDrawer")
     
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
       
    }

    onMouseDown(e: EventMouse) {
        console.log("MOUSE UP")
        let mousePosition = e.getLocation()
        console.log("COORDS |  x: " + (mousePosition.x - this.node.getWorldPosition().x) + "   y: " + (mousePosition.y - this.node.getWorldPosition().y))
    }
/*
    onTouchMove(e: EventMouse) {
        let mousePosition = e.getUILocation();
        this.node.setWorldPosition(new Vec3(mousePosition.x, mousePosition.y, 0))
    }*/
 
    onKeyDown(event: EventKeyboard) {
        console.log("CACASDF")
        if (event.keyCode == KeyCode.SHIFT_LEFT ) {
            console.log("SHIFT true")
            this.shiftPressed=true;
          
          }
        if(event.keyCode == KeyCode.ENTER){
            this.delIntance.generateDelaunay(this.externalPoints.getItems(),this.internalPoints.getItems())
        }
    }
 
    onTouchEnd(event: EventMouse) {
        console.log(event)
        console.log("Event " + event.type)
        let mousePosition = event.getUILocation();
        console.log("COORDS GET LOCATION |  x: " + (mousePosition.x) + "   y: " + (mousePosition.y))
        let offsetX = this.node.getParent().getWorldPosition().x
        let offsetY = this.node.getParent().getWorldPosition().y

        let currentPos = new Vec2((mousePosition.x - offsetX), (mousePosition.y - offsetY))
        console.log("COORDS |  x: " + (currentPos.x) + "   y: " + (currentPos.y))

        if (event.getButton() == EventMouse.BUTTON_LEFT) {
            if(this.shiftPressed) {
                this.internalPoints.push(this.roundVect(currentPos))
                this.drawInternalPoints()

            } else {
                this.externalPoints.push(this.roundVect(currentPos))
                this.drawPoly()
            }
           
        }

        if (event.getButton() == EventMouse.BUTTON_RIGHT) {
            console.log("Finish")
            if(this.externalPoints.size()>1) {
            this.externalPoints.getItems().forEach(element => {
                console.log("(" + element.x + "," + element.y + ")")
            });
          //  this.externalPoints.push(this.externalPoints.peekFirst())
            this.drawPoly(true)
        }
        }

        if (event.getButton() == EventMouse.BUTTON_MIDDLE) {

        }


    };

    roundVect(pos: Vec2): Vec2 {
        return new Vec2(this.round(pos.x), this.round(pos.y))
    }

    round(val: number) {
        return (Math.round(val * 100)) / 100
    }

    drawInternalPoints(){
        this.canvasInternalPoints.clear()
        this.canvasInternalPoints.strokeColor = Color.CYAN
        this.canvasInternalPoints.lineWidth = 2;
        this.canvasInternalPoints.lineJoin = 1  /* BEVEL =0 , ROUND = 1 , MITTER= 2*/
        this.canvasInternalPoints.lineCap = 1

        let currentPoints = this.internalPoints.getItems()
        if (currentPoints.length > 0) {
            currentPoints.forEach(element=> {
                this.canvasInternalPoints.circle(element.x, element.y, 3)
            })
           
           }
        
   

        this.canvasInternalPoints.stroke()




    }

    drawPoly(final?:boolean) {
        this.canvasPoly.clear()
        this.canvasPoly.strokeColor = Color.RED
        this.canvasPoly.lineWidth = 3;
        this.canvasPoly.lineJoin = 1  /* BEVEL =0 , ROUND = 1 , MITTER= 2*/
        this.canvasPoly.lineCap = 1

        let currentPoints = this.externalPoints.getItems()
        if (currentPoints.length > 0) {
            this.canvasPoly.circle(currentPoints[0].x, currentPoints[0].y, 2)
            this.canvasPoly.moveTo(currentPoints[0].x, currentPoints[0].y)
        }
        if (currentPoints.length > 1) {
            this.canvasPoly.moveTo(currentPoints[0].x, currentPoints[0].y)

            for (let i = 1; i < currentPoints.length; i++) {

                this.canvasPoly.lineTo(currentPoints[i].x, currentPoints[i].y)


                this.canvasPoly.circle(currentPoints[i].x, currentPoints[i].y, 2)
                this.canvasPoly.moveTo(currentPoints[i].x, currentPoints[i].y)
            }
            if(final){
                this.canvasPoly.lineTo(currentPoints[0].x, currentPoints[0].y)

            }
            
        }

        this.canvasPoly.stroke()



    }



}


