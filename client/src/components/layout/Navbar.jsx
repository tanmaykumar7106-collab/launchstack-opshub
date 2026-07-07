import {
    Bell,
    Plus,
    Search,
    Moon,
    Sun,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900/90">
            {/* Search */}
            <div className="relative hidden w-full max-w-md md:block">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Search clients, projects, tasks..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-500 dark:focus:bg-slate-800"
                />
            </div>

            {/* Right Section */}
            <div className="ml-auto flex items-center gap-4">
                {/* Create Button */}
                <Button size="sm" className="gap-2">
                    <Plus size={16} />
                    Create
                </Button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                    {theme === "dark" ? (
                        <Sun size={18} />
                    ) : (
                        <Moon size={18} />
                    )}
                </button>

                {/* Notifications */}
                <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                    <Bell size={18} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white">
                        LS
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            Lucky
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Admin
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}