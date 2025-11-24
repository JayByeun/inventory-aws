"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const uuid_1 = require("uuid");
const client = new client_dynamodb_1.DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });
const createItem = async (name, quantity) => {
    const id = (0, uuid_1.v4)();
    await client.send(new client_dynamodb_1.PutItemCommand({
        TableName: "Inventory",
        Item: {
            id: { S: id },
            name: { S: name },
            quantity: { N: quantity.toString() },
        },
    }));
    return { id, name, quantity };
};
exports.createItem = createItem;
