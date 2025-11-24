"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });
const getItems = async () => {
    try {
        const data = await client.send(new client_dynamodb_1.ScanCommand({ TableName: "Inventory" }));
        return data.Items || [];
    }
    catch (err) {
        console.error("DynamoDB scan error:", err);
        throw err;
    }
};
exports.getItems = getItems;
