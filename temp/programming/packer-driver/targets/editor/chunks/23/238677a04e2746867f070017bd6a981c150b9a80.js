System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, Vec3, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, DraggableStomper;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Input = _cc.Input;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bcedaVz6OtCrpuUtZannGPx", "DraggableStomper", undefined);

      __checkObsolete__(['_decorator', 'CCBoolean', 'Component', 'EventKeyboard', 'EventMouse', 'EventTouch', 'input', 'Input', 'instantiate', 'KeyCode', 'Label', 'Node', 'Prefab', 'RigidBody2D', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DraggableStomper", DraggableStomper = (_dec = ccclass('DraggableStomper'), _dec2 = property({
        serializable: true
      }), _dec(_class = (_class2 = class DraggableStomper extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "gravOnDrag", _descriptor, this);
        }

        start() {}

        update(deltaTime) {}

        setListeners() {
          this.node.on(Input.EventType.MOUSE_DOWN, this.onTouchStart, this);
          this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Input.EventType.MOUSE_UP, this.onTouchEnd, this);
        }

        onLoad() {
          this.setListeners();
        } //  this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);


        onTouchMove(e) {
          let mousePosition = e.getUILocation(); // Convert the mouse position to the local node space
          //this.etiqueta.string="WORLD POS: "+this.node.worldPosition.x+" "+this.node.worldPosition.y;

          this.node.setWorldPosition(new Vec3(mousePosition.x, mousePosition.y, 0));
        }

        onTouchStart(event) {}

        onTouchEnd(event) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gravOnDrag", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=238677a04e2746867f070017bd6a981c150b9a80.js.map