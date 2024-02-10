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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
// GET
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query.category;
    if (category) {
        return (0, controllers_1.getProductsForCategory)(req, res);
    }
    else {
        return (0, controllers_1.getAllProducts)(req, res);
    }
}));
router.get("/products/:id", controllers_1.getProductById);
// POST
router.post("/products", upload.array("files", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.query.product_id;
    if (productId) {
        return (0, controllers_1.insertIdImagesVariants)(req, res);
    }
    else {
        return (0, controllers_1.createProduct)(req, res);
    }
}));
// PUT
router.put("/products/:id", upload.array("files", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { variation_add } = req.query;
    if (variation_add) {
        return (0, controllers_1.addVariation)(req, res);
    }
    else {
        return (0, controllers_1.updateProduct)(req, res);
    }
}));
// DELETE
router.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionId = req.query.variation_remove;
    if (collectionId) {
        return (0, controllers_1.removeCollection)(req, res);
    }
    else {
        return (0, controllers_1.deleteProductById)(req, res);
    }
}));
exports.default = router;
