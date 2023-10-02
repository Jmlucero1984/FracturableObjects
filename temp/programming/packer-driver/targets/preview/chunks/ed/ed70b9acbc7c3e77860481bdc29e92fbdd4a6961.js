System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, BoxCollider2D, CCInteger, Component, Contact2DType, instantiate, Prefab, Sprite, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Detonator;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioSource = _cc.AudioSource;
      BoxCollider2D = _cc.BoxCollider2D;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7fc66hf4OJLjLpS45331xS7", "Detonator", undefined);

      __checkObsolete__(['_decorator', 'AudioSource', 'BoxCollider2D', 'CCInteger', 'Collider2D', 'Component', 'Contact2DType', 'instantiate', 'IPhysics2DContact', 'Node', 'ParticleSystem2D', 'PolygonCollider2D', 'Prefab', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Detonator", Detonator = (_dec = ccclass('Detonator'), _dec2 = property(CCInteger), _dec3 = property(Sprite), _dec4 = property(Prefab), _dec(_class = (_class2 = class Detonator extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "milisecs", _descriptor, this);

          _initializerDefineProperty(this, "detonator", _descriptor2, this);

          _initializerDefineProperty(this, "explosion", _descriptor3, this);

          this.audioSource = void 0;
          this.elemento = void 0;
          this.timeElpased = 0;
          this.detonated = false;
          this.activated = false;
        }

        getTimeToDetonate() {
          return this.milisecs;
        }

        onLoad() {
          this.audioSource = this.getComponent(AudioSource);
          var collider = this.getComponent(BoxCollider2D);

          if (collider) {
            console.log("THERE IS COLLIDER");
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          }
        }

        setTimeToDetonate(time) {
          this.milisecs = time;
          console.log("TIME: " + this.milisecs);
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          console.log("IN CONTACTTTT!!!!");

          if (!this.detonated) {
            this.elemento = otherCollider.node;
          }
        }

        update(deltaTime) {
          if (this.activated) {
            this.timeElpased += deltaTime;

            if (this.timeElpased > this.milisecs && !this.detonated) {
              this.detonated = true; //this.getComponent(AudioSource).replicated=true;

              this.audioSource.play();
              var node = instantiate(this.explosion);
              node.parent = this.node;
              console.log("DESTROOOOYY");
              this.detonator.destroy();
              this.elemento.destroy();
              this.destroy();
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "milisecs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "detonator", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "explosion", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ed70b9acbc7c3e77860481bdc29e92fbdd4a6961.js.map