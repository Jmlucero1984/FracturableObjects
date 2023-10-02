System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCBoolean, Component, Input, Node, Vec3, ItemsPanel, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, DraggableItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfItemsPanel(extras) {
    _reporterNs.report("ItemsPanel", "./ItemsPanel", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCBoolean = _cc.CCBoolean;
      Component = _cc.Component;
      Input = _cc.Input;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ItemsPanel = _unresolved_2.ItemsPanel;
    }],
    execute: function () {
      _crd = true;

      __checkObsolete__(['_decorator', 'CCBoolean', 'Component', 'EventTouch', 'Input', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DraggableItem", DraggableItem = (_dec = ccclass('DraggableItem'), _dec2 = property(CCBoolean), _dec3 = property(Node), _dec(_class = (_class2 = class DraggableItem extends Component {
        constructor() {
          super(...arguments);
          this.moving = false;

          _initializerDefineProperty(this, "availableToMove", _descriptor, this);

          _initializerDefineProperty(this, "ItemPanel", _descriptor2, this);
        }

        setAvailableToMove(available) {
          this.availableToMove = available;
        }

        onLoad() {
          this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onTouchStart(event) {
          this.ItemPanel.getComponent(_crd && ItemsPanel === void 0 ? (_reportPossibleCrUseOfItemsPanel({
            error: Error()
          }), ItemsPanel) : ItemsPanel).instantiateItem(this.node.position);
        }

        onTouchMove(event) {
          if (this.availableToMove) {
            this.moving = true; //BluePrintManager.setInfo("Moving")

            var pos = event.getUILocation();
            this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));
          }
        }

        onTouchEnd(event) {
          this.ItemPanel.getComponent(_crd && ItemsPanel === void 0 ? (_reportPossibleCrUseOfItemsPanel({
            error: Error()
          }), ItemsPanel) : ItemsPanel).elementReleased(this.node);
          this.moving = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "availableToMove", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ItemPanel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _crd = false;
    }
  };
});
//# sourceMappingURL=c1db170369a0b77830d50044c23430f3f7559994.js.map