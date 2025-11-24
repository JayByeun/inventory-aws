"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getItems_1 = require("./getItems");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({ endpoint: "http://localhost:4567", region: "us-east-1" });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// GET items
app.get("/items", async (req, res) => {
    const items = await (0, getItems_1.getItems)();
    res.json(items);
});
// // POST item
// app.post("/items", async (req: Request, res: Response) => {
//   const { name, quantity } = req.body;
//   const item = await createItem(name, quantity);
//   res.json(item);
// });
app.post("/lambda/addItem", async (req, res) => {
    const { name, quantity, fileBase64, fileName } = req.body;
    const { handler } = await Promise.resolve().then(() => __importStar(require("./lambda/addItemLambda")));
    const result = await handler({ name, quantity, fileBase64, fileName });
    res.json(result);
});
// DELETE item
app.delete("/items/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await client.send(new client_dynamodb_1.DeleteItemCommand({
            TableName: "Inventory",
            Key: { id: { S: id } },
        }));
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ success: false, error });
    }
});
app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
