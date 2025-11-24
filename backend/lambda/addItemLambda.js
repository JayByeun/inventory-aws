import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const ddb = new DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });
const s3 = new S3Client({ endpoint: "http://localhost:4567", region: "us-east-1", forcePathStyle: true });
export async function handler(event) {
    const { name, quantity, fileBase64, fileName } = JSON.parse(event.body);
    let s3Key = null;
    if (fileBase64 && fileName) {
        const base64Data = fileBase64.replace(/^data:.+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        s3Key = `uploads/${crypto.randomUUID()}-${fileName}`;
        await s3.send(new PutObjectCommand({
            Bucket: "inventory-bucket",
            Key: s3Key,
            Body: buffer,
        }));
    }
    const params = {
        TableName: "Inventory",
        Item: {
            id: { S: crypto.randomUUID() },
            name: { S: name },
            quantity: { N: quantity.toString() },
            file: { S: s3Key || "" },
            fileName: { S: fileName || "" },
        },
    };
    await ddb.send(new PutItemCommand(params));
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: "Item added!" })
    };
}
