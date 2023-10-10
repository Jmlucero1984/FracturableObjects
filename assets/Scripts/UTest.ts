import { _decorator, Color, Component, Graphics, Node, RichText, UITransform } from 'cc';
const { ccclass, property } = _decorator;
export function getInstance(param:string) {
    console.log("CALLED GET INSTANCE")

    return this
}
@ccclass('UTest')
export class UTest extends Component {
    public optRTx: RichText;
    public outputRichtText_unmasked: RichText;
    public static testGraphics: Graphics
   
    
    tests: Function[] = [];

    public setGraphics(gr:Graphics) {
        UTest.testGraphics = gr
    }
    launch(functions:Function[]) {
        this.tests=functions;
    
        console.log("on Start")
        this.optRTx.string = "<color=#ffffff> - - - - - - -  RUNNING TESTS  - - - - - - -\n\n</color>"
        console.log("CANTIDAD DE TESTS: " + this.tests.length)
        this.launchTest(0, this.tests.length - 1)

    }

    public getInstance(param:string)  {
        console.log("CALLED GET INSTANCE")
        let tstFuncs: string[] = []
        let protoOfTest = Object.getPrototypeOf(this);
        let unitTeststr=this.name
        console.log("EL NAME: "+unitTeststr)
        let objs = Object.getOwnPropertyNames(protoOfTest);  
        console.log("CANT OF OBJECTS: " + objs.length)
        objs.forEach(t=> {
            console.log("Type: " + typeof t)
          //  console.log(t)
            if(t.split("_").pop()=="Test") {
                 let fun = t
                tstFuncs.push(fun)
 
            }
        })
       /* console.log("FUNCTIONS: " + tstFuncs.length)
        tstFuncs.forEach(u=> {
            if(u!=null)
            console.log(u.name)
        })*/
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


