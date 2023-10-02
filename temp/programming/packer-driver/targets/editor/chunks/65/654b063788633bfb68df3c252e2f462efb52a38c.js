System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, RichText, Vec2, linkNode, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, executeInEditMode, UnitTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOflinkNode(extras) {
    _reporterNs.report("linkNode", "../LinkNodeClass", _context.meta, extras);
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

      _export("UnitTest", UnitTest = (_dec = ccclass('UnitTest'), _dec2 = property(RichText), _dec(_class = executeInEditMode(_class = (_class2 = (_class3 = class UnitTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "outputText", _descriptor, this);
        }

        onLoad() {
          console.log("ON LOAD UNIT TEST");
          UnitTest.vectores.push(new Vec2(1, 0));
          UnitTest.vectores.push(new Vec2(1, 0));
          UnitTest.vectores.push(new Vec2(0.94, 0.34));
          UnitTest.vectores.push(new Vec2(0.55, 0.84));
          UnitTest.vectores.push(new Vec2(0, 1));
          UnitTest.vectores.push(new Vec2(-0.52, 0.86));
          UnitTest.vectores.push(new Vec2(-1, 0));
          UnitTest.vectores.push(new Vec2(-0.93, -0.36));
          UnitTest.vectores.push(new Vec2(-0.31, -0.95));
          UnitTest.vectores.push(new Vec2(0, -1));
          UnitTest.vectores.push(new Vec2(0.20, -0.98));
          UnitTest.vectores.push(new Vec2(0.99, -0.17));
          UnitTest.angulos.push(0);
          UnitTest.angulos.push(20);
          UnitTest.angulos.push(56.7);
          UnitTest.angulos.push(90);
          UnitTest.angulos.push(121.1);
          UnitTest.angulos.push(180);
          UnitTest.angulos.push(201.1);
          UnitTest.angulos.push(252);
          UnitTest.angulos.push(270);
          UnitTest.angulos.push(281.5);
          UnitTest.angulos.push(350.4);
        }

        onEnable() {
          this.outputText.string = "<color=#00ff00>CacaFRita\n</color><color=#0fffff>PErdoFuerte</color>";
          const tests = [];
          tests.push(this.test1);

          for (let i = 0; i < tests.length; i++) {
            // get the current function getting looped
            const func = tests[i]; // call the function

            func();
          }
        }

        update(deltaTime) {}

        degToRad(angleDeg) {
          return angleDeg / 360 * 2 * 3.141592654;
        }

        test1() {
          console.log("------- TEST 1 -------");
          let linksNodesTest = [];

          for (let i = 0; i < UnitTest.vectores.length; i++) {
            linksNodesTest.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
              error: Error()
            }), linkNode) : linkNode)(UnitTest.vectores[i].x, UnitTest.vectores[i].y, this.degToRad(UnitTest.angulos[i])));
          }

          linksNodesTest.forEach(ln => {
            console.log(ln);
          });
        }

      }, _class3.vectores = [], _class3.angulos = [], _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "outputText", [_dec2], {
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
//# sourceMappingURL=654b063788633bfb68df3c252e2f462efb52a38c.js.map