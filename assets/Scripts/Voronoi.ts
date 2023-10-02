import { _decorator, Component, Graphics, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;


class Point {
    public x: number;
    public y: number;
    cell: VPolygon;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static distance = function (t, n) {
        return Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y))
    }
}

class VEdge {

    public left: Point;
    public right: Point;
    public start: Point;
    public end: Point;
    public f: number
    public g: number
    public direction: Point;
    public B: Point;
    public intersected: boolean;
    public iCounted: boolean;
    public neighbour;

    constructor(i: Point, t: Point, h: Point) {// start, left, right
        this.left = t
        this.right = h
        this.start = i
        this.end = null
        this.f = (h.x - t.x) / (t.y - h.y)
        this.g = i.y - this.f * i.x
        this.direction = new Point(h.y - t.y, -(h.x - t.x))
        this.B = new Point(i.x + this.direction.x, i.y + this.direction.y)// second point of line
        this.intersected = false;
        this.iCounted = false;
        this.neighbour = null;
    }
}

class VQueue {
    public q = [];
    public i = 0

    constructor() {

    }

    sortOnY(a, b) {
        return a.y > b.y ? 1 : -1
    }
    enqueue = function (t: VEvent) {
        this.q.push(t)
    }
    dequeue = function () {
       this.q.sort(this.sortOnY)
        return ( this.q.pop())
    }
    remove = function (e) {
        var index = -1;
        for (this.i = 0; this.i < this.q.length; this.i++)
            if (this.q[this.i] == e) {
                index= this.i
                break
            }
        this.q.splice(index, 1)
    }
    isEmpty = function () {
        return ( this.q.length==0)
    }
    clear = function (b) {
        this.q = []
    }
}



// counter clock wise
// (-1,1), (1,1), (1,-1), (-1,-1)
class VPolygon {
    public size = 0
    public vertices = []
    public first = null
    public last = null
    constructor() {

    }
    addRight = function (p) {
        this.vertices.push(p);
        ++this.size;
        this.last = p;
        if(this.size==1) this.first = p;
    }
    addLeft = function (p) {
        var vs = this.vertices;
        this.vertices = [p];
        for(var i=0; i<vs.length; i++) 
            this.vertices.push(vs[i]);
            
        ++this.size;
        this.first = p;
        if(this.size==1) this.last = p
    }
}

class VParabola {
    public cEvent = null
    public parent = null
    public _left = null
    public _right = null
    public site;
    public isLeaf;
    public edge;
 

    constructor(t) {

        this.site = t;
        this.isLeaf = (this.site != null);
    }
    get left(){
        return this._left;
    } 
    get right(){
        return this._right;
    } 
	
	set left(p){
        this._left = p;
		p.parent = this;
    } 
    set right(p){
        this._right = p;
		p.parent = this;
    }

}

class VEvent {
    public point: Point
    public pe;
    public y;
    public key = 1e8 * Math.random()
    public arch = null
    public value = 0

    constructor(t: Point, i: boolean) {
        this.point = t;
        this.pe = i;
        this.y = t.y

    }
    compare = function(other)
{
	return((this.y>other.y)?1:-1);
}
 
}

const sortVEvent = (evenA: VEvent, eventB: VEvent) => {
    
    if (evenA.y < eventB.y ) {
        return -1;
    }
    if (evenA.y > eventB.y ) {
        return 1;
    }
    return 0;
}

const sortPoint_by_y = (pointA: Point, pointB: Point) => {
    
    if (pointA.y < pointB.y ) {
        return -1;
    }
    if (pointA.y > pointB.y ) {
        return 1;
    }
    return 0;
}





@ccclass('Voronoi')
export class Voronoi extends Graphics {
    places: Point[] = []
    edges: VEdge[] = []
    cells: VPolygon[] = [];
    queue = new VQueue;
    width = 40      
    height = 60
    root = null
    ly = 0
    lasty = 0
    firstPoint: Point = null


    start() {
        let vertices: Point[] = [];

  
       
       //vertices.push(new Point(20,40))
 
  
       
   
 
       vertices.push(new Point(15,20))
       vertices.push(new Point(20,42))
       vertices.push(new Point(8,40))
 
 
 
       vertices.push(new Point(10,13))
       vertices.push(new Point(18,43))
       vertices.push(new Point(30,50))
       
        this.drawPoints(vertices)

        this.Compute(vertices,40, 60);
        let e = this.GetEdges();
 
        console.log(":::::::::::::")
      //  console.log(e)
        this.drawEdges(e)
      //  this.drawCells(c);


    }

    drawCells(cells:VPolygon[]){
        console.log("DRAW CELLS")
        console.log(cells.length)

   
    for(var i=0; i<cells.length; i++)
    {
        console.log(cells[i])
        var p = cells[i].vertices;
        if(p.length == 0) continue;
        if(p.length == 4)
        {
            console.log(cells[i].vertices);
            console.log(p);
        }
      //  c.fillStyle = colors[i];
       // c.beginPath();
        this.moveTo(p[0].x, p[0].y);
        for(var j=1; j<p.length; j++){
            this.lineTo(p[j].x, p[j].y);
        }
       this.close();
       this.fill();
    }
}
 

