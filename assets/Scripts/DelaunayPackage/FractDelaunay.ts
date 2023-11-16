import { _decorator, CCBoolean, CCInteger, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Mat4, Material, Node, PolygonCollider2D, Prefab, random, RigidBody, RigidBody2D, Texture2D, Vec2, Vec3 } from 'cc';
import { DelaunayAssemblerImplementer } from './DelaunayAssemblerImplementer';
import { calcAproxArea, DelaunayFracture, findFracture, getFracturable, linkNode, plainVertex } from './DelaunaySplitter';
import { StaticFractureManager } from './StaticFractureManager';

const { ccclass, property,executeInEditMode } = _decorator;



 
@ccclass('FractDelaunay')
 @executeInEditMode
export class FractDelaunay extends Component {
   

    @property(Prefab)
    prefab: Prefab;
    @property(CCBoolean)
    ancestor: boolean = false;
    @property(CCInteger)
    recursiveness: number = 3;
    @property(CCInteger)
    AreaMinima: number = 200;
    @property({ group: "Render" })
    @property(Texture2D)
    baseTexture: Texture2D = null;
    @property({ group: "Render" })
    @property(Material)
    Render_Mat: Material = null;
    @property({ type: [Vec2] })
    polygonPoints: Vec2[] = [];


    public implementer: DelaunayAssemblerImplementer;
    private area: number;
    public available = true;
    public delaunayPoints: plainVertex[] = [];
    private minArea: number;
    public fractureObj: DelaunayFracture;
    private previousPos:Vec2;
    public velVect:Vec2;
    private previousTime:number;
    private jsonObject='[{"x":0,"y":0,"border":true,"links":[null]},{"x":10,"y":0,"border":true,"links":[{"x":0,"y":30,"_angle":1.893},{"x":10,"y":30,"_angle":1.571}]},{"x":20,"y":0,"border":true,"links":[{"x":10,"y":30,"_angle":1.893}]},{"x":20,"y":20,"border":true,"links":[{"x":10,"y":30,"_angle":2.356},{"x":10,"y":50,"_angle":1.893}]},{"x":20,"y":40,"border":true,"links":[{"x":10,"y":50,"_angle":2.356},{"x":80,"y":50,"_angle":0.165}]},{"x":70,"y":40,"border":true,"links":[{"x":80,"y":50,"_angle":0.785},{"x":130,"y":50,"_angle":0.165}]},{"x":120,"y":40,"border":true,"links":[{"x":130,"y":20,"_angle":5.176},{"x":130,"y":50,"_angle":0.785}]},{"x":120,"y":20,"border":true,"links":[{"x":130,"y":20,"_angle":0},{"x":130,"y":0,"_angle":5.176}]},{"x":120,"y":0,"border":true,"links":[null]},{"x":130,"y":0,"border":true,"links":[{"x":120,"y":20,"_angle":2.034},{"x":130,"y":20,"_angle":1.571}]},{"x":140,"y":0,"border":true,"links":[{"x":130,"y":20,"_angle":2.034}]},{"x":140,"y":30,"border":true,"links":[{"x":130,"y":20,"_angle":3.927},{"x":130,"y":50,"_angle":2.034}]},{"x":140,"y":60,"border":true,"links":[{"x":130,"y":50,"_angle":3.927},{"x":80,"y":50,"_angle":3.307}]},{"x":70,"y":60,"border":true,"links":[{"x":80,"y":50,"_angle":5.498},{"x":10,"y":50,"_angle":3.307}]},{"x":0,"y":60,"border":true,"links":[{"x":10,"y":30,"_angle":5.034},{"x":10,"y":50,"_angle":5.498}]},{"x":0,"y":30,"border":true,"links":[{"x":10,"y":30,"_angle":0},{"x":10,"y":0,"_angle":5.034}]},{"x":10,"y":30,"border":false,"links":[{"x":0,"y":60,"_angle":1.893},{"x":0,"y":30,"_angle":3.142},{"x":10,"y":0,"_angle":4.712},{"x":20,"y":0,"_angle":5.034},{"x":10,"y":50,"_angle":1.571},{"x":20,"y":20,"_angle":5.498}]},{"x":130,"y":20,"border":false,"links":[{"x":120,"y":40,"_angle":2.034},{"x":120,"y":20,"_angle":3.142},{"x":130,"y":0,"_angle":4.712},{"x":140,"y":0,"_angle":5.176},{"x":130,"y":50,"_angle":1.571},{"x":140,"y":30,"_angle":0.785}]},{"x":10,"y":50,"border":false,"links":[{"x":0,"y":60,"_angle":2.356},{"x":10,"y":30,"_angle":4.712},{"x":20,"y":20,"_angle":5.034},{"x":20,"y":40,"_angle":5.498},{"x":70,"y":60,"_angle":0.165},{"x":80,"y":50,"_angle":0}]},{"x":130,"y":50,"border":false,"links":[{"x":120,"y":40,"_angle":3.927},{"x":130,"y":20,"_angle":4.712},{"x":140,"y":30,"_angle":5.176},{"x":140,"y":60,"_angle":0.785},{"x":70,"y":40,"_angle":3.307},{"x":80,"y":50,"_angle":3.142}]},{"x":80,"y":50,"border":false,"links":[{"x":140,"y":60,"_angle":0.165},{"x":70,"y":60,"_angle":2.356},{"x":10,"y":50,"_angle":3.142},{"x":20,"y":40,"_angle":3.307},{"x":70,"y":40,"_angle":3.927},{"x":130,"y":50,"_angle":0}]}]';

