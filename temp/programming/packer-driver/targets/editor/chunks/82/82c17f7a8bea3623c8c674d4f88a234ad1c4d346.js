System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DelaunayAssembler, _dec, _class, _crd, ccclass, property, DelaunayAssemblerImplementer;

  function _reportPossibleCrUseOfDelaunayAssembler(extras) {
    _reporterNs.report("DelaunayAssembler", "./DelaunayAssembler", _context.meta, extras);
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
      DelaunayAssembler = _unresolved_2.DelaunayAssembler;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "aefedqQhZlK05/aFMF00uhK", "DelaunayAssemblerImplementer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'PolygonCollider2D', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DelaunayAssemblerImplementer", DelaunayAssemblerImplementer = (_dec = ccclass('DelaunayAssemblerImplementer'), _dec(_class = class DelaunayAssemblerImplementer extends (_crd && DelaunayAssembler === void 0 ? (_reportPossibleCrUseOfDelaunayAssembler({
        error: Error()
      }), DelaunayAssembler) : DelaunayAssembler) {
        customLoad(polPoints) {
          super.onLoad();
          this.polygon = polPoints;
          this.modifyPoints(polPoints);
          this.stroke();
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
//# sourceMappingURL=82c17f7a8bea3623c8c674d4f88a234ad1c4d346.js.map