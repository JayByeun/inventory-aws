import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { TABLE_NAME } from "./utils/names.js";
const client = new DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });
export const createItem = async (name, quantity) => {
    const id = uuidv4();
    await client.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
            id: { S: id },
            name: { S: name },
            quantity: { N: quantity.toString() },
        },
    }));
    return { id, name, quantity };
};
