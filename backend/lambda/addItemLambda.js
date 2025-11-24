import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:4567", // LocalStack
});
export async function handler(event) {
    const { name, quantity } = JSON.parse(event.body);
    const params = {
        TableName: "Inventory",
        Item: {
            id: { S: crypto.randomUUID() },
            name: { S: name },
            quantity: { N: quantity.toString() },
        },
    };
    try {
        await client.send(new PutItemCommand(params));
        return { statusCode: 200, body: JSON.stringify({ message: "Item added!" }) };
    }
    catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
}
