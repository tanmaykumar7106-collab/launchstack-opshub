import {
LayoutDashboard,
Users,
FolderKanban,
CheckSquare,
FileText,
Bot,
MessageSquare,
BarChart3,
Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
{
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
},
{
    name: "Clients",
    icon: Users,
    path: "/clients",
},
{
    name: "Projects",
    icon: FolderKanban,
    path: "/projects",
},
{
    name: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
},
{
    name: "SOP Library",
    icon: FileText,
    path: "/sop",
},
{
    name: "AI Assistant",
    icon: Bot,
    path: "/ai",
},
{
    name: "Project Discussions",
    icon: MessageSquare,
    path: "/workspace",
},
{
    name: "Reports",
    icon: BarChart3,
    path: "/reports",
},
{
    name: "Settings",
    icon: Settings,
    path: "/settings",
},
];

export default function Sidebar() {
return (
    <aside className="w-64 border-r bg-white">

    <div className="border-b p-6">

        <h1 className="text-2xl font-bold text-blue-600">
        LaunchStack
        </h1>

        <p className="text-sm text-slate-500">
        OpsHub
        </p>

    </div>

    <nav className="p-4">

        {menu.map((item) => (
        <NavLink
    key={item.name}
    to={item.path}
className={({ isActive }) =>
    `mb-2 flex w-full items-center gap-3 rounded-xl p-3 transition ${
    isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
    }`
}
>
<item.icon size={20} />
{item.name}
</NavLink>
        ))}

    </nav>

    </aside>
);
}