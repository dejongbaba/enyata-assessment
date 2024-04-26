import React from "react";

export const getColor = (code) => {
    switch (code) {
        case "paid":
        case "completed":
        case "active":
        case "delivered":
        case "approved":
        case "success":
        case "successful":
            return {
                background: "bg-green-500",
                text: "text-white",
            };
        case "pending":
        case "at_hub":
            return {
                background: "bg-blue-500",
                text: "text-white",
            };
        case "ready":
        case "ready_for_processing":
        case "in_transit":
            return {
                background: "bg-yellow-400",
                text: "text-white",
            };
        case "cancelled":
        case "rejected":
            return {
                background: "bg-red-500",
                text: "text-white",
            };
        case "inactive":
            return {
                background: "bg-gray-500",
                text: "text-white",
            };
        default:
            return {
                background: "bg-slate-200",
                text: "text-black",
            };
    }
};

export default function Component({ name = "Unknown", code = "" }) {
    const { background, text } = getColor(code);

    return (
        <div
            className={`${background} ${text} text-2xs whitespace-nowrap font-medium tracking-wider w-auto uppercase px-1.5 py-1 rounded inline-block text-center`}>{`${name}`}</div>
    );
}
