System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Vec2, linkNode, plainVertex, _dec, _class, _crd, ccclass, property, WholeDelaunay;

  function _reportPossibleCrUseOflinkNode(extras) {
    _reporterNs.report("linkNode", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfplainVertex(extras) {
    _reporterNs.report("plainVertex", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDelaunayFractureClass(extras) {
    _reporterNs.report("DelaunayFractureClass", "./DelaunayFractureClass", _context.meta, extras);
  }

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
      linkNode = _unresolved_2.linkNode;
      plainVertex = _unresolved_2.plainVertex;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "80c6e5nD69LEYtuMYLj16+d", "WholeDelaunay", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WholeDelaunay", WholeDelaunay = (_dec = ccclass('WholeDelaunay'), _dec(_class = class WholeDelaunay {
        constructor(dfins) {
          this.delFracInstance = void 0;
          this.delFracInstance = dfins;
        }

        ab_cross_ac(a, b, c) //The cross product of ab and ac
        {
          return this.cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
        }

        rnd(x) {
          return Math.round(x * 1000) / 1000;
        }

        polygonToString(polygon) {
          let output = "this.gr.moveTo(" + this.rnd(polygon[0].x) + "," + this.rnd(polygon[0].y) + ");";

          for (let i = 1; i < polygon.length; i++) {
            output += "this.gr.lineTo(" + this.rnd(polygon[i].x) + "," + this.rnd(polygon[i].y) + ");";
          }

          output += "this.gr.close();";
        }

        calculateCenterMass(poly) {
          let sumx = 0;
          let sumy = 0;
          let cant = poly.length;
          poly.forEach(element => {
            sumx += element.x;
            sumy += element.y;
          });
          return new Vec2(sumx / cant, sumy / cant);
        }

        dot(x1, y1, x2, y2) {
          return x1 * x2 + y1 * y2;
        }

        cross(x1, y1, x2, y2) {
          return x1 * y2 - x2 * y1;
        }

        isInPolygon(checkPoint, polygonPoints) {
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

        invertVector(vec) {
          return new Vec2(-1 * vec.x, -1 * vec.y);
        }

        findFracture() {
          let points = [];
          let direction = this.invertVector(this.delFracInstance.getNormal());
          let nearestIndex = 0;
          let minDistance = 10000;

          for (let i = 0; i < this.delFracInstance.delaunayPoints.length; i++) {
            let element = this.delFracInstance.delaunayPoints[i];
            let distance = this.lengthVector(this.delFracInstance.contactPoint, new Vec2(element.x, element.y));

            if (distance < minDistance && element.links.length > 0 && element.border) {
              minDistance = distance;
              nearestIndex = i;
            }
          }

          console.log("NEAREST LOCACTION!");
          console.log("CONTACT POINT: " + this.delFracInstance.contactPoint);
          console.log("NEAREST: " + this.delFracInstance.delaunayPoints[nearestIndex]);
          points.push(this.delFracInstance.delaunayPoints[nearestIndex]);
          console.log("DIRECTION " + direction);
          let nextPv;
          let founded = false;
          let firstDir = false;

          while (!founded) {
            let last = points[points.length - 1];
            let actualLinks = last.links;
            let indBestFit = this.findClosestAngle(this.getRelativeAngle(new Vec2(0, 1), direction), actualLinks);

            if (indBestFit == null) {
              console.log("indBestFit null");
              return false;
            } //  nextPv = findClosest(new Vec2(actualLinks[indBestFit].x, actualLinks[indBestFit].y), fracture.delaunayPoints)


            let closesdtIndex = this.findClosestIndex(actualLinks[indBestFit], this.delFracInstance.delaunayPoints);
            nextPv = this.delFracInstance.delaunayPoints[closesdtIndex];

            if (nextPv == null) {
              console.log("ACTUAL LINKS");
              console.log(actualLinks);
              console.log("CLOSEST INDEX: " + closesdtIndex);
              console.log("indBestFit: " + indBestFit);
              console.log("nextPV null");
              console.log(this.delFracInstance.delaunayPoints);
              return false;
            }

            console.log("PROMEDIAR DIR");

            if (!firstDir) {
              console.log("FIRST DIRECTION " + direction);
              firstDir = true;
              direction = this.promediardireccion(direction, new Vec2(nextPv.x, nextPv.y));
              console.log("NEW DIRECTION " + direction);
            }

            points.push(nextPv);
            if (nextPv.border) founded = true;
          }

          let aIndex = this.findClosestIndex(points[0], this.delFracInstance.delaunayPoints);
          let bIndex = this.findClosestIndex(points[points.length - 1], this.delFracInstance.delaunayPoints);
          console.log("FRACTURAAAA!!!!!!!!");
          console.log(points);
          this.delFracInstance.setPointA(aIndex);
          this.delFracInstance.setPointB(bIndex);

          if (aIndex > bIndex) {
            console.log("REVIRTIENDO");
            this.delFracInstance.setPointB(aIndex);
            this.delFracInstance.setPointA(bIndex);
            this.reverse(points);
          }

          this.delFracInstance.setFracturePts(points);
          return true;
        }

        promediardireccion(vecA, vecB) {
          return this.unitaryVector(new Vec2(0, 0), new Vec2(vecB.x - vecA.x, vecB.y - vecA.y));
        }

        getRelativeAngle(vecA, vecB) {
          let rads = this.getRads(vecA); // console.log("BASE ANGLE: "+rads)

          let transformedVectorB = new Vec2(vecB.x * Math.cos(rads) + vecB.y * Math.sin(rads), -1 * vecB.x * Math.sin(rads) + vecB.y * Math.cos(rads)); // console.log("TRANSFORMED VECTOR: "+ transformedVectorB)

          return this.getRads(transformedVectorB);
        }

        getRads(vecA) {
          const constPI = 3.14159265359;

          if (vecA.x < 0.001 && vecA.x > -0.001) {
            if (vecA.y > 0) {
              return constPI / 2;
            } else {
              return constPI * (3 / 2);
            }
          }

          if (vecA.y < 0.001 && vecA.y > -0.001) {
            if (vecA.x > 0) {
              return 0;
            } else {
              return constPI;
            }
          }

          let baseAngle = Math.abs(Math.atan(vecA.y / vecA.x));
          if (vecA.x < 0 && vecA.y > 0) baseAngle += constPI / 2;
          if (vecA.x < 0 && vecA.y < 0) baseAngle += constPI;
          if (vecA.x > 0 && vecA.y < 0) baseAngle += constPI * (3 / 2);
          return baseAngle;
        }

        reverse(pVs) {
          for (let index = 0; index < pVs.length / 2; index++) {
            let element = pVs[index];
            pVs[index] = pVs[pVs.length - 1 - index];
            pVs[pVs.length - 1 - index] = element;
          }
        }

        findClosestIndex(pos, pVs) {
          // console.log("POSX: "+pos.x + " POSY: "+pos.y)
          for (let index = 0; index < pVs.length; index++) {
            let element = pVs[index]; //   console.log("ELEMENT: "+element)

            if (Math.abs(element.x - pos.x) < 0.001 && Math.abs(element.y - pos.y) < 0.001) {
              // console.log("COINCIDE")
              return index;
            }
          }
        }

        findClosestAngle(angle, linkNodes) {
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

        unitaryVector(posA, posB) {
          let length = this.lengthVector(posA, posB);
          return new Vec2((posB.x - posA.x) / length, (posB.y - posA.y) / length);
        }

        isBorder(point, pVs) {
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

        lengthVector(a, b) {
          return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        }

        getFracturable() {
          let ret = []; // findFracture(fracture)

          const internals = this.deepCopy(this.delFracInstance.delaunayPoints, false);
          let partA = [];
          let partB = [];
          const externals = this.deepCopy(this.delFracInstance.delaunayPoints, true);
          console.log("INTERNALS");
          console.log(internals);
          console.log("EXTERNALS");
          console.log(externals); // NO OLVIDAR EL TEMA DE SI TOCA EL PRIMER VERTICE!!!!

          let i = 0;
          let continuar = true;

          while (continuar) {
            if (i == this.delFracInstance.getPointA()) {
              this.delFracInstance.fracturePoints.forEach(element => {
                let k = this.cloneVertexPlain(element);
                k.border = true;
                partA.push(k);
              });

              for (let j = this.delFracInstance.getPointA(); j <= this.delFracInstance.getPointB() - 1; j++) {
                partB.push(this.cloneVertexPlain(externals[j]));
              }

              for (let j = this.delFracInstance.fracturePoints.length - 1; j > 0; j--) {
                let k = this.cloneVertexPlain(this.delFracInstance.fracturePoints[j]);
                k.border = true;
                partB.push(k);
              }

              i = this.delFracInstance.getPointB() + 1;

              for (let index = i; index < externals.length; index++) {
                partA.push(this.cloneVertexPlain(externals[index]));
              }

              continuar = false;
            }

            if (continuar) partA.push(this.cloneVertexPlain(externals[i]));
            i++;
          }

          console.log("INTERNALS");
          console.log(internals);

          if (partA.length > 3) {
            internals.forEach(element => {
              partA.push(this.cloneVertexPlain(element));
            });
          }

          if (partB.length) {
            internals.forEach(element => {
              partB.push(this.cloneVertexPlain(element));
            });
          }

          console.log(">>PART A");
          let before = this.deepCopy(this.delFracInstance.delaunayPoints, true);
          console.log("BEFORE ( only externals");
          console.log(before);
          this.removeOutRunners(partA);
          console.log(partA);
          console.log(">>PART B");
          this.removeOutRunners(partB);
          console.log(partB);
          ret.push(partA);
          ret.push(partB);
          return ret;
        }

        removeOutRunners(verts) {
          let cant = 0;

          while (verts[cant] != null && verts[cant].border) {
            cant++;
          }

          for (let j = 0; j < cant; ++j) {
            // console.log("===============================================================")
            let a = verts[j];
            let b = verts[0];
            let c = verts[j - 1];
            if (j < cant - 1) b = verts[j + 1];
            if (j == 0) c = verts[cant - 1];
            let v1 = this.unitaryVector(a, b);
            let v2 = this.unitaryVector(a, c);
            let maxAngle = this.getRelativeAngle(v1, v2);

            if (a.links.length > 0) {
              for (let k = 0; k < a.links.length; k++) {
                if (a.links[k] != null) {
                  v2 = this.unitaryVector(a, a.links[k]); // console.log("LOCAL V2: x: "+v2.x+"  y: "+v2.y)

                  let angle = this.getRelativeAngle(v1, v2);

                  if (angle >= maxAngle || angle == 0) {
                    a.links[k] = null; //    console.log("REMOVE")
                  }
                }
              }
            }

            this.filterNulls(a.links);
          }
        }

        filterNulls(elementsArr) {
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

        deepCopy(pv, externalBorder) {
          let output = [];
          pv.forEach(pv_el => {
            if (pv_el.border == externalBorder) {
              let newPv = new (_crd && plainVertex === void 0 ? (_reportPossibleCrUseOfplainVertex({
                error: Error()
              }), plainVertex) : plainVertex)(pv_el.x, pv_el.y, pv_el.border);
              let newLinkNodes = [];
              pv_el.links.forEach(ln => {
                if (ln != null) {
                  let newlinkNode = new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
                    error: Error()
                  }), linkNode) : linkNode)(ln.x, ln.y, ln._angle);
                  newLinkNodes.push(newlinkNode);
                }
              });
              newPv.links = newLinkNodes;
              output.push(newPv);
            }
          });
          return output;
        }

        cloneVertexPlain(ver) {
          let newPv = new (_crd && plainVertex === void 0 ? (_reportPossibleCrUseOfplainVertex({
            error: Error()
          }), plainVertex) : plainVertex)(ver.x, ver.y, ver.border);
          ver.links.forEach(element => {
            if (element != null) {
              let newLNode = new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
                error: Error()
              }), linkNode) : linkNode)(element.x, element.y, this.roundValue(element._angle));
              newPv.links.push(newLNode);
            }
          });
          return newPv;
        }

        roundValue(val) {
          return Math.round(val * 1000) / 1000;
        }

        calculateEnvolArea(indexes, coords, jump) {
          let area = 0;

          for (let i = 0; i < indexes.length; i += jump) {
            let x1 = coords[indexes[i + 1] * jump] - coords[indexes[i] * jump];
            let y1 = coords[indexes[i + 1] * jump + 1] - coords[indexes[i] * jump + 1];
            let x2 = coords[indexes[i + 2] * jump] - coords[indexes[i] * jump];
            let y2 = coords[indexes[i + 2] * jump + 1] - coords[indexes[i] * jump + 1];
            let triangleArea = Math.abs(this.cross(x1, y1, x2, y2) / 2);
            area += triangleArea;
          }

          return area;
        }

        calcAproxArea(points) {
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c41c9f7514f520f531f67eb00c00e716a3f0045f.js.map