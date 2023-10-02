System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Contact2DType, PhysicsSystem2D, PolygonCollider2D, _dec, _class, _crd, ccclass, property, DetectColl;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      PolygonCollider2D = _cc.PolygonCollider2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4fb8fc6RpxCHp3fI6J8RuPm", "DetectColl", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Collider2D', 'Component', 'Contact2DType', 'IPhysics2DContact', 'Node', 'PhysicsSystem2D', 'PolygonCollider2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DetectColl", DetectColl = (_dec = ccclass('DetectColl'), _dec(_class = class DetectColl extends Component {
        start() {
          // Registering callback functions for a single collider
          let collider = this.getComponent(PolygonCollider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
          } // Registering global contact callback functions


          if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // will be called once when two colliders begin to contact
          console.log('onBeginContact');
        }

        onEndContact(selfCollider, otherCollider, contact) {
          // will be called once when the contact between two colliders just about to end.
          console.log('onEndContact');
        }

        onPreSolve(selfCollider, otherCollider, contact) {
          // will be called every time collider contact should be resolved
          console.log('onPreSolve');
        }

        onPostSolve(selfCollider, otherCollider, contact) {
          // will be called every time collider contact should be resolved
          console.log('onPostSolve');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8848346dfb6e5dabe24635976d8cade6f52f8513.js.map