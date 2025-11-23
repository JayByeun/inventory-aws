import express, { Request, Response } from "express";
import cors from "cors";
import { createItem } from "./createItem";
import { getItems } from "./getItems";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
});

const app = express();
app.use(cors());
app.use(express.json());

// GET items
app.get("/items", async (req: Request, res: Response) => {
  const items = await getItems();
  res.json(items);
});

// POST item
app.post("/items", async (req: Request, res: Response) => {
  const { name, quantity } = req.body;
  const item = await createItem(name, quantity);
  res.json(item);
});

// DELETE item
app.delete("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await client.send(
      new DeleteItemCommand({
        TableName: "Inventory",
        Key: { id: { S: id } },
      })
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, error });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
