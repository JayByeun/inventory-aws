## Inventory AWS App

This project is a simple inventory management system using AWS DynamoDB, Lambda, S3, and React.
It supports adding, reading, and deleting inventory items, with optional file upload to S3 via Lambda.

## Features

#### Inventory Management

-   Add items with name and quantity
-   Delete items
-   List items dynamically

#### AWS Integration

-   DynamoDB: Stores inventory items
-   Lambda: Handles item creation (POST) and optional file upload
-   S3: Stores uploaded files

#### Frontend

-   React + TypeScript
-   Dynamic forms and inventory list rendering

## Project Structure

```
inventory-aws/
├─ backend/
│  ├─ server.ts           # Express backend + Lambda routes
│  ├─ getItems.ts         # DynamoDB scan & parsing
│  ├─ lambda/
│  │  └─ addItemLambda.ts # Lambda function for adding items
│  ├─ s3Utils.ts          # S3 helpers
│  └─ createTable.ts      # DynamoDB table creation
├─ frontend/
│  ├─ src/
│  │  ├─ App.tsx
│  │  ├─ components/
│  │  │  ├─ InventoryList.tsx
│  │  │  └─ AddItemForm.tsx
│  └─ ...
├─ package.json
├─ tsconfig.json
└─ README.md
```

## How It Works (Technical Overview)

### Add Item Flow

-   User fills out AddItemForm in React.
-   Form submits name, quantity, and optional file (converted to Base64) via POST to /lambda/addItem.
-   Backend triggers Lambda function (addItemLambda.ts).
-   Lambda parses the request:
    -   If a file exists, Lambda uploads the file to S3 using s3Utils.ts.(did not added yet)
    -   Item data (name, quantity, optional S3 file URL) is stored in DynamoDB.

### Fetch Items

-   Frontend calls GET /items.
-   Backend reads from DynamoDB (getItems.ts) and converts AWS attribute types (e.g., { S: "Apple" }) to plain JSON.
-   Returns a list of items to React, which renders them in InventoryList.tsx.

### Delete Item

-   Frontend triggers DELETE /items/:id.
-   Backend removes the item from DynamoDB.
-   Optional: Delete the associated file from S3.

### AWS Services Interaction

-   DynamoDB: Stores inventory records (id, name, quantity, fileUrl).
-   S3: Stores uploaded files and generates public URLs.
-   Lambda: Handles POST requests, file processing, and writing to DynamoDB.
-   React Frontend: Provides dynamic forms and lists, communicates with backend API.

## Setup

#### Install dependencies

```
npm install
```

#### Start LocalStack

```
docker-compose up -d
```

LocalStack will emulate DynamoDB, Lambda, and S3.

#### Create DynamoDB Table

```
npx ts-node backend/createTable.ts
```

This will create a table named Inventory.

## Backend

#### Start backend server

```
npx ts-node-esm backend/server.ts
```

## Frontend

#### Start frontend

```
npm run dev
```

#### Components

-   InventoryList.tsx – Fetches and displays inventory items from backend
-   AddItemForm.tsx – Form to add new items with optional file upload

## Feature Improvments

-   Add update/edit functionality
-   Add user authentication
-   Integrate with real AWS environment
-   Add pagination and search to inventory list
