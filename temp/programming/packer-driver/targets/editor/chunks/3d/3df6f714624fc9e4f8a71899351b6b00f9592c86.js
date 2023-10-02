System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CircleCollider2D, Component, Contact2DType, Input, Vec3, _dec, _class, _crd, ccclass, property, Draggable;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CircleCollider2D = _cc.CircleCollider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      Input = _cc.Input;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4c32frkLYZJxpoxHVl1wQBk", "Draggable", undefined);

      __checkObsolete__(['_decorator', 'BoxCollider2D', 'CircleCollider2D', 'Collider', 'Collider2D', 'Component', 'Contact2DType', 'EventTouch', 'Input', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Draggable", Draggable = (_dec = ccclass('Draggable'), _dec(_class = class Draggable extends Component {
        constructor(...args) {
          super(...args);
          this.bindedData = void 0;
        }

        start() {}

        update(deltaTime) {}

        onLoad() {
          this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          let collider = this.getComponent(CircleCollider2D);
          collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        onBeginContact() {
          console.log("CONTACTOOOOOOOO");
        }

        onTouchStart(event) {}

        onTouchMove(event) {
          let pos = event.getUILocation();
          this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));
        }

        onTouchEnd(event) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3df6f714624fc9e4f8a71899351b6b00f9592c86.js.map