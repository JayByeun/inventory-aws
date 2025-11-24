import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import InventoryList from "./components/InventoryList";
import AddItemForm from "./components/AddItemForm";
export default function App() {
    const [refresh, setRefresh] = React.useState(0);
    const refreshList = () => setRefresh((prev) => prev + 1);
    return (_jsxs("div", { className: "max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Smart Inventory Dashboard" }), _jsx(AddItemForm, { onAdd: refreshList }), _jsx(InventoryList, { refresh: refresh })] }));
}
