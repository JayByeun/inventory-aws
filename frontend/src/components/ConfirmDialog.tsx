import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	confirmText: string;
	cancelText?: string;
	onConfirm: (inputValue: string) => void;
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmText,
	cancelText = "Cancel",
	onConfirm,
}: ConfirmDialogProps) {
	const [inputValue, setInputValue] = React.useState("");

	return (
		<AlertDialog.Root open={open} onOpenChange={onOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
				<AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-md shadow-lg w-80">
					<AlertDialog.Title className="text-lg font-bold mb-2">
						{title}
					</AlertDialog.Title>
					<AlertDialog.Description className="text-sm text-gray-600 mb-4">
						{description}
					</AlertDialog.Description>

					<div className="flex justify-end space-x-2">
						<AlertDialog.Cancel asChild>
							<button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
								Cancel
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
								onClick={() => onConfirm("")}
							>
								{confirmText}
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}
