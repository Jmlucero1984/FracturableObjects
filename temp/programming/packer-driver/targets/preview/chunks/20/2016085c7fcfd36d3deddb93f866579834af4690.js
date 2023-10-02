System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, PolygonCollider2D, Vec2, Vec3, FractDelaunay, calcAproxArea, getFracturable, DelaunayAssemblerImplementer, Queue, _dec, _class, _class2, _crd, ccclass, property, StaticFractureManager;

  function _reportPossibleCrUseOfFractDelaunay(extras) {
    _reporterNs.report("FractDelaunay", "./FractDelaunay", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcalcAproxArea(extras) {
    _reporterNs.report("calcAproxArea", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetFracturable(extras) {
    _reporterNs.report("getFracturable", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDelaunayAssemblerImplementer(extras) {
    _reporterNs.report("DelaunayAssemblerImplementer", "./DelaunayAssemblerImplementer", _context.meta, extras);
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
      calcAproxArea = _unresolved_3.calcAproxArea;
      getFracturable = _unresolved_3.getFracturable;
    }, function (_unresolved_4) {
      DelaunayAssemblerImplementer = _unresolved_4.DelaunayAssemblerImplementer;
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
        constructor(elements, head, tail) {
          if (elements === void 0) {
            elements = {};
          }

          if (head === void 0) {
            head = 0;
          }

          if (tail === void 0) {
            tail = 0;
          }

          this.elements = elements;
          this.head = head;
          this.tail = tail;
        }

        enqueue(element) {
          this.elements[this.tail] = element;
          this.tail++;
        }

        dequeue() {
          var item = this.elements[this.head];
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
          var parts = (_crd && getFracturable === void 0 ? (_reportPossibleCrUseOfgetFracturable({
            error: Error()
          }), getFracturable) : getFracturable)(frac.fractureObj);

          if (parts != null) {
            var nodeF = frac.node;
            var a1 = (_crd && calcAproxArea === void 0 ? (_reportPossibleCrUseOfcalcAproxArea({
              error: Error()
            }), calcAproxArea) : calcAproxArea)(parts[0]);
            var a2 = (_crd && calcAproxArea === void 0 ? (_reportPossibleCrUseOfcalcAproxArea({
              error: Error()
            }), calcAproxArea) : calcAproxArea)(parts[1]);

            if (
            /*a1>this.minArea && a2>this.minArea*/
            true) {
              frac.recursiveness--;
              var pc = nodeF.getComponent(PolygonCollider2D);
              var points = [];
              var index = 0;

              while (index < parts[0].size && parts[0][index].border) {
                points.push(new Vec2(parts[0][index].x, parts[0][index].y));
                index++;
              }

              frac.delaunayPoints = parts[0];
              pc.points = points;
              pc.apply();
              frac.implementer.modifyPoints(points);
              frac.implementer.stroke();
              var copyOf = instantiate(frac.prefab);
              copyOf.name = "Instancia" + Math.random() * 1563813;
              var cfwa = copyOf.getComponent(_crd && FractDelaunay === void 0 ? (_reportPossibleCrUseOfFractDelaunay({
                error: Error()
              }), FractDelaunay) : FractDelaunay);
              cfwa.prefab = frac.prefab;
              copyOf.parent = nodeF.parent;
              cfwa.delaunayPoints = parts[1];
              var points2 = [];
              index = 0;

              while (index < parts[1].size && parts[1][index].border) {
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
              setTimeout(() => {
                frac.available = true;
              }, 10);
              StaticFractureManager.working = false;
            }
          }
        }

      }, _class2.working = false, _class2.cola = new Queue(), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2016085c7fcfd36d3deddb93f866579834af4690.js.map