"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMeshData = void 0;
class CustomMeshData {
    constructor(vc, ic, stride, vData, iData, indexStart) {
        this._vc = 0;
        this._ic = 0;
        this._stride = 0;
        this._vData = new Float32Array;
        this._iData = new Uint16Array;
        this._indexStart = 0;
        this._iData = iData;
        this._ic = ic;
        this._vc = vc;
        this._stride = stride;
        this._vData = vData;
        this._indexStart = indexStart;
    }
    get ic() {
        return this._ic;
    }
    get vc() {
        return this._vc;
    }
    get stride() {
        return this._stride;
    }
    get vData() {
        return this._vData;
    }
    get iData() {
        return this._iData;
    }
    get indexStart() {
        return this._indexStart;
    }
}
exports.CustomMeshData = CustomMeshData;