    update(deltaTime: number) {

    }
    GetLineIntersection(a1, a2, b1, b2) {
        var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
        var day = (a1.y-a2.y), dby = (b1.y-b2.y);
                
        var Den = dax*dby - day*dbx;
        if (Den == 0) return null;	// parallel
    
        var A = (a1.x * a2.y - a1.y * a2.x);
        var B = (b1.x * b2.y - b1.y * b2.x);
            
        var I = new Point(0,0);
        I.x = ( A*dbx - dax*B ) / Den;
        I.y = ( A*dby - day*B ) / Den;
        
        return I;
    
    }


    Compute(p: Point[], width: number, height: number) {
        if (p.length < 2)
            return [];
        this.root = null
        this.places = p
        this.edges = []
        this.cells = []
        this.width = width
        this.height = height
   
 
        //  this.queue.clear(!0)
        this.queue.clear(true)
        for (let i = 0; i < this.places.length; i++) {
            let ev = new VEvent(this.places[i], true)
            let cell = new VPolygon();
            this.places[i].cell = cell
            this.queue.enqueue(ev)
            this.cells.push(cell)
        }
      
 
        while (!this.queue.isEmpty()) {
            var e: VEvent = this.queue.dequeue();
            this.ly = e.point.y;
            if(e.pe) this.insertParabola(e.point);
            else this.RemoveParabola(e);
            this.lasty = e.y;
        }

        this.FinishEdge(this.root)
        for(let i=0; i<this.edges.length; i++)
		if(this.edges[i].neighbour) this.edges[i].start = this.edges[i].neighbour.end;
    }

    drawPoints(e:Point[]) {
        for (let i = 0; i < e.length; i++) {
            this.circle(e[i].x,e[i].y,1);
            this.fill();
        }
    }

    drawEdges(e:VEdge[]) {
      /*  console.log("DRAWINGGG")
        e.forEach(element => {
            console.log(element)
        });*/
 
       // this.moveTo(n.left.x, n.left.y);
        for (let i = 0; i < e.length; i++) {
            
           let n = e[i];
       
          //  if(n.end==null) {n.end=n.left}
      
                console.log("DRAW")

      
            this.moveTo(n.start.x, n.start.y);
            this.lineTo(n.end.x, n.end.y)
            this.stroke();
          //  }

        }

    }

    GetEdges() {
        return this.edges
    }

    GetCells = function () {
        return this.cells
    }
    insertParabola = function (p: Point) {
        if(!this.root){this.root = new VParabola(p); this.fp = p; return;}
	
        if(this.root.isLeaf && this.root.site.y - p.y <0.01)	// degenerovaný případ - první dvě místa ve stejné výšce
        {
            this.root.isLeaf = false;
            this.root.left = new VParabola(this.fp);
            this.root.right = new VParabola(p);
            var s = new Point((p.x+this.fp.x)/2, this.height);
            if(p.x>this.fp.x) this.root.edge = new VEdge(s, this.fp, p);
            else this.root.edge = new VEdge(s, p, this.fp);
            this.edges.push(this.root.edge);
            return;
        }
        
        var par = this.GetParabolaByX(p.x);
        
        if(par.cEvent)
        {
            this.queue.remove(par.cEvent);
            par.cEvent = null;
        }
    
        var start = new Point(p.x, this.GetY(par.site, p.x));
        
        var el = new VEdge(start, par.site, p);
        var er = new VEdge(start, p, par.site);
        
        el.neighbour = er;
        this.edges.push(el);
        
        par.edge = er;
        par.isLeaf = false;
        
        var p0 = new VParabola(par.site);
        var p1 = new VParabola(p);
        var p2 = new VParabola(par.site);
        
        par.right = p2;
        par.left = new VParabola(null);
        par.left.edge = el;
    
        par.left.left = p0;
        par.left.right = p1;
        
        this.CheckCircle(p0);
        this.CheckCircle(p2);
    }

    RemoveParabola(e: VEvent) {
        var p1 = e.arch;
	
        var xl = this.GetLeftParent(p1);
        var xr = this.GetRightParent(p1);
            
        var p0 = this.GetLeftChild(xl);
        var p2 = this.GetRightChild(xr);
        
        if(p0.cEvent){this.queue.remove(p0.cEvent); p0.cEvent = null;}
        if(p2.cEvent){this.queue.remove(p2.cEvent); p2.cEvent = null;}
                    
        var p = new Point(e.point.x, this.GetY(p1.site, e.point.x));
    
        
        if(p0.site.cell.last == p1.site.cell.first ) p1.site.cell.addLeft(p);
        else p1.site.cell.addRight(p);
        
        p0.site.cell.addRight(p);
        p2.site.cell.addLeft(p);
        
        this.lasty = e.point.y;
            
        xl.edge.end = p;
        xr.edge.end = p;
        
        var higher;
        var par = p1;
        while(par != this.root)
        {
            par = par.parent;
            if(par == xl) {higher = xl;}
            if(par == xr) {higher = xr;}
        }
        
        higher.edge = new VEdge(p, p0.site, p2.site);
    
        this.edges.push(higher.edge);
        
        var gparent = p1.parent.parent;
        if(p1.parent.left == p1)
        {
            if(gparent.left  == p1.parent) gparent.left  = p1.parent.right;
            else p1.parent.parent.right = p1.parent.right;
        }
        else
        {
            if(gparent.left  == p1.parent) gparent.left  = p1.parent.left;
            else gparent.right = p1.parent.left;
        }
        
        this.CheckCircle(p0);
        this.CheckCircle(p2)
    }

