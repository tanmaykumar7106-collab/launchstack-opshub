const tabs = [
    {
        id: "sop",
        label: "SOP Generator",
        icon: "📚",
    },
    {
        id: "tasks",
        label: "Task Planner",
        icon: "📋",
    },
    {
        id: "email",
        label: "Email Writer",
        icon: "📧",
    },
];

export default function AIActionTabs({ activeTool, onChange }) {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-1 hover:shadow-md ${activeTool === tab.id
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                        }`}
                >
                    <div className="text-2xl">{tab.icon}</div>
                    <p className="mt-3 font-semibold">{tab.label}</p>
                </button>
            ))}
        </div>
    );
}