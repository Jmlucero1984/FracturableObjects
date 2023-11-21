
import { Component } from 'cc';
import { _decorator } from 'cc';
import { Graphics } from 'cc';
import { MeshRenderData } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('CucutaTestBase')
export class CucutaTestBase extends Component {
 

    public getInstance(param:string)  {
        let tstFuncs: string[] = []
        let protoOfTest:Object = Object.getPrototypeOf(this);
        let objs = Object.getOwnPropertyNames(protoOfTest);  
        objs.forEach(t=> {
            let suffix=t.split("_").pop()
            if(suffix=="Test" || suffix=="test") {
                 let fun = t
                tstFuncs.push(fun)
            }
        }) 
        return tstFuncs
    }
    
   public sendGraphics(graphics: Graphics): CustomMeshData {
        let md: MeshRenderData[] = graphics.impl.getRenderDataList()
        return new CustomMeshData(md[0].indexCount, md[0].vertexCount, md[0].floatStride, md[0].vData, md[0].iData, md[0].indexStart)
    }
}


 

export class CustomMeshData {
    public vc:number=0;
    public ic:number=0;
    public stride:number=0;
    public vData:Float32Array=new Float32Array
    public iData:Uint16Array = new Uint16Array
    public indexStart:number=0;
 
    public constructor(vc:number,ic:number,stride:number,vData:Float32Array,iData:Uint16Array,indexStart:number) {
     this.iData=iData;
     this.ic=ic;
     this.vc=vc;
     this.stride=stride;
     this.vData=vData;
     this.indexStart=indexStart
 
    }
 
 } 