    private jsonObject2 = '[{"x":0,"y":0,"border":true,"links":[null]},{"x":10,"y":0,"border":true,"links":[{"x":20,"y":10,"_angle":0.785},{"x":0,"y":10,"_angle":2.356},{"x":10,"y":13,"_angle":1.571}]},{"x":20,"y":0,"border":true,"links":[null]},{"x":20,"y":10,"border":true,"links":[{"x":10,"y":0,"_angle":3.927},{"x":10,"y":13,"_angle":1.862}]},{"x":20,"y":20,"border":true,"links":[{"x":10,"y":13,"_angle":3.752},{"x":11,"y":26,"_angle":2.159}]},{"x":20,"y":30,"border":true,"links":[{"x":8,"y":41,"_angle":2.313},{"x":11,"y":26,"_angle":3.56}]},{"x":20,"y":40,"border":true,"links":[{"x":8,"y":41,"_angle":1.654},{"x":18,"y":47,"_angle":2.863}]},{"x":30,"y":40,"border":true,"links":[{"x":18,"y":47,"_angle":2.099},{"x":31,"y":52,"_angle":1.488}]},{"x":40,"y":40,"border":true,"links":[{"x":31,"y":52,"_angle":2.498},{"x":48,"y":48,"_angle":0.785}]},{"x":50,"y":40,"border":true,"links":[{"x":48,"y":48,"_angle":2.897},{"x":60,"y":51,"_angle":0.833}]},{"x":60,"y":40,"border":true,"links":[{"x":60,"y":51,"_angle":1.571},{"x":68,"y":52,"_angle":0.983}]},{"x":70,"y":40,"border":true,"links":[{"x":68,"y":52,"_angle":2.976},{"x":81,"y":49,"_angle":0.686}]},{"x":80,"y":40,"border":true,"links":[{"x":81,"y":49,"_angle":1.46}]},{"x":90,"y":40,"border":true,"links":[{"x":81,"y":49,"_angle":2.356},{"x":90,"y":52,"_angle":1.571},{"x":99,"y":50,"_angle":0.838}]},{"x":100,"y":40,"border":true,"links":[{"x":99,"y":50,"_angle":3.042},{"x":110,"y":51,"_angle":0.833}]},{"x":110,"y":40,"border":true,"links":[{"x":110,"y":51,"_angle":1.571}]},{"x":120,"y":40,"border":true,"links":[{"x":110,"y":51,"_angle":2.404},{"x":119,"y":52,"_angle":3.058},{"x":128,"y":49,"_angle":0.844},{"x":130,"y":41,"_angle":0.1}]},{"x":120,"y":30,"border":true,"links":[{"x":130,"y":41,"_angle":0.833},{"x":131,"y":26,"_angle":5.061}]},{"x":120,"y":20,"border":true,"links":[{"x":128,"y":13,"_angle":5.431},{"x":131,"y":26,"_angle":0.499}]},{"x":120,"y":10,"border":true,"links":[{"x":130,"y":0,"_angle":5.498},{"x":128,"y":13,"_angle":0.359}]},{"x":120,"y":0,"border":true,"links":[null]},{"x":130,"y":0,"border":true,"links":[{"x":120,"y":10,"_angle":2.356},{"x":140,"y":10,"_angle":0.785},{"x":128,"y":13,"_angle":2.989}]},{"x":140,"y":0,"border":true,"links":[null]},{"x":140,"y":10,"border":true,"links":[{"x":130,"y":0,"_angle":3.927},{"x":128,"y":13,"_angle":1.816}]},{"x":140,"y":20,"border":true,"links":[{"x":128,"y":13,"_angle":3.67},{"x":131,"y":26,"_angle":2.159}]},{"x":140,"y":30,"border":true,"links":[{"x":130,"y":41,"_angle":2.404},{"x":131,"y":26,"_angle":3.56}]},{"x":140,"y":40,"border":true,"links":[{"x":130,"y":41,"_angle":1.67}]},{"x":140,"y":50,"border":true,"links":[{"x":130,"y":60,"_angle":2.356},{"x":128,"y":49,"_angle":3.225},{"x":130,"y":41,"_angle":3.874}]},{"x":140,"y":60,"border":true,"links":[null]},{"x":130,"y":60,"border":true,"links":[{"x":140,"y":50,"_angle":5.498},{"x":119,"y":52,"_angle":3.77},{"x":128,"y":49,"_angle":4.533}]},{"x":120,"y":60,"border":true,"links":[{"x":119,"y":52,"_angle":4.588}]},{"x":110,"y":60,"border":true,"links":[{"x":110,"y":51,"_angle":4.712},{"x":119,"y":52,"_angle":5.439}]},{"x":100,"y":60,"border":true,"links":[{"x":90,"y":52,"_angle":3.816},{"x":99,"y":50,"_angle":4.613},{"x":110,"y":51,"_angle":5.445}]},{"x":90,"y":60,"border":true,"links":[{"x":90,"y":52,"_angle":4.712}]},{"x":80,"y":60,"border":true,"links":[{"x":68,"y":52,"_angle":3.73},{"x":81,"y":49,"_angle":6.193},{"x":90,"y":52,"_angle":5.387}]},{"x":70,"y":60,"border":true,"links":[{"x":68,"y":52,"_angle":4.467}]},{"x":60,"y":60,"border":true,"links":[{"x":60,"y":51,"_angle":4.712},{"x":68,"y":52,"_angle":5.498}]},{"x":50,"y":60,"border":true,"links":[{"x":48,"y":48,"_angle":4.547},{"x":60,"y":51,"_angle":5.445}]},{"x":40,"y":60,"border":true,"links":[{"x":31,"y":52,"_angle":3.868},{"x":48,"y":48,"_angle":5.695}]},{"x":30,"y":60,"border":true,"links":[{"x":31,"y":52,"_angle":6.159}]},{"x":20,"y":60,"border":true,"links":[{"x":18,"y":47,"_angle":4.56},{"x":31,"y":52,"_angle":5.341}]},{"x":10,"y":60,"border":true,"links":[{"x":0,"y":50,"_angle":3.927},{"x":9,"y":48,"_angle":4.629},{"x":18,"y":47,"_angle":5.732}]},{"x":0,"y":60,"border":true,"links":[null]},{"x":0,"y":50,"border":true,"links":[{"x":10,"y":60,"_angle":0.785},{"x":8,"y":41,"_angle":5.557},{"x":9,"y":48,"_angle":4.931}]},{"x":0,"y":40,"border":true,"links":[{"x":8,"y":41,"_angle":0.124}]},{"x":0,"y":30,"border":true,"links":[{"x":8,"y":41,"_angle":0.942},{"x":11,"y":26,"_angle":5.061}]},{"x":0,"y":20,"border":true,"links":[{"x":10,"y":13,"_angle":5.323},{"x":11,"y":26,"_angle":0.499}]},{"x":0,"y":10,"border":true,"links":[{"x":10,"y":0,"_angle":5.498},{"x":10,"y":13,"_angle":0.291}]},{"x":8,"y":41,"border":false,"links":[{"x":0,"y":50,"_angle":2.415},{"x":0,"y":40,"_angle":3.266},{"x":20,"y":30,"_angle":5.454},{"x":20,"y":40,"_angle":4.796},{"x":0,"y":30,"_angle":4.084},{"x":9,"y":48,"_angle":1.429},{"x":11,"y":26,"_angle":6.086},{"x":18,"y":47,"_angle":0.54}]},{"x":9,"y":48,"border":false,"links":[{"x":10,"y":60,"_angle":1.488},{"x":0,"y":50,"_angle":1.789},{"x":8,"y":41,"_angle":4.57},{"x":18,"y":47,"_angle":4.823}]},{"x":10,"y":13,"border":false,"links":[{"x":10,"y":0,"_angle":4.712},{"x":20,"y":10,"_angle":5.004},{"x":0,"y":10,"_angle":3.433},{"x":20,"y":20,"_angle":0.611},{"x":0,"y":20,"_angle":2.182},{"x":11,"y":26,"_angle":1.494}]},{"x":11,"y":26,"border":false,"links":[{"x":20,"y":20,"_angle":5.3},{"x":20,"y":30,"_angle":0.418},{"x":0,"y":30,"_angle":1.92},{"x":0,"y":20,"_angle":3.641},{"x":8,"y":41,"_angle":2.944},{"x":10,"y":13,"_angle":4.636}]},{"x":18,"y":47,"border":false,"links":[{"x":20,"y":40,"_angle":6.005},{"x":30,"y":40,"_angle":5.24},{"x":20,"y":60,"_angle":1.418},{"x":10,"y":60,"_angle":2.59},{"x":9,"y":48,"_angle":1.681},{"x":8,"y":41,"_angle":3.682},{"x":31,"y":52,"_angle":0.367}]},{"x":31,"y":52,"border":false,"links":[{"x":30,"y":40,"_angle":4.629},{"x":40,"y":40,"_angle":5.64},{"x":40,"y":60,"_angle":0.727},{"x":30,"y":60,"_angle":3.017},{"x":18,"y":47,"_angle":3.509},{"x":20,"y":60,"_angle":2.2},{"x":48,"y":48,"_angle":4.943}]},{"x":48,"y":48,"border":false,"links":[{"x":40,"y":40,"_angle":3.927},{"x":50,"y":40,"_angle":6.038},{"x":50,"y":60,"_angle":1.406},{"x":40,"y":60,"_angle":2.554},{"x":31,"y":52,"_angle":1.802},{"x":60,"y":51,"_angle":0.245}]},{"x":60,"y":51,"border":false,"links":[{"x":50,"y":40,"_angle":3.975},{"x":60,"y":40,"_angle":4.712},{"x":48,"y":48,"_angle":3.387},{"x":60,"y":60,"_angle":1.571},{"x":50,"y":60,"_angle":2.304},{"x":68,"y":52,"_angle":0.124}]},{"x":68,"y":52,"border":false,"links":[{"x":80,"y":60,"_angle":0.588},{"x":70,"y":60,"_angle":1.326},{"x":60,"y":40,"_angle":4.124},{"x":70,"y":40,"_angle":6.118},{"x":60,"y":51,"_angle":3.266},{"x":60,"y":60,"_angle":2.356},{"x":81,"y":49,"_angle":4.939}]},{"x":81,"y":49,"border":false,"links":[{"x":80,"y":40,"_angle":4.602},{"x":90,"y":40,"_angle":5.498},{"x":70,"y":40,"_angle":3.827},{"x":68,"y":52,"_angle":1.798},{"x":80,"y":60,"_angle":3.051},{"x":90,"y":52,"_angle":0.322}]},{"x":90,"y":52,"border":false,"links":[{"x":100,"y":60,"_angle":0.675},{"x":90,"y":60,"_angle":1.571},{"x":81,"y":49,"_angle":3.463},{"x":90,"y":40,"_angle":4.712},{"x":80,"y":60,"_angle":2.246},{"x":99,"y":50,"_angle":4.931}]},{"x":99,"y":50,"border":false,"links":[{"x":90,"y":40,"_angle":3.98},{"x":100,"y":40,"_angle":6.184},{"x":90,"y":52,"_angle":1.789},{"x":100,"y":60,"_angle":1.471},{"x":110,"y":51,"_angle":0.091}]},{"x":110,"y":51,"border":false,"links":[{"x":110,"y":40,"_angle":4.712},{"x":120,"y":40,"_angle":5.545},{"x":100,"y":40,"_angle":3.975},{"x":99,"y":50,"_angle":3.232},{"x":110,"y":60,"_angle":1.571},{"x":100,"y":60,"_angle":2.304},{"x":119,"y":52,"_angle":0.111}]},{"x":119,"y":52,"border":false,"links":[{"x":130,"y":60,"_angle":0.629},{"x":120,"y":60,"_angle":1.446},{"x":110,"y":51,"_angle":3.252},{"x":120,"y":40,"_angle":6.2},{"x":110,"y":60,"_angle":2.297},{"x":128,"y":49,"_angle":5.034}]},{"x":128,"y":49,"border":false,"links":[{"x":119,"y":52,"_angle":1.893},{"x":120,"y":40,"_angle":3.986},{"x":140,"y":50,"_angle":0.083},{"x":130,"y":60,"_angle":1.391},{"x":130,"y":41,"_angle":6.038}]},{"x":130,"y":41,"border":false,"links":[{"x":120,"y":40,"_angle":3.241},{"x":120,"y":30,"_angle":3.975},{"x":140,"y":30,"_angle":5.545},{"x":140,"y":40,"_angle":4.812},{"x":128,"y":49,"_angle":2.897},{"x":140,"y":50,"_angle":0.733},{"x":131,"y":26,"_angle":6.217}]},{"x":128,"y":13,"border":false,"links":[{"x":120,"y":10,"_angle":3.5},{"x":130,"y":0,"_angle":6.131},{"x":140,"y":10,"_angle":4.957},{"x":120,"y":20,"_angle":2.29},{"x":140,"y":20,"_angle":0.528},{"x":131,"y":26,"_angle":1.344}]},{"x":131,"y":26,"border":false,"links":[{"x":120,"y":30,"_angle":1.92},{"x":120,"y":20,"_angle":3.641},{"x":140,"y":20,"_angle":5.3},{"x":140,"y":30,"_angle":0.418},{"x":130,"y":41,"_angle":3.075},{"x":128,"y":13,"_angle":4.486}]}]'
    
