System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _crd, ccclass, property, DelaunayFractureClass;

  function _reportPossibleCrUseOfplainVertex(extras) {
    _reporterNs.report("plainVertex", "./DelaunaySplitter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4a653AFKHRBZo15MTwmSrCk", "DelaunayFractureClass", undefined);

      __checkObsolete__(['Vec2', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DelaunayFractureClass", DelaunayFractureClass = (_dec = ccclass('DelaunayFractureClass'), _dec(_class = class DelaunayFractureClass {
        constructor(ctPt, normal, envd, plainVertexs) {
          this.contactPoint = void 0;
          this.normal = void 0;
          this.pointA = void 0;
          this.pointB = void 0;
          this.fracturePoints = void 0;
          this.envolvent = void 0;
          this.extremePoints = void 0;
          this.delaunayPoints = void 0;
          this.contactPoint = ctPt;
          this.normal = normal;
          this.envolvent = envd;
          this.delaunayPoints = plainVertexs;
        }

        getDelaunayPoints() {
          return this.delaunayPoints;
        }

        setDelaunayPoints(dPoints) {
          this.delaunayPoints = dPoints;
        }

        getPointA() {
          return this.pointA;
        }

        getExtremePoints() {
          return this.extremePoints;
        }

        setExtremePoints(extPts) {
          this.extremePoints = extPts;
        }

        getPointB() {
          return this.pointB;
        }

        getNormal() {
          return this.normal;
        }

        getContactPoint() {
          return this.contactPoint;
        }

        getFracturePts() {
          return this.fracturePoints;
        }

        getEnvolvent() {
          return this.envolvent;
        }

        setPointA(ptA) {
          this.pointA = ptA;
        }

        setPointB(ptB) {
          this.pointB = ptB;
        }

        setFracturePts(fctPts) {
          this.fracturePoints = fctPts;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=759e3dc964e02ad3300b41dbc48163bd53e74674.js.map