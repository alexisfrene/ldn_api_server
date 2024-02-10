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
exports.removeCollection = exports.deleteProductById = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const deleteEmptyFolders_1 = require("./deleteEmptyFolders");
const supabase_1 = require("../../../lib/supabase");
const promises_1 = require("fs/promises");
const { unlink } = fs_1.promises;
const removeImage = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promises_1.access)(imagePath, promises_1.constants.F_OK);
        yield unlink(imagePath);
        console.log("Imagen eliminada:", imagePath);
    }
    catch (error) {
        if (error === "ENOENT") {
            console.log("El archivo no existe:", imagePath);
        }
        else {
            console.error("Error al eliminar la imagen:", error);
        }
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const { data, error } = yield supabase_1.supabase
            .from("ldn_image_manager")
            .select("*")
            .eq("id", productId);
        if (error) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        const productSelected = data[0];
        if (productSelected.variations && productSelected.variations.length > 0) {
            yield Promise.all(productSelected.variations.map((variation) => __awaiter(void 0, void 0, void 0, function* () {
                yield Promise.all(variation.images.map((routeImage) => __awaiter(void 0, void 0, void 0, function* () {
                    const imagePath = path_1.default.join(__dirname, "../../../../public/", routeImage);
                    yield removeImage(imagePath);
                })));
                yield (0, deleteEmptyFolders_1.deleteEmptyFolders)(variation.images[0]);
                yield (0, deleteEmptyFolders_1.deleteEmptyFolders)(variation.images[0], 2);
            })));
        }
        const miniatureImagePath = path_1.default.join(__dirname, "../../../../public/", productSelected.miniature_image);
        yield removeImage(miniatureImagePath);
        yield (0, deleteEmptyFolders_1.deleteEmptyFolders)(productSelected.miniature_image);
        yield (0, deleteEmptyFolders_1.deleteEmptyFolders)(productSelected.miniature_image, 2);
        yield supabase_1.supabase.from("ldn_image_manager").delete().eq("id", productId);
        return res
            .status(200)
            .json({ message: "Producto eliminado correctamente" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el producto",
            error: error,
        });
    }
});
exports.deleteProductById = deleteProductById;
const removeCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const collectionId = req.query.variation_remove;
    const variationsId = req.params.id;
    try {
        const { data, error } = yield supabase_1.supabase
            .from("ldn_image_manager")
            .select("*")
            .eq("id", variationsId);
        if (!error && data) {
            const filteredCollection = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.variations.map((collection) => collection.id !== collectionId ? collection : null).filter((collection) => collection !== null);
            const { error: updateError } = yield supabase_1.supabase
                .from("ldn_image_manager")
                .update({ variations: filteredCollection || [] })
                .eq("id", variationsId)
                .single();
            if (!updateError) {
                yield Promise.all((_b = data[0]) === null || _b === void 0 ? void 0 : _b.variations.map((variation) => __awaiter(void 0, void 0, void 0, function* () {
                    if (variation.id === collectionId) {
                        yield Promise.all(variation.images.map((routeImage) => __awaiter(void 0, void 0, void 0, function* () {
                            const imagePath = path_1.default.join(__dirname, "../../../../public/", routeImage);
                            yield removeImage(imagePath);
                        })));
                        yield (0, deleteEmptyFolders_1.deleteEmptyFolders)(variation.images[0]);
                        yield (0, deleteEmptyFolders_1.deleteEmptyFolders)(variation.images[0], 2);
                    }
                })));
            }
            return res.send("Collection eliminada");
        }
    }
    catch (error) {
        console.log("Error al eliminar la collection", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
});
exports.removeCollection = removeCollection;
