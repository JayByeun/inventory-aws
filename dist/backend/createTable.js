"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:4567",
});
const params = {
    TableName: "Inventory",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST", // literal type
};
async function main() {
    try {
        await client.send(new client_dynamodb_1.CreateTableCommand(params));
        console.log("Table 'Inventory' created successfully!");
    }
    catch (e) {
        console.error("Error creating table:", e);
    }
}
main();
