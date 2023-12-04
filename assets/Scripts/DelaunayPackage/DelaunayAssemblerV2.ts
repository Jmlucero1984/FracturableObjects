
import { _decorator, Component, Node, Graphics, Vec2, Color, __private, UIVertexFormat, gfx, warnID, director, RenderingSubMesh, Vec3, v2, Texture2D, Material, MeshRenderData, log, math } from 'cc';
import { earcut } from './earcut';



const { ccclass, property } = _decorator;



const attributes2 = UIVertexFormat.vfmtPosColor.concat([
    new gfx.Attribute('a_dist', gfx.Format.R32F),
    new gfx.Attribute('a_line', gfx.Format.R32F),
]);

const componentPerVertex2 = UIVertexFormat.getComponentPerVertex(attributes2);

const stride2 = UIVertexFormat.getAttributeStride(attributes2);
function calculateEnvolArea(indexes: number[], coords: number[], jump: number) {
    let area = 0;

    for (let i = 0; i < indexes.length; i += jump) {
        let x1 = coords[indexes[i + 1] * jump] - coords[indexes[i] * jump]
        let y1 = coords[indexes[i + 1] * jump + 1] - coords[indexes[i] * jump + 1]
        let x2 = coords[indexes[i + 2] * jump] - coords[indexes[i] * jump]
        let y2 = coords[indexes[i + 2] * jump + 1] - coords[indexes[i] * jump + 1]
        let triangleArea = Math.abs(cross(x1, y1, x2, y2) / 2)
        area += triangleArea;

    }
    return area;
}
function cross(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
}
 


const attrBytes2 = 9;
let _impl: __private._cocos_2d_assembler_graphics_webgl_impl__Impl | null = null;

const MAX_VERTEX = 65535;
const MAX_INDICES = MAX_VERTEX * 2;

const PI = Math.PI;
 
const _tempV2 = v2();


let _renderData: MeshRenderData | null = null;
const _curColor = new Color();

const vec3_temps: Vec3[] = [];
for (let i = 0; i < 4; i++) {
    vec3_temps.push(new Vec3());
}

let indexStart: number = 0;
let lineC: number = 1;
let polygonPoints: Vec2[] = [];
let textureWidth: number = 0;
let textureHeight: number = 0;
let meshWidth: number = 0;
let uv_unit: boolean = false;
let area: number = 0;
 

const pushInto = function (receiver: any, newData: any[]) {
    for (let index = 0; index < newData.length; index++) {
        receiver.copyWithin
        receiver.push(newData[index]);
    }
}
 



const computeUv = function (points: Vec2[], width: number, height: number) {
    //console.log("Helper - compute uv")
    let uvs: Vec2[] = [];
    for (const p of points) {
        // The uv origin is the upper left corner
        let x = math.clamp(0, 1, (p.x) / (width));
        let y = math.clamp(0, 1, 1. - (p.y) / (height));
        uvs.push(v2(x, y));
    }
    return uvs;
}


@ccclass('DelaunayAssemblerV2')
export class DelaunayAssemblerV2 extends Graphics {
    @property({ group: "Render" })
    @property(Texture2D)
    baseTexture: Texture2D = null;
    @property({ group: "Render" })
    @property(Material)
    Render_Mat: Material = null;
    @property({ type: [Vec2] })
    polygon: Vec2[] = [];

    onLoad() {
        this.polygon = [];
        if (this.baseTexture) {
            textureWidth = this.baseTexture.width;
            textureHeight = this.baseTexture.height;
          //  console.log("TEX WIDTH: " + textureWidth)
           // console.log("TEX HEIGTH: " + textureHeight)
        }
        if (this.Render_Mat) {
            this.setMaterial(this.Render_Mat, 0);
            if (this.baseTexture)
                this.getSharedMaterial(0).setProperty("texture1", this.baseTexture);
        }
        polygonPoints = this.polygon;
       super.onLoad();
    }


    onEnable (): void {
        super.onEnable();
    /*
     if (this.Render_Mat) {
            this.setSharedMaterial(this.Render_Mat, 0);
            if (this.baseTexture)
                this.getSharedMaterial(0).setProperty("texture1", this.baseTexture);
        } */
    }

    modifyPoints(newPoints: Vec2[]) {
        this.clear();
        polygonPoints = newPoints;
        this.polygon = newPoints;
    //    console.log(newPoints)
        this.stroke();
    }

    getArea() {
        return area;
    }

    setPoints(points: Vec2[]) {
      //  console.log("SET POINTS CALLED")
        polygonPoints = points;
    }
 
    onDestroy() {
        super.onDestroy();
    };
    start() {

    }




