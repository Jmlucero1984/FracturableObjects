System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BlockInputEvents, Component, instantiate, Label, Node, Prefab, DraggableItem, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, ItemsPanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfDraggableItem(extras) {
    _reporterNs.report("DraggableItem", "./DraggableItem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBluePrintManager(extras) {
    _reporterNs.report("BluePrintManager", "./BluePrintManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      BlockInputEvents = _cc.BlockInputEvents;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      DraggableItem = _unresolved_2.DraggableItem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a9e960EA1RJ8Ltvn/iRmFFv", "ItemsPanel", undefined);

      __checkObsolete__(['_decorator', 'BlockInputEvents', 'Component', 'instantiate', 'Label', 'Node', 'Prefab', 'v3', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ItemsPanel", ItemsPanel = (_dec = ccclass('ItemsPanel'), _dec2 = property(Prefab), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec(_class = (_class2 = class ItemsPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "item", _descriptor, this);

          _initializerDefineProperty(this, "N_items_a", _descriptor2, this);

          _initializerDefineProperty(this, "infoLabel", _descriptor3, this);

          _initializerDefineProperty(this, "i_a_holder", _descriptor4, this);

          this.onItemAHodler = false;
          this.cantItemsA = 0;
          this.blocker = void 0;
          this.bluePrintManager = void 0;
        }

        onLoad() {
          this.blocker = this.i_a_holder.addComponent(BlockInputEvents);
          this.blocker.enabled = false;
          this.cantItemsA = Number(this.N_items_a.string);
          this.node.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
          this.node.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
          this.i_a_holder.on(Node.EventType.MOUSE_MOVE, () => {
            this.infoLabel.string = "OVER";
            this.onItemAHodler = true;
          }, this);
          this.i_a_holder.on(Node.EventType.MOUSE_LEAVE, () => {
            this.infoLabel.string = "OUT";
            this.onItemAHodler = false;
          }, this);
        }

        setBluePrintManager(bpm) {
          this.bluePrintManager = bpm;
        }

        elementReleased(dragabbleItemNode) {
          this.bluePrintManager.setInfo("han soltado");
          this.bluePrintManager.elementReleased(dragabbleItemNode);
        }

        onMouseEnter() {
          this.bluePrintManager.setInfo("Entraron a Item Menu");
          this.bluePrintManager.setActualNode(this.node);
        }

        onMouseLeave() {
          this.bluePrintManager.setInfo("Salieron de Item Menu");
          this.bluePrintManager.setActualNode(null);
        }

        incrementItems() {
          this.cantItemsA++;
          this.N_items_a.string = String(this.cantItemsA);
        }

        instantiateItem(position) {
          if (this.onItemAHodler && this.cantItemsA > 0) {
            this.cantItemsA--;
            this.N_items_a.string = String(this.cantItemsA);
            const node = instantiate(this.item);
            node.getComponent(_crd && DraggableItem === void 0 ? (_reportPossibleCrUseOfDraggableItem({
              error: Error()
            }), DraggableItem) : DraggableItem).ItemPanel = this.node;

            if (this.cantItemsA > 0) {
              node.getComponent(_crd && DraggableItem === void 0 ? (_reportPossibleCrUseOfDraggableItem({
                error: Error()
              }), DraggableItem) : DraggableItem).setAvailableToMove(true);
            }

            node.parent = this.node;
            node.position = position;
          }
        }

        start() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "item", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "N_items_a", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "infoLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "i_a_holder", [_dec5], {
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
//# sourceMappingURL=299026f640d3937a6da180856f9873d7fb1754cb.js.map