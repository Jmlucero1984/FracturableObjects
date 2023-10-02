System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Graphics, _dec, _class, _crd, ccclass, property, TryingGraph;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Graphics = _cc.Graphics;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "205acGiN3lEMLmlYd/vY0kx", "TryingGraph", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Graphics', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TryingGraph", TryingGraph = (_dec = ccclass('TryingGraph'), _dec(_class = class TryingGraph extends Graphics {
        start() {
          this.moveTo(-70, -40);
          this.lineTo(-50, -40);
          this.lineTo(-50, 20);
          this.lineTo(50, 20);
          this.lineTo(50, -40);
          this.lineTo(70, -40);
          this.lineTo(70, 40);
          this.lineTo(-70, 40);
          this.close();
          this.fill();
          var data = this.impl.getRenderDataList();
          console.log("DATA");
          console.log(data);
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4ecdcdbb7b6a6bb0fc500bcceb1718b64574ec41.js.map