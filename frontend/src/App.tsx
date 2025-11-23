import React from "react";
import InventoryList from "./components/InventoryList";
import AddItemForm from "./components/AddItemForm";

export default function App() {
	const [refresh, setRefresh] = React.useState(0);
	const refreshList = () => setRefresh((prev) => prev + 1);

	return (
		<div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
			<h1 className="text-3xl font-bold mb-4">
				Smart Inventory Dashboard
			</h1>
			<AddItemForm onAdd={refreshList} />
			<InventoryList refresh={refresh} />
		</div>
	);
}
