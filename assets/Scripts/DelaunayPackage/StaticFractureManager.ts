import { _decorator, Component, instantiate, Node, PolygonCollider2D, Vec2, Vec3 } from 'cc';
import { FractDelaunay } from './FractDelaunay';
import { calcAproxArea, calculateEnvolArea2D, getFracturable } from './DelaunaySplitter';
import { DelaunayAssemblerImplementer } from './DelaunayAssemblerImplementer';
import { earcut } from './earcut';
const { ccclass, property } = _decorator;

class Queue<T> {
  
    public constructor(
        private elements: Record<number, T> = {},
        private head: number = 0,
        private tail: number = 0
    ) { }

    public enqueue(element: T): void {
        this.elements[this.tail] = element;
        this.tail++;
    }

    public dequeue(): T {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;

        return item;
    }

    public peek(): T {
        return this.elements[this.head];
    }

    public get length(): number {
        return this.tail - this.head;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

}

@ccclass('StaticFractureManager')
export class StaticFractureManager extends Component {
    private static working=false;
    public static cola:Queue<FractDelaunay> = new Queue<FractDelaunay>();
    start() {

    }

    update(deltaTime: number) {
        if(!StaticFractureManager.cola.isEmpty&&!StaticFractureManager.working) {
            console.log("TENEMOS ALGO")
            StaticFractureManager.working=true;
            StaticFractureManager.createCopy(StaticFractureManager.cola.dequeue());


        }
        
    }
    static createCopy(frac:FractDelaunay){
        let parts = getFracturable(frac.fractureObj);
        if (parts != null) {
            let nodeF=frac.node;
         

            let coordsA: number[] = [];
            let coordsB: number[] = [];
            parts[0].forEach(v=> {
                if(v.border){
                    coordsA.push(v.x)
                    coordsA.push(v.y)
                }
            })
            parts[1].forEach(v=> {
                if(v.border){
                    coordsB.push(v.x)
                    coordsB.push(v.y)
                }
            })
            let minArea= 300;
       
            let a1 = calculateEnvolArea2D(earcut(coordsA,null,2),coordsA)
            let a2= calculateEnvolArea2D(earcut(coordsB,null,2),coordsB)
            console.log("REAL AREA 1: "+a1);
            console.log("REAL AREA 2: "+a2);
            if (a1>minArea && a2>minArea) {
                frac.recursiveness--;
                let pc = nodeF.getComponent(PolygonCollider2D)
                let points: Vec2[] = []
                let index = 0;
                while (index < parts[0].length && parts[0][index].border) {
                    points.push(new Vec2(parts[0][index].x, parts[0][index].y))
                    index++;
                }
             
                frac.delaunayPoints = parts[0];
                pc.points = points;
                pc.apply();
                frac.implementer.modifyPoints(points)
               
                frac.implementer.stroke();
               
 
                let copyOf = instantiate(frac.prefab)
                copyOf.name="Instancia"+Math.random()*1563813;
                let cfwa = copyOf.getComponent(FractDelaunay)
                cfwa.prefab = frac.prefab;
            
                copyOf.parent = nodeF.parent;
                cfwa.delaunayPoints = parts[1];
                let points2: Vec2[] = []
                index = 0;
                while (index < parts[1].length && parts[1][index].border) {
                    points2.push(new Vec2(parts[1][index].x, parts[1][index].y))
                    index++;
                }
              
             
                copyOf.getComponent(DelaunayAssemblerImplementer).customLoad(points2)
 
                cfwa.recursiveness = 3;
                console.log("APPLYING POINTS")
                console.log(points2)
                console.log("----")
                cfwa.customLoad(points2);
 
                copyOf.setRotation(nodeF.getRotation());
                copyOf.setPosition(new Vec3(nodeF.position.x, nodeF.position.y));
                
                
               
            }
        } else{
            console.log("*******************************************************")
            console.log("*****************////  FALLÓ   ////********************")
            console.log("*******************************************************")
        }
        setTimeout(() => { 
            frac.available = true; 
            console.log("MAKE AVAILABLE")
        }, 10);
        StaticFractureManager.working=false;
    }
}


