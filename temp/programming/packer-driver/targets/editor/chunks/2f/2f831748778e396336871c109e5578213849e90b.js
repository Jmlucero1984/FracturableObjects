System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Vec2, getRelativeAngle, removeOutRunners, plainVertex, linkNode, DelaunayFracture, _crd, ccclass, property;

  function ab_cross_ac(a, b, c) //The cross product of ab and ac
  {
    return cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
  }

  function rnd(x) {
    return Math.round(x * 1000) / 1000;
  }

  function polygonToString(polygon) {
    let output = "this.gr.moveTo(" + rnd(polygon[0].x) + "," + rnd(polygon[0].y) + ");";

    for (let i = 1; i < polygon.length; i++) {
      output += "this.gr.lineTo(" + rnd(polygon[i].x) + "," + rnd(polygon[i].y) + ");";
    }

    output += "this.gr.close();";
  }

  function calculateCenterMass(poly) {
    let sumx = 0;
    let sumy = 0;
    let cant = poly.length;
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

  function findFracture(fracture) {
    let points = [];
    console.log("DEL FRACT CATN DE PUNTOS");
    console.log(fracture.getDelaunayPoints().length);
    console.log("POINTS");
    console.log(fracture.getDelaunayPoints());
    console.log("CONTACT POINT");
    console.log(fracture.getContactPoint());
    let direction = invertVector(fracture.getNormal());
    console.log("DIRECTION");
    console.log(direction);
    let nearestIndex = 0;
    let minDistance = 10000;

    for (let i = 0; i < fracture.getDelaunayPoints().length; i++) {
      let element = fracture.getDelaunayPoints()[i];
      let distance = lengthVector(fracture.getContactPoint(), new Vec2(element.x, element.y));

      if (distance < minDistance && element.links.length > 0 && element.border) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    points.push(fracture.getDelaunayPoints()[nearestIndex]);
    let nextPv;
    let founded = false;
    let firstDir = false;

    while (!founded) {
      let last = points[points.length - 1];
      let actualLinks = last.links;
      let indBestFit = findClosestAngle((_crd && getRelativeAngle === void 0 ? (_reportPossibleCrUseOfgetRelativeAngle({
        error: Error()
      }), getRelativeAngle) : getRelativeAngle)(new Vec2(0, 1), direction), actualLinks);

      if (indBestFit == null) {
        return false;
      }

      let closesdtIndex = findClosestIndex(actualLinks[indBestFit], fracture.getDelaunayPoints());
      nextPv = fracture.getDelaunayPoints()[closesdtIndex];

      if (nextPv == null) {
        return false;
      }

      console.log("PROMEDIAR DIR");

      if (!firstDir) {
        console.log("FIRST DIRECTION " + direction);
        firstDir = true;
        direction = redireccion(points[0], new Vec2(nextPv.x, nextPv.y));
        console.log("NEW DIRECTION " + direction);
      }

      points.push(nextPv);
      if (nextPv.border) founded = true;
    }

    let aIndex = findClosestIndex(points[0], fracture.getDelaunayPoints());
    let bIndex = findClosestIndex(points[points.length - 1], fracture.getDelaunayPoints());
    console.log("FRACTURAAAA!!!!!!!!");
    console.log(points);
    fracture.setPointA(aIndex);
    fracture.setPointB(bIndex);

    if (aIndex > bIndex) {
      console.log("REVIRTIENDO");
      fracture.setPointB(aIndex);
      fracture.setPointA(bIndex);
      reverse(points);
    }

    console.log("FRACTURA POINTS: ");
    console.log(fracture.getFracturePts);
    fracture.setFracturePts(points);
    return true;
  }

  function redireccion(vecA, vecB) {
    return unitaryVector(new Vec2(0, 0), new Vec2(vecB.x - vecA.x, vecB.y - vecA.y));
  }

  function reverse(pVs) {
    for (let index = 0; index < pVs.length / 2; index++) {
      let element = pVs[index];
      pVs[index] = pVs[pVs.length - 1 - index];
      pVs[pVs.length - 1 - index] = element;
    }
  }

  function findClosestIndex(pos, pVs) {
    for (let index = 0; index < pVs.length; index++) {
      let element = pVs[index];

      if (Math.abs(element.x - pos.x) < 0.001 && Math.abs(element.y - pos.y) < 0.001) {
        return index;
      }
    }
  }

  function findClosestAngle(angle, linkNodes) {
    const PI = 3.141592654;
    let minAngle = PI * 2;
    let index = 0;

    for (let i = 0; i < linkNodes.length; i++) {
      if (linkNodes[i] == null) return null;
      let diff = Math.abs(angle - linkNodes[i]._angle);

      if (diff > 3 / 2 * PI) {
        diff = 2 * PI - diff;
      }

      if (diff < minAngle) {
        minAngle = diff;
        index = i;
      }
    }

    return index;
  }

  function unitaryVector(posA, posB) {
    let length = lengthVector(posA, posB);
    return new Vec2((posB.x - posA.x) / length, (posB.y - posA.y) / length);
  }

  function isBorder(point, pVs) {
    let isBorder = false;
    pVs.forEach(el => {
      if (el.border) {
        if (point.x == el.x && point.y == el.y) {
          isBorder = true;
        }
      }
    });
    return isBorder;
  }

  function lengthVector(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  function getFracturable(fracture) {
    let ret = []; // findFracture(fracture)

    const internals = deepCopy(fracture.getDelaunayPoints(), false);
    let partA = [];
    let partB = [];
    const externals = deepCopy(fracture.getDelaunayPoints(), true);
    let fractPoints = fracture.getFracturePts(); // NO OLVIDAR EL TEMA DE SI TOCA EL PRIMER VERTICE!!!!

    let i = 0;
    let continuar = true;
    let pointA = fracture.getPointA();
    let pointB = fracture.getPointB();

    while (continuar) {
      if (i == pointA) {
        fractPoints.forEach(element => {
          let k = cloneVertexPlain(element);
          k.border = true;
          partA.push(k);
        });

        for (let j = pointA; j <= pointB - 1; j++) {
          partB.push(cloneVertexPlain(externals[j]));
        }

        for (let j = fractPoints.length - 1; j > 0; j--) {
          let k = cloneVertexPlain(fractPoints[j]);
          k.border = true;
          partB.push(k);
        }

        i = pointB + 1;

        for (let index = i; index < externals.length; index++) {
          partA.push(cloneVertexPlain(externals[index]));
        }

        continuar = false;
      }

      if (continuar) partA.push(cloneVertexPlain(externals[i]));
      i++;
    }

    console.log("-----------------PART A-----------------------");

    if (partA.length > 3) {
      internals.forEach(element => {
        console.log("Element");
        console.log(element);

        if (!alreadyPlaced(element, partA)) {
          partA.push(cloneVertexPlain(element));
        } else {
          console.log("YA ESTABA");
        }
      });
    }

    console.log("-----------------PART B-----------------------");

    if (partB.length > 3) {
      internals.forEach(element => {
        console.log("Element");
        console.log(element);

        if (!alreadyPlaced(element, partB)) {
          partB.push(cloneVertexPlain(element));
        } else {
          console.log("YA ESTABA");
        }
      });
    }

    (_crd && removeOutRunners === void 0 ? (_reportPossibleCrUseOfremoveOutRunners({
      error: Error()
    }), removeOutRunners) : removeOutRunners)(partA);
    (_crd && removeOutRunners === void 0 ? (_reportPossibleCrUseOfremoveOutRunners({
      error: Error()
    }), removeOutRunners) : removeOutRunners)(partB);
    ret.push(partA);
    ret.push(partB);
    return ret;
  }

  function alreadyPlaced(vt, vtArr) {
    vtArr.forEach(v => {
      if (Math.abs(v.x - vt.x) < 0.01 && Math.abs(v.y - vt.y) < 0.01) {
        return true;
      }
    });
    return false;
  }

  function deepCopy(pv, externalBorder) {
    let output = [];
    pv.forEach(pv_el => {
      if (pv_el.border == externalBorder) {
        let newPv = new plainVertex(pv_el.x, pv_el.y, pv_el.border);
        let newLinkNodes = [];
        pv_el.links.forEach(ln => {
          if (ln != null) {
            let newlinkNode = new linkNode(ln.x, ln.y, ln._angle);
            newLinkNodes.push(newlinkNode);
          }
        });
        newPv.links = newLinkNodes;
        output.push(newPv);
      }
    });
    return output;
  }

  function promediardireccion(vecA, vecB) {
    return unitaryVector(new Vec2(0, 0), new Vec2(vecB.x - vecA.x, vecB.y - vecA.y));
  }

  function cloneVertexPlain(ver) {
    let newPv = new plainVertex(ver.x, ver.y, ver.border);
    ver.links.forEach(element => {
      if (element != null) {
        let newLNode = new linkNode(element.x, element.y, roundValue(element._angle));
        newPv.links.push(newLNode);
      }
    });
    return newPv;
  }

  function roundValue(val) {
    return Math.round(val * 1000) / 1000;
  }

  function calculateEnvolArea(indexes, coords, jump) {
    let area = 0;

    for (let i = 0; i < indexes.length; i += jump) {
      let x1 = coords[indexes[i + 1] * jump] - coords[indexes[i] * jump];
      let y1 = coords[indexes[i + 1] * jump + 1] - coords[indexes[i] * jump + 1];
      let x2 = coords[indexes[i + 2] * jump] - coords[indexes[i] * jump];
      let y2 = coords[indexes[i + 2] * jump + 1] - coords[indexes[i] * jump + 1];
      let triangleArea = Math.abs(cross(x1, y1, x2, y2) / 2);
      area += triangleArea;
    }

    return area;
  }

  function calcAproxArea(points) {
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    points.forEach(e => {
      if (e.x > maxX) maxX = e.x;
      if (e.x < minX) minX = e.x;
      if (e.y > maxY) maxY = e.y;
      if (e.y < minY) minY = e.y;
    });
    return (maxX - minX) * (maxY - minY);
  }

  function _reportPossibleCrUseOfgetRelativeAngle(extras) {
    _reporterNs.report("getRelativeAngle", "./Delaunay", _context.meta, extras);
  }

  function _reportPossibleCrUseOfremoveOutRunners(extras) {
    _reporterNs.report("removeOutRunners", "./Delaunay", _context.meta, extras);
  }

  _export({
    plainVertex: void 0,
    linkNode: void 0,
    polygonToString: polygonToString,
    isInPolygon: isInPolygon,
    DelaunayFracture: void 0,
    findFracture: findFracture,
    findClosestAngle: findClosestAngle,
    getFracturable: getFracturable,
    calculateEnvolArea: calculateEnvolArea,
    calcAproxArea: calcAproxArea
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      getRelativeAngle = _unresolved_2.getRelativeAngle;
      removeOutRunners = _unresolved_2.removeOutRunners;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "92af0eWwiNNKpIVkTvhO+7m", "DelaunaySplitter", undefined);

      __checkObsolete__(['_decorator', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("plainVertex", plainVertex = class plainVertex extends Vec2 {
        constructor(x, y, border = false) {
          super();
          this.x = 0;
          this.y = 0;
          this.border = false;
          this.links = [];
          this.x = x;
          this.y = y;
          this.border = border;
        }

      });

      _export("linkNode", linkNode = class linkNode extends Vec2 {
        constructor(x, y, angle) {
          super();
          this.x = 0;
          this.y = 0;
          this._angle = 0;
          this.x = x;
          this.y = y;
          this._angle = angle;
        }

      });

      _export("DelaunayFracture", DelaunayFracture = class DelaunayFracture {
        constructor(ctPt, normal, envd, plainVertexs) {
          this.contactPoint = void 0;
          this.normal = void 0;
          this.pointA = void 0;
          this.pointB = void 0;
          this.fracturePoints = void 0;
          this.envolvent = void 0;
          this.extremePoints = void 0;
          this.delaunayPoints = void 0;
          this.contactPoint = ctPt;
          this.normal = normal;
          this.envolvent = envd;
          this.delaunayPoints = plainVertexs;
        }

        getDelaunayPoints() {
          return this.delaunayPoints;
        }

        setDelaunayPoints(dPoints) {
          this.delaunayPoints = dPoints;
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
//# sourceMappingURL=2f831748778e396336871c109e5578213849e90b.js.map