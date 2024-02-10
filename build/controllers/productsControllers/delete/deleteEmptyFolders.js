"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmptyFolders = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const deleteEmptyFolders = (route, levels = 1) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pathParts = route.split("/");
        const commonPath = pathParts.slice(0, -levels).join("/") + "/";
        const folderPath = path_1.default.join(__dirname, `../../../../public/${commonPath}`);
        const files = yield fs_1.promises.readdir(folderPath);
        if (!files || files.length === 0) {
            yield fs_1.promises.rmdir(folderPath);
            console.log("Carpeta vacía eliminada:", folderPath);
        }
    }
    catch (err) {
        console.error("Error al eliminar la carpeta:", err);
    }
});
exports.deleteEmptyFolders = deleteEmptyFolders;
