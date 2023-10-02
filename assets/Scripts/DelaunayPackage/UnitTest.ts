import { _decorator, Component, Node, RichText, Vec2 } from 'cc';
import { linkNode } from '../LinkNodeClass';
import { TEST } from 'cc/env';
import { calculateEnvolArea, calculateEnvolArea2D, findClosestAngle } from './DelaunaySplitter';
import { earcut } from './earcut';

const { ccclass, property, executeInEditMode } = _decorator;


@ccclass('UnitTest')
@executeInEditMode
export class UnitTest extends Component {

    @property(RichText)
    outputText: RichText

    onLoad() {
        console.log("ON LOAD UNIT TEST")
    }

    onEnable() {
        this.outputText.string = "<color=#ffffff>- - - - -  RUNNING TESTS  - - - - -\n </color>"
        const tests: Function[] = [];
        tests.push(this.AngleTest1);
        tests.push(this.EarcutAreaCasitaTest)
        tests.push(this.EarcutAreaHexagonoTest)
        tests.push(this.EarcutAreaEstrellaTest)
     
      
        tests.forEach(t => {
            this.outputText.string += "<color=#00ff00>" + t.name + "\n</color>"
            if (t()) {
                this.outputText.string += "<color=#00ff00> >PASSED\n</color>"
            } else {
                this.outputText.string += "<color=#ff0000> >FAILED\n</color>"
            }
        })
    }

    update(deltaTime: number) {

    }

    static degToRad(angleDeg: number) {
        return (angleDeg / 360) * 2 * 3.141592654
    }

    
    EarcutAreaCasitaTest() {
        let nums:number[]=[];
        nums=[0,0,5,0,5,5,2.5,7.5,0,5]
        let indexes = earcut(nums,null,2)
       console.log("INDEXES: "+indexes)
        let areaCalculated=calculateEnvolArea2D(indexes, nums);
        console.log("AREA CALCULATED: "+areaCalculated);
        let areaExpected=31.25;
        return Math.abs(areaCalculated-areaExpected)<0.01;
    }

     
    EarcutAreaHexagonoTest() {
        let nums:number[]=[];
        nums=[2.3,0.77,4.81,2.22,4.81,5.12,2.30,6.57,-0.21,5.12,-0.21,2.22]
        let indexes = earcut(nums,null,2)
       console.log("INDEXES: "+indexes)
        let areaCalculated=calculateEnvolArea2D(indexes, nums);
        console.log("AREA CALCULATED: "+areaCalculated);
        let areaExpected=21.807;
        return Math.abs(areaCalculated-areaExpected)<0.1
    }
    EarcutAreaEstrellaTest() {
        let nums:number[]=[];
        nums=[-0.10,-0.88, 2.6,2.16, 5.29,-0.88, 4.0,2.97, 7.98,3.78, 4.0,4.59, 5.29,8.45, 2.60,5.41, -0.1,8.45, 1.19,4.59, -2.79,3.78, 1.19,2.97]
        let indexes = earcut(nums,null,2)
       console.log("INDEXES: "+indexes)
        let areaCalculated=calculateEnvolArea2D(indexes, nums);
        console.log("AREA CALCULATED: "+areaCalculated);
        let areaExpected=26.256;
        return Math.abs(areaCalculated-areaExpected)<0.1
    }


    AngleTest1() {
        let vectores: Vec2[] = [];
        let angulos: number[] = [];

        vectores.push(new Vec2(1, 0))
        vectores.push(new Vec2(0.94, 0.34))
        vectores.push(new Vec2(0.55, 0.84))
        vectores.push(new Vec2(0, 1))
        vectores.push(new Vec2(-0.52, 0.86))
        vectores.push(new Vec2(-1, 0))
        vectores.push(new Vec2(-0.93, -0.36))
        vectores.push(new Vec2(-0.31, -0.95))
        vectores.push(new Vec2(0, -1))
        vectores.push(new Vec2(0.20, -0.98))
        vectores.push(new Vec2(0.99, -0.17))

        angulos.push(0);
        angulos.push(20)
        angulos.push(56.7)
        angulos.push(90)
        angulos.push(121.1)
        angulos.push(180)
        angulos.push(201.1)
        angulos.push(252)
        angulos.push(270)
        angulos.push(281.5)
        angulos.push(350.4)
        console.log(vectores)
        console.log("------- TEST 1 -------")
        let linksNodesTest: linkNode[] = [];
        for (let i = 0; i < vectores.length; i++) {
            linksNodesTest.push(new linkNode(vectores[i].x, vectores[i].y, UnitTest.degToRad(angulos[i])));
        }
        return findClosestAngle(UnitTest.degToRad(359), linksNodesTest) == 0;

    }
}


