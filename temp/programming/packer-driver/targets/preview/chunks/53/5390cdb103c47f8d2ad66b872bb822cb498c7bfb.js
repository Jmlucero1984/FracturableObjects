System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, v3, Vec2, Vec3, Fracture, _crd, ccclass, property;

  function ab_cross_ac(a, b, c) //The cross product of ab and ac
  {
    return cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
  }

  function check(part) {
    // console.log("CHECKING")
    var sum = 0;

    for (var j = 0; j < part.length; ++j) {
      var a = part[j % part.length];
      var b = part[(j + 1) % part.length];
      var c = part[(j + 2) % part.length];
      var v1 = new Vec2();
      Vec2.subtract(v1, a, b);
      var v2 = new Vec2();
      Vec2.subtract(v2, b, c);
      sum += v1.cross(v2);
    } //  console.log("La suma dio " + sum)


    return sum > 0;
  }

  function rnd(x) {
    return Math.round(x * 1000) / 1000;
  }

  function polygonToString(polygon) {
    var output = "this.gr.moveTo(" + rnd(polygon[0].x) + "," + rnd(polygon[0].y) + ");";

    for (var i = 1; i < polygon.length; i++) {
      output += "this.gr.lineTo(" + rnd(polygon[i].x) + "," + rnd(polygon[i].y) + ");";
    }

    output += "this.gr.close();"; //console.log(output)
  }

  function calculateCenterMass(poly) {
    var sumx = 0;
    var sumy = 0;
    var cant = poly.length;
    poly.forEach(element => {
      sumx += element.x;
      sumy += element.y;
    });
    return new Vec2(sumx / cant, sumy / cant);
  }

  function dot(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
  }

  function cross(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
  }

  function dblcmp(a, b) {
    if (Math.abs(a - b) <= 0.0001) return 0;
    if (a > b) return 1;else return -1;
  }

  function reorientate(poly) {
    var reorientated = [];

    for (var i = poly.length - 1; i >= 0; i--) {
      reorientated.push(poly[i]);
    }

    return reorientated;
  }

  function isInPolygon(checkPoint, polygonPoints) {
    var counter = 0;
    var i;
    var xinters;
    var p1, p2;
    var pointCount = polygonPoints.length;
    p1 = polygonPoints[0];

    for (i = 1; i <= pointCount; i++) {
      p2 = polygonPoints[i % pointCount];

      if (checkPoint.x > Math.min(p1.x, p2.x) && checkPoint.x <= Math.max(p1.x, p2.x)) {
        if (checkPoint.y <= Math.max(p1.y, p2.y)) {
          if (p1.x != p2.x) {
            xinters = (checkPoint.x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;

            if (p1.y == p2.y || checkPoint.y <= xinters) {
              counter++;
            }
          }
        }
      }

      p1 = p2;
    }

    if (counter % 2 == 0) {
      return false;
    }

    return true;
  }

  function invertVector(vec) {
    return new Vec2(-1 * vec.x, -1 * vec.y);
  }

  function randomSign() {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  }

  function findExtremePoints(fracture) {
    var initPoint = fracture.getContactPoint();
    var envol = fracture.getEnvolvent();
    var points = [];
    var direction = invertVector(fracture.getNormal());
    if (Math.abs(direction.x) < 0.2) direction.x = 0.1 * randomSign();
    if (Math.abs(direction.y) < 0.2) direction.y = 0.1 * randomSign();
    var beforeExtendedPoint = new Vec2(initPoint.x * 1.5, initPoint.y * 1.5);

    if (isInPolygon(beforeExtendedPoint, envol)) {
      //   console.log("W A R N I N G: Inside Polygon")
      return null;
    }

    var beyondExtendedPoint = new Vec2(initPoint.x + direction.x * 1000, initPoint.y + direction.y * 1000);

    for (var j = 0; j < envol.length; ++j) {
      var a = envol[j];
      var b = envol[0];
      if (j < envol.length - 1) b = envol[j + 1];
      var c = lineCrossPoint(beforeExtendedPoint, beyondExtendedPoint, a, b); // WARNING! CONCAVE SHAPES

      if (c[0] == 0) {
        points.push(v3(c[1].x, c[1].y, j));
      } else if (c[0] > 0) {
        if (c[1].equals(a)) {
          var proxPt = getInterpolated(a, b, 0.15);
          points.push(new Vec3(proxPt.x, proxPt.y, j));
        } else if (c[1].equals(b)) {
          var _proxPt = getInterpolated(a, b, 0.85);

          points.push(new Vec3(_proxPt.x, _proxPt.y, j));
        }
      }
    }

    if (points.length < 2) return null;
    var reord = [];
    points.sort((a, b) => lengthVector3(a, beforeExtendedPoint) - lengthVector3(b, beforeExtendedPoint));

    if (points[0].z > points[1].z) {
      fracture.setPointA(points[1].z);
      fracture.setPointB(points[0].z);
      fracture.setExtremePoints([new Vec2(points[1].x, points[1].y), new Vec2(points[0].x, points[0].y)]);
    } else {
      fracture.setPointA(points[0].z);
      fracture.setPointB(points[1].z);
      fracture.setExtremePoints([new Vec2(points[0].x, points[0].y), new Vec2(points[1].x, points[1].y)]);
    }
  }

  function getInterpolated(a, b, percent) {
    var difx = b.x - a.x;
    var dify = b.y - a.y;
    return new Vec2(a.x + difx * percent, a.y + dify * percent);
  }

  function lengthVector(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  function lengthVector3(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  function sort(pivot, points) {
    var outPoints = [];

    while (outPoints.length < 3) {
      var min = Infinity;
      var index = void 0;
      var minV = void 0;

      for (var j = 0; j < points.length; j++) {
        if (points[j] == null) continue;
        var length = lengthVector(pivot, points[j]);

        if (length < min) {
          min = length;
          index = j;
          minV = points[j];
        }
      }

      outPoints.push(minV);
      points.splice(index, 1);
    }

    return outPoints;
  }

  function normalizeVector(vec) {
    var dist = lengthVector(new Vec2(0, 0), vec);
    return new Vec2(vec.x / dist, vec.y / dist);
  }

  function getFracturable(fracture) {
    var envol = fracture.getEnvolvent();
    var centerMass = calculateCenterMass(envol);
    var iPoint = fracture.getContactPoint();
    var vectorToCenter = new Vec2(centerMass.x - iPoint.x, centerMass.y - iPoint.y);
    findExtremePoints(fracture);
    var extremePoints = fracture.getExtremePoints();

    if (extremePoints == null) {
      return null;
    }

    console.log("EXTREME POINTS");
    console.log(extremePoints);
    if (extremePoints == null) return null;
    var points = [];
    points.push(extremePoints[0]);
    points.push(extremePoints[1]); // let dir = normalizeVector(vectorToCenter);

    /* let dir = invertVector(fracture.getNormal());
     let initPoint = extremePoints[0]
    
       let distance = lengthVector(extremePoints[1], extremePoints[0]);
     dir = new Vec2((extremePoints[1].x - extremePoints[0].x) / distance, (extremePoints[1].y - extremePoints[0].y) / distance)
     let deltay = (extremePoints[1].y - extremePoints[0].y) / 3;
     let deltax = (extremePoints[1].x - extremePoints[0].x) / 3;
         console.log("DISTANCE: "+distance)
     let progress = distance / 2;
       let followPath = true;
     while (followPath) {
         let newX = initPoint.x + (dir.x + (Math.random() - 0.5) * 0.2) * progress
         let newY = initPoint.y + (dir.y + (Math.random() - 0.5) * 0.2) * progress
         let possibleVec = new Vec2(newX, newY);
           for (let j = 0; j < envol.length; ++j) {
             let a = envol[j];
             let b = envol[0];
             if (j < envol.length - 1) b = envol[j + 1];
             let c = lineCrossPoint(v2(initPoint.x, initPoint.y), possibleVec, a, b);
             if (c[0] == 0) { // encontro una interseccion entre los dos puntos de cada lado
                 console.log("ENCONTRO UN CRUCE")
                 points.push(c[1] as Vec2);
                   fracture.setPointB(j);
                   followPath = false;
                 break;
             }
             else if (c[0] > 0) { //encontro una interseccion pero al parecer coincide con alguno de los vertices
                   if ((c[1] as Vec2).equals(a)) {
                     console.log("ENCONTRO UN CREUCE QUE CONCIDE CON PREVIOUS POINT")
                     let ac = getInterpolated(a, b, 0.2)
                     fracture.setPointB(j);
                     points.push(ac)
                     followPath = false;
                   } else if ((c[1] as Vec2).equals(b)) {
                     console.log("ENCONTRO UN CREUCE QUE CONCIDE CON POSTERIOR POINT")
                     let ac = getInterpolated(a, b, 0.8)
                     fracture.setPointB(j);
                     points.push(ac)
                     followPath = false;
                 }
               
                 break;
             }
         }
         if(followPath) {
             points.push(possibleVec)
             initPoint=possibleVec;
         }
       
     }*/

    if (fracture.getPointA() > fracture.getPointB()) {
      console.log("!!!!!");
      console.log("POINT A: " + fracture.getPointA() + "     POINT B: " + fracture.getPointB());
      var temp = fracture.getPointB();
      fracture.setPointB(fracture.getPointA());
      fracture.setPointA(temp);

      for (var i = 1; i < points.length / 2; i++) {
        var tt = points[i];
        points[i] = points[points.length - 1 - i];
        points[points.length - 1 - i] = tt;
      }
    }

    console.log("FRACTURE POINTS");
    console.log(points);
    fracture.setFracturePts(points);
    return points;
  } //Line segments cut polygons
  //returns the polygon array
  //Returns an empty array if not cut


  function lineCutPolygon(fractObj) {
    var ret = [];
    var points = [];
    var pointIndex = [];
    var indexBeforeFractureA = fractObj.getPointA();
    var indexBeforeFractureB = fractObj.getPointB();
    var fracture = [];
    var polygon = fractObj.getEnvolvent();
    var originalFracture = fractObj.getFracturePts();
    console.log("-----OR FRACTURE-------------");
    console.log(originalFracture);
    console.log("-----POLYGON-------------");
    console.log(polygon);
    var partA = [];
    var partB = [];

    for (var i = 0; i < polygon.length; i++) {
      partA.push(polygon[i]);

      if (i == indexBeforeFractureA) {
        originalFracture.forEach(element => {
          partA.push(element);
        });
        i = indexBeforeFractureB;

        for (var j = indexBeforeFractureA + 1; j <= indexBeforeFractureB; j++) {
          partB.push(polygon[j]);
        }

        for (var _j = originalFracture.length - 1; _j >= 0; _j--) {
          partB.push(originalFracture[_j]);
        }
      }
    }

    ret.push(partA);
    ret.push(partB);
    return ret;
  } //Find whether point a is on the line segment, >0 is not there, =0 is coincident with the endpoint, <0 is there.


  function point_on_line(a, p1, p2) {
    return dblcmp(dot(p1.x - a.x, p1.y - a.y, p2.x - a.x, p2.y - a.y), 0);
  }

  function calculateEnvolArea(indexes, coords, jump) {
    var area = 0;
    /*EARCUT DATA: 50,20,0,   50,-40,0,   70,-40,0,    70,40,0,-15.101999249816531,40,0,-15.508626031865242,32.6402774377407,0,-14.76694312614122,26.933425973121036,0,-15.002643991594049,20,0*/

    for (var i = 0; i < indexes.length; i += jump) {
      var x1 = coords[indexes[i + 1] * jump] - coords[indexes[i] * jump];
      var y1 = coords[indexes[i + 1] * jump + 1] - coords[indexes[i] * jump + 1];
      var x2 = coords[indexes[i + 2] * jump] - coords[indexes[i] * jump];
      var y2 = coords[indexes[i + 2] * jump + 1] - coords[indexes[i] * jump + 1];
      var triangleArea = Math.abs(cross(x1, y1, x2, y2) / 2);
      area += triangleArea;
    }

    return area;
  }

  function calcAproxArea(points) {
    var minX = Number.POSITIVE_INFINITY;
    var maxX = Number.NEGATIVE_INFINITY;
    var minY = Number.POSITIVE_INFINITY;
    var maxY = Number.NEGATIVE_INFINITY;
    points.forEach(e => {
      if (e.x > maxX) maxX = e.x;
      if (e.x < minX) minX = e.x;
      if (e.y > maxY) maxY = e.y;
      if (e.y < minY) minY = e.y;
    });
    return (maxX - minX) * (maxY - minY);
  } //Find the intersection point of two line segments
  //Return value: [n,p] n: 0 intersects, 1 is at the common point, -1 does not intersect p: intersection point


  function lineCrossPoint(p1, p2, q1, q2) {
    // console.log("Helper - Line Cross Point")
    var a = p1,
        b = p2,
        c = q1,
        d = q2;
    var s1, s2, s3, s4;
    var d1, d2, d3, d4;
    var p = new Vec2(0, 0);
    d1 = dblcmp(s1 = ab_cross_ac(a, b, c), 0);
    d2 = dblcmp(s2 = ab_cross_ac(a, b, d), 0);
    d3 = dblcmp(s3 = ab_cross_ac(c, d, a), 0);
    d4 = dblcmp(s4 = ab_cross_ac(c, d, b), 0);

    if ((d1 ^ d2) == -2 && (d3 ^ d4) == -2) {
      p.x = (c.x * s2 - d.x * s1) / (s2 - s1);
      p.y = (c.y * s2 - d.y * s1) / (s2 - s1);
      return [0, p];
    }

    if (d1 == 0 && point_on_line(c, a, b) <= 0) {
      p = c;
      return [1, p];
    }

    if (d2 == 0 && point_on_line(d, a, b) <= 0) {
      p = d;
      return [1, p];
    }

    if (d3 == 0 && point_on_line(a, c, d) <= 0) {
      p = a;
      return [1, p];
    }

    if (d4 == 0 && point_on_line(b, c, d) <= 0) {
      p = b;
      return [1, p];
    }

    return [-1, null];
  }

  _export({
    polygonToString: polygonToString,
    isInPolygon: isInPolygon,
    Fracture: void 0,
    getFracturable: getFracturable,
    lineCutPolygon: lineCutPolygon,
    calculateEnvolArea: calculateEnvolArea,
    calcAproxArea: calcAproxArea
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      v3 = _cc.v3;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8c30ekzHI1ILJQgr96MNlY9", "MaskSplitter", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'v2', 'v3', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Fracture", Fracture = class Fracture {
        constructor(ctPt, normal, envd) {
          this.contactPoint = void 0;
          this.normal = void 0;
          this.pointA = void 0;
          this.pointB = void 0;
          this.fracturePoints = void 0;
          this.envolvent = void 0;
          this.extremePoints = void 0;
          this.contactPoint = ctPt;
          this.normal = normal;
          this.envolvent = envd;
        }

        getPointA() {
          return this.pointA;
        }

        getExtremePoints() {
          return this.extremePoints;
        }

        setExtremePoints(extPts) {
          this.extremePoints = extPts;
        }

        getPointB() {
          return this.pointB;
        }

        getNormal() {
          return this.normal;
        }

        getContactPoint() {
          return this.contactPoint;
        }

        getFracturePts() {
          return this.fracturePoints;
        }

        getEnvolvent() {
          return this.envolvent;
        }

        setPointA(ptA) {
          this.pointA = ptA;
        }

        setPointB(ptB) {
          this.pointB = ptB;
        }

        setFracturePts(fctPts) {
          this.fracturePoints = fctPts;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5390cdb103c47f8d2ad66b872bb822cb498c7bfb.js.map