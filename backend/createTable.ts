import { DynamoDBClient, CreateTableCommand, ScalarAttributeType, KeyType } from "@aws-sdk/client-dynamodb";
import { TABLE_NAME } from "./utils/names.js";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:4567",
});

const params = {
  TableName: TABLE_NAME,
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" as KeyType },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" as ScalarAttributeType },
  ],
  BillingMode: "PAY_PER_REQUEST" as const,
};

async function main() {
  try {
    await client.send(new CreateTableCommand(params));
    console.log("Table 'Inventory' created successfully!");
  } catch (e) {
    console.error("Error creating table:", e);
  }
}

main();
