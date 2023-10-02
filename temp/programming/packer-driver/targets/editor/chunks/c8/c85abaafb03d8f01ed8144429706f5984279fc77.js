System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Contact2DType, PolygonCollider2D, UITransform, v3, _dec, _class, _crd, ccclass, property, SingleContact;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      PolygonCollider2D = _cc.PolygonCollider2D;
      UITransform = _cc.UITransform;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "74f0dhXk9FNqZub8VZLe34b", "SingleContact", undefined);

      __checkObsolete__(['_decorator', 'Collider2D', 'Component', 'Contact2DType', 'IPhysics2DContact', 'Node', 'PhysicsSystem2D', 'PolygonCollider2D', 'UITransform', 'v3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SingleContact", SingleContact = (_dec = ccclass('SingleContact'), _dec(_class = class SingleContact extends Component {
        start() {
          // Registering callback functions for a single collider
          let collider = this.getComponent(PolygonCollider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // will be called once when two colliders begin to contact
          console.log('onBeginContact');
          console.log("SELF COLLIDER: " + selfCollider.name);
          console.log("OTHER COLLIDER: " + otherCollider.name);
          console.log("MANIFOLD:" + contact.getWorldManifold().points);
          contact.getWorldManifold().points.forEach(element => {
            let localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(element.x, element.y, 0));
            console.log("LOCAL: " + localPos);
          });
          let velA = selfCollider.body ? selfCollider.body.linearVelocity : 0;
          let velB = otherCollider.body ? otherCollider.body.linearVelocity : 0;
          console.log("SELF VELOCITY: " + velA);
          console.log("OTHER VELOCITY: " + velB);
        }

        onEndContact(selfCollider, otherCollider, contact) {
          // will be called once when the contact between two colliders just about to end.
          console.log('onEndContact');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c85abaafb03d8f01ed8144429706f5984279fc77.js.map