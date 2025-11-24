import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
export default function InventoryList({ refresh }) {
    const [items, setItems] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const fetchItems = async () => {
        const res = await fetch("http://localhost:3001/items");
        const data = await res.json();
        setItems(data);
    };
    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/items/${id}`, { method: "DELETE" });
        fetchItems();
        setDialogOpen(false);
    };
    const openDeleteDialog = (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };
    useEffect(() => {
        fetchItems();
    }, [refresh]);
    return (_jsxs("div", { children: [_jsx("ul", { children: items.map((item) => (_jsxs("li", { className: "flex justify-between items-center p-2", children: [_jsxs("span", { children: [item.name, " (", item.quantity, ")"] }), _jsx("button", { onClick: () => openDeleteDialog(item), className: "btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600", children: "Delete" })] }, item.id))) }), selectedItem && (_jsx(ConfirmDialog, { open: dialogOpen, onOpenChange: setDialogOpen, title: "Delete Item", description: `Are you sure you want to delete "${selectedItem.name}"?`, confirmText: "Delete", cancelText: "Cancel", onConfirm: (inputValue) => {
                    console.log("Reason:", inputValue);
                    handleDelete(selectedItem.id);
                } }))] }));
}
