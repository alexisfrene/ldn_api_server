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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProductsForCategory = exports.getAllProducts = void 0;
const supabase_1 = require("../../../lib/supabase");
const getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase.from("ldn_image_manager").select();
        if (!error) {
            return res.json({ data });
        }
    }
    catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        res.status(500).json({ error: "No se pudo obtener la lista de productos" });
    }
    return [];
});
exports.getAllProducts = getAllProducts;
const getProductsForCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.query.category;
        const { data, error } = yield supabase_1.supabase
            .from("ldn_image_manager")
            .select()
            .eq("category", param);
        if (!error) {
            res.json({ data });
        }
    }
    catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        return res
            .status(500)
            .json({ error: "No se pudo obtener la lista de productos" });
    }
    return;
});
exports.getProductsForCategory = getProductsForCategory;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const { data, error } = yield supabase_1.supabase
            .from("ldn_image_manager")
            .select()
            .eq("id", productId);
        if (error) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.json({ data: data[0] });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error al buscar el producto", error: error });
    }
});
exports.getProductById = getProductById;
