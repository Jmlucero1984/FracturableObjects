System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, StructureContainer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "21e85mG2GpMPJGIWtHgL4Dj", "StructureContainer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("StructureContainer", StructureContainer = (_dec = ccclass('StructureContainer'), _dec2 = property(Node), _dec(_class = (_class2 = class StructureContainer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "DetectionZone", _descriptor, this);

          this.bluePrintManager = void 0;
        }

        onLoad() {
          this.DetectionZone.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
          this.DetectionZone.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
        }

        start() {}

        setBluePrinManager(bpm) {
          this.bluePrintManager = bpm;
        }

        onMouseEnter() {
          this.bluePrintManager.setInfo("Entraron a Structure Container");
          this.bluePrintManager.setActualNode(this.node);
        }

        onMouseLeave() {
          this.bluePrintManager.setInfo("Salieron de Structure Container");
          this.bluePrintManager.setActualNode(null);
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "DetectionZone", [_dec2], {
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
//# sourceMappingURL=e6b4ceb9fcbb24b6205a79f08f21b13a5618052c.js.map