import { useState, useEffect } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

interface Item {
	id: string;
	name: string;
	quantity: number;
	fileName?: string;
}

export default function InventoryList({ refresh }: { refresh: number }) {
	const [items, setItems] = useState<Item[]>([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);

	const fetchItems = async () => {
		const res = await fetch("http://localhost:3001/items");
		const data = await res.json();
		setItems(data);
	};

	const handleDelete = async (id: string) => {
		await fetch(`http://localhost:3001/items/${id}`, { method: "DELETE" });
		fetchItems();
		setDialogOpen(false);
	};

	const openDeleteDialog = (item: Item) => {
		setSelectedItem(item);
		setDialogOpen(true);
	};

	useEffect(() => {
		fetchItems();
	}, [refresh]);

	return (
		<div>
			<ul>
				{items.map((item) => (
					<li
						key={item.id}
						className="flex justify-between items-center p-2"
					>
						<span>
							{item.name} ({item.quantity})
						</span>
						{item.fileName && (
							<a
								href={`http://localhost:4567/inventory-bucket/${item.fileName}`}
								target="_blank"
								className="ml-2 text-blue-600 underline"
							>
								📎 {item.fileName}
							</a>
						)}
						<button
							onClick={() => openDeleteDialog(item)}
							className="btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
						>
							Delete
						</button>
					</li>
				))}
			</ul>

			{selectedItem && (
				<ConfirmDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					title="Delete Item"
					description={`Are you sure you want to delete "${selectedItem.name}"?`}
					confirmText="Delete"
					cancelText="Cancel"
					onConfirm={() => handleDelete(selectedItem.id)}
				/>
			)}
		</div>
	);
}
