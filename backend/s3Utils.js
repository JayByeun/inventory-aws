import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3 = new S3Client({ endpoint: "http://localhost:4567", region: "us-east-1", forcePathStyle: true });
export async function getPresignedUrl(fileName) {
    const command = new GetObjectCommand({ Bucket: "inventory-images", Key: fileName });
    return getSignedUrl(s3, command, { expiresIn: 3600 });
}
