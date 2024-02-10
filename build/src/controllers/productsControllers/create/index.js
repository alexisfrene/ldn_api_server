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
exports.insertIdImagesVariants = exports.createProduct = void 0;
const supabase_1 = require("../../../lib/supabase");
const utils_1 = require("../../../utils");
const uuid_1 = require("uuid");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, category, mainImage, details, collection } = req.body;
        const categoryFolder = category.replace(/\s+/g, "-").toLowerCase();
        const productFolder = collection.replace(/\s+/g, "-").toLowerCase();
        const files = req.files;
        const { direction, primaryImage } = (0, utils_1.handlerImageDestination)({
            categoryFolder,
            productFolder,
            files,
            mainImage,
        });
        const miniatureUrl = direction.shift();
        const variations = [
            {
                name: collection,
                images: direction,
                id: (0, uuid_1.v4)(),
            },
        ];
        const { data, error } = yield supabase_1.supabase.from("ldn_image_manager").insert([
            {
                primary_image: primaryImage,
                category,
                miniature_image: miniatureUrl,
                variations,
                description,
                details,
            },
        ]);
        if (!error)
            res.send({ data });
    }
    catch (error) {
        console.log("Error en crear un producto:", error);
    }
});
exports.createProduct = createProduct;
const insertIdImagesVariants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, product_image_id } = req.query;
        const { data } = yield supabase_1.supabase
            .from("ldn_producs")
            .update({ produc_variations: product_image_id })
            .eq("id", product_id);
        res.send({ product_id, product_image_id, data });
    }
    catch (error) {
        console.log("Error en insertar ID de imágenes de variantes:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.insertIdImagesVariants = insertIdImagesVariants;
