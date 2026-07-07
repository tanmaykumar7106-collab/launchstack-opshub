const colors = {
    High:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    Medium:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

    Low:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function PriorityBadge({ priority }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[priority] ||
                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
        >
            {priority}
        </span>
    );
}