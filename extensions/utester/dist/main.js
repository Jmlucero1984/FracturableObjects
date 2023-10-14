"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = exports.suma = void 0;
// @ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
/**
 * @en
 
 */
function suma(a, b) {
    return a + b;
}
exports.suma = suma;
exports.methods = {
    openPanel() {
        Editor.Panel.open(package_json_1.default.name);
        console.log("OPENENING");
    },
    methodOP() {
        Editor.Panel.open(package_json_1.default.name + ".second");
        console.log("METHOD OP");
    },
    methodSTP() {
        console.log("methodSTP");
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 
 */
function load() { }
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 
 */
function unload() { }
exports.unload = unload;
