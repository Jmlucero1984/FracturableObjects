System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, DelaunayFracturable;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "342e9wLaQVIqaTNSB2Ug4Rh", "DelaunayFracturable", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DelaunayFracturable", DelaunayFracturable = (_dec = ccclass('DelaunayFracturable'), _dec(_class = class DelaunayFracturable extends Component {
        constructor(...args) {
          super(...args);
          this.polygon = [];
        }

        onLoad() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b567fa8753f198c3c0b550b3b54f33d57e9e22c3.js.map