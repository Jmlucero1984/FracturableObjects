import { _decorator, Component, Graphics,Vec2 } from 'cc';

const { ccclass, property } = _decorator;


const EPSILON = 1.0e-6
const constPI = 3.14159265359

class linkNode extends Vec2 {
    public x = 0;
    public y = 0;
    public _angle = 0;
    constructor(x: number, y: number, angle: number) {
        super();
        this.x = x;
        this.y = y;
        this._angle = angle;
    }
}
class plainVertex extends Vec2 {
    public x = 0;
    public y = 0;
    public border: boolean = false;
    public links: linkNode[] = []
    constructor(x: number, y: number, border: boolean = false) {
        super();
        this.x = x;
        this.y = y;
        this.border = border;
    }
    public toString():string {
        let output= '{"x":'+this.x+',"y":'+this.y+',"border":'+this.border+',"links":['
        
        if(this.links[0]==null) {output+="null"}
        else{
            for(let i=0;i<this.links.length;i++) {
                let l=this.links[i]
             
                output+='{"x":'+l.x+',"y":'+l.y+',"_angle":'+l._angle+'}'
                if(i!=this.links.length-1) output+=","
              
            }
        }
        output+="]}"
        return output


    }
}

 

class Vertex extends Vec2 {
    public x = 0;
    public y = 0;
    public border: boolean = false;
    public links: Pair[] = []
    constructor(x: number, y: number, border: boolean = false) {
        super();
        this.x = x;
        this.y = y;
        this.border = border;
    }

    addLink(v: Pair) {
        let founded = false;
        this.links.forEach(element => {
            if (v.vertex === element.vertex) {
                founded = true;
            }
        });
        if (!founded) this.links.push(v);
    }
}

export function removeOutRunners(verts: plainVertex[]) {
    let cant = 0;
    while (verts[cant] != null && verts[cant].border) {
        cant++;
    }
    for (let j = 0; j < cant; ++j) {
        let a = verts[j];
        let b = verts[0];
        let c = verts[j - 1];
        if (j < cant - 1) b = verts[j + 1];
        if (j == 0) c = verts[cant - 1]
        let v1 = unitaryVector(a, b)
        let v2 = unitaryVector(a, c)
        let maxAngle = getRelativeAngle(v1, v2)
         if (a.links.length > 0) {
            for (let k = 0; k < a.links.length; k++) {
                if (a.links[k] != null) {
                    v2 = unitaryVector(a, a.links[k])
                    let angle = getRelativeAngle(v1, v2)
                    if (angle >= maxAngle || angle==0) {
                        a.links[k] = null;
                    }
                }
            }
        }
        filterNulls(a.links)
    }
}


export function getRads(vecA:Vec2){
    const constPI = 3.14159265359
    if(vecA.x<0.001&&vecA.x>-0.001 ){
        if(vecA.y>0){ return constPI/2 } else{ return constPI*(3/2) }
    }
    if(vecA.y<0.001 &&vecA.y>-0.001 ){
        if(vecA.x>0){ return 0 } else { return constPI }
    }
        let baseAngle=Math.atan((vecA.y) / (vecA.x))
        if(vecA.x<0&&vecA.y>0) baseAngle=(constPI+baseAngle)
        if(vecA.x<0&&vecA.y<0) baseAngle=constPI+baseAngle
        if(vecA.x>0&&vecA.y<0) baseAngle=2*constPI+baseAngle
    return baseAngle

}
export function getRelativeAngle(vecA: Vec2, vecB: Vec2) {
    let rads=getRads(vecA) 
    let transformedVectorB=new Vec2(vecB.x*Math.cos(rads)+vecB.y*Math.sin(rads),-1*vecB.x*Math.sin(rads)+vecB.y*Math.cos(rads));
   return round(getRads(transformedVectorB),3);

}

export function round(n:number, decimals:number){
    return Math.round(n*Math.pow(10,decimals))/(Math.pow(10,decimals));
}

export function filterNulls(elementsArr: any[]) {
    for (let i = 0; i < elementsArr.length; i++) {
        if (elementsArr[i] == null) {
            for (let j = i + 1; j < elementsArr.length; j++) {
                if (elementsArr[j] != null) {
                    elementsArr[i] = elementsArr[j];
                    elementsArr[j] = null;
                    break;
                }
            }
        }
    }
    for (let i = elementsArr.length - 1; i > 0; i--) {
        if (elementsArr[i] == null) elementsArr.pop();
    }
}

class Pair {
    public vertex: Vertex;
    public angle: number;
    constructor(vertex: Vertex, angle: number) {
        this.vertex = vertex;
        this.angle = angle;
    }
}


