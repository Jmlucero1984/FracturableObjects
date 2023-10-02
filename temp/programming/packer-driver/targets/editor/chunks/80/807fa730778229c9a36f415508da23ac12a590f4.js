System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, director, EventHandler, instantiate, Label, Layers, Node, Prefab, RigidBody2D, tween, UITransform, v2, Vec3, BluePrintManager, Detonator, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, GeneralManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBluePrintManager(extras) {
    _reporterNs.report("BluePrintManager", "./BluePrintManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDetonator(extras) {
    _reporterNs.report("Detonator", "./Detonator", _context.meta, extras);
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
      director = _cc.director;
      EventHandler = _cc.EventHandler;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Layers = _cc.Layers;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      RigidBody2D = _cc.RigidBody2D;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      v2 = _cc.v2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BluePrintManager = _unresolved_2.BluePrintManager;
    }, function (_unresolved_3) {
      Detonator = _unresolved_3.Detonator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2c5c9hRHT9A/IdZ1Yw3KzeH", "GeneralManager", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'director', 'EventHandler', 'instantiate', 'Label', 'Layers', 'Node', 'Prefab', 'RigidBody', 'RigidBody2D', 'Scene', 'SortingLayers', 'Tween', 'tween', 'TweenAction', 'UITransform', 'v2', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GeneralManager", GeneralManager = (_dec = ccclass('GeneralManager'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec7 = property(Node), _dec8 = property(Prefab), _dec(_class = (_class2 = class GeneralManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "showPanelButton", _descriptor, this);

          _initializerDefineProperty(this, "detonateButton", _descriptor2, this);

          _initializerDefineProperty(this, "bluePrint", _descriptor3, this);

          _initializerDefineProperty(this, "mainContent", _descriptor4, this);

          _initializerDefineProperty(this, "mainInfo", _descriptor5, this);

          _initializerDefineProperty(this, "realStructure", _descriptor6, this);

          _initializerDefineProperty(this, "detonatorPref", _descriptor7, this);

          this.counter = 1.0;
          this.detonator = void 0;
          this.detonators = [];
          this.nodeStruc = void 0;
          this.alreadyDetonated = false;
          this.structuralNodeList = [];
          this.bluePrintInitPos = void 0;
          this.bluePrintInitScale = void 0;
          this.bluePrintOn = false;
          this.bluePrintManager = void 0;
          this.scene = void 0;
        }

        start() {}

        createClickEventHandler(target, component, handler, cstEventData) {
          let evtHandler = new EventHandler();
          evtHandler.target = target;
          evtHandler.component = component;
          evtHandler.handler = handler;
          evtHandler.customEventData = cstEventData;
          return evtHandler;
        }

        onLoad() {
          if (this.bluePrint != null) {
            this.bluePrintManager = this.bluePrint.getComponent(_crd && BluePrintManager === void 0 ? (_reportPossibleCrUseOfBluePrintManager({
              error: Error()
            }), BluePrintManager) : BluePrintManager);
            this.bluePrintManager.setGeneralManager(this);
            this.bluePrintInitPos = this.bluePrint.getPosition();
            this.bluePrintInitScale = this.bluePrint.getScale();
          }

          this.detonator = this.detonatorPref;
          this.nodeStruc = this.realStructure;
          const clickEventHandler = this.createClickEventHandler(this.node, "GeneralManager", "showPanel", "");

          if (this.showPanelButton != null) {
            this.showPanelButton.clickEvents.push(clickEventHandler);
          }

          const clickDetonate = this.createClickEventHandler(this.node, "GeneralManager", "detonateAll", "");

          if (this.detonateButton != null) {
            this.detonateButton.clickEvents.push(clickDetonate);
          }

          this.scene = director.getScene();
          this.scene.children.forEach(element => {
            this.recursiveSearch(element);
          });
          this.mainInfo.string = "Total de Elementos: " + this.structuralNodeList.length;
          this.ResetDynamics(); //CallBack,interval, repeat, delay

          this.schedule(function () {
            this.ResetDynamics();
          }, 2, 1, 1);
          let pointMap = {}; // The mapping between point and idx

          for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
              pointMap[`${i}*${j}`] = i * j;
            }
          } //const getIdx = (p: Vec2) => { return pointMap[`${p.x}-${p.y}`] }


          const getIdx = p => {
            return pointMap[`${p.x}*${p.y}`];
          };

          for (let i = 2; i < 5; i++) {
            for (let j = 1; j < 4; j++) {
              console.log("Resultado mult " + i + " * " + j + " : " + getIdx(v2(i, j)));
            }
          }
        }

        recursiveSearch(node) {
          node.children.forEach(element => {
            if (element.layer - 1 == Layers.nameToLayer("STRUC_ELEMENTS")) {
              this.structuralNodeList.push(element);
            }

            this.recursiveSearch(element);
          });
        }

        detonateAll() {
          if (this.alreadyDetonated) {
            this.structuralNodeList = [];
            this.scene.children.forEach(element => {
              this.recursiveSearch(element);
            });
          }

          this.alreadyDetonated = true;
          this.structuralNodeList.forEach(element => {
            if (element != null) {
              element.getComponent(RigidBody2D).wakeUp();
            }
          });
          this.detonators.forEach(element => {
            if (element != null) {
              console.log("TIME SETTED" + element.getComponent(_crd && Detonator === void 0 ? (_reportPossibleCrUseOfDetonator({
                error: Error()
              }), Detonator) : Detonator).getTimeToDetonate());
              element.getComponent(_crd && Detonator === void 0 ? (_reportPossibleCrUseOfDetonator({
                error: Error()
              }), Detonator) : Detonator).activated = true;
            }
          });
          this.detonators = [];
        }

        showPanel(event, customEventData) {
          console.log(customEventData); // foobar

          if (this.bluePrint != null) {
            if (!this.bluePrintOn) {
              this.bluePrintManager.blockEvents(false);
              /*    export type TweenEasing = "linear" | "smooth" | "fade" | "constant" | "quadIn" | "quadOut" | "quadInOut" | "quadOutIn" | "cubicIn" | "cubicOut" | "cubicInOut" | "cubicOutIn" | "quartIn" | "quartOut" | "quartInOut" | "quartOutIn" | "quintIn" | "quintOut" | "quintInOut" | "quintOutIn" | "sineIn" | "sineOut" | "sineInOut" | "sineOutIn" | "expoIn" | "expoOut" | "expoInOut" | "expoOutIn" | "circIn" | "circOut" | "circInOut" | "circOutIn" | "elasticIn" | "elasticOut" | "elasticInOut" | "elasticOutIn" | "backIn" | "backOut" | "backInOut" | "backOutIn" | "bounceIn" | "bounceOut" | "bounceInOut" | "bounceOutIn";*/

              tween(this.bluePrint).delay(0).by(1, {
                scale: new Vec3(0.5, 0.5, 0)
              }, {
                easing: 'sineIn'
              }).start();
              tween(this.bluePrint).delay(0).by(1, {
                position: new Vec3(0, -370, 0)
              }, {
                easing: 'sineIn'
              }).call(() => {}).start();
              let tempIndex = this.bluePrint.getSiblingIndex();
              this.bluePrint.setSiblingIndex(this.mainContent.getSiblingIndex());
              this.mainContent.setSiblingIndex(tempIndex);
              this.bluePrintOn = true;
            } else {
              this.bluePrintManager.blockEvents(true);
              tween(this.bluePrint).delay(0).by(1, {
                scale: new Vec3(-0.5, -0.5, 0)
              }, {
                easing: 'sineOut'
              }).start();
              tween(this.bluePrint).delay(0).by(1, {
                position: new Vec3(0, 370, 0)
              }, {
                easing: 'sineOut'
              }).call(() => {
                console.log("CALLBACK CALLED");
                let tempIndex = this.bluePrint.getSiblingIndex();
                this.bluePrint.setSiblingIndex(this.mainContent.getSiblingIndex());
                this.mainContent.setSiblingIndex(tempIndex);
              }).start();
              this.bluePrintOn = false;
            }
          }
        }

        update(deltaTime) {}

        placeDetonator(relativePos) {
          console.log("Detonator Placed");
          let node = instantiate(this.detonator);
          this.counter += 0.2;
          node.getComponent(_crd && Detonator === void 0 ? (_reportPossibleCrUseOfDetonator({
            error: Error()
          }), Detonator) : Detonator).setTimeToDetonate(this.counter);
          node.parent = this.nodeStruc;
          let dims = v2(this.nodeStruc.getComponent(UITransform).width, this.nodeStruc.getComponent(UITransform).height);
          node.setPosition(dims.x * relativePos.x, dims.y * relativePos.y);
          this.detonators.push(node);
        }

        ResetDynamics() {
          this.mainInfo.string = "RESET DYNAMICS";
          this.structuralNodeList.forEach(element => {
            element.getComponent(RigidBody2D).sleep();
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "showPanelButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "detonateButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bluePrint", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mainContent", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "mainInfo", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "realStructure", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "detonatorPref", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      /*
        onClickReset() {
            console.log("Tool -onClickReset")
            for (let i = 0; i < this.textures.length; i++) {
                let center = this.getPolygonCenter(this.textures[i].polygon);
                let dir = center.normalize();
                tween(this.textures[i].node).by(0.5, { position: new Vec3(-dir.x * 100, -dir.y * 100, 0) }).call(() => {
                    if (i === this.textures.length - 1) {
                        this.textureRoot.destroyAllChildren();
                        this.textureRoot.removeAllChildren();
                        this.textures = [];
                        this.init();
                    }
                }).start();
            }
        }
      
           if (isWorld) {
                    let mat = texture.node.worldMatrix.clone().invert();
                    pa = pa.transformMat4(mat);
                    pb = pb.transformMat4(mat);
                }
      
      
        enum TextureType {
        Cut,            // cut out
        Stretch         // Stretch, not implemented yet
      }
      ccenum(TextureType);
      let _vec2_temp = new Vec2();
      let _mat4_temp = new Mat4();
      @ccclass('SplitRender')
      @executeInEditMode
      export class SplitRender extends Renderable2D {
        static Type = TextureType;
          @property({ type: SpriteFrame, serializable: true })
        protected _spriteFrame: SpriteFrame | null = null;
        @property({ type: SpriteFrame, serializable: true })
      
      
            onLoad() {
            this._renderEntity.setNode(this.node);
            this.node['_hitTest'] = this._hitTest.bind(this);
        }
           profiler.hideStats();
      
            this.graphics.node.setPosition(new Vec3(-view.getVisibleSize().width / 2, -view.getVisibleSize().height / 2));
      
      export function splitPolygon(points: Vec2[]): number[] {
       // console.log("Helper - Split poligon") // Lo llama continuamente...
        if (points.length <= 3) return [0, 1, 2];
        let pointMap: { [key: string]: number } = {};     // The mapping between point and idx
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            pointMap[`${p.x}-${p.y}`] = i;
        }
        const getIdx = (p: Vec2) => {
            return pointMap[`${p.x}-${p.y}`]
        }
        points = points.concat([]);
        let idxs: number[] = [];
          let index = 0;
        while (points.length > 3) {
            let p1 = points[(index) % points.length]
                , p2 = points[(index + 1) % points.length]
                , p3 = points[(index + 2) % points.length];
            let splitPoint = (index + 1) % points.length;
              let v1: Vec2 = new Vec2();
            Vec2.subtract(v1, p2, p1);
            let v2: Vec2 = new Vec2();
            Vec2.subtract(v2, p3, p2);
              if (v1.cross(v2) < 0) {      // is a concave corner, look for the next
                index = (index + 1) % points.length;
                continue;
            }
            let hasPoint = false;
            for (const p of points) {
                if (p != p1 && p != p2 && p != p3 && isInTriangle(p, p1, p2, p3)) {
                    hasPoint = true;
                    break;
                }
            }
            if (hasPoint) {      // The current triangle contains other points, find the next
                index = (index + 1) % points.length;
                continue;
            }
            // Found the ear, cut it off
            idxs.push(getIdx(p1), getIdx(p2), getIdx(p3));
            points.splice(splitPoint, 1);
        }
        for (const p of points) {
            idxs.push(getIdx(p));
        }
        return idxs;
      }
      @property({ type: TextureType, serializable: true })
        _type: TextureType = 0;
        @property({ type: TextureType, serializable: true })
        get type() {
            return this._type;
        }
        set type(val: TextureType) {
            this._type = val;
            this.markForUpdateRenderData();
        }
          @property
        editing: boolean = false;
          @property({ type: [Vec2], serializable: true })
        _polygon: Vec2[] = [];
        @property({ type: [Vec2], serializable: true })
        public get polygon() {
            return this._polygon;
        }
        public set polygon(points: Vec2[]) {
            console.log("Helper.setPolygon")
            this._polygon = points;
            this.markForUpdateRenderData();
        }
      
      
           constructor() {
            super();
        }
          onLoad() {
            this._renderEntity.setNode(this.node);
            this.node['_hitTest'] = this._hitTest.bind(this);
        }
          _hitTest(cameraPt: Vec2) {
            console.log("helper._hitTest")
            let node = this.node;
            let testPt = _vec2_temp;
              node.updateWorldTransform();
            // If scale is 0, it can't be hit.
            if (!Mat4.invert(_mat4_temp, node.worldMatrix)) {
                return false;
            }
              Vec2.transformMat4(testPt, cameraPt, _mat4_temp);
            return SplitHelper.isInPolygon(testPt, this.polygon);
        }
      
        
        */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=807fa730778229c9a36f415508da23ac12a590f4.js.map