import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BUCKET } from "./utils/names.js";

const s3 = new S3Client({ endpoint: "http://localhost:4567", region: "us-east-1", forcePathStyle: true });

export async function getPresignedUrl(fileName: string) {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: fileName });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}