class Edge {
    public v0: Vertex;
    public v1: Vertex;
    constructor(v0: Vertex, v1: Vertex) {
        this.v0 = v0;
        this.v1 = v1;
    }
    equals = function (other: Edge) { return (this.v0 === other.v0 && this.v1 === other.v1); }
    inverse = function () { return new Edge(this.v1, this.v0); };
}

class Triangle {
    public v0: Vertex;
    public v1: Vertex;
    public v2: Vertex;
    public center: number = 0;
    constructor(v0: Vertex, v1: Vertex, v2: Vertex) {
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.calcCircumCicle();
    }

    calcCircumCicle = function () {
        var A = this.v1.x - this.v0.x;
        var B = this.v1.y - this.v0.y;
        var C = this.v2.x - this.v0.x;
        var D = this.v2.y - this.v0.y;
        var E = A * (this.v0.x + this.v1.x) + B * (this.v0.y + this.v1.y);
        var F = C * (this.v0.x + this.v2.x) + D * (this.v0.y + this.v2.y);
        var G = 2.0 * (A * (this.v2.y - this.v1.y) - B * (this.v2.x - this.v1.x));
        var dx, dy;
        if (Math.abs(G) < EPSILON) {
            var minx = Math.min(this.v0.x, this.v1.x, this.v2.x);
            var miny = Math.min(this.v0.y, this.v1.y, this.v2.y);
            var maxx = Math.max(this.v0.x, this.v1.x, this.v2.x);
            var maxy = Math.max(this.v0.y, this.v1.y, this.v2.y);
            this.center = new Vertex((minx + maxx) / 2, (miny + maxy) / 2);
            dx = this.center.x - minx;
            dy = this.center.y - miny;
        } else {
            var cx = (D * E - B * F) / G;
            var cy = (A * F - C * E) / G;
            this.center = new Vertex(cx, cy);
            dx = this.center.x - this.v0.x;
            dy = this.center.y - this.v0.y;
        }
        this.radius_squared = dx * dx + dy * dy;
        this.radius = Math.sqrt(this.radius_squared);
    };

    inCircumcircle = function (v: Vertex) {
        var dx = this.center.x - v.x;
        var dy = this.center.y - v.y;
        var dist_squared = dx * dx + dy * dy;
        return (dist_squared <= this.radius_squared);
    }
}

function cross(vecA: Vec2, vecB: Vec2) {
    return vecA.x * vecB.y - vecB.x * vecA.y;
}

function lengthVector(a: Vec2, b: Vec2) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function unitaryVector(posA: Vec2, posB: Vec2) {
    let length = lengthVector(posA, posB);
    return new Vec2((posB.x - posA.x) / length, (posB.y - posA.y) / length);
}



@ccclass('Delaunay')
export class Delaunay extends Graphics {

