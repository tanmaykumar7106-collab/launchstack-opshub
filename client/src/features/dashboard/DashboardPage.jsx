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
    const [stats, setStats] = useState({
        clients: 0,
        projects: 0,
        tasks: 0,
        sops: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDashboardStats();

                console.log("Dashboard stats:", res);

                setStats(res.data || res);
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

                <Button>
                    + New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Clients"
                    value={stats.clients}
                    icon={Users}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Projects"
                    value={stats.projects}
                    icon={FolderKanban}
                    color="bg-green-600"
                />

                <StatCard
                    title="Tasks"
                    value={stats.tasks}
                    icon={CheckSquare}
                    color="bg-orange-500"
                />

                <StatCard
                    title="SOPs"
                    value={stats.sops}
                    icon={FileText}
                    color="bg-purple-600"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card>
                    <h2 className="mb-4 text-xl font-semibold">
                        Recent Projects
                    </h2>

                    <p className="text-slate-500">
                        No recent projects yet.
                    </p>
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