System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCBoolean, CCInteger, Component, Contact2DType, Mat4, Material, PolygonCollider2D, Prefab, RigidBody2D, Texture2D, Vec2, DelaunayAssemblerImplementer, DelaunayFracture, findFracture, linkNode, plainVertex, StaticFractureManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, executeInEditMode, FractDelaunay;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfDelaunayAssemblerImplementer(extras) {
    _reporterNs.report("DelaunayAssemblerImplementer", "./DelaunayAssemblerImplementer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDelaunayFracture(extras) {
    _reporterNs.report("DelaunayFracture", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOffindFracture(extras) {
    _reporterNs.report("findFracture", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOflinkNode(extras) {
    _reporterNs.report("linkNode", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfplainVertex(extras) {
    _reporterNs.report("plainVertex", "./DelaunaySplitter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStaticFractureManager(extras) {
    _reporterNs.report("StaticFractureManager", "./StaticFractureManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCBoolean = _cc.CCBoolean;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      Mat4 = _cc.Mat4;
      Material = _cc.Material;
      PolygonCollider2D = _cc.PolygonCollider2D;
      Prefab = _cc.Prefab;
      RigidBody2D = _cc.RigidBody2D;
      Texture2D = _cc.Texture2D;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      DelaunayAssemblerImplementer = _unresolved_2.DelaunayAssemblerImplementer;
    }, function (_unresolved_3) {
      DelaunayFracture = _unresolved_3.DelaunayFracture;
      findFracture = _unresolved_3.findFracture;
      linkNode = _unresolved_3.linkNode;
      plainVertex = _unresolved_3.plainVertex;
    }, function (_unresolved_4) {
      StaticFractureManager = _unresolved_4.StaticFractureManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "04a93INqK1AC5R5fEDpnL9l", "FractDelaunay", undefined);

      __checkObsolete__(['_decorator', 'CCBoolean', 'CCInteger', 'Collider2D', 'Component', 'Contact2DType', 'instantiate', 'IPhysics2DContact', 'Mat4', 'Material', 'Node', 'PolygonCollider2D', 'Prefab', 'random', 'RigidBody', 'RigidBody2D', 'Texture2D', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("FractDelaunay", FractDelaunay = (_dec = ccclass('FractDelaunay'), _dec2 = property(Prefab), _dec3 = property(CCBoolean), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property({
        group: "Render"
      }), _dec7 = property(Texture2D), _dec8 = property({
        group: "Render"
      }), _dec9 = property(Material), _dec10 = property({
        type: [Vec2]
      }), _dec(_class = executeInEditMode(_class = (_class2 = class FractDelaunay extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "prefab", _descriptor, this);

          _initializerDefineProperty(this, "ancestor", _descriptor2, this);

          _initializerDefineProperty(this, "recursiveness", _descriptor3, this);

          _initializerDefineProperty(this, "AreaMinima", _descriptor4, this);

          _initializerDefineProperty(this, "baseTexture", _descriptor5, this);

          _initializerDefineProperty(this, "Render_Mat", _descriptor6, this);

          _initializerDefineProperty(this, "polygonPoints", _descriptor7, this);

          this.implementer = void 0;
          this.area = void 0;
          this.available = true;
          this.delaunayPoints = [];
          this.minArea = void 0;
          this.fractureObj = void 0;
          this.previousPos = void 0;
          this.velVect = void 0;
          this.previousTime = void 0;
          this.jsonObject = '[{"x":0,"y":0,"border":true,"links":[null]},{"x":10,"y":0,"border":true,"links":[{"x":20,"y":10,"_angle":0.785},{"x":0,"y":10,"_angle":2.356},{"x":10,"y":13,"_angle":1.571}]},{"x":20,"y":0,"border":true,"links":[null]},{"x":20,"y":10,"border":true,"links":[{"x":10,"y":0,"_angle":3.927},{"x":10,"y":13,"_angle":1.862}]},{"x":20,"y":20,"border":true,"links":[{"x":10,"y":13,"_angle":3.752},{"x":11,"y":26,"_angle":2.159}]},{"x":20,"y":30,"border":true,"links":[{"x":8,"y":41,"_angle":2.313},{"x":11,"y":26,"_angle":3.56}]},{"x":20,"y":40,"border":true,"links":[{"x":8,"y":41,"_angle":1.654},{"x":18,"y":47,"_angle":2.863}]},{"x":30,"y":40,"border":true,"links":[{"x":18,"y":47,"_angle":2.099},{"x":31,"y":52,"_angle":1.488}]},{"x":40,"y":40,"border":true,"links":[{"x":31,"y":52,"_angle":2.498},{"x":48,"y":48,"_angle":0.785}]},{"x":50,"y":40,"border":true,"links":[{"x":48,"y":48,"_angle":2.897},{"x":60,"y":51,"_angle":0.833}]},{"x":60,"y":40,"border":true,"links":[{"x":60,"y":51,"_angle":1.571},{"x":68,"y":52,"_angle":0.983}]},{"x":70,"y":40,"border":true,"links":[{"x":68,"y":52,"_angle":2.976},{"x":81,"y":49,"_angle":0.686}]},{"x":80,"y":40,"border":true,"links":[{"x":81,"y":49,"_angle":1.46}]},{"x":90,"y":40,"border":true,"links":[{"x":81,"y":49,"_angle":2.356},{"x":90,"y":52,"_angle":1.571},{"x":99,"y":50,"_angle":0.838}]},{"x":100,"y":40,"border":true,"links":[{"x":99,"y":50,"_angle":3.042},{"x":110,"y":51,"_angle":0.833}]},{"x":110,"y":40,"border":true,"links":[{"x":110,"y":51,"_angle":1.571}]},{"x":120,"y":40,"border":true,"links":[{"x":110,"y":51,"_angle":2.404},{"x":119,"y":52,"_angle":3.058},{"x":128,"y":49,"_angle":0.844},{"x":130,"y":41,"_angle":0.1}]},{"x":120,"y":30,"border":true,"links":[{"x":130,"y":41,"_angle":0.833},{"x":131,"y":26,"_angle":5.061}]},{"x":120,"y":20,"border":true,"links":[{"x":128,"y":13,"_angle":5.431},{"x":131,"y":26,"_angle":0.499}]},{"x":120,"y":10,"border":true,"links":[{"x":130,"y":0,"_angle":5.498},{"x":128,"y":13,"_angle":0.359}]},{"x":120,"y":0,"border":true,"links":[null]},{"x":130,"y":0,"border":true,"links":[{"x":120,"y":10,"_angle":2.356},{"x":140,"y":10,"_angle":0.785},{"x":128,"y":13,"_angle":2.989}]},{"x":140,"y":0,"border":true,"links":[null]},{"x":140,"y":10,"border":true,"links":[{"x":130,"y":0,"_angle":3.927},{"x":128,"y":13,"_angle":1.816}]},{"x":140,"y":20,"border":true,"links":[{"x":128,"y":13,"_angle":3.67},{"x":131,"y":26,"_angle":2.159}]},{"x":140,"y":30,"border":true,"links":[{"x":130,"y":41,"_angle":2.404},{"x":131,"y":26,"_angle":3.56}]},{"x":140,"y":40,"border":true,"links":[{"x":130,"y":41,"_angle":1.67}]},{"x":140,"y":50,"border":true,"links":[{"x":130,"y":60,"_angle":2.356},{"x":128,"y":49,"_angle":3.225},{"x":130,"y":41,"_angle":3.874}]},{"x":140,"y":60,"border":true,"links":[null]},{"x":130,"y":60,"border":true,"links":[{"x":140,"y":50,"_angle":5.498},{"x":119,"y":52,"_angle":3.77},{"x":128,"y":49,"_angle":4.533}]},{"x":120,"y":60,"border":true,"links":[{"x":119,"y":52,"_angle":4.588}]},{"x":110,"y":60,"border":true,"links":[{"x":110,"y":51,"_angle":4.712},{"x":119,"y":52,"_angle":5.439}]},{"x":100,"y":60,"border":true,"links":[{"x":90,"y":52,"_angle":3.816},{"x":99,"y":50,"_angle":4.613},{"x":110,"y":51,"_angle":5.445}]},{"x":90,"y":60,"border":true,"links":[{"x":90,"y":52,"_angle":4.712}]},{"x":80,"y":60,"border":true,"links":[{"x":68,"y":52,"_angle":3.73},{"x":81,"y":49,"_angle":6.193},{"x":90,"y":52,"_angle":5.387}]},{"x":70,"y":60,"border":true,"links":[{"x":68,"y":52,"_angle":4.467}]},{"x":60,"y":60,"border":true,"links":[{"x":60,"y":51,"_angle":4.712},{"x":68,"y":52,"_angle":5.498}]},{"x":50,"y":60,"border":true,"links":[{"x":48,"y":48,"_angle":4.547},{"x":60,"y":51,"_angle":5.445}]},{"x":40,"y":60,"border":true,"links":[{"x":31,"y":52,"_angle":3.868},{"x":48,"y":48,"_angle":5.695}]},{"x":30,"y":60,"border":true,"links":[{"x":31,"y":52,"_angle":6.159}]},{"x":20,"y":60,"border":true,"links":[{"x":18,"y":47,"_angle":4.56},{"x":31,"y":52,"_angle":5.341}]},{"x":10,"y":60,"border":true,"links":[{"x":0,"y":50,"_angle":3.927},{"x":9,"y":48,"_angle":4.629},{"x":18,"y":47,"_angle":5.732}]},{"x":0,"y":60,"border":true,"links":[null]},{"x":0,"y":50,"border":true,"links":[{"x":10,"y":60,"_angle":0.785},{"x":8,"y":41,"_angle":5.557},{"x":9,"y":48,"_angle":4.931}]},{"x":0,"y":40,"border":true,"links":[{"x":8,"y":41,"_angle":0.124}]},{"x":0,"y":30,"border":true,"links":[{"x":8,"y":41,"_angle":0.942},{"x":11,"y":26,"_angle":5.061}]},{"x":0,"y":20,"border":true,"links":[{"x":10,"y":13,"_angle":5.323},{"x":11,"y":26,"_angle":0.499}]},{"x":0,"y":10,"border":true,"links":[{"x":10,"y":0,"_angle":5.498},{"x":10,"y":13,"_angle":0.291}]},{"x":8,"y":41,"border":false,"links":[{"x":0,"y":50,"_angle":2.415},{"x":0,"y":40,"_angle":3.266},{"x":20,"y":30,"_angle":5.454},{"x":20,"y":40,"_angle":4.796},{"x":0,"y":30,"_angle":4.084},{"x":9,"y":48,"_angle":1.429},{"x":11,"y":26,"_angle":6.086},{"x":18,"y":47,"_angle":0.54}]},{"x":9,"y":48,"border":false,"links":[{"x":10,"y":60,"_angle":1.488},{"x":0,"y":50,"_angle":1.789},{"x":8,"y":41,"_angle":4.57},{"x":18,"y":47,"_angle":4.823}]},{"x":10,"y":13,"border":false,"links":[{"x":10,"y":0,"_angle":4.712},{"x":20,"y":10,"_angle":5.004},{"x":0,"y":10,"_angle":3.433},{"x":20,"y":20,"_angle":0.611},{"x":0,"y":20,"_angle":2.182},{"x":11,"y":26,"_angle":1.494}]},{"x":11,"y":26,"border":false,"links":[{"x":20,"y":20,"_angle":5.3},{"x":20,"y":30,"_angle":0.418},{"x":0,"y":30,"_angle":1.92},{"x":0,"y":20,"_angle":3.641},{"x":8,"y":41,"_angle":2.944},{"x":10,"y":13,"_angle":4.636}]},{"x":18,"y":47,"border":false,"links":[{"x":20,"y":40,"_angle":6.005},{"x":30,"y":40,"_angle":5.24},{"x":20,"y":60,"_angle":1.418},{"x":10,"y":60,"_angle":2.59},{"x":9,"y":48,"_angle":1.681},{"x":8,"y":41,"_angle":3.682},{"x":31,"y":52,"_angle":0.367}]},{"x":31,"y":52,"border":false,"links":[{"x":30,"y":40,"_angle":4.629},{"x":40,"y":40,"_angle":5.64},{"x":40,"y":60,"_angle":0.727},{"x":30,"y":60,"_angle":3.017},{"x":18,"y":47,"_angle":3.509},{"x":20,"y":60,"_angle":2.2},{"x":48,"y":48,"_angle":4.943}]},{"x":48,"y":48,"border":false,"links":[{"x":40,"y":40,"_angle":3.927},{"x":50,"y":40,"_angle":6.038},{"x":50,"y":60,"_angle":1.406},{"x":40,"y":60,"_angle":2.554},{"x":31,"y":52,"_angle":1.802},{"x":60,"y":51,"_angle":0.245}]},{"x":60,"y":51,"border":false,"links":[{"x":50,"y":40,"_angle":3.975},{"x":60,"y":40,"_angle":4.712},{"x":48,"y":48,"_angle":3.387},{"x":60,"y":60,"_angle":1.571},{"x":50,"y":60,"_angle":2.304},{"x":68,"y":52,"_angle":0.124}]},{"x":68,"y":52,"border":false,"links":[{"x":80,"y":60,"_angle":0.588},{"x":70,"y":60,"_angle":1.326},{"x":60,"y":40,"_angle":4.124},{"x":70,"y":40,"_angle":6.118},{"x":60,"y":51,"_angle":3.266},{"x":60,"y":60,"_angle":2.356},{"x":81,"y":49,"_angle":4.939}]},{"x":81,"y":49,"border":false,"links":[{"x":80,"y":40,"_angle":4.602},{"x":90,"y":40,"_angle":5.498},{"x":70,"y":40,"_angle":3.827},{"x":68,"y":52,"_angle":1.798},{"x":80,"y":60,"_angle":3.051},{"x":90,"y":52,"_angle":0.322}]},{"x":90,"y":52,"border":false,"links":[{"x":100,"y":60,"_angle":0.675},{"x":90,"y":60,"_angle":1.571},{"x":81,"y":49,"_angle":3.463},{"x":90,"y":40,"_angle":4.712},{"x":80,"y":60,"_angle":2.246},{"x":99,"y":50,"_angle":4.931}]},{"x":99,"y":50,"border":false,"links":[{"x":90,"y":40,"_angle":3.98},{"x":100,"y":40,"_angle":6.184},{"x":90,"y":52,"_angle":1.789},{"x":100,"y":60,"_angle":1.471},{"x":110,"y":51,"_angle":0.091}]},{"x":110,"y":51,"border":false,"links":[{"x":110,"y":40,"_angle":4.712},{"x":120,"y":40,"_angle":5.545},{"x":100,"y":40,"_angle":3.975},{"x":99,"y":50,"_angle":3.232},{"x":110,"y":60,"_angle":1.571},{"x":100,"y":60,"_angle":2.304},{"x":119,"y":52,"_angle":0.111}]},{"x":119,"y":52,"border":false,"links":[{"x":130,"y":60,"_angle":0.629},{"x":120,"y":60,"_angle":1.446},{"x":110,"y":51,"_angle":3.252},{"x":120,"y":40,"_angle":6.2},{"x":110,"y":60,"_angle":2.297},{"x":128,"y":49,"_angle":5.034}]},{"x":128,"y":49,"border":false,"links":[{"x":119,"y":52,"_angle":1.893},{"x":120,"y":40,"_angle":3.986},{"x":140,"y":50,"_angle":0.083},{"x":130,"y":60,"_angle":1.391},{"x":130,"y":41,"_angle":6.038}]},{"x":130,"y":41,"border":false,"links":[{"x":120,"y":40,"_angle":3.241},{"x":120,"y":30,"_angle":3.975},{"x":140,"y":30,"_angle":5.545},{"x":140,"y":40,"_angle":4.812},{"x":128,"y":49,"_angle":2.897},{"x":140,"y":50,"_angle":0.733},{"x":131,"y":26,"_angle":6.217}]},{"x":128,"y":13,"border":false,"links":[{"x":120,"y":10,"_angle":3.5},{"x":130,"y":0,"_angle":6.131},{"x":140,"y":10,"_angle":4.957},{"x":120,"y":20,"_angle":2.29},{"x":140,"y":20,"_angle":0.528},{"x":131,"y":26,"_angle":1.344}]},{"x":131,"y":26,"border":false,"links":[{"x":120,"y":30,"_angle":1.92},{"x":120,"y":20,"_angle":3.641},{"x":140,"y":20,"_angle":5.3},{"x":140,"y":30,"_angle":0.418},{"x":130,"y":41,"_angle":3.075},{"x":128,"y":13,"_angle":4.486}]}]';
        }

        onLoad() {
          this.polygonPoints = [];
          console.log("ONLOAD");

          if (this.node.getComponent(_crd && DelaunayAssemblerImplementer === void 0 ? (_reportPossibleCrUseOfDelaunayAssemblerImplementer({
            error: Error()
          }), DelaunayAssemblerImplementer) : DelaunayAssemblerImplementer) == null) {
            this.implementer = this.node.addComponent(_crd && DelaunayAssemblerImplementer === void 0 ? (_reportPossibleCrUseOfDelaunayAssemblerImplementer({
              error: Error()
            }), DelaunayAssemblerImplementer) : DelaunayAssemblerImplementer);
            this.implementer.baseTexture = this.baseTexture;
            this.implementer.Render_Mat = this.Render_Mat;

            if (this.ancestor) {
              this.createPlainVertexData();
              JSON.parse(this.jsonObject).forEach(vertex => {
                if (vertex.border == true) {
                  this.polygonPoints.push(new Vec2(vertex.x, vertex.y));
                }
              });
              console.log(this.polygonPoints);
              this.node.getComponent(PolygonCollider2D).points = this.polygonPoints;
              this.node.getComponent(PolygonCollider2D).apply();
              this.implementer.customLoad(this.polygonPoints);
              this.node.getComponent(RigidBody2D).enabled = true;
              this.setListeners();
            }
          }
        }

        customLoad(points) {
          console.log("TIMED");
          this.scheduleOnce(() => {
            var c = this.node.getComponent(RigidBody2D);
            this.node.getComponent(PolygonCollider2D).points = points;
            this.node.getComponent(PolygonCollider2D).apply();
            c.enabled = true;
            this.setListeners();
          }, 0.1);
        }

        onEnable() {
          console.log("ON ENABLE");
        }

        createPlainVertexData() {
          JSON.parse(this.jsonObject).forEach(verte => {
            var pV = new (_crd && plainVertex === void 0 ? (_reportPossibleCrUseOfplainVertex({
              error: Error()
            }), plainVertex) : plainVertex)(verte.x, verte.y, verte.border);
            verte.links.forEach(linke => {
              if (linke != null) {
                pV.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
                  error: Error()
                }), linkNode) : linkNode)(linke.x, linke.y, linke._angle));
              }
            });
            this.delaunayPoints.push(pV);
          });
        }

        start() {
          console.log("ON START");
          this.previousPos = new Vec2(this.node.position.x, this.node.position.y);
          this.previousTime = 0;
          this.velVect = new Vec2(0, 0);
        }

        setListeners() {
          var p = this.node.getComponent(PolygonCollider2D);
          p.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          p.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        update(deltaTime) {
          this.previousTime += deltaTime;

          if (this.previousTime > 0.2) {
            var newPos = new Vec2(this.node.position.x, this.node.position.y);
            this.velVect = new Vec2((newPos.x - this.previousPos.x) / this.previousTime, (newPos.y - this.previousPos.y) / this.previousTime);
            this.previousPos = newPos;
            this.previousTime = 0;
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          var otherFracturable = otherCollider.getComponent(FractDelaunay);
          var enoughImpulse = false;

          if (this.recursiveness > 0 && this.available) {
            if (otherFracturable != null) {
              var velA = this.velVect;
              var velB = otherFracturable.velVect;
              console.log("OTHER VELOCITY: " + velA);
              console.log("THIS VELOCITY: " + velB);

              if (Math.abs(velA.x - velB.x) > 100) {
                console.log("DIF X > 500 ");
                enoughImpulse = true;
              }

              if (Math.abs(velA.y - velB.y) > 100) {
                enoughImpulse = true;
                console.log("DIF Y > 500 ");
              }
            }

            if (otherCollider.node.name == "Stomper" || otherFracturable != null && enoughImpulse) {
              //    if(otherCollider.node.name == "Stomper") {
              this.available = false;
              var inverseWorldMatrix = new Mat4();
              Mat4.invert(inverseWorldMatrix, this.node.getWorldMatrix());
              var localContactPoint = contact.getWorldManifold().points[0].transformMat4(inverseWorldMatrix);
              var normalContactPoint = contact.getManifold().localNormal;
              this.fractureObj = new (_crd && DelaunayFracture === void 0 ? (_reportPossibleCrUseOfDelaunayFracture({
                error: Error()
              }), DelaunayFracture) : DelaunayFracture)(localContactPoint, normalContactPoint, this.node.getComponent(PolygonCollider2D).points, this.delaunayPoints);
              var result = (_crd && findFracture === void 0 ? (_reportPossibleCrUseOffindFracture({
                error: Error()
              }), findFracture) : findFracture)(this.fractureObj);

              if (this.fractureObj.getDelaunayPoints() != null && this.fractureObj.getDelaunayPoints().length > 1 && result) {
                console.log("BEAM ICON"); //  this.createCopy(this.fractureObj);

                (_crd && StaticFractureManager === void 0 ? (_reportPossibleCrUseOfStaticFractureManager({
                  error: Error()
                }), StaticFractureManager) : StaticFractureManager).cola.enqueue(this);
              }
            }
          }
        }

        lengthVector(a, b) {
          return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        }

        center(coords) {
          var maxX = -10000;
          var minX = 10000;
          var maxY = -10000;
          var minY = 10000;
          coords.forEach(element => {
            if (element.x < minX) minX = element.x;
            if (element.x > maxX) maxX = element.x;
            if (element.y < minY) minY = element.y;
            if (element.y > maxY) maxY = element.y;
          });
          var offsetX = (maxX - minX) / 2;
          var offsetY = (maxY - minY) / 2;
          coords.forEach(element => {
            element.x = element.x - offsetX;
            element.y = element.y - offsetY;
            element.links.forEach(e => {
              e.x = e.x - offsetX;
              e.y = e.y - offsetY;
            });
          });
        }

        onEndContact(selfCollider, otherCollider, contact) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ancestor", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "recursiveness", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "AreaMinima", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "baseTexture", [_dec6, _dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "Render_Mat", [_dec8, _dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "polygonPoints", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9adde1676a7c03847abb73fbc03522be1a1f4c3d.js.map