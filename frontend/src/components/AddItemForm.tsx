import { useState } from "react";

export default function AddItemForm({ onAdd }: { onAdd: () => void }) {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || quantity <= 0) return;

		await fetch("http://localhost:3001/items", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, quantity }),
		});

		setName("");
		setQuantity(0);
		onAdd();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex space-x-2 mb-4 bg-gray-50 p-3 rounded shadow"
		>
			<input
				type="text"
				placeholder="Item Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border border-gray-300 rounded px-2 py-1 flex-1"
			/>
			<input
				type="number"
				placeholder="Quantity"
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
				className="border border-gray-300 rounded px-2 py-1 w-24"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
			>
				Add Item
			</button>
		</form>
	);
}