     onLoad() {
       
        this.polygonPoints = [];
        console.log("ONLOAD ---")
        if(this.node.getComponent(DelaunayAssemblerImplementer)==null) {
        this.implementer = this.node.addComponent(DelaunayAssemblerImplementer);
        this.implementer.customMaterial = this.Render_Mat
        this.implementer.baseTexture = this.baseTexture;
        this.implementer.Render_Mat = this.Render_Mat;
        if (this.ancestor) {
            console.log("ANCESTOR")
            this.createPlainVertexData()
            JSON.parse(this.jsonObject).forEach(vertex => {
                if (vertex.border == true) {
                    this.polygonPoints.push(new Vec2(vertex.x, vertex.y))
                }
            })

            console.log(this.polygonPoints)
            this.node.getComponent(PolygonCollider2D).points = this.polygonPoints;
            this.node.getComponent(PolygonCollider2D).apply();
            this.implementer.customLoad(this.polygonPoints)
           
            this.node.getComponent(RigidBody2D).enabled = true;
            this.setListeners();
        }  
      
    }
   
   
    }

    getMinArea() {
        return this.minArea;
    }


    customLoad(points:Vec2[]) {
        console.log("TIMED")
        this.scheduleOnce(()=>{
            let c = this.node.getComponent(RigidBody2D);
            this.node.getComponent(PolygonCollider2D).points=points;
            this.node.getComponent(PolygonCollider2D).apply();
            this.node.getComponent(FractDelaunay).polygonPoints=points;
            c.enabled = true;
            this.setListeners();
        },0.1) 
    }

