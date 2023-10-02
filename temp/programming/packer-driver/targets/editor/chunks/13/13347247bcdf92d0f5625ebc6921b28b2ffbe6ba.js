System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BlockInputEvents, Component, Label, Node, UITransform, v2, Vec2, ItemsPanel, StructureContainer, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, BluePrintManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfItemsPanel(extras) {
    _reporterNs.report("ItemsPanel", "./ItemsPanel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGeneralManager(extras) {
    _reporterNs.report("GeneralManager", "./GeneralManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStructureContainer(extras) {
    _reporterNs.report("StructureContainer", "./StructureContainer", _context.meta, extras);
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
      Label = _cc.Label;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      v2 = _cc.v2;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      ItemsPanel = _unresolved_2.ItemsPanel;
    }, function (_unresolved_3) {
      StructureContainer = _unresolved_3.StructureContainer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "808b1m+sftFoaEcEhCVi4c2", "BluePrintManager", undefined);

      __checkObsolete__(['_decorator', 'BlockInputEvents', 'Component', 'Label', 'Node', 'UITransform', 'v2', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BluePrintManager", BluePrintManager = (_dec = ccclass('BluePrintManager'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = class BluePrintManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "infoLabel", _descriptor, this);

          _initializerDefineProperty(this, "itemPanel", _descriptor2, this);

          _initializerDefineProperty(this, "blocker", _descriptor3, this);

          _initializerDefineProperty(this, "structureNode", _descriptor4, this);

          this.itemsPanelManager = void 0;
          this.generalManager = void 0;
          this.actualNode = void 0;
        }

        onLoad() {
          this.itemsPanelManager = this.itemPanel.getComponent(_crd && ItemsPanel === void 0 ? (_reportPossibleCrUseOfItemsPanel({
            error: Error()
          }), ItemsPanel) : ItemsPanel);
          this.itemsPanelManager.setBluePrintManager(this);
          this.structureNode.getComponent(_crd && StructureContainer === void 0 ? (_reportPossibleCrUseOfStructureContainer({
            error: Error()
          }), StructureContainer) : StructureContainer).setBluePrinManager(this);
        }

        start() {}

        setGeneralManager(gm) {
          this.generalManager = gm;
        }

        setActualNode(node) {
          this.actualNode = node;
        }

        blockEvents(blocked) {
          this.infoLabel.string = "BLOCKER " + blocked;
          this.blocker.getComponent(BlockInputEvents).enabled = blocked;
        }

        setInfo(mensaje) {
          this.infoLabel.string = mensaje;
        }

        elementReleased(dragabbleItemNode) {
          if (this.actualNode != null) {
            this.setInfo("ACTUAL" + this.actualNode.name);

            if (this.actualNode.name == "StructureContainer") {
              this.infoLabel.string = "Se dejo dentro del Structure Container al objeto " + dragabbleItemNode.name;
              let worldPos = dragabbleItemNode.getWorldPosition();
              dragabbleItemNode.setParent(this.structureNode);
              dragabbleItemNode.setWorldPosition(worldPos);
              let dimsStruc = new Vec2(this.structureNode.getComponent(UITransform).width, this.structureNode.getComponent(UITransform).height);
              let dimsItem = new Vec2(dragabbleItemNode.getComponent(UITransform).width / 2, dragabbleItemNode.getComponent(UITransform).height / 2);
              this.generalManager.placeDetonator(v2((dragabbleItemNode.getPosition().x + dimsItem.x) / dimsStruc.x, (dragabbleItemNode.getPosition().y + dimsItem.y) / dimsStruc.y));
            } else {
              this.infoLabel.string = "Se ha destruido " + dragabbleItemNode.name;
              dragabbleItemNode.destroy();
              this.itemsPanelManager.incrementItems();
            }
          } else {
            this.infoLabel.string = "Se ha destruido " + dragabbleItemNode.name;
            dragabbleItemNode.destroy();
            this.itemsPanelManager.incrementItems();
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "infoLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemPanel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "blocker", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "structureNode", [_dec5], {
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
//# sourceMappingURL=13347247bcdf92d0f5625ebc6921b28b2ffbe6ba.js.map