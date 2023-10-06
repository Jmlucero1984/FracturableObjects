import { _decorator,   CCBoolean,   CCClass,   Component, Enum,  Graphics,  RichText } from 'cc';

import { TessellationTest } from './Tesselation/Tests/TessellationTest';
import { StocasticsUTest } from './DelaunayPackage/StocasticsScatter/Tests/StocasticsUTest';
import { UTest } from './UTest';
const { ccclass, property, executeInEditMode, type } = _decorator;


export enum UnitTests {
    Tesselation = 0,
    Stocastics = 1
}




@ccclass('TestLoader')
@executeInEditMode
export class TestLoader extends Component {


    @property({ type: Enum(UnitTests) })
    tipoTest: UnitTests = UnitTests.Tesselation

    @property({
         tooltip: "Activa los test", visible:
            function (this) { this.loadTest(); return true; }

    })
    ActiveTest: boolean = true;



    @property({ group: "Ouput Rich Text" })
    @property(RichText)
    richtText: RichText
    @property({ group: "Ouput Rich Text" })
    @property(RichText)
    richtText_unmasked: RichText
    @property({ group: "Graphic" })
    @property(Graphics)
     testGrp: Graphics
    @property({ group: "Graphic" })
    @property({ slide: true, range: [-20, 20], step: 0.1 })
    time_Mult: number = 10;

    loadedUT: UTest = null

    testsArray = [TessellationTest, StocasticsUTest]
    previousUTests: UnitTests = this.tipoTest;
    testsFunctions:Function[]=[];

    static stGrps:Graphics;




    loadFunctions(unitTest:UTest) {
        let  tstFuncs:Function[]=[]
        let protoOfTest = Object.getPrototypeOf(unitTest);
        let objs = Object.getOwnPropertyNames(protoOfTest);  
 
        objs.forEach(t=> {
            if(t.split("_").pop()=="Test") {
                let fun = eval("unitTest."+t)
                tstFuncs.push(fun)
 
            }
        })
        return tstFuncs
    }

    loadTest() {
 
        if (this.ActiveTest == true) {

            if (this.tipoTest != this.previousUTests) {
                this.richtText.string = "";
                this.richtText_unmasked.string = "";

                this.node.getComponents(UTest).forEach(t => t.destroy())
                this.loadedUT = this.node.addComponent(this.testsArray[this.tipoTest])

                this.previousUTests = this.tipoTest;
                this.loadedUT.optRTx = this.richtText
                this.loadedUT.outputRichtText_unmasked = this.richtText_unmasked
                this.loadedUT.setGraphics(TestLoader.stGrps)
                this.loadedUT.launch( this.loadFunctions(this.loadedUT))
            }
        }

        else {
            this.node.getComponents(UTest).forEach(t => t.destroy())
            this.richtText.string = "";
            this.richtText_unmasked.string = "";
        }
    }



    protected onLoad(): void {
        TestLoader.stGrps = this.testGrp



        // this.myButton.node.on(Button.EventType.CLICK,()=>console.log("SDFSFD"))
        /* if(this.tipoTest==UnitTests.Tesselation) {
             this.node.addComponent(UnitTest)
         } else if (this.tipoTest==UnitTests.Stocastics ) {
             this.node.addComponent(StocasticsUTest)
         }*/
    }
    onFocusInEditor(): void {
        console.log("FOCUS")
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


