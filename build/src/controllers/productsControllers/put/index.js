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
exports.addVariation = exports.updateProduct = void 0;
const supabase_1 = require("../../../lib/supabase");
const utils_1 = require("../../../utils");
const uuid_1 = require("uuid");
const updateProduct = (req, res) => {
    const productId = req.params.id;
    res.send(`Producto con ID ${productId} actualizado`);
};
exports.updateProduct = updateProduct;
const addVariation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { category, collection } = req.body;
    const files = req.files;
    const { direction } = (0, utils_1.handlerImageDestination)({
        categoryFolder: category,
        productFolder: collection,
        files,
        withMiniature: false,
    });
    try {
        const { data, error } = yield supabase_1.supabase
            .from("ldn_image_manager")
            .select("variations")
            .eq("id", productId)
            .single();
        if (error) {
            return res
                .status(400)
                .send({ message: "Error al obtener el registro original:" });
        }
        const { variations } = data;
        variations.push({
            id: (0, uuid_1.v4)(),
            name: collection,
            images: direction,
        });
        const { data: updatedData, error: updateError } = yield supabase_1.supabase
            .from("ldn_image_manager")
            .update({ variations })
            .eq("id", productId)
            .single();
        if (updateError) {
            return res
                .status(400)
                .send({ message: "Error al actualizar el registro:" });
        }
        return res
            .status(200)
            .send({ message: "Registro actualizado con éxito:", updatedData });
    }
    catch (error) {
        console.error("Error en addVariation:", error);
        return res.status(500).send({ message: "Error interno del servidor" });
    }
});
exports.addVariation = addVariation;
