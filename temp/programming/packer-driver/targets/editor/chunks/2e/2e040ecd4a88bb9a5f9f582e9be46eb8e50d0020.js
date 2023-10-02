System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec2, _decorator, _dec, _class, _crd, ccclass, property, plainVertex;

  function _reportPossibleCrUseOflinkNode(extras) {
    _reporterNs.report("linkNode", "./DelaunaySplitter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec2 = _cc.Vec2;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7e6d8sN4vBNcoi/IMZz+7uy", "PlainVertexClass", undefined);

      __checkObsolete__(['Vec2', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("plainVertex", plainVertex = (_dec = ccclass('plainVertex'), _dec(_class = class plainVertex extends Vec2 {
        constructor(x, y, border = false) {
          super();
          this.x = 0;
          this.y = 0;
          this.border = false;
          this.links = [];
          this.x = x;
          this.y = y;
          this.border = border;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2e040ecd4a88bb9a5f9f582e9be46eb8e50d0020.js.map