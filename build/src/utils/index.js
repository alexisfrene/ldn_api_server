"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerImageDestination = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const transformarString = (inputString) => {
    const cleanString = inputString.replace(/[^a-zA-Z0-9\s]/g, "");
    const transformedString = cleanString.replace(/\s+/g, "_");
    return transformedString;
};
const handlerImageDestination = ({ categoryFolder = "sin_name", productFolder, files, mainImage = "", withMiniature = true, }) => {
    const nickFolder = transformarString(categoryFolder);
    const direction = [];
    let primaryImage = "";
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.originalname.split(".").pop() || "";
        const newFileName = `${Date.now()}.${ext}`;
        const originalImagePath = `./public/uploads/${nickFolder}/${productFolder}/original-${newFileName}`;
        fs_1.default.mkdirSync(`./public/uploads/${nickFolder}`, { recursive: true });
        fs_1.default.mkdirSync(`./public/uploads/${nickFolder}/${productFolder}`, {
            recursive: true,
        });
        fs_1.default.writeFileSync(originalImagePath, file.buffer);
        if (file.originalname === mainImage) {
            const miniatureImagePath = `./public/optimize/${nickFolder}/${productFolder}/miniature-${newFileName}`;
            fs_1.default.mkdirSync(`./public/optimize/${nickFolder}`, { recursive: true });
            fs_1.default.mkdirSync(`./public/optimize/${nickFolder}/${productFolder}`, {
                recursive: true,
            });
            (0, sharp_1.default)(file.buffer).resize(200).toFile(miniatureImagePath);
            primaryImage = `uploads/${nickFolder}/${productFolder}/original-${newFileName}`;
            withMiniature &&
                direction.unshift(`optimize/${nickFolder}/${productFolder}/miniature-${newFileName}`);
        }
        direction.push(`uploads/${nickFolder}/${productFolder}/original-${newFileName}`);
    }
    return { direction, primaryImage };
};
exports.handlerImageDestination = handlerImageDestination;