    FinishEdge(n) {
        var mx;
        if(n.edge.direction.x > 0.0)
        {
            mx = Math.max(this.width, n.edge.start.x + 10 );
        }
        else
        {
            mx = Math.min(0.0, n.edge.start.x - 10);
        }
        n.edge.end = new Point(mx, n.edge.f*mx + n.edge.g);
        
        if(!n.left.isLeaf)  this.FinishEdge(n.left);
        if(!n.right.isLeaf) this.FinishEdge(n.right);
    }

    GetXOfEdge(par,y) {
       
	var left =	this.GetLeftChild (par);
	var right =	this.GetRightChild(par);
			
	var p = left.site;
	var r = right.site;
	
	var dp = 2*(p.y - y);
	var a1 = 1/dp;
	var b1 = -2*p.x/dp;
	var c1 = y+dp*0.25 + p.x*p.x/dp;
	
	dp = 2*(r.y - y);
	var a2 = 1/dp;
	var b2 = -2*r.x/dp;
	var c2 = y+dp*0.25 + r.x*r.x/dp;
	
	var a = a1 - a2;
	var b = b1 - b2;
	var c = c1 - c2;
	
	if(a==0) return -c/b;
	
	var disc = b*b - 4 * a * c;
	var x1 = (-b + Math.sqrt(disc)) / (2*a);
	var x2 = (-b - Math.sqrt(disc)) / (2*a);

	var ry;
	if(p.y < r.y ) ry =  Math.max(x1, x2);
	else ry = Math.min(x1, x2);
	
	return ry;
    }

    GetParabolaByX(xx) {
        {
            var par = this.root;
            var x = 0;
            
            while(!par.isLeaf)
            {
                x = this.GetXOfEdge(par, this.ly);
                if(x>xx) par = par.left;
                else par = par.right;				
            }
            return par;
        }
    }

    GetY(p, x) {
        var dp = 2*(p.y - this.ly);
        var b1 = -2*p.x/dp;
        var c1 = this.ly+dp/4 + p.x*p.x/dp;
        
        return(x*x/dp + b1*x + c1);
    }

    CheckCircle(b) {
        var lp = this.GetLeftParent(b);
	var rp = this.GetRightParent(b);
	
	var a = this.GetLeftChild(lp);
	var c = this.GetRightChild(rp);
	
	if(!a || !c || a.site == c.site) return;
	
	var s = this.GetEdgeIntersection(lp.edge, rp.edge);
	if(!s) return;
	
	var d = Point.distance(a.site, s);
	//if(d > 5000) return;
	if(s.y - d  >= this.ly) return;
	
	var e = new VEvent(new Point(s.x, s.y - d), false);
	
	b.cEvent = e;
	e.arch = b;
	this.queue.enqueue(e);
    }

    GetEdgeIntersection(a, b) {
        var I = this.GetLineIntersection(a.start, a.B, b.start, b.B);
	
        // wrong direction of edge
        var wd = 	(I.x - a.start.x)*a.direction.x<0 || (I.y - a.start.y)*a.direction.y<0	
                 ||	(I.x - b.start.x)*b.direction.x<0 || (I.y - b.start.y)*b.direction.y<0;	
                 
        if(wd) return null;
        return I;
    }

    GetLeft(t) {
        return this.GetLeftChild(this.GetLeftParent(t))
    }

    GetRight = function (t) {
        return this.GetRightChild(this.GetRightParent(t))
    }

    GetLeftParent = function (n) {
        var par = n.parent;
        var pLast = n;
        while(par.left == pLast) 
        { 
            if(!par.parent) return null;
            pLast = par; par = par.parent; 
        }
        return par;
    }

    GetRightParent = function (n) {
        var par = n.parent;
        var pLast = n;
        while(par.right == pLast) 
        {	
            if(!par.parent) return null;
            pLast = par; par = par.parent;	
        }
        return par;
    }

    GetLeftChild = function (n) {
        if(!n) return null;
        var par = n.left;
        while(!par.isLeaf) par = par.right;
        return par;
    }

    GetRightChild = function (n) {
        if(!n) return null;
        var par = n.right;
        while(!par.isLeaf) par = par.left;
        return par;
    }



}


