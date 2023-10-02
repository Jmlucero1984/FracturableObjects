System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, FracturableAssembler, _dec, _class, _crd, ccclass, property, FracturaImplementer;

  function _reportPossibleCrUseOfFracturableAssembler(extras) {
    _reporterNs.report("FracturableAssembler", "./FracturableAssembler", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      FracturableAssembler = _unresolved_2.FracturableAssembler;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bb97asS2rpI8ouQxzpJTvdw", "FracturaImplementer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'PolygonCollider2D', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FracturaImplementer", FracturaImplementer = (_dec = ccclass('FracturaImplementer'), _dec(_class = class FracturaImplementer extends (_crd && FracturableAssembler === void 0 ? (_reportPossibleCrUseOfFracturableAssembler({
        error: Error()
      }), FracturableAssembler) : FracturableAssembler) {
        constructor() {
          super(...arguments);
          this.polygonPoints = [];
        }

        start() {
          this.stroke();
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=465d89b3113888ddde492e04f8d46ae618aec356.js.map