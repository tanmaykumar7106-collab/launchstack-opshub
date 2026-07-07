const styles = {
    Lead: "bg-yellow-100 text-yellow-700",
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-slate-100 text-slate-700",

    Planning: "bg-blue-100 text-blue-700",
    "In Progress": "bg-orange-100 text-orange-700",
    Review: "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-slate-100 text-slate-700",

    Todo: "bg-slate-100 text-slate-700",
    Done: "bg-green-100 text-green-700",

    Draft: "bg-slate-100 text-slate-700",
    Published: "bg-green-100 text-green-700",
    Archived: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-700"
                }`}
        >
            {status}
        </span>
    );
}