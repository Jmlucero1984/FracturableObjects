System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, PolygonCollider2D, Vec2, Vec3, FractDelaunay, calculateEnvolArea2D, getFracturable, DelaunayAssemblerImplementer, earcut, Queue, _dec, _class, _class2, _crd, ccclass, property, StaticFractureManager;

  function _reportPossibleCrUseOfFractDelaunay(extras) {
    _reporterNs.report("FractDelaunay", "./FractDelaunay", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcalculateEnvolArea2D(extras) {
    _reporterNs.report("calculateEnvolArea2D", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetFracturable(extras) {
    _reporterNs.report("getFracturable", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDelaunayAssemblerImplementer(extras) {
    _reporterNs.report("DelaunayAssemblerImplementer", "./DelaunayAssemblerImplementer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfearcut(extras) {
    _reporterNs.report("earcut", "./earcut", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      PolygonCollider2D = _cc.PolygonCollider2D;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      FractDelaunay = _unresolved_2.FractDelaunay;
    }, function (_unresolved_3) {
      calculateEnvolArea2D = _unresolved_3.calculateEnvolArea2D;
      getFracturable = _unresolved_3.getFracturable;
    }, function (_unresolved_4) {
      DelaunayAssemblerImplementer = _unresolved_4.DelaunayAssemblerImplementer;
    }, function (_unresolved_5) {
      earcut = _unresolved_5.earcut;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1fa10OrVK5JPqRepk1pVzf5", "StaticFractureManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Node', 'PolygonCollider2D', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      Queue = class Queue {
        constructor(elements = {}, head = 0, tail = 0) {
          this.elements = elements;
          this.head = head;
          this.tail = tail;
        }

        enqueue(element) {
          this.elements[this.tail] = element;
          this.tail++;
        }

        dequeue() {
          const item = this.elements[this.head];
          delete this.elements[this.head];
          this.head++;
          return item;
        }

        peek() {
          return this.elements[this.head];
        }

        get length() {
          return this.tail - this.head;
        }

        get isEmpty() {
          return this.length === 0;
        }

      };

      _export("StaticFractureManager", StaticFractureManager = (_dec = ccclass('StaticFractureManager'), _dec(_class = (_class2 = class StaticFractureManager extends Component {
        start() {}

        update(deltaTime) {
          if (!StaticFractureManager.cola.isEmpty && !StaticFractureManager.working) {
            console.log("TENEMOS ALGO");
            StaticFractureManager.working = true;
            StaticFractureManager.createCopy(StaticFractureManager.cola.dequeue());
          }
        }

        static createCopy(frac) {
          let parts = (_crd && getFracturable === void 0 ? (_reportPossibleCrUseOfgetFracturable({
            error: Error()
          }), getFracturable) : getFracturable)(frac.fractureObj);

          if (parts != null) {
            let nodeF = frac.node;
            let coordsA = [];
            let coordsB = [];
            parts[0].forEach(v => {
              if (v.border) {
                coordsA.push(v.x);
                coordsA.push(v.y);
              }
            });
            parts[1].forEach(v => {
              if (v.border) {
                coordsB.push(v.x);
                coordsB.push(v.y);
              }
            });
            let minArea = frac.getMinArea();
            console.log("MIN AREA: " + minArea);
            let a1 = (_crd && calculateEnvolArea2D === void 0 ? (_reportPossibleCrUseOfcalculateEnvolArea2D({
              error: Error()
            }), calculateEnvolArea2D) : calculateEnvolArea2D)((_crd && earcut === void 0 ? (_reportPossibleCrUseOfearcut({
              error: Error()
            }), earcut) : earcut)(coordsA, null, 2), coordsA);
            let a2 = (_crd && calculateEnvolArea2D === void 0 ? (_reportPossibleCrUseOfcalculateEnvolArea2D({
              error: Error()
            }), calculateEnvolArea2D) : calculateEnvolArea2D)((_crd && earcut === void 0 ? (_reportPossibleCrUseOfearcut({
              error: Error()
            }), earcut) : earcut)(coordsB, null, 2), coordsB);
            console.log("REAL AREA 1: " + a1);
            console.log("REAL AREA 2: " + a2);

            if (a1 > minArea && a2 > minArea) {
              frac.recursiveness--;
              let pc = nodeF.getComponent(PolygonCollider2D);
              let points = [];
              let index = 0;

              while (index < parts[0].length && parts[0][index].border) {
                points.push(new Vec2(parts[0][index].x, parts[0][index].y));
                index++;
              }

              frac.delaunayPoints = parts[0];
              pc.points = points;
              pc.apply();
              frac.implementer.modifyPoints(points);
              frac.implementer.stroke();
              let copyOf = instantiate(frac.prefab);
              copyOf.name = "Instancia" + Math.random() * 1563813;
              let cfwa = copyOf.getComponent(_crd && FractDelaunay === void 0 ? (_reportPossibleCrUseOfFractDelaunay({
                error: Error()
              }), FractDelaunay) : FractDelaunay);
              cfwa.prefab = frac.prefab;
              copyOf.parent = nodeF.parent;
              cfwa.delaunayPoints = parts[1];
              let points2 = [];
              index = 0;

              while (index < parts[1].length && parts[1][index].border) {
                points2.push(new Vec2(parts[1][index].x, parts[1][index].y));
                index++;
              }

              copyOf.getComponent(_crd && DelaunayAssemblerImplementer === void 0 ? (_reportPossibleCrUseOfDelaunayAssemblerImplementer({
                error: Error()
              }), DelaunayAssemblerImplementer) : DelaunayAssemblerImplementer).customLoad(points2); //copyOf.getComponent(DelaunayAssemblerImplementer).markForUpdateRenderData();

              cfwa.recursiveness = 3;
              console.log("APPLYING POINTS");
              console.log(points2);
              console.log("----");
              cfwa.customLoad(points2); //copyOf.getComponent(PolygonCollider2D).points=points2;
              //  copyOf.getComponent(PolygonCollider2D).apply();

              copyOf.setRotation(nodeF.getRotation());
              copyOf.setPosition(new Vec3(nodeF.position.x, nodeF.position.y));
              StaticFractureManager.working = false;
            }
          } else {
            console.log("*******************************************************");
            console.log("*****************////  FALLÓ   ////********************");
            console.log("*******************************************************");
          }

          setTimeout(() => {
            frac.available = true;
          }, 0);
        }

      }, _class2.working = false, _class2.cola = new Queue(), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f165946aee241c54a11a4421a645c36a1d3787ba.js.map