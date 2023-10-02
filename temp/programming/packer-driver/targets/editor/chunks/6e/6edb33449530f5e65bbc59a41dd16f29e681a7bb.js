System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec2, _decorator, _dec, _class, _crd, ccclass, property, linkNode;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec2 = _cc.Vec2;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0404eh0R49JXY8NEI11onbP", "LinkNodeClass", undefined);

      __checkObsolete__(['Vec2', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("linkNode", linkNode = (_dec = ccclass('linkNode'), _dec(_class = class linkNode extends Vec2 {
        constructor(x, y, angle) {
          super();
          this.x = 0;
          this.y = 0;
          this._angle = 0;
          this.x = x;
          this.y = y;
          this._angle = angle;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6edb33449530f5e65bbc59a41dd16f29e681a7bb.js.map