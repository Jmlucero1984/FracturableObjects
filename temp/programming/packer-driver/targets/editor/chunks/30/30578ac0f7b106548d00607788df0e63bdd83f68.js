System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCInteger, Component, Contact2DType, instantiate, Mat4, PolygonCollider2D, Prefab, RigidBody2D, Vec3, MaskSplitter, FracturableAssembler, FracturaImplementer, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, FractwithAssembler;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfFracturableAssembler(extras) {
    _reporterNs.report("FracturableAssembler", "./FracturableAssembler", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFracturaImplementer(extras) {
    _reporterNs.report("FracturaImplementer", "./FracturaImplementer", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      instantiate = _cc.instantiate;
      Mat4 = _cc.Mat4;
      PolygonCollider2D = _cc.PolygonCollider2D;
      Prefab = _cc.Prefab;
      RigidBody2D = _cc.RigidBody2D;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      MaskSplitter = _unresolved_2;
    }, function (_unresolved_3) {
      FracturableAssembler = _unresolved_3.FracturableAssembler;
    }, function (_unresolved_4) {
      FracturaImplementer = _unresolved_4.FracturaImplementer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "70737elQYRO5Ktj/L2yLc2D", "FractwithAssembler", undefined);

      __checkObsolete__(['_decorator', 'CCInteger', 'Collider2D', 'Component', 'Contact2DType', 'Gradient', 'Graphics', 'instantiate', 'IPhysics2DContact', 'Mask', 'Mat4', 'Node', 'PolygonCollider2D', 'Prefab', 'RigidBody2D', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FractwithAssembler", FractwithAssembler = (_dec = ccclass('FractwithAssembler'), _dec2 = property(Prefab), _dec3 = property(CCInteger), _dec4 = property(CCInteger), _dec(_class = (_class2 = class FractwithAssembler extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "prefab", _descriptor, this);

          _initializerDefineProperty(this, "recursiveness", _descriptor2, this);

          _initializerDefineProperty(this, "minArea", _descriptor3, this);

          this.area = void 0;
        }

        start() {
          this.setListeners();
          setTimeout(() => {
            let c = this.node.getComponent(RigidBody2D);
            c.enabled = true;
            this.area = this.node.getComponent(_crd && FracturaImplementer === void 0 ? (_reportPossibleCrUseOfFracturaImplementer({
              error: Error()
            }), FracturaImplementer) : FracturaImplementer).getArea();
          }, 1);
        }

        setListeners() {
          let p = this.node.getComponent(PolygonCollider2D);
          /*
          this.area= MaskSplitter.calculateEnvolArea(p.points);
          console.log("El obj "+ this.node.name+" tiene el area "+this.area)*/

          p.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          p.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); // }
        }

        update(deltaTime) {}

        createCopy(fracture) {
          console.log("ENTRO");
          let parts = MaskSplitter.lineCutPolygon(fracture);

          if (parts != null) {
            console.log("PARTS 0");
            console.log(parts[0]);
            console.log("PARTS 1");
            console.log(parts[1]);
            let a1 = MaskSplitter.calcAproxArea(parts[0]);
            let a2 = MaskSplitter.calcAproxArea(parts[1]);

            if (a1 > this.minArea && a2 > this.minArea) {
              this.recursiveness--;
              let fi = this.node.getComponent(_crd && FracturaImplementer === void 0 ? (_reportPossibleCrUseOfFracturaImplementer({
                error: Error()
              }), FracturaImplementer) : FracturaImplementer);
              let pc = this.node.getComponent(PolygonCollider2D);
              pc.points = parts[0];
              fi.polygon = parts[0];
              fi.modifyPoints();
              pc.apply();
              let copyOf = instantiate(this.prefab);
              let cfwa = copyOf.getComponent(FractwithAssembler);
              cfwa.prefab = this.prefab;
              cfwa.recursiveness = this.recursiveness;
              copyOf.parent = this.node.parent;
              copyOf.getComponent(PolygonCollider2D).points = parts[1];
              copyOf.getComponent(_crd && FracturableAssembler === void 0 ? (_reportPossibleCrUseOfFracturableAssembler({
                error: Error()
              }), FracturableAssembler) : FracturableAssembler).setPoints(parts[1]);
              copyOf.setRotation(this.node.getRotation());
              copyOf.setPosition(new Vec3(this.node.position.x, this.node.position.y));
            }
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          let otherFracturable = otherCollider.getComponent(FractwithAssembler); // if (otherCollider.node.name == "Stomper") {

          console.log("collision");
          console.log("THIS AREA: " + this.area);

          if ((otherCollider.node.name == "Stomper" || this.recursiveness > 0 && otherCollider.node.getComponent(FractwithAssembler) != null) && this.area > this.minArea) {
            var inverseWorldMatrix = new Mat4();
            Mat4.invert(inverseWorldMatrix, this.node.getWorldMatrix());
            let localContactPoint = contact.getWorldManifold().points[0].transformMat4(inverseWorldMatrix);
            let normalContactPoint = contact.getManifold().localNormal;
            let fractureObj = new MaskSplitter.Fracture(localContactPoint, normalContactPoint, this.node.getComponent(PolygonCollider2D).points);
            let fracturePoints = MaskSplitter.getFracturable(fractureObj);
            console.log(fracturePoints);
            console.log("-----");

            if (fracturePoints != null && fracturePoints.length > 1) {
              console.log("BEAM ICON");
              this.createCopy(fractureObj);
            }
          }
        }

        onEndContact(selfCollider, otherCollider, contact) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "recursiveness", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "minArea", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1500;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=30578ac0f7b106548d00607788df0e63bdd83f68.js.map