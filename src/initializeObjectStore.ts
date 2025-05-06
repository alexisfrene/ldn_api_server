import { minioClient } from '@lib/minio'
import { config as minioConfigs } from './lib/minio/minio_config'

type Env = 'development' | 'production'
const env: Env = (process.env.NODE_ENV as Env) || 'development'
const config = minioConfigs[env]

if (!config) {
  throw new Error(`❌ MinIO config not found for environment: ${env}`)
}

export const initializeObjectStore = async (): Promise<void> => {
  const bucket = config.bucket_name ?? ''

  try {
    const exists = await minioClient.bucketExists(bucket)

    if (!exists) {
      await minioClient.makeBucket(bucket, 'us-east-1')
      console.log(`✅ Bucket "${bucket}" created.`)
    } else {
      console.log(`ℹ️ Bucket "${bucket}" already exists.`)
    }
  } catch (error) {
    console.error('❌ Failed to initialize MinIO bucket:', error)
    throw error
  }
}