     generateDelaunay(externals:Vec2[],internals:Vec2[]) {
        this.clear()
        let vertices: Vertex[] = [];
        console.log("EXTERNAL POINTS SIZE: "+externals.length)
        console.log("INTERNAL POINTS SIZE: "+internals.length)
        externals.forEach(element => {
            vertices.push(new Vertex(element.x,element.y,true))
        });
        internals.forEach(element => {
            vertices.push(new Vertex(element.x,element.y))
        });
        let triangles = this.triangulate(vertices)

        triangles.forEach(triangle => {
            triangle.v0.addLink(new Pair(triangle.v1,  getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v1))))
            triangle.v1.addLink(new Pair(triangle.v0, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v1, triangle.v0))))
            triangle.v1.addLink(new Pair(triangle.v2, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v1, triangle.v2))))
            triangle.v2.addLink(new Pair(triangle.v1, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v2, triangle.v1))))
            triangle.v0.addLink(new Pair(triangle.v2, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v2))))
            triangle.v2.addLink(new Pair(triangle.v0, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v2, triangle.v0))))
            this.moveTo(triangle.v0.x, triangle.v0.y)
            this.lineTo(triangle.v1.x, triangle.v1.y)
            this.lineTo(triangle.v2.x, triangle.v2.y)
            this.lineTo(triangle.v0.x, triangle.v0.y)
            this.stroke();
        });
        let plainVerts = this.plainData(vertices);
        removeOutRunners(plainVerts)
      
        let outputString="[";
        for(let i=0;i<plainVerts.length;i++) {
            outputString+=plainVerts[i].toString()
            if(i!=plainVerts.length-1) outputString+=","

        }
        outputString+="]"
        console.log("----- DELAUNAY OUTPUT -----")
        console.log(outputString)
        

    }


    start() {
        let numeros = [12, 35, 97, 35]
        numeros = numeros.filter((x) => x % 2 == 0)
        let vertices: Vertex[] = [];
        vertices.push(new Vertex(0, 0, true))   //0
        vertices.push(new Vertex(10, 0, true))  //1
        vertices.push(new Vertex(20, 0, true))  //2
        vertices.push(new Vertex(20, 10, true)) //3
        vertices.push(new Vertex(20, 20, true)) //4
        vertices.push(new Vertex(20, 30, true)) //5
        vertices.push(new Vertex(20, 40, true)) //6
        vertices.push(new Vertex(30, 40, true)) //7
        vertices.push(new Vertex(40, 40, true)) //8
        vertices.push(new Vertex(50, 40, true)) //8
        vertices.push(new Vertex(60, 40, true)) //8
        vertices.push(new Vertex(70, 40, true)) //8
        vertices.push(new Vertex(80, 40, true)) //8
        vertices.push(new Vertex(90, 40, true)) //8
        vertices.push(new Vertex(100, 40, true)) //8
        vertices.push(new Vertex(110, 40, true)) //8
        vertices.push(new Vertex(120, 40, true)) //8
        vertices.push(new Vertex(120, 30, true)) //8
        vertices.push(new Vertex(120, 20, true)) //8
        vertices.push(new Vertex(120, 10, true)) //8
        vertices.push(new Vertex(120, 0, true)) //8
        vertices.push(new Vertex(130, 0, true)) //8
        vertices.push(new Vertex(140, 0, true)) //8
        vertices.push(new Vertex(140, 10, true)) //8
        vertices.push(new Vertex(140, 20, true)) //8
        vertices.push(new Vertex(140, 30, true)) //8
        vertices.push(new Vertex(140, 40, true)) //8
        vertices.push(new Vertex(140, 50, true)) //8
        vertices.push(new Vertex(140, 60, true)) //8
        vertices.push(new Vertex(130, 60, true)) //8
        vertices.push(new Vertex(120, 60, true)) //8
        vertices.push(new Vertex(110, 60, true)) //8
        vertices.push(new Vertex(100, 60, true)) //8
        vertices.push(new Vertex(90, 60, true)) //8
        vertices.push(new Vertex(80, 60, true)) //8
        vertices.push(new Vertex(70, 60, true)) //8
        vertices.push(new Vertex(60, 60, true)) //8
        vertices.push(new Vertex(50, 60, true)) //8
        vertices.push(new Vertex(40, 60, true)) //10
        vertices.push(new Vertex(30, 60, true)) //11
        vertices.push(new Vertex(20, 60, true)) //12
        vertices.push(new Vertex(10, 60, true)) //13
        vertices.push(new Vertex(0, 60, true))  //14
        vertices.push(new Vertex(0, 50, true))  //15
        vertices.push(new Vertex(0, 40, true))  //16
        vertices.push(new Vertex(0, 30, true))  //17
        vertices.push(new Vertex(0, 20, true))  //18
        vertices.push(new Vertex(0, 10, true))  //19
        vertices.push(new Vertex(8, 41))  //7
        vertices.push(new Vertex(9, 48))  //7
        vertices.push(new Vertex(10, 13)) //8
        vertices.push(new Vertex(11, 26)) //8
        vertices.push(new Vertex(18, 47))
        vertices.push(new Vertex(31, 52))
        vertices.push(new Vertex(48, 48))
        vertices.push(new Vertex(60, 51))
        vertices.push(new Vertex(68, 52))
        vertices.push(new Vertex(81, 49))
        vertices.push(new Vertex(90, 52))
        vertices.push(new Vertex(99, 50))
        vertices.push(new Vertex(110, 51))
        vertices.push(new Vertex(119, 52))
        vertices.push(new Vertex(128, 49))
        vertices.push(new Vertex(130, 41))  //7
        vertices.push(new Vertex(128, 13)) //8
        vertices.push(new Vertex(131, 26)) //8
        let triangles = this.triangulate(vertices)

        triangles.forEach(triangle => {
            triangle.v0.addLink(new Pair(triangle.v1,  getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v1))))
            triangle.v1.addLink(new Pair(triangle.v0, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v1, triangle.v0))))
            triangle.v1.addLink(new Pair(triangle.v2, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v1, triangle.v2))))
            triangle.v2.addLink(new Pair(triangle.v1, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v2, triangle.v1))))
            triangle.v0.addLink(new Pair(triangle.v2, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v2))))
            triangle.v2.addLink(new Pair(triangle.v0, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v2, triangle.v0))))
            this.moveTo(triangle.v0.x, triangle.v0.y)
            this.lineTo(triangle.v1.x, triangle.v1.y)
            this.lineTo(triangle.v2.x, triangle.v2.y)
            this.lineTo(triangle.v0.x, triangle.v0.y)
            this.stroke();
        });
        let plainVerts = this.plainData(vertices);
        removeOutRunners(plainVerts)
            plainVerts.forEach(element => {
            
        });
        console.log("----- DELAUNAY -----")
        let outputString="[";
        for(let i=0;i<plainVerts.length;i++) {
            outputString+=plainVerts[i].toString()
            if(i!=plainVerts.length-1) outputString+=","

        }
        outputString+="]"
        console.log(outputString)
    }



    plainData(verts: Vertex[]) {
        let output: plainVertex[] = []
        verts.forEach(element => {
            let pV = new plainVertex(element.x, element.y, element.border);
            element.links.forEach(lk => {
                if (lk != null) {
                    let lN = new linkNode(lk.vertex.x, lk.vertex.y, lk.angle)
                    pV.links.push(lN);
                }
            })
            output.push(pV);
        })
        return output
    }

 

    update(deltaTime: number) { }


    triangulate(vertices) {
        var triangles: Triangle[] = [];
        // First, create a "supertriangle" that bounds all vertices
        let st = this.createBoundingTriangle(vertices);
   
        triangles.push(st);
        // Next, begin the triangulation one vertex at a time
        // NOTE: This is O(n^2) - can be optimized by sorting vertices
        // along the x-axis and only considering triangles that have
        // potentially overlapping circumcircles
        vertices.forEach((vertex: Vertex) => {
            triangles = this.addVertex(vertex, triangles)
        });
        // Remove triangles that shared edges with "supertriangle"
        triangles = triangles.filter((triangle) => {
            if (triangle.v0 == st.v0 || triangle.v0 == st.v1 || triangle.v0 == st.v2 ||
                triangle.v1 == st.v0 || triangle.v1 == st.v1 || triangle.v1 == st.v2 ||
                triangle.v2 == st.v0 || triangle.v2 == st.v1 || triangle.v2 == st.v2) return false;
            return true;
        })
        return triangles;
    }

    // Internal: create a triangle that bounds the given vertices, with room to spare
    createBoundingTriangle(vertices) {
        // NOTE: There's a bit of a heuristic here. If the bounding triangle
        // is too large and you see overflow/underflow errors. If it is too small
        // you end up with a non-convex hull.
        var minx, miny, maxx, maxy;
        vertices.forEach(function (vertex) {
            if (minx === undefined || vertex.x < minx) { minx = vertex.x; }
            if (miny === undefined || vertex.y < miny) { miny = vertex.y; }
            if (maxx === undefined || vertex.x > maxx) { maxx = vertex.x; }
            if (maxy === undefined || vertex.y > maxy) { maxy = vertex.y; }
        });
        var dx = (maxx - minx) * 5;
        var dy = (maxy - miny) * 5;
        var stv0 = new Vertex(minx - dx, miny - dy * 3);
        var stv1 = new Vertex(minx - dx, maxy + dy);
        var stv2 = new Vertex(maxx + dx * 3, maxy + dy);
        return new Triangle(stv0, stv1, stv2);
    }

    // Internal: update triangulation with a vertex
    addVertex(vertex: Vertex, triangles: Triangle[]) {
        var edges: Edge[] = [];
        // Remove triangles with circumcircles containing the vertex
        triangles = triangles.filter((triangle) => {
            if (triangle.inCircumcircle(vertex)) {
                edges.push(new Edge(triangle.v0, triangle.v1));
                edges.push(new Edge(triangle.v1, triangle.v2));
                edges.push(new Edge(triangle.v2, triangle.v0));
                return false;
            }
            return true;
        });

        //console.log("ADDED VERTEX: " + triangles.length)
        edges = this.uniqueEdges(edges);
        // Create new triangles from the unique edges and new vertex
        edges.forEach((edge) => {
            triangles.push(new Triangle(edge.v0, edge.v1, vertex));
        });
        return triangles;
    }

    // Internal: remove duplicate edges from an array
    uniqueEdges(edges) {
        // TODO: This is O(n^2), make it O(n) with a hash or some such
        var uniqueEdges = [];
        for (var i = 0; i < edges.length; ++i) {
            var edge1 = edges[i];
            var unique = true;
            for (var j = 0; j < edges.length; ++j) {
                if (i === j)
                    continue;
                var edge2 = edges[j];
                if (edge1.equals(edge2) || edge1.inverse().equals(edge2)) {
                    unique = false;
                    break;
                }
            }
            if (unique) uniqueEdges.push(edge1);
        }
        return uniqueEdges;
    }
}


