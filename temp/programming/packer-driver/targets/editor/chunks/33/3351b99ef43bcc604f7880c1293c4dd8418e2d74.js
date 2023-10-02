System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, RichText, Vec2, linkNode, findClosestAngle, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, executeInEditMode, UnitTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOflinkNode(extras) {
    _reporterNs.report("linkNode", "../LinkNodeClass", _context.meta, extras);
  }

  function _reportPossibleCrUseOffindClosestAngle(extras) {
    _reporterNs.report("findClosestAngle", "./DelaunaySplitter", _context.meta, extras);
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
      RichText = _cc.RichText;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      linkNode = _unresolved_2.linkNode;
    }, function (_unresolved_3) {
      findClosestAngle = _unresolved_3.findClosestAngle;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8765corWAhLRb2D4RuDz4ak", "UnitTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'RichText', 'Vec2']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("UnitTest", UnitTest = (_dec = ccclass('UnitTest'), _dec2 = property(RichText), _dec(_class = executeInEditMode(_class = (_class2 = class UnitTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "outputText", _descriptor, this);
        }

        onLoad() {
          console.log("ON LOAD UNIT TEST");
        }

        onEnable() {
          this.outputText.string = "<color=#0000ff>--- RUNNING TESTS ---\n </color>";
          const tests = [];
          tests.push(this.AngleTest1);
          tests.forEach(t => {
            this.outputText.string += "<color=#00ff00>" + t.name + "\n</color>";

            if (t()) {
              this.outputText.string += "<color=#00ff00>PASSED\n</color>";
            } else {
              this.outputText.string += "<color=#ff0000>FAILED\n</color>";
            }
          });
        }

        update(deltaTime) {}

        static degToRad(angleDeg) {
          return angleDeg / 360 * 2 * 3.141592654;
        }

        AngleTest1() {
          let vectores = [];
          let angulos = [];
          vectores.push(new Vec2(1, 0));
          vectores.push(new Vec2(0.94, 0.34));
          vectores.push(new Vec2(0.55, 0.84));
          vectores.push(new Vec2(0, 1));
          vectores.push(new Vec2(-0.52, 0.86));
          vectores.push(new Vec2(-1, 0));
          vectores.push(new Vec2(-0.93, -0.36));
          vectores.push(new Vec2(-0.31, -0.95));
          vectores.push(new Vec2(0, -1));
          vectores.push(new Vec2(0.20, -0.98));
          vectores.push(new Vec2(0.99, -0.17));
          angulos.push(0);
          angulos.push(20);
          angulos.push(56.7);
          angulos.push(90);
          angulos.push(121.1);
          angulos.push(180);
          angulos.push(201.1);
          angulos.push(252);
          angulos.push(270);
          angulos.push(281.5);
          angulos.push(350.4);
          console.log(vectores);
          console.log("------- TEST 1 -------");
          let linksNodesTest = [];

          for (let i = 0; i < vectores.length; i++) {
            linksNodesTest.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
              error: Error()
            }), linkNode) : linkNode)(vectores[i].x, vectores[i].y, UnitTest.degToRad(angulos[i])));
          }

          return (_crd && findClosestAngle === void 0 ? (_reportPossibleCrUseOffindClosestAngle({
            error: Error()
          }), findClosestAngle) : findClosestAngle)(UnitTest.degToRad(11), linksNodesTest) == 1;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "outputText", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3351b99ef43bcc604f7880c1293c4dd8418e2d74.js.map