"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUrl = getPresignedUrl;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3 = new client_s3_1.S3Client({ endpoint: "http://localhost:4567", region: "us-east-1", forcePathStyle: true });
async function getPresignedUrl(fileName) {
    const command = new client_s3_1.GetObjectCommand({ Bucket: "inventory-images", Key: fileName });
    return (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 3600 });
}
