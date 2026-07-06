import { useEffect, useState } from "react";
import {
    Users,
    FolderKanban,
    CheckSquare,
    FileText,
} from "lucide-react";

import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import { getDashboardStats } from "../../services/dashboard.service";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState({
        clients: 0,
        projects: 0,
        tasks: 0,
        sops: 0,
        recentProjects: [],
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDashboardStats();

                setDashboard({
                    clients: res.data?.clients || 0,
                    projects: res.data?.projects || 0,
                    tasks: res.data?.tasks || 0,
                    sops: res.data?.sops || 0,
                    recentProjects: res.data?.recentProjects || [],
                });
            } catch (error) {
                console.error("Dashboard stats error:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">
                        Good Morning, Lucky 👋
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Welcome to LaunchStack OpsHub.
                    </p>
                </div>

                <Button>+ New Project</Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Clients" value={dashboard.clients} icon={Users} color="bg-blue-600" />
                <StatCard title="Projects" value={dashboard.projects} icon={FolderKanban} color="bg-green-600" />
                <StatCard title="Tasks" value={dashboard.tasks} icon={CheckSquare} color="bg-orange-500" />
                <StatCard title="SOPs" value={dashboard.sops} icon={FileText} color="bg-purple-600" />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card>
                    <h2 className="mb-4 text-xl font-semibold">
                        Recent Projects
                    </h2>

                    {dashboard.recentProjects?.length === 0 ? (
                        <p className="text-slate-500">
                            No recent projects yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {dashboard.recentProjects?.map((project) => (
                                <div
                                    key={project._id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div>
                                        <p className="font-medium">{project.projectName}</p>
                                        <p className="text-sm text-slate-500">
                                            {project.client?.companyName || "No Client"}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                <Card>
                    <h2 className="mb-4 text-xl font-semibold">
                        Recent Activities
                    </h2>

                    <p className="text-slate-500">
                        No recent activities yet.
                    </p>
                </Card>
            </div>
        </div>
    );
}