import { Canvas } from 'cc';
import { _decorator, Color, Component, Graphics, Node, RichText, UITransform } from 'cc';
import { Context, Script } from 'vm';
import { TessellationTest } from './Tesselation/Tests/TessellationTest';
const { ccclass, property } = _decorator;
/*
export function Testeable(target: any, propertyKey: string, descriptor: PropertyDescriptor):TypedPropertyDescriptor<() => [boolean, string]> {
    throw new Error('Function not implemented.');
}*/

export function Testeable (target: any, propertyKey: string, descriptor: PropertyDescriptor )   {
}

 
export const Testeable2:MethodDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor ) =>     {
 
    const originalMethod = descriptor.value;
    // Override the decorated method's behavior with new behavior
    descriptor.value = function (...args: any[]) {
        let msg: string;
        // The decorated method's parameters will be passed in as args.
        // We'll assume the decorated method might only have a single parameter,
        // check to see if it's been passed in the method
        if(args[0]){
            msg = (`${propertyKey}, that has a parameter value: ${args[0]}`)
        }
        else{
            msg = `${propertyKey}`
        }
        // Emit a message to the console
        console.log(`Logger says - calling the method: ${msg}`);
        // Execute the behavior originally programmed in
        // the decorated method
        const result = originalMethod.apply(this, args);
        // if the decorated method returned a value when executed,
        // capture that result
        if(result){
            msg = `${propertyKey} and returned: ${JSON.stringify(result)}`;
        }
        else{
            msg = `${propertyKey}`;
        }
        // Having executed the decorated method's behavior, emit
        // a message to the console report what happened
        console.log(`Logger says - called the method: ${msg}`);
        
    }
 
 
 };


 
 
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
type ExtractInstanceType<T> = T extends new (...args: any[]) => infer R ? R : T extends { prototype: infer P } ? P : any;
type ExtractMethodNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never }[keyof T];
type ExtractMethods<T> = Pick<T, ExtractMethodNames<T>>;
    type SomeClassMethods = ExtractMethods<TessellationTest>;
   
 
   
@ccclass('UTest')
export class UTest extends Component {
    public optRTx: RichText;
    public outputRichtText_unmasked: RichText;
    public static testGraphics: Graphics
    public static canvasElement:HTMLCanvasElement
    testsNames:string[] = [];
 
   
    
    tests: Function[] = [];
 

    

    /*
    Some time ago, i've tried to decorate functions with @Testeable. At the loading moment all marked as Testeable
    would have been called and the decorator function would push each one's decorated into a funtion[] to be call 
    later
    */
    launch(functions:Function[]) {
        this.tests=functions;
    
        console.log("on Start")
        this.optRTx.string = "<color=#ffffff> - - - - - - -  RUNNING TESTS  - - - - - - -\n\n</color>"
        console.log("CANTIDAD DE TESTS: " + this.tests.length)
        this.launchTest(0, this.tests.length - 1)

    }

    /*
       const getMethods = (obj) => {
        let properties = new Set()
        let currentObj = obj
        do {
            Object.getOwnPropertyDescriptors(obj,"function").map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        console.log("TIPOS")
        properties.forEach(element => {
            console.log(typeof element)
        });
        return [...properties.keys()].filter(item => typeof item === 'function')
        }
*/

    public getInstance(param:string)  {
        console.log("CALLED GET INSTANCE")
        let tstFuncs: string[] = []
        let protoOfTest:Object = Object.getPrototypeOf(this);
        let objs = Object.getOwnPropertyNames(protoOfTest);  
        console.log("CANT OF OBJECTS: " + objs.length)
        objs.forEach(t=> {
          //  console.log("Type: " + typeof t)
            if(t.split("_").pop()=="Test") {
                 let fun = t
                tstFuncs.push(fun)
 
            }
        }) 
 
 
        return tstFuncs
    }

 
    
    launchTest(i: number, total: number) {
        let tlcl = Color.CYAN.toHEX() // Title color
        let fdcl = Color.RED.toHEX() // Failed color
        let sfcl = Color.GREEN.toHEX() // Success color

        this.optRTx.string += "<color=#" + tlcl + ">● " + this.tests[i].name + "\n</color>"
        let rslt = this.tests[i]();

        this.optRTx.string += rslt[0] ? "<color=#" + sfcl + ">>PASSED\n" + rslt[1] + "\n\n</color>" : "<color=#" + fdcl + ">>FAILED\n" + rslt[1] + "\n\n</color>"

        let newHeight =   this.optRTx.getComponent(UITransform).height;

        this.optRTx.node.parent.getComponent(UITransform).height = newHeight
        this.outputRichtText_unmasked.string = this.optRTx.string;
        if (i < total) {
            setTimeout(() => {
                this.launchTest(++i, total)
            }, 100)
        }
    }
}


