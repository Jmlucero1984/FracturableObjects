import { _decorator} from 'cc';
import { Vec2 } from 'cc';
import { Graphics } from 'cc';
import { Color } from 'cc';
import { CucutaTestBase, CustomMeshData } from './CucutaTestBase';
 
const { ccclass } = _decorator;

@ccclass('ExampleTest')
export class ExampleTest extends CucutaTestBase {

    charT:string = "-106,-46;-82,-46;-68,25;-56,25;-52,47;-102,47;-106,25;-92,25"
    charE:string = "-66,-46;-20,-46;-17,-23;-39,-23;-36,-10;-17,-10;-12,12;-31,12;-29,25;-7,25;-2,47;-48,47"
    charS:string = "-14,-40;-6,-44;2,-47;12,-47;21,-45;30,-40;36,-31;39,-22;40,-12;37,-1;31,6;26,12;21,17;21,21;22,25;25,27;31,27;36,25;43,20;47,44;40,47;32,49;24,50;15,48;7,43;1,36;-2,28;-3,20;-3,12;0,3;5,-5;11,-11;14,-16;15,-22;11,-25;4,-23;-2,-21;-9,-17"
    
 
    Basic_Sum_Test(): [boolean, string, CustomMeshData?] {
        let successful = "2+2 Effectively is equal to 4" 
        let failed = "2+2 does not equal to 4" 
 
        let testResult = 2+2==4
        return [testResult, testResult ? successful : failed]
    }

    Basic_GraphicVisualization_Helper_Test(): [boolean, string, CustomMeshData?] {
        let successful = "Successfull Test Message" 
        let failed = "Failed Test Message" 
        let drawing:Graphics = new Graphics();
        drawing.strokeColor = Color.WHITE
        drawing.lineWidth = 1;
        drawing.lineJoin = 1  /* BEVEL =0 , ROUND = 1 , MITTER= 2*/
        drawing.lineCap = 1   /* BUTT = 0, ROUND = 1, SQUARE = 2 */
        let offset=0;

        let word:string[] = [this.charT,this.charE,this.charS,this.charT]
        for(let letter=0;letter<word.length;letter++) {
            if(letter==3) offset=155
            let points:Vec2[] = this.stringToVec2Arr(word[letter])
            drawing.moveTo(points[0].x+offset,points[0].y)
            for(let i=1;i<points.length;i++) {
                drawing.lineTo(points[i].x+offset,points[i].y)
            }
            drawing.close();
            drawing.stroke()         
        };
        return [true, true ? successful : failed,  this.sendGraphics(drawing)]
    }

    stringToVec2Arr(stringToParse:string):Vec2[] {
        let output:Vec2[]=[]
        let segments:string[] = stringToParse.split(";")
        segments.forEach(element => {
            let coords:string[] = element.split(",")
            output.push(new Vec2(Number(coords[0]), Number(coords[1]) ))
        });
        return output;

    }
}



