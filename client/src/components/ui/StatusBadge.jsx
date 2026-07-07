const colors = {
    Active:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    Completed:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    Planning:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

    Draft:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

    Lead:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

    Inactive:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    Done:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status] ||
                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
        >
            {status}
        </span>
    );
}