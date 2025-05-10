import { env, minioConfig } from "config/environment";
import { minioClient } from "@lib/minio";

if (!minioConfig) {
  throw new Error(`❌ MinIO config not found for environment: ${env}`);
}

export const initializeObjectStore = async (): Promise<void> => {
  const bucket = minioConfig.bucketName ?? "";

  try {
    const exists = await minioClient.bucketExists(bucket);

    if (!exists) {
      await minioClient.makeBucket(bucket, "us-east-1");
      console.log(`✅ Bucket "${bucket}" created.`);
    } else {
      console.log(`ℹ️ Bucket "${bucket}" already exists.`);
    }
  } catch (error) {
    console.error("❌ Failed to initialize MinIO bucket:", error);
    throw error;
  }
};
