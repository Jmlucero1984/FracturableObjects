import { _decorator,   CCBoolean,   Component, Enum,  Graphics,  RichText } from 'cc';

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


    loadTest() {

        if (this.ActiveTest == true) {

            if (this.tipoTest != this.previousUTests) {
                this.richtText.string = "";
                this.richtText_unmasked.string = "";

                this.node.getComponents(UTest).forEach(t => t.destroy())
                this.loadedUT = this.node.addComponent(this.testsArray[this.tipoTest])

                this.previousUTests = this.tipoTest;
                this.loadedUT.richtText = this.richtText
                this.loadedUT.richtText_unmasked = this.richtText_unmasked
                this.loadedUT.testGrp = this.testGrp
                this.loadedUT.launch()
            }
        }

        else {
            this.node.getComponents(UTest).forEach(t => t.destroy())
            this.richtText.string = "";
            this.richtText_unmasked.string = "";
        }
    }



    protected onLoad(): void {



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


