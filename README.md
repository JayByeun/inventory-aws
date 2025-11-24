# Smart Inventory Dashboard 🛒

A full‑stack inventory management dashboard built with **TypeScript**, **React**, **Tailwind CSS**, and **Radix UI**.  
This project serves as a functional SaaS-like platform for inventory management, supporting operations such as adding, viewing, and deleting items with a clean and responsive UI.

---

## Architecture Overview

```
    ┌─────────────────────┐
    │      Frontend       │
    │  (React + TypeScript│
    │   Tailwind CSS +    │
    │   Radix UI)         │
    └─────────┬──────────┘
              │  HTTP / REST API
              ▼
    ┌─────────────────────┐
    │      Backend        │
    │  (Node.js + Express │
    │   TypeScript)       │
    └─────────┬──────────┘
              │ DynamoDB API calls
              ▼
    ┌─────────────────────┐
    │      Database       │
    │ LocalStack DynamoDB │
    │  (mock AWS)         │
    └─────────────────────┘

```

```text
Frontend (React + TypeScript + Tailwind CSS + Radix UI)
 └─ Provides user interface for inventory operations
      ├─ Add new items
      ├─ View item list
      └─ Delete items with confirmation dialog

Backend (Node.js + Express + TypeScript)
 └─ Handles REST API requests for inventory
      ├─ GET /items → list all items
      ├─ POST /items → add a new item
      └─ DELETE /items/:id → delete an item

Database (LocalStack DynamoDB)
 └─ Simulates AWS DynamoDB locally
      ├─ Stores inventory items (id, name, quantity)
      └─ Fully compatible with AWS SDK

Dev Tools
 ├─ TypeScript → static typing for frontend and backend
 ├─ Vite → fast frontend bundler
 ├─ Tailwind CSS → utility-first styling
 └─ Radix UI → accessible components (AlertDialog for delete confirmation)
```

## Features ✨

-   Add inventory items (name and quantity)
-   View a dynamic list of inventory items
-   Delete items with **modal confirmation** using Radix UI
-   Clean, responsive UI with **Tailwind CSS**
-   Type-safe full-stack implementation with **TypeScript**
-   Cloud-native style API simulation using **LocalStack DynamoDB**
-   Easily extensible to include additional modules such as maintenance and record management

## Tech Stack

| Layer    | Technology / Library                            |
| -------- | ----------------------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Radix UI |
| Backend  | Node.js, Express, TypeScript                    |
| Database | LocalStack DynamoDB (mock AWS)                  |
| API      | REST (GET, POST, DELETE)                        |
| Styling  | Tailwind CSS + custom utilities                 |

## Purpose and Significance 🎯

-   Demonstrates a **full-stack architecture** combining frontend, backend, and database layers.
-   Provides a **cloud-native style API** using LocalStack, enabling experimentation with AWS patterns locally.
-   Implements **modern frontend techniques** using React, Tailwind CSS, and Radix UI for clean, responsive, and accessible UI components.
-   Fully typed with **TypeScript**, ensuring type safety and maintainability across the stack.
-   Serves as a foundation for expanding into a more comprehensive SaaS ERP platform including records, maintenance, and analytics modules.

## How to Run Locally 🏃‍♀️

### Frontend

```
cd frontend
npm install
npm run dev
```

### Backend

```
cd backend
npm install
npx ts-node-esm server.ts
```

## Future Extensions

-   Replace LocalStack with actual AWS DynamoDB, Lambda, SQS
-   Implement CI/CD with GitHub Actions, CDK or Terraform for infra‑as‑code
-   Add maintenance & records modules (beyond inventory)
-   Introduce dashboard analytics and executive insights
-   Add role‑based access, audit logs, event streaming (Kafka/Kinesis)
