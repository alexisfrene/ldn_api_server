import fs from "node:fs";
import * as Minio from "minio";
import { getFileNameWithoutExtension } from "@utils";
import { config as connectionMINIO } from "./minio_config";
type Env = "development" | "production";

const env: Env = (process.env.NODE_ENV as Env) || "development";

const config = connectionMINIO[env];
if (!config) {
  throw new Error(`MinIO configuration for environment ${env} not found.`);
}

export const minioClient = new Minio.Client({
  endPoint: config.host!,
  port: Number(config.port),
  useSSL: false,
  accessKey: config.access_key,
  secretKey: config.secret_key,
});

const getImageSize = (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const header = buffer.toString("hex", 0, 24);

  if (header.startsWith("89504e47")) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
      format: "png",
    };
  } else if (header.startsWith("ffd8ff")) {
    let offset = 2;
    while (offset < buffer.length) {
      if (
        buffer[offset] === 0xff &&
        buffer[offset + 1] >= 0xc0 &&
        buffer[offset + 1] <= 0xc3
      ) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
          format: "jpg",
        };
      }
      offset += buffer.readUInt16BE(offset + 2) + 2;
    }
  }

  return null;
};

minioClient.listBuckets().then((buckets) => console.log(buckets));

export const uploadToMinio = async (
  file: Express.Multer.File,
  folder: string,
  user_id: string
) => {
  console.log("Hola");
  const public_id = getFileNameWithoutExtension(file.filename);
  const bucket = process.env.MINIO_BUCKET_NAME || "";
  console.log("bucket", bucket);
  const exists = await minioClient.bucketExists(bucket);
  console.log("esta", exists);

  if (exists) {
    console.log("Bucket " + bucket + " exists.");
  } else {
    await minioClient.makeBucket(bucket, "us-east-1");
    console.log("Bucket " + bucket + ' created in "us-east-1".');
  }
  const resolution = getImageSize(file.path);
  var metaData = {
    "Content-Type": `image/${file.mimetype.split("/")[1]}`,
    "Content-Length": file.size,
    "Cache-Control": `public, max-age=${60 * 60}`,
    "X-Amz-Meta-Original-Filename": file.originalname,
    "X-Amz-Meta-Upload-Date": new Date().toISOString(),
    "X-Amz-Meta-User-Id": user_id,
    "X-Amz-Meta-Category": "product category",
    "X-Amz-Meta-Resolution": `${resolution?.width}x${resolution?.height}`,
    "X-Amz-Meta-Format": file.mimetype.split("/")[1],
  };

  const res = await minioClient.fPutObject(
    bucket,
    `${folder}/${public_id}`,
    file.path,
    metaData
  );
  fs.unlinkSync(file.path);
  console.log(" res", res);
  if (!res) return false;
  return public_id;
};

export const getTemporaryUrl = async (fileName: string) => {
  const bucket = process.env.MINIO_BUCKET_NAME || "";
  const result = await minioClient.presignedUrl(
    "GET",
    bucket,
    fileName,
    60 * 60
  );

  return result;
};

export const deleteFromMinio = async (fileName: string, folder: string) => {
  try {
    const bucket = process.env.MINIO_BUCKET_NAME || "";
    const objectName = `${folder}/${fileName.replace(/\.[^/.]+$/, "")}`;

    // Verifica si el archivo existe antes de eliminarlo
    await minioClient.statObject(bucket, objectName);

    // Elimina el archivo
    await minioClient.removeObject(bucket, objectName);

    console.log(`Imagen eliminada: ${objectName}`);
    return true;
  } catch (error: any) {
    if (error.code === "NoSuchKey") {
      console.error("El archivo no existe en MinIO.");
    } else {
      console.error("Error al eliminar la imagen:", error);
    }
    return false;
  }
};
