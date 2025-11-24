import express, { Request, Response } from "express";
import cors from "cors";
import { getItems } from "./getItems.js";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { handler as addItemLambda } from "./lambda/addItemLambda.js";
import { TABLE_NAME } from "./utils/names.js";

const client = new DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type",
}));

// GET items
app.get("/items", async (req: Request, res: Response) => {
  const items = await getItems();
  res.json(items);
});

// CREATE Items
app.post("/lambda/addItem", async (req, res) => {
  const response = await addItemLambda({ body: JSON.stringify(req.body) });
  res.status(response.statusCode).send(response.body);
});

// DELETE item
app.delete("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await client.send(
      new DeleteItemCommand({
        TableName: TABLE_NAME,
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
