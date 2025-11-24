import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function AddItemForm({ onAdd }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // if (!name || quantity <= 0) return;
        // await fetch("http://localhost:3001/items", {
        // 	method: "POST",
        // 	headers: { "Content-Type": "application/json" },
        // 	body: JSON.stringify({ name, quantity }),
        // });
        // setName("");
        // setQuantity(0);
        // onAdd();
        const fileBase64 = file ? await toBase64(file) : undefined;
        await fetch("http://localhost:3001/lambda/addItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                quantity,
                fileBase64,
                fileName: file?.name,
            }),
        });
        onAdd();
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex space-x-2 mb-4 bg-gray-50 p-3 rounded shadow", children: [_jsx("input", { type: "text", placeholder: "Item Name", value: name, onChange: (e) => setName(e.target.value), className: "border border-gray-300 rounded px-2 py-1 flex-1" }), _jsx("input", { type: "number", placeholder: "Quantity", value: quantity, onChange: (e) => setQuantity(Number(e.target.value)), className: "border border-gray-300 rounded px-2 py-1 w-24" }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600", children: "Add Item" })] }));
}
