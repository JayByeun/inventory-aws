"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client_s3_1 = require("@aws-sdk/client-s3");
const client = new client_dynamodb_1.DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });
const s3 = new client_s3_1.S3Client({ endpoint: "http://localhost:4567", region: "us-east-1", forcePathStyle: true });
const handler = async (event) => {
    const { name, quantity, fileBase64, fileName } = event;
    const id = crypto.randomUUID();
    await client.send(new client_dynamodb_1.PutItemCommand({
        TableName: "Inventory",
        Item: {
            id: { S: id },
            name: { S: name },
            quantity: { N: quantity.toString() },
        },
    }));
    if (fileBase64 && fileName) {
        const buffer = Buffer.from(fileBase64, "base64");
        await s3.send(new client_s3_1.PutObjectCommand({
            Bucket: "inventory-images",
            Key: fileName,
            Body: buffer,
        }));
    }
    return { success: true, id };
};
exports.handler = handler;
