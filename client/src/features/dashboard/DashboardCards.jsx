import {
    Users,
    FolderKanban,
    CheckSquare,
    IndianRupee,
} from "lucide-react";

const cards = [
    { key: "clients", title: "Clients", icon: Users, color: "bg-blue-600" },
    { key: "projects", title: "Projects", icon: FolderKanban, color: "bg-green-600" },
    { key: "tasks", title: "Tasks", icon: CheckSquare, color: "bg-orange-500" },
    {
        key: "totalBudget",
        title: "Budget",
        icon: IndianRupee,
        color: "bg-purple-600",
        isMoney: true,
    },
];

export default function DashboardCards({ dashboard }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const value = dashboard?.[card.key] || 0;

                return (
                    <div
                        key={card.key}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                                    {card.isMoney ? `₹${Number(value).toLocaleString()}` : value}
                                </h2>
                            </div>

                            <div className={`rounded-xl p-3 ${card.color}`}>
                                <Icon size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}