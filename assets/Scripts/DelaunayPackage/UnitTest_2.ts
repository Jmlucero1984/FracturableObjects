import { _decorator, assert, assertID, Component, Node, RichText, Vec2 } from 'cc';

const { ccclass, property, executeInEditMode } = _decorator;

function isString(value: unknown): asserts value is string {
    if (typeof value !== "string") { throw new Error("Not a string") }
    else {
        console.info("ES STRING")
    }
}

const vectores: Vec2[] = [];
const angulos: Number[] = [];
 
@ccclass('UnitTest2')
@executeInEditMode
export class UnitTest_2 extends Component {

    @property(RichText)
    richtText: RichText



    static outputRichtText: RichText;



    onLoad() {
        UnitTest_2.outputRichtText = this.richtText;
        console.log("ON LOAD UNIT TEST 2")


        vectores.push(new Vec2(1, 0))
        vectores.push(new Vec2(0.94, 0.34))
        vectores.push(new Vec2(0.55, 0.84))

        angulos.push(0);
        angulos.push(20)
        angulos.push(56.7)


    }




    onEnable() {
        console.log("on Start")

        const tests: Function[] = [];
        tests.push(this.SimpleTest2);
        UnitTest_2.outputRichtText.string = "<color=#ffffff>- - - -  RUNNING TESTS - - - -\n </color>"
        tests.forEach(t => {
            UnitTest_2.outputRichtText.string += "<color=#00ff00>" + t.name + "\n</color>"
            if (t()) {
                UnitTest_2.outputRichtText.string += "<color=#00ff00> >PASSED\n</color>"
            } else {
                UnitTest_2.outputRichtText.string += "<color=#ff0000> >FAILED\n</color>"
            }
        })
    }

    update(deltaTime: number) {

    }


    SimpleTest2():boolean {
        UnitTest_2.outputRichtText.string = "<color=#ffffff>- Running -\n </color>"
        let nums: number[] = [];
        vectores.forEach(t => {
            console.log(t)
        })
        return vectores.length==angulos.length;


    }
}

