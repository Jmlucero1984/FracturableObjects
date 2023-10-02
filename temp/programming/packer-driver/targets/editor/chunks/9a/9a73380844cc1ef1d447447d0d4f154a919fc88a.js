System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, EditBox, EventHandler, linkNode, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ButtonTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function degreeToRad(angle) {
    if (angle == 0) return 0;
    return angle / (180 / 3.141592654);
  }

  function _reportPossibleCrUseOflinkNode(extras) {
    _reporterNs.report("linkNode", "./DelaunayPackage/DelaunaySplitter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      EditBox = _cc.EditBox;
      EventHandler = _cc.EventHandler;
    }, function (_unresolved_2) {
      linkNode = _unresolved_2.linkNode;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8e91bOJLCFNT7F8DfW7GNzv", "ButtonTest", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'EditBox', 'EventHandler', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ButtonTest", ButtonTest = (_dec = ccclass('ButtonTest'), _dec2 = property(Button), _dec3 = property(EditBox), _dec4 = property(EditBox), _dec(_class = (_class2 = class ButtonTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "Test", _descriptor, this);

          _initializerDefineProperty(this, "Input", _descriptor2, this);

          _initializerDefineProperty(this, "Output", _descriptor3, this);

          this.links = [];
        }

        onLoad() {
          console.log("On load"); // this.links.push(new linkNode(0,0,degreeToRad(0)))

          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 15, degreeToRad(15)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 70, degreeToRad(70)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 90, degreeToRad(90)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 110, degreeToRad(110)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 180, degreeToRad(180)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 190, degreeToRad(190)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 250, degreeToRad(250)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 270, degreeToRad(270)));
          this.links.push(new (_crd && linkNode === void 0 ? (_reportPossibleCrUseOflinkNode({
            error: Error()
          }), linkNode) : linkNode)(0, 345, degreeToRad(345)));
          const clickTestEvt = this.createClickEventHandler(this.node, "ButtonTest", "clickTest", "");

          if (this.Test == null) {
            this.Test = this.node.getComponent(Button);
          }

          this.Test.clickEvents.push(clickTestEvt);
        }

        clickTest(event, customEventData) {
          let input = this.Input.string;
          console.log("INPUTS: " + input);
          let inputParsed = Number.parseInt(input);
          console.log("PARSED: " + inputParsed);
          let rad = degreeToRad(inputParsed);
          console.log("RAD: " + rad);
          console.log("LINKS DIM: " + this.links.length);
          let index = this.findClosestAngle(rad, this.links);
          console.log("INDEX: " + index);
          this.Output.string = this.links[index].y.toString();
        }

        findClosestAngle(angle, linkNodes) {
          const PI = 3.141592654; //  console.log("FIND CLOSES ANGLE")
          //  console.log("ANGLE: "+angle)
          //  console.log("LINKS")
          //console.log(linkNodes)

          let minAngle = PI * 2;
          let index = 0;

          for (let i = 0; i < linkNodes.length; i++) {
            if (linkNodes[i] == null) return null;
            let diff = Math.abs(angle - linkNodes[i]._angle);
            console.log("Index: " + i);
            console.log("DIFF: " + diff);

            if (diff > 3 / 2 * PI) {
              diff = 2 * PI - diff;
              console.log("NEW DIFF: " + diff);
            }

            if (diff < minAngle) {
              minAngle = diff;
              index = i; // console.log("nuevo MIN: "+minAngle+"   index: "+index)
            }
          }

          return index;
        }

        createClickEventHandler(target, component, handler, cstEventData) {
          let evtHandler = new EventHandler();
          evtHandler.target = target;
          evtHandler.component = component;
          evtHandler.handler = handler;
          evtHandler.customEventData = cstEventData;
          return evtHandler;
        }

        start() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Test", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Input", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Output", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9a73380844cc1ef1d447447d0d4f154a919fc88a.js.map