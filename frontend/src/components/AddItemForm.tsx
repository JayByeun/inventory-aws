import { useState } from "react";

export default function AddItemForm({ onAdd }: { onAdd: () => void }) {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [file, setFile] = useState<File | null>(null);

	const toBase64 = (file: File) =>
		new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || quantity <= 0) return;

		const fileBase64 = file ? await toBase64(file) : null;

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

		setName("");
		setQuantity(0);
		setFile(null);
		onAdd();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col space-y-2 p-3 bg-gray-50 rounded shadow"
		>
			<input
				type="text"
				placeholder="Item Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border border-gray-300 rounded px-2 py-1"
			/>
			<input
				type="number"
				placeholder="Quantity"
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
				className="border border-gray-300 rounded px-2 py-1 w-24"
			/>

			<input
				type="file"
				onChange={(e) => setFile(e.target.files?.[0] || null)}
				className="border border-gray-300 rounded px-2 py-1"
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
