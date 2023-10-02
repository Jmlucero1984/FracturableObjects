System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Graphics, Vec2, Color, UIVertexFormat, gfx, warnID, director, RenderingSubMesh, Vec3, v2, Texture2D, Material, math, earcut, Point2, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, attributes2, componentPerVertex2, stride2, attrBytes2, _impl, MAX_VERTEX, MAX_INDICES, PI, min, max, ceil, acos, cos, sin, atan2, _tempV2, _renderData, _curColor, vec3_temps, i, indexStart, lineC, polygonPoints, textureWidth, textureHeight, meshWidth, uv_unit, area, calculateDistances, pushInto, isInTriangle, splitPolygon, computeUv, DelaunayAssembler;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function calculateEnvolArea(indexes, coords, jump) {
    var area = 0;

    for (var i = 0; i < indexes.length; i += jump) {
      var x1 = coords[indexes[i + 1] * jump] - coords[indexes[i] * jump];
      var y1 = coords[indexes[i + 1] * jump + 1] - coords[indexes[i] * jump + 1];
      var x2 = coords[indexes[i + 2] * jump] - coords[indexes[i] * jump];
      var y2 = coords[indexes[i + 2] * jump + 1] - coords[indexes[i] * jump + 1];
      var triangleArea = Math.abs(cross(x1, y1, x2, y2) / 2);
      area += triangleArea;
    }

    return area;
  }

  function cross(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
  }

  function _reportPossibleCrUseOfearcut(extras) {
    _reporterNs.report("earcut", "./earcut", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Graphics = _cc.Graphics;
      Vec2 = _cc.Vec2;
      Color = _cc.Color;
      UIVertexFormat = _cc.UIVertexFormat;
      gfx = _cc.gfx;
      warnID = _cc.warnID;
      director = _cc.director;
      RenderingSubMesh = _cc.RenderingSubMesh;
      Vec3 = _cc.Vec3;
      v2 = _cc.v2;
      Texture2D = _cc.Texture2D;
      Material = _cc.Material;
      math = _cc.math;
    }, function (_unresolved_2) {
      earcut = _unresolved_2.earcut;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4163dOFSKVE9qOP3Srdt9Zf", "DelaunayAssembler", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Graphics', 'Vec2', 'Color', '__private', 'UIVertexFormat', 'gfx', 'warnID', 'director', 'RenderingSubMesh', 'Vec3', 'v2', 'Texture2D', 'Material', 'MeshRenderData', 'log', 'math']);

      ({
        ccclass,
        property
      } = _decorator);
      attributes2 = UIVertexFormat.vfmtPosColor.concat([new gfx.Attribute('a_dist', gfx.Format.R32F), new gfx.Attribute('a_line', gfx.Format.R32F)]);
      componentPerVertex2 = UIVertexFormat.getComponentPerVertex(attributes2);
      stride2 = UIVertexFormat.getAttributeStride(attributes2);
      Point2 = class Point2 extends Vec2 {
        constructor(x, y) {
          super(x, y);
          this.dx = 0;
          this.dy = 0;
          this.dmx = 0;
          this.dmy = 0;
          this.flags = 0;
          this.len = 0;
          this.lineLength = 0;
          this.reset();
        }

        reset() {
          this.dx = 0;
          this.dy = 0;
          this.dmx = 0;
          this.dmy = 0;
          this.flags = 0;
          this.len = 0;
          this.lineLength = 0;
        }

      };
      attrBytes2 = 9;
      _impl = null;
      MAX_VERTEX = 65535;
      MAX_INDICES = MAX_VERTEX * 2;
      PI = Math.PI;
      min = Math.min;
      max = Math.max;
      ceil = Math.ceil;
      acos = Math.acos;
      cos = Math.cos;
      sin = Math.sin;
      atan2 = Math.atan2;
      _tempV2 = v2();
      _renderData = null;
      _curColor = new Color();
      vec3_temps = [];

      for (i = 0; i < 4; i++) {
        vec3_temps.push(new Vec3());
      }

      indexStart = 0;
      lineC = 1;
      polygonPoints = [];
      textureWidth = 0;
      textureHeight = 0;
      meshWidth = 0;
      uv_unit = false;
      area = 0;

      calculateDistances = function calculateDistances(points) {
        var sum = 0;

        var res = function res(vector_a, vector_b) {
          return v2(vector_a.x - vector_b.x, vector_a.y - vector_b.y);
        };

        var _distances = [];

        for (var index = 0; index < points.length - 1; index++) {
          var dist = res(points[index + 1], points[index]).length();

          _distances.push(dist);

          sum += dist;
        }

        _distances.push(sum);

        return _distances;
      };

      pushInto = function pushInto(receiver, newData) {
        for (var index = 0; index < newData.length; index++) {
          receiver.copyWithin;
          receiver.push(newData[index]);
        }
      };

      isInTriangle = function isInTriangle(point, triA, triB, triC) {
        //  console.log("Helper - Is in triangle")
        var AB = new Vec2();
        Vec2.subtract(AB, triB, triA);
        var AC = new Vec2();
        Vec2.subtract(AC, triC, triA);
        var BC = new Vec2();
        Vec2.subtract(BC, triC, triB);
        var AD = new Vec2();
        Vec2.subtract(AD, point, triA);
        var BD = new Vec2();
        Vec2.subtract(BD, point, triB); //@ts-ignore

        return AB.cross(AC) >= 0 ^ AB.cross(AD) < 0 && AB.cross(AC) >= 0 ^ AC.cross(AD) >= 0 && BC.cross(AB) > 0 ^ BC.cross(BD) >= 0;
      };

      splitPolygon = function splitPolygon(points) {
        // console.log("Helper - Split poligon") // Lo llama continuamente...
        if (points.length <= 3) return [0, 1, 2];
        var pointMap = {}; // The mapping between point and idx

        for (var _i = 0; _i < points.length; _i++) {
          var p = points[_i];
          pointMap[p.x + "-" + p.y] = _i;
        }

        var getIdx = p => {
          return pointMap[p.x + "-" + p.y];
        };

        points = points.concat([]);
        var idxs = [];
        var index = 0;

        while (points.length > 3) {
          var p1 = points[index % points.length],
              p2 = points[(index + 1) % points.length],
              p3 = points[(index + 2) % points.length];
          var splitPoint = (index + 1) % points.length;
          var v1 = new Vec2();
          Vec2.subtract(v1, p2, p1);

          var _v = new Vec2();

          Vec2.subtract(_v, p3, p2);

          if (v1.cross(_v) < 0) {
            // is a concave corner, look for the next
            index = (index + 1) % points.length;
            continue;
          }

          var hasPoint = false;

          for (var _p of points) {
            if (_p != p1 && _p != p2 && _p != p3 && isInTriangle(_p, p1, p2, p3)) {
              hasPoint = true;
              break;
            }
          }

          if (hasPoint) {
            // The current triangle contains other points, find the next
            index = (index + 1) % points.length;
            continue;
          } // Found the ear, cut it off


          idxs.push(getIdx(p1), getIdx(p2), getIdx(p3));
          points.splice(splitPoint, 1);
        }

        for (var _p2 of points) {
          idxs.push(getIdx(_p2));
        }

        return idxs;
      };

      computeUv = function computeUv(points, width, height) {
        //console.log("Helper - compute uv")
        var uvs = [];

        for (var p of points) {
          // The uv origin is the upper left corner
          var x = math.clamp(0, 1, (p.x + width / 2) / width);
          var y = math.clamp(0, 1, 1. - (p.y + height / 2) / height);
          uvs.push(v2(x, y));
        }

        return uvs;
      };

      _export("DelaunayAssembler", DelaunayAssembler = (_dec = ccclass('DelaunayAssembler'), _dec2 = property({
        group: "Render"
      }), _dec3 = property(Texture2D), _dec4 = property({
        group: "Render"
      }), _dec5 = property(Material), _dec6 = property({
        type: [Vec2]
      }), _dec(_class = (_class2 = class DelaunayAssembler extends Graphics {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "baseTexture", _descriptor, this);

          _initializerDefineProperty(this, "Render_Mat", _descriptor2, this);

          _initializerDefineProperty(this, "polygon", _descriptor3, this);
        }

        onLoad() {
          this.polygon = [];

          if (this.baseTexture) {
            textureWidth = this.baseTexture.width;
            textureHeight = this.baseTexture.height; //  console.log("TEX WIDTH: " + textureWidth)
            // console.log("TEX HEIGTH: " + textureHeight)
          }

          if (this.Render_Mat) {
            this.setMaterial(this.Render_Mat, 0);
            if (this.baseTexture) this.getSharedMaterial(0).setProperty("texture1", this.baseTexture);
          }

          polygonPoints = this.polygon;
          super.onLoad();
        }

        modifyPoints(newPoints) {
          this.clear();
          polygonPoints = newPoints;
          this.polygon = newPoints; //    console.log(newPoints)

          this.stroke();
        }

        getArea() {
          return area;
        }

        setPoints(points) {
          //  console.log("SET POINTS CALLED")
          polygonPoints = points;
        }

        onEnable() {
          if (this.Render_Mat) {
            this.setMaterial(this.Render_Mat, 0);
            if (this.baseTexture) this.getSharedMaterial(0).setProperty("texture1", this.baseTexture);
          }
        }

        onDestroy() {}

        start() {}
        /**
         * initialization assembler render data assembler
         */


        _flushAssembler() {
          var assembler = Graphics.Assembler.getAssembler(this);
          var superGraphicsAssembler = {};

          for (var kk in assembler) {
            superGraphicsAssembler[kk] = assembler[kk];
          }

          superGraphicsAssembler.stroke = function (graphics) {
            // console.log("STROKE CALLED")
            ///  console.log(polygonPoints)
            if (!graphics.impl) {
              return;
            }

            this._expandStroke(graphics);

            graphics.impl.updatePathOffset = true;
            this.end(graphics);
          };

          superGraphicsAssembler._expandStroke = function (graphics) {
            var indexStart = 0;
            _impl = graphics.impl;

            if (!_impl) {
              return;
            }

            var meshBuffer = _renderData = this.getRenderData(graphics, 300);

            if (!meshBuffer) {
              return;
            }

            var my_i_data = [];
            var my_v_data = [];

            if (true) {
              //   console.log("POINTS")
              //   console.log(polygonPoints)
              var theUvs = computeUv(polygonPoints, textureWidth * 2, textureHeight * 2); //  console.log(theUvs)

              for (var index = 0; index < polygonPoints.length; index++) {
                pushInto(my_v_data, [polygonPoints[index].x, polygonPoints[index].y, 0, 1, 1, 1, 1, theUvs[index].x, theUvs[index].y]);
              }

              var initIndex = 0; //  console.log("preindex")
              // let indexes=splitPolygon(polygonPoints);

              var earcutData = []; //console.log("CANT DE VERTEXX: "+my_v_data.length)
              // console.log("VDATA: "+my_v_data)

              for (var j = 0; j < my_v_data.length / 9; j++) {
                var vDataOffset = j * attrBytes2;
                earcutData.push(my_v_data[vDataOffset++]);
                earcutData.push(my_v_data[vDataOffset++]);
                earcutData.push(my_v_data[vDataOffset++]);
              }

              var newIndices = (_crd && earcut === void 0 ? (_reportPossibleCrUseOfearcut({
                error: Error()
              }), earcut) : earcut)(earcutData, null, 3); // console.log("INDICES")
              //console.log(newIndices)

              var indexes = newIndices;
              area = calculateEnvolArea(indexes, earcutData, 3);

              for (var _index = 0; _index < indexes.length; _index += 3) {
                pushInto(my_i_data, [indexes[_index], indexes[_index + 1], indexes[_index + 2]]);
              }
            }

            for (var _index2 = 0; _index2 < my_i_data.length; _index2++) {
              this._iSet(my_i_data[_index2]);
            }

            for (var _index3 = 0; _index3 < my_v_data.length; _index3 += 9) {
              this._vSet(my_v_data[_index3], my_v_data[_index3 + 1], my_v_data[_index3 + 7], my_v_data[_index3 + 8]);
            }

            _renderData = null;
            _impl = null;
          }; //**get a render data */


          superGraphicsAssembler.getRenderData = function (graphics, vertexCount) {
            if (!_impl) {
              return null;
            }

            var renderDataList = _impl.getRenderDataList();

            var renderData = renderDataList[_impl.dataOffset];

            if (!renderData) {
              return null;
            }

            var meshBuffer = renderData;
            var maxVertexCount = meshBuffer ? meshBuffer.vertexStart + vertexCount : 0;

            if (maxVertexCount > MAX_VERTEX || maxVertexCount * 3 > MAX_INDICES) {
              ++_impl.dataOffset;

              if (_impl.dataOffset < renderDataList.length) {
                renderData = renderDataList[_impl.dataOffset];
              } else {
                renderData = _impl.requestRenderData();
                renderDataList[_impl.dataOffset] = renderData;
              }

              meshBuffer = renderData;
            }

            if (meshBuffer && meshBuffer.vertexCount < maxVertexCount) {
              meshBuffer.request(vertexCount, vertexCount * 3);
            }

            return renderData;
          };

          superGraphicsAssembler._iSet = function (i) {
            if (!_renderData) {
              return;
            }

            var meshBuffer = _renderData; // let dataOffset = meshBuffer.vertexStart * attrBytes2;

            var iData = meshBuffer.iData;
            iData[meshBuffer.indexStart] = i;
            meshBuffer.indexStart++;
          };
          /**set vertex data */


          superGraphicsAssembler._vSet = function (x, y, distance, lineLong) {
            if (distance === void 0) {
              distance = 0;
            }

            if (lineLong === void 0) {
              lineLong = 0;
            }

            if (!_renderData) {
              return;
            }

            var meshBuffer = _renderData;
            var dataOffset = meshBuffer.vertexStart * attrBytes2;
            var vData = meshBuffer.vData;
            vData[dataOffset++] = x;
            vData[dataOffset++] = y;
            vData[dataOffset++] = 0;
            Color.toArray(vData, Color.WHITE, dataOffset);
            dataOffset += 4;
            vData[dataOffset++] = distance;
            vData[dataOffset++] = lineLong;
            meshBuffer.vertexStart++;
          };

          if (this._assembler !== superGraphicsAssembler) {
            this._assembler = superGraphicsAssembler;
          }
        }
        /**Create vertex databuffer */


        activeSubModel(idx) {
          if (!this.model) {
            warnID(4500, this.node.name);
            return;
          }

          if (this.model.subModels.length <= idx) {
            var gfxDevice = director.root.device;
            var vertexBuffer = gfxDevice.createBuffer(new gfx.BufferInfo(gfx.BufferUsageBit.VERTEX | gfx.BufferUsageBit.TRANSFER_DST, gfx.MemoryUsageBit.DEVICE, 65535 * stride2, stride2));
            var indexBuffer = gfxDevice.createBuffer(new gfx.BufferInfo(gfx.BufferUsageBit.INDEX | gfx.BufferUsageBit.TRANSFER_DST, gfx.MemoryUsageBit.DEVICE, 65535 * Uint16Array.BYTES_PER_ELEMENT * 2, Uint16Array.BYTES_PER_ELEMENT));
            var renderMesh = new RenderingSubMesh([vertexBuffer], attributes2, gfx.PrimitiveMode.TRIANGLE_LIST, indexBuffer);
            renderMesh.subMeshIdx = 0;

            if (this.getMaterialInstance(0)) {
              this.model.initSubModel(idx, renderMesh, this.getMaterialInstance(0));
            }

            this["_graphicsUseSubMeshes"].push(renderMesh);
          }
        }
        /**Refresh the rendering data */


        _uploadData() {
          var impl = this.impl;

          if (!impl) {
            return;
          }

          var renderDataList = impl && impl.getRenderDataList();

          if (renderDataList.length <= 0 || !this.model) {
            return;
          }

          var subModelList = this.model.subModels;

          for (var _i2 = 0; _i2 < renderDataList.length; _i2++) {
            var renderData = renderDataList[_i2];
            var ia = subModelList[_i2].inputAssembler;

            if (renderData.lastFilledVertex === renderData.vertexStart) {
              continue;
            }

            var vb = new Float32Array(renderData.vData.buffer, 0, renderData.vertexStart * componentPerVertex2);
            ia.vertexBuffers[0].update(vb);
            ia.vertexCount = renderData.vertexStart;
            var ib = new Uint16Array(renderData.iData.buffer, 0, renderData.indexStart);
            ia.indexBuffer.update(ib);
            ia.indexCount = renderData.indexStart;
            renderData.lastFilledVertex = renderData.vertexStart;
            renderData.lastFilledIndex = renderData.indexStart;
          }

          this._isNeedUploadData = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "baseTexture", [_dec2, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Render_Mat", [_dec4, _dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "polygon", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=26ccbd97f7c3c84ce3c0d3e10c09016285951629.js.map