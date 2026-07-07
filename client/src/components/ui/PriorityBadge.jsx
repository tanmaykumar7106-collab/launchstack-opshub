const styles = {
    Low: "bg-slate-100 text-slate-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
};

export default function PriorityBadge({ priority }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[priority] || "bg-slate-100 text-slate-700"
                }`}
        >
            {priority}
        </span>
    );
}