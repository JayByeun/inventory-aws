import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
});

export const createItem = async (name: string, quantity: number) => {
  const id = uuidv4();
  await client.send(
    new PutItemCommand({
      TableName: "Inventory",
      Item: {
        id: { S: id },
        name: { S: name },
        quantity: { N: quantity.toString() },
      },
    })
  );
  return { id, name, quantity };
};
