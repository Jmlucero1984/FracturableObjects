import { _decorator, Color, Component, Graphics, RichText, UITransform, Vec2 } from 'cc';

 

const { ccclass, property, executeInEditMode } = _decorator;

function isString(value: unknown): asserts value is string {
    if (typeof value !== "string") { throw new Error("Not a string") }
    else {
        console.info("ES STRING")
    }
}

function getEnvolvCoords() {
    let envolCoords: Vec2[] = []
    envolCoords.push(new Vec2(0, 0))
    envolCoords.push(new Vec2(20, 0))
    envolCoords.push(new Vec2(20, 20))
    envolCoords.push(new Vec2(40, 20))
    envolCoords.push(new Vec2(40, 40))
    envolCoords.push(new Vec2(0, 40))
    return envolCoords;
}

function Testeable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // a reference to our original method
    const originalMethod = descriptor.value;
 /*
    if (tests.indexOf(originalMethod) < 0) {
        tests.push(originalMethod)
    }
*/
}

class FirstUTest   {
 
@Testeable
Tess_ExpectedTrianglesTest_Test(): [boolean, string] {
    let successful = "Triangles lenght as expected"
    let failed = "Triangles length did't matched"
    /*
         __________
        |          |
        |     _____|
        |    |
        |____|

    */
    let nums: number[] = [];
    let envolCoords = getEnvolvCoords();
    envolCoords.forEach(v => {
        nums.push(v.x)
        nums.push(v.y)
    })

    nums.indexOf()
    let indexes = [1,2,3,3,2,1,4,5,6,6,5,4]
    console.log("INDEXES: " + indexes)
    let numTrianglesExpected = 4
    let testResult = indexes.length == numTrianglesExpected * 3
    return [testResult, testResult ? successful : failed]
}

}
