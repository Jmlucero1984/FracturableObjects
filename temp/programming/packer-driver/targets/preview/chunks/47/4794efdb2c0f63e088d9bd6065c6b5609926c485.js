System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Graphics, Vec2, linkNode, plainVertex, Vertex, Pair, Edge, Triangle, _dec, _class, _crd, ccclass, property, EPSILON, constPI, Delaunay;

  function removeOutRunners(verts) {
    console.log("INSIDE REMOVE OUTRUNNERS");
    var print = false;

    if (verts.length == 30) {
      print = true;
      console.log("********************************************************************************************************");
    }

    console.log(verts);
    var cant = 0;

    while (verts[cant] != null && verts[cant].border) {
      cant++;
    }

    for (var j = 0; j < cant; ++j) {
      var a = verts[j];
      var b = verts[0];
      var c = verts[j - 1];
      if (j < cant - 1) b = verts[j + 1];
      if (j == 0) c = verts[cant - 1];

      if (print) {
        console.log("VER A : " + a);
        console.log("VER b : " + b);
        console.log("VER c : " + c);
      }

      var v1 = unitaryVector(a, b);
      var v2 = unitaryVector(a, c);

      if (print) {
        console.log("V1: " + v1);
        console.log("v2: " + v2);
      }

      var maxAngle = getRelativeAngle(v1, v2);

      if (print) {
        console.log("MAX ANGLE: " + maxAngle);
      }

      if (a.links.length > 0) {
        if (print) {
          console.log("LINKS: " + a.links);
        }

        for (var k = 0; k < a.links.length; k++) {
          if (a.links[k] != null) {
            v2 = unitaryVector(a, a.links[k]);
            var angle = getRelativeAngle(v1, v2);

            if (print) {
              console.log("ANGLE: " + angle);
            }

            if (angle >= maxAngle || angle == 0) {
              a.links[k] = null;
            }
          }
        }
      }

      filterNulls(a.links);
    }
  }

  function getRads(vecA) {
    var constPI = 3.14159265359;

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

    var baseAngle = Math.atan(vecA.y / vecA.x);
    if (vecA.x < 0 && vecA.y > 0) baseAngle = constPI + baseAngle;
    if (vecA.x < 0 && vecA.y < 0) baseAngle = constPI + baseAngle;
    if (vecA.x > 0 && vecA.y < 0) baseAngle = 2 * constPI + baseAngle;
    console.log("BASE ANGLE: " + baseAngle);
    return baseAngle;
  }

  function getRelativeAngle(vecA, vecB) {
    var rads = getRads(vecA);
    console.log("RADS:" + rads);
    var transformedVectorB = new Vec2(vecB.x * Math.cos(rads) + vecB.y * Math.sin(rads), -1 * vecB.x * Math.sin(rads) + vecB.y * Math.cos(rads));
    console.log("TRNAS VECT: " + transformedVectorB);
    return round(getRads(transformedVectorB), 3);
  }

  function round(n, decimals) {
    return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  function filterNulls(elementsArr) {
    for (var i = 0; i < elementsArr.length; i++) {
      if (elementsArr[i] == null) {
        for (var j = i + 1; j < elementsArr.length; j++) {
          if (elementsArr[j] != null) {
            elementsArr[i] = elementsArr[j];
            elementsArr[j] = null;
            break;
          }
        }
      }
    }

    for (var _i = elementsArr.length - 1; _i > 0; _i--) {
      if (elementsArr[_i] == null) elementsArr.pop();
    }
  }

  function cross(vecA, vecB) {
    return vecA.x * vecB.y - vecB.x * vecA.y;
  }

  function lengthVector(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  function unitaryVector(posA, posB) {
    var length = lengthVector(posA, posB);
    return new Vec2((posB.x - posA.x) / length, (posB.y - posA.y) / length);
  }

  _export({
    removeOutRunners: removeOutRunners,
    getRads: getRads,
    getRelativeAngle: getRelativeAngle,
    round: round,
    filterNulls: filterNulls
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Graphics = _cc.Graphics;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "872ab3sdeVA37SF7MPzZH66", "Delaunay", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Graphics', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);
      EPSILON = 1.0e-6;
      constPI = 3.14159265359;
      linkNode = class linkNode extends Vec2 {
        constructor(x, y, angle) {
          super();
          this.x = 0;
          this.y = 0;
          this._angle = 0;
          this.x = x;
          this.y = y;
          this._angle = angle;
        }

      };
      plainVertex = class plainVertex extends Vec2 {
        constructor(x, y, border) {
          if (border === void 0) {
            border = false;
          }

          super();
          this.x = 0;
          this.y = 0;
          this.border = false;
          this.links = [];
          this.x = x;
          this.y = y;
          this.border = border;
        }

      };
      Vertex = class Vertex extends Vec2 {
        constructor(x, y, border) {
          if (border === void 0) {
            border = false;
          }

          super();
          this.x = 0;
          this.y = 0;
          this.border = false;
          this.links = [];
          this.x = x;
          this.y = y;
          this.border = border;
        }

        addLink(v) {
          var founded = false;
          this.links.forEach(element => {
            if (v.vertex === element.vertex) {
              founded = true;
            }
          });
          if (!founded) this.links.push(v);
        }

      };
      Pair = class Pair {
        constructor(vertex, angle) {
          this.vertex = void 0;
          this.angle = void 0;
          this.vertex = vertex;
          this.angle = angle;
        }

      };
      Edge = class Edge {
        constructor(v0, v1) {
          this.v0 = void 0;
          this.v1 = void 0;

          this.equals = function (other) {
            return this.v0 === other.v0 && this.v1 === other.v1;
          };

          this.inverse = function () {
            return new Edge(this.v1, this.v0);
          };

          this.v0 = v0;
          this.v1 = v1;
        }

      };
      Triangle = class Triangle {
        constructor(v0, v1, v2) {
          this.v0 = void 0;
          this.v1 = void 0;
          this.v2 = void 0;
          this.center = 0;

          this.calcCircumCicle = function () {
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

          this.inCircumcircle = function (v) {
            var dx = this.center.x - v.x;
            var dy = this.center.y - v.y;
            var dist_squared = dx * dx + dy * dy;
            return dist_squared <= this.radius_squared;
          };

          this.v0 = v0;
          this.v1 = v1;
          this.v2 = v2;
          this.calcCircumCicle();
        }

      };

      _export("Delaunay", Delaunay = (_dec = ccclass('Delaunay'), _dec(_class = class Delaunay extends Graphics {
        start() {
          var numeros = [12, 35, 97, 35];
          numeros = numeros.filter(x => x % 2 == 0);
          var vertices = [];
          vertices.push(new Vertex(0, 0, true)); //0

          vertices.push(new Vertex(10, 0, true)); //1

          vertices.push(new Vertex(20, 0, true)); //2

          vertices.push(new Vertex(20, 10, true)); //3

          vertices.push(new Vertex(20, 20, true)); //4

          vertices.push(new Vertex(20, 30, true)); //5

          vertices.push(new Vertex(20, 40, true)); //6

          vertices.push(new Vertex(30, 40, true)); //7

          vertices.push(new Vertex(40, 40, true)); //8

          vertices.push(new Vertex(50, 40, true)); //8

          vertices.push(new Vertex(60, 40, true)); //8

          vertices.push(new Vertex(70, 40, true)); //8

          vertices.push(new Vertex(80, 40, true)); //8

          vertices.push(new Vertex(90, 40, true)); //8

          vertices.push(new Vertex(100, 40, true)); //8

          vertices.push(new Vertex(110, 40, true)); //8

          vertices.push(new Vertex(120, 40, true)); //8

          vertices.push(new Vertex(120, 30, true)); //8

          vertices.push(new Vertex(120, 20, true)); //8

          vertices.push(new Vertex(120, 10, true)); //8

          vertices.push(new Vertex(120, 0, true)); //8

          vertices.push(new Vertex(130, 0, true)); //8

          vertices.push(new Vertex(140, 0, true)); //8

          vertices.push(new Vertex(140, 10, true)); //8

          vertices.push(new Vertex(140, 20, true)); //8

          vertices.push(new Vertex(140, 30, true)); //8

          vertices.push(new Vertex(140, 40, true)); //8

          vertices.push(new Vertex(140, 50, true)); //8

          vertices.push(new Vertex(140, 60, true)); //8

          vertices.push(new Vertex(130, 60, true)); //8

          vertices.push(new Vertex(120, 60, true)); //8

          vertices.push(new Vertex(110, 60, true)); //8

          vertices.push(new Vertex(100, 60, true)); //8

          vertices.push(new Vertex(90, 60, true)); //8

          vertices.push(new Vertex(80, 60, true)); //8

          vertices.push(new Vertex(70, 60, true)); //8

          vertices.push(new Vertex(60, 60, true)); //8

          vertices.push(new Vertex(50, 60, true)); //8

          vertices.push(new Vertex(40, 60, true)); //10

          vertices.push(new Vertex(30, 60, true)); //11

          vertices.push(new Vertex(20, 60, true)); //12

          vertices.push(new Vertex(10, 60, true)); //13

          vertices.push(new Vertex(0, 60, true)); //14

          vertices.push(new Vertex(0, 50, true)); //15

          vertices.push(new Vertex(0, 40, true)); //16

          vertices.push(new Vertex(0, 30, true)); //17

          vertices.push(new Vertex(0, 20, true)); //18

          vertices.push(new Vertex(0, 10, true)); //19

          vertices.push(new Vertex(8, 41)); //7

          vertices.push(new Vertex(9, 48)); //7

          vertices.push(new Vertex(10, 13)); //8

          vertices.push(new Vertex(11, 26)); //8

          vertices.push(new Vertex(18, 47));
          vertices.push(new Vertex(31, 52));
          vertices.push(new Vertex(48, 48));
          vertices.push(new Vertex(60, 51));
          vertices.push(new Vertex(68, 52));
          vertices.push(new Vertex(81, 49));
          vertices.push(new Vertex(90, 52));
          vertices.push(new Vertex(99, 50));
          vertices.push(new Vertex(110, 51));
          vertices.push(new Vertex(119, 52));
          vertices.push(new Vertex(128, 49));
          vertices.push(new Vertex(130, 41)); //7

          vertices.push(new Vertex(128, 13)); //8

          vertices.push(new Vertex(131, 26)); //8

          var triangles = this.triangulate(vertices);
          triangles.forEach(triangle => {
            triangle.v0.addLink(new Pair(triangle.v1, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v1))));
            triangle.v1.addLink(new Pair(triangle.v0, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v1, triangle.v0))));
            triangle.v1.addLink(new Pair(triangle.v2, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v1, triangle.v2))));
            triangle.v2.addLink(new Pair(triangle.v1, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v2, triangle.v1))));
            triangle.v0.addLink(new Pair(triangle.v2, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v0, triangle.v2))));
            triangle.v2.addLink(new Pair(triangle.v0, getRelativeAngle(new Vec2(1, 0), unitaryVector(triangle.v2, triangle.v0))));
            this.moveTo(triangle.v0.x, triangle.v0.y);
            this.lineTo(triangle.v1.x, triangle.v1.y);
            this.lineTo(triangle.v2.x, triangle.v2.y);
            this.lineTo(triangle.v0.x, triangle.v0.y);
            this.stroke();
          });
          var plainVerts = this.plainData(vertices);
          removeOutRunners(plainVerts);
        }

        plainData(verts) {
          var output = [];
          verts.forEach(element => {
            var pV = new plainVertex(element.x, element.y, element.border);
            element.links.forEach(lk => {
              if (lk != null) {
                var lN = new linkNode(lk.vertex.x, lk.vertex.y, lk.angle);
                pV.links.push(lN);
              }
            });
            output.push(pV);
          });
          return output;
        }

        update(deltaTime) {}

        triangulate(vertices) {
          var triangles = []; // First, create a "supertriangle" that bounds all vertices

          var st = this.createBoundingTriangle(vertices);
          triangles.push(st); // Next, begin the triangulation one vertex at a time
          // NOTE: This is O(n^2) - can be optimized by sorting vertices
          // along the x-axis and only considering triangles that have
          // potentially overlapping circumcircles

          vertices.forEach(vertex => {
            triangles = this.addVertex(vertex, triangles);
          }); // Remove triangles that shared edges with "supertriangle"

          triangles = triangles.filter(triangle => {
            if (triangle.v0 == st.v0 || triangle.v0 == st.v1 || triangle.v0 == st.v2 || triangle.v1 == st.v0 || triangle.v1 == st.v1 || triangle.v1 == st.v2 || triangle.v2 == st.v0 || triangle.v2 == st.v1 || triangle.v2 == st.v2) return false;
            return true;
          });
          return triangles;
        } // Internal: create a triangle that bounds the given vertices, with room to spare


        createBoundingTriangle(vertices) {
          // NOTE: There's a bit of a heuristic here. If the bounding triangle
          // is too large and you see overflow/underflow errors. If it is too small
          // you end up with a non-convex hull.
          var minx, miny, maxx, maxy;
          vertices.forEach(function (vertex) {
            if (minx === undefined || vertex.x < minx) {
              minx = vertex.x;
            }

            if (miny === undefined || vertex.y < miny) {
              miny = vertex.y;
            }

            if (maxx === undefined || vertex.x > maxx) {
              maxx = vertex.x;
            }

            if (maxy === undefined || vertex.y > maxy) {
              maxy = vertex.y;
            }
          });
          var dx = (maxx - minx) * 5;
          var dy = (maxy - miny) * 5;
          var stv0 = new Vertex(minx - dx, miny - dy * 3);
          var stv1 = new Vertex(minx - dx, maxy + dy);
          var stv2 = new Vertex(maxx + dx * 3, maxy + dy);
          return new Triangle(stv0, stv1, stv2);
        } // Internal: update triangulation with a vertex


        addVertex(vertex, triangles) {
          var edges = []; // Remove triangles with circumcircles containing the vertex

          triangles = triangles.filter(triangle => {
            if (triangle.inCircumcircle(vertex)) {
              edges.push(new Edge(triangle.v0, triangle.v1));
              edges.push(new Edge(triangle.v1, triangle.v2));
              edges.push(new Edge(triangle.v2, triangle.v0));
              return false;
            }

            return true;
          }); //console.log("ADDED VERTEX: " + triangles.length)

          edges = this.uniqueEdges(edges); // Create new triangles from the unique edges and new vertex

          edges.forEach(edge => {
            triangles.push(new Triangle(edge.v0, edge.v1, vertex));
          });
          return triangles;
        } // Internal: remove duplicate edges from an array


        uniqueEdges(edges) {
          // TODO: This is O(n^2), make it O(n) with a hash or some such
          var uniqueEdges = [];

          for (var i = 0; i < edges.length; ++i) {
            var edge1 = edges[i];
            var unique = true;

            for (var j = 0; j < edges.length; ++j) {
              if (i === j) continue;
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4794efdb2c0f63e088d9bd6065c6b5609926c485.js.map