import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
export function ConfirmDialog({ open, onOpenChange, title, description, confirmText, cancelText = "Cancel", onConfirm, }) {
    const [inputValue, setInputValue] = React.useState("");
    return (_jsx(AlertDialog.Root, { open: open, onOpenChange: onOpenChange, children: _jsxs(AlertDialog.Portal, { children: [_jsx(AlertDialog.Overlay, { className: "fixed inset-0 bg-black/50 z-40" }), _jsxs(AlertDialog.Content, { className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-md shadow-lg w-80", children: [_jsx(AlertDialog.Title, { className: "text-lg font-bold mb-2", children: title }), _jsx(AlertDialog.Description, { className: "text-sm text-gray-600 mb-4", children: description }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx(AlertDialog.Cancel, { asChild: true, children: _jsx("button", { className: "px-3 py-1 rounded border border-gray-300 hover:bg-gray-100", children: "Cancel" }) }), _jsx(AlertDialog.Action, { asChild: true, children: _jsx("button", { className: "px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600", onClick: () => onConfirm(""), children: confirmText }) })] })] })] }) }));
}
