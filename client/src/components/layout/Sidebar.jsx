import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CheckSquare,
    FileText,
    Bot,
    BarChart3,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const sections = [
    {
        title: "Main",
        items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/" }],
    },
    {
        title: "Workspace",
        items: [
            { name: "Clients", icon: Users, path: "/clients" },
            { name: "Projects", icon: FolderKanban, path: "/projects" },
            { name: "Tasks", icon: CheckSquare, path: "/tasks" },
            { name: "SOP Library", icon: FileText, path: "/sop" },
        ],
    },
    {
        title: "AI & Analytics",
        items: [
            { name: "AI Assistant", icon: Bot, path: "/ai" },
            { name: "Reports", icon: BarChart3, path: "/reports" },
        ],
    },
    {
        title: "Settings",
        items: [{ name: "Settings", icon: Settings, path: "/settings" }],
    },
];

export default function Sidebar() {
    return (
        <aside className="sticky top-0 h-screen w-72 border-r border-slate-200 bg-white px-4 py-5 transition-colors dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-md">
                <h1 className="text-2xl font-bold">LaunchStack</h1>
                <p className="text-sm text-blue-100">OpsHub</p>
            </div>

            <nav className="space-y-7">
                {sections.map((section) => (
                    <div key={section.title}>
                        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {section.title}
                        </p>

                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <item.icon size={18} />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}