import { useNavigate } from "react-router-dom";
import { User, Mail, Moon, Sun, LogOut, Settings } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Page>
            <PageHeader
                title="Settings"
                subtitle="Manage your profile, theme, and application preferences."
            />

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-bold text-white">
                            LS
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Profile
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Your account information
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            <User size={18} className="text-slate-500" />
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Name
                                </p>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {user?.name || "Lucky"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            <Mail size={18} className="text-slate-500" />
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Email
                                </p>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {user?.email || "lucky@gmail.com"}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                            <Settings className="text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Preferences
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Customize your workspace experience
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            <div className="flex items-center gap-3">
                                {theme === "dark" ? (
                                    <Moon size={18} className="text-slate-500" />
                                ) : (
                                    <Sun size={18} className="text-slate-500" />
                                )}

                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        Theme
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Current mode: {theme === "dark" ? "Dark" : "Light"}
                                    </p>
                                </div>
                            </div>

                            <Button variant="secondary" onClick={toggleTheme}>
                                Switch Theme
                            </Button>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            <p className="font-medium text-slate-900 dark:text-white">
                                LaunchStack OpsHub
                            </p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                AI-powered business operations platform for clients, projects,
                                tasks, SOPs, reports, and AI workflows.
                            </p>
                        </div>

                        <Button variant="danger" onClick={handleLogout} className="gap-2">
                            <LogOut size={16} />
                            Logout
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}