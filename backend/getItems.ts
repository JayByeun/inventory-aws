import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });

export async function getItems() {
  const data = await client.send(new ScanCommand({ TableName: "Inventory" }));

  return data.Items?.map((item) => ({
    id: item.id.S,
    name: item.name.S,
    quantity: Number(item.quantity.N),
    fileName: item.fileName?.S || null,
  })) || [];
}

