import {
Users,
FolderKanban,
CheckSquare,
FileText,
} from "lucide-react";

import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
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
        value="18"
        icon={Users}
        color="bg-blue-600"
        />

        <StatCard
        title="Projects"
        value="6"
        icon={FolderKanban}
        color="bg-green-600"
        />

        <StatCard
        title="Tasks"
        value="27"
        icon={CheckSquare}
        color="bg-orange-500"
        />

        <StatCard
        title="SOPs"
        value="12"
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