import fs from "node:fs/promises";
import { env, minioConfig } from "config/environment";
import * as Minio from "minio";
import { getFileNameWithoutExtension } from "@utils";

if (!minioConfig) {
  throw new Error(`MinIO configuration for environment ${env} not found.`);
}

export const minioClient = new Minio.Client({
  endPoint: minioConfig.host!,
  port: Number(minioConfig.port),
  useSSL: false,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey,
});

const getImageSize = async (filePath: string) => {
  try {
    const buffer = await fs.readFile(filePath);
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
  } catch (error) {
    console.error("Error reading image size:", error);
    return null;
  }
};

export const uploadToMinio = async (
  file: Express.Multer.File,
  folder: string,
  user_id: string,
) => {
  const public_id = getFileNameWithoutExtension(file.filename);
  const bucket = minioConfig.bucketName || "";

  try {
    const exists = await minioClient.bucketExists(bucket);
    if (!exists) {
      await minioClient.makeBucket(bucket, "us-east-1");
      console.log(`Bucket ${bucket} created.`);
    }

    const resolution = await getImageSize(file.path);
    const metaData = {
      "Content-Type": `image/${file.mimetype.split("/")[1]}`,
      "Content-Length": file.size,
      "Cache-Control": `public, max-age=${60 * 60}`,
      "X-Amz-Meta-Original-Filename": file.originalname,
      "X-Amz-Meta-Upload-Date": new Date().toISOString(),
      "X-Amz-Meta-User-Id": user_id,
      "X-Amz-Meta-Category": "product category",
      "X-Amz-Meta-Resolution": resolution
        ? `${resolution.width}x${resolution.height}`
        : "unknown",
      "X-Amz-Meta-Format": file.mimetype.split("/")[1],
    };

    const res = await minioClient.fPutObject(
      bucket,
      `${folder}/${public_id}`,
      file.path,
      metaData,
    );

    await fs.unlink(file.path).catch(console.error);

    return res ? public_id : false;
  } catch (error) {
    console.error("Error uploading to MinIO:", error);
    return false;
  }
};

export const getTemporaryUrl = async (fileName: string) => {
  try {
    const bucket = minioConfig.bucketName || "";
    return await minioClient.presignedUrl("GET", bucket, fileName, 60 * 60);
  } catch (error) {
    console.error("Error generating temporary URL:", error);
    return null;
  }
};

export const deleteFromMinio = async (fileName: string, folder: string) => {
  try {
    const bucket = minioConfig.bucketName || "";
    const objectName = `${folder}/${fileName.replace(/\.[^/.]+$/, "")}`;

    await minioClient.statObject(bucket, objectName);
    await minioClient.removeObject(bucket, objectName);

    return true;
  } catch (error: any) {
    if (error.code === "NotFound") {
      console.error("File not found in MinIO.");
    } else {
      console.error("Error deleting from MinIO:", error);
    }
    return false;
  }
};

export const getFileMetadata = async (fileName: string, folder: string) => {
  try {
    const bucket = minioConfig.bucketName!;
    const objectName = `${folder}/${fileName}`;

    const metadata = await minioClient.statObject(bucket, objectName);
    return metadata;
  } catch (error) {
    console.error("Error getting metadata:", error);
    return null;
  }
};

export const moveFileInMinio = async (oldPath: string, newPath: string) => {
  try {
    const bucket = minioConfig.bucketName!;
    await minioClient.copyObject(bucket, newPath, `/${bucket}/${oldPath}`);
    await minioClient.removeObject(bucket, oldPath);

    console.log(`File moved from ${oldPath} to ${newPath}`);
    return true;
  } catch (error) {
    console.error("Error moving file:", error);
    return false;
  }
};

export const downloadFromMinio = async (
  fileName: string,
  folder: string,
  destinationPath: string,
) => {
  try {
    const bucket = minioConfig.bucketName!;
    const objectName = `${folder}/${fileName}`;

    await minioClient.fGetObject(bucket, objectName, destinationPath);

    console.log(`File downloaded to ${destinationPath}`);
    return true;
  } catch (error) {
    console.error("Error downloading file:", error);
    return false;
  }
};

export const copyFileInMinio = async (
  sourcePath: string,
  destinationPath: string,
) => {
  try {
    const bucket = minioConfig.bucketName!;

    await minioClient.copyObject(
      bucket,
      destinationPath,
      `/${bucket}/${sourcePath}`,
    );

    console.log(`File copied from ${sourcePath} to ${destinationPath}`);
    return true;
  } catch (error) {
    console.error("Error copying file:", error);
    return false;
  }
};