    /**
     * initialization assembler render data assembler
     */
    protected _flushAssembler() {
        const assembler = Graphics.Assembler!.getAssembler(this);
        let superGraphicsAssembler: any = {};
        for (let kk in assembler) {
            superGraphicsAssembler[kk] = assembler[kk];
        }


        superGraphicsAssembler.stroke = function (graphics: Graphics) {
            if (!graphics.impl) { return; }
            this._expandStroke!(graphics);
            graphics.impl.updatePathOffset = true;
            this.end(graphics);
        };




        superGraphicsAssembler._expandStroke = function (graphics: Graphics) {
            let indexStart: number = 0;

            _impl = graphics.impl;
            if (!_impl) { return; }

            const meshBuffer: MeshRenderData | null = _renderData = this.getRenderData!(graphics, 300);
            if (!meshBuffer) { return; }



            let my_i_data: number[] = [];
            let my_v_data: Float32List = [];
            if (true) {
                let theUvs = computeUv(polygonPoints, textureWidth, textureHeight);
                //  console.log(theUvs)
                for (let index = 0; index < polygonPoints.length; index++) {
                    pushInto(my_v_data, [polygonPoints[index].x, polygonPoints[index].y, 0, 1, 1, 1, 1, theUvs[index].x, theUvs[index].y]);
                }
                let initIndex = 0;
                const earcutData: number[] = [];
                for (let j = 0; j < my_v_data.length / 9; j++) {
                    let vDataOffset = j * attrBytes2;
                    earcutData.push(my_v_data[vDataOffset++]);
                    earcutData.push(my_v_data[vDataOffset++]);
                    earcutData.push(my_v_data[vDataOffset++]);
                }

                const newIndices = earcut(earcutData, null, 3);
                // console.log("INDICES")
                //console.log(newIndices)
                let indexes = newIndices

                area = calculateEnvolArea(indexes, earcutData, 3);
                for (let index = 0; index < indexes.length; index += 3) {
                    pushInto(my_i_data, [indexes[index], indexes[index + 1], indexes[index + 2]])
                }

            }


            for (let index = 0; index < my_i_data.length; index++) {
                this._iSet(my_i_data[index])
            }


            for (let index = 0; index < my_v_data.length; index += 9) {
                this._vSet(my_v_data[index], my_v_data[index + 1], my_v_data[index + 7], my_v_data[index + 8])
            }

            _renderData = null;
            _impl = null;
        };


        //**get a render data */
        superGraphicsAssembler.getRenderData = function (graphics: Graphics, vertexCount: number): MeshRenderData {

            if (!_impl) {
                return null;
            }
            const renderDataList = _impl.getRenderDataList();
            let renderData = renderDataList[_impl.dataOffset];
            if (!renderData) {
                return null;
            }

            let meshBuffer = renderData;
            const maxVertexCount = meshBuffer ? meshBuffer.vertexStart + vertexCount : 0;
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

        superGraphicsAssembler._iSet = function (i: number) {
            if (!_renderData) {
                return;
            }
            const meshBuffer = _renderData;
            // let dataOffset = meshBuffer.vertexStart * attrBytes2;
            const iData = meshBuffer.iData;
            iData[meshBuffer.indexStart] = i;
            meshBuffer.indexStart++;
        }
        /**set vertex data */
        superGraphicsAssembler._vSet = function (x: number, y: number, distance = 0, lineLong = 0) {
            if (!_renderData) {
                return;
            }
            const meshBuffer = _renderData;
            let dataOffset = meshBuffer.vertexStart * 8;
            const vData = meshBuffer.vData;
            vData[dataOffset++] = x;
            vData[dataOffset++] = y;
            vData[dataOffset++] = 0;
            //Color.toArray(vData, Color.WHITE, dataOffset);
           // dataOffset += 4;
           vData[dataOffset++] = distance;
           vData[dataOffset++] = lineLong;
           vData[dataOffset++] = 0;
           vData[dataOffset++] = 1;
            vData[dataOffset++] = distance;
           
            meshBuffer.vertexStart++;
        }

        if (this._assembler !== superGraphicsAssembler) {
            this._assembler = superGraphicsAssembler;
        }
    }
    /*

    /**Create vertex databuffer */
    /*
    public activeSubModel(idx: number) {
        if (!this.model) {
            warnID(4500, this.node.name);
            return;
        }

        if (this.model.subModels.length <= idx) {
            const gfxDevice: gfx.Device = director.root.device;
            const vertexBuffer = gfxDevice.createBuffer(new gfx.BufferInfo(
                gfx.BufferUsageBit.VERTEX | gfx.BufferUsageBit.TRANSFER_DST,
                gfx.MemoryUsageBit.DEVICE,
                65535 * stride2,
                stride2,
            ));
            const indexBuffer = gfxDevice.createBuffer(new gfx.BufferInfo(
                gfx.BufferUsageBit.INDEX | gfx.BufferUsageBit.TRANSFER_DST,
                gfx.MemoryUsageBit.DEVICE,
                65535 * Uint16Array.BYTES_PER_ELEMENT * 2,
                Uint16Array.BYTES_PER_ELEMENT,
            ));
            const renderMesh = new RenderingSubMesh([vertexBuffer], attributes2, gfx.PrimitiveMode.TRIANGLE_LIST, indexBuffer);
            renderMesh.subMeshIdx = 0;
            if (this.getMaterialInstance(0)) {
                this.model.initSubModel(idx, renderMesh, this.getMaterialInstance(0)!);
            }
            this["_graphicsUseSubMeshes"].push(renderMesh);
        }
    }
    */
    /**Refresh the rendering data */
    /*
    protected _uploadData() {
        const impl = this.impl;
        if (!impl) {
            return;
        }

        const renderDataList = impl && impl.getRenderDataList();
        if (renderDataList.length <= 0 || !this.model) {
            return;
        }

        const subModelList = this.model.subModels;
        for (let i = 0; i < renderDataList.length; i++) {
            const renderData = renderDataList[i];
        
            const ia = subModelList[i].inputAssembler;
            if (renderData.lastFilledVertex === renderData.vertexStart) { continue; }
            const vb = new Float32Array(renderData.vData.buffer, 0, renderData.vertexStart * componentPerVertex2);
            ia.vertexBuffers[0].update(vb);
            ia.vertexCount = renderData.vertexStart;
            const ib = new Uint16Array(renderData.iData.buffer, 0, renderData.indexStart);
            ia.indexBuffer!.update(ib);
            ia.indexCount = renderData.indexStart;
            renderData.lastFilledVertex = renderData.vertexStart;
            renderData.lastFilledIndex = renderData.indexStart;
        }
        this._isNeedUploadData = false;
    }
    */

}