    protected onEnable(): void {
        
        console.log("ON ENABLE")

         
    }

    createPlainVertexData() {
        JSON.parse(this.jsonObject).forEach(verte => {
            let pV = new plainVertex(verte.x, verte.y, verte.border);
            verte.links.forEach(linke => {
                if (linke != null) { pV.links.push(new linkNode(linke.x, linke.y, linke._angle)); }
            });
            this.delaunayPoints.push(pV);
        })
    }


    start() {
        console.log("ON START")
      
        this.previousPos=new Vec2(this.node.position.x, this.node.position.y);
        this.previousTime=0;
        this.velVect=new Vec2(0,0);
 
       
     }

    setListeners() {
        let p = this.node.getComponent(PolygonCollider2D);
        p.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        p.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(deltaTime: number) {
      this.previousTime+=deltaTime;
        if(this.previousTime>0.2) {
            let newPos=new Vec2(this.node.position.x, this.node.position.y);
            this.velVect=new Vec2((newPos.x-this.previousPos.x)/this.previousTime,(newPos.y-this.previousPos.y)/this.previousTime);
            this.previousPos= newPos;
            this.previousTime=0;
        } 
  }


 

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log("CONTACT!")
        let otherFracturable = otherCollider.getComponent(FractDelaunay);
        let enoughImpulse=false;
        if (this.recursiveness > 0 && this.available) {
            if(otherFracturable!=null) {
                let velA= this.velVect;
                let velB= otherFracturable.velVect;
            console.log("OTHER VELOCITY: "+ velA);
            console.log("THIS VELOCITY: "+ velB);
            if(Math.abs(velA.x-velB.x)>100){
                console.log("DIF X > 500 ")
                enoughImpulse=true;
            } 
            if(Math.abs(velA.y-velB.y)>100){
                enoughImpulse=true;
                console.log("DIF Y > 500 ")
            } 

            }
            if (otherCollider.node.name == "Stomper" || (otherFracturable!=null && enoughImpulse)) {
                //    if(otherCollider.node.name == "Stomper") {
                this.available = false;
                var inverseWorldMatrix = new Mat4();
                Mat4.invert(inverseWorldMatrix, this.node.getWorldMatrix());
                let localContactPoint = contact.getWorldManifold().points[0].transformMat4(inverseWorldMatrix);
                let normalContactPoint = contact.getManifold().localNormal
                this.fractureObj = new DelaunayFracture(localContactPoint, normalContactPoint, this.node.getComponent(PolygonCollider2D).points, this.delaunayPoints);
                let result = findFracture(this.fractureObj);
                if (this.fractureObj.getDelaunayPoints() != null && this.fractureObj.getDelaunayPoints().length > 1 && result) {
                    console.log("Queueing Fracturable...")
                  //  this.createCopy(this.fractureObj);
                  StaticFractureManager.cola.enqueue(this);
                }
            }
        }
    }
    lengthVector(a: Vec2, b: Vec2) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }


    center(coords: plainVertex[]) {
        let maxX: number = -10000;
        let minX: number = 10000
        let maxY: number = -10000;
        let minY: number = 10000
        coords.forEach(element => {
            if (element.x < minX) minX = element.x
            if (element.x > maxX) maxX = element.x
            if (element.y < minY) minY = element.y
            if (element.y > maxY) maxY = element.y

        });
        let offsetX = (maxX - minX) / 2
        let offsetY = (maxY - minY) / 2
        coords.forEach(element => {
            element.x = element.x - offsetX;
            element.y = element.y - offsetY;
            element.links.forEach(e => {
                e.x = e.x - offsetX
                e.y = e.y - offsetY
            })
        });
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) { }

}


