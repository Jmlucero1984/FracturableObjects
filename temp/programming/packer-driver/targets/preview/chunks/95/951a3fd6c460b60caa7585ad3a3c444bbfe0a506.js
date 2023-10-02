System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider2D, Component, Contact2DType, _dec, _class, _crd, ccclass, property, Eliminator;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "67c95lVujtLRaccNkhlUVPR", "Eliminator", undefined);

      __checkObsolete__(['_decorator', 'BoxCollider2D', 'Collider2D', 'Component', 'Contact2DType', 'IPhysics2DContact', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Eliminator", Eliminator = (_dec = ccclass('Eliminator'), _dec(_class = class Eliminator extends Component {
        start() {
          var p = this.node.getComponent(Collider2D);
          /*
          this.area= MaskSplitter.calculateEnvolArea(p.points);
          console.log("El obj "+ this.node.name+" tiene el area "+this.area)*/

          p.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // if (otherCollider.node.name == "Stomper") {
          // console.log("collision")
          otherCollider.node.destroy();
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=951a3fd6c460b60caa7585ad3a3c444bbfe0a506.js.map