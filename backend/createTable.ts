import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ endpoint: "http://localhost:4566", region: "us-east-1" });

async function createTable() {
  try {
    await client.send(new CreateTableCommand({
      TableName: "Inventory",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      BillingMode: "PAY_PER_REQUEST"
    }));
    console.log("Inventory table created!");
  } catch (e) {
    console.log("Table may already exist:", e);
  }
}

createTable();
