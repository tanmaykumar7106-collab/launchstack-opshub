import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import StatusBadge from "@/components/ui/StatusBadge";

export default function RecentProjects({ projects = [] }) {
    return (
        <Card>
            <SectionTitle>Recent Projects</SectionTitle>

            {projects.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">
                    No recent projects yet.
                </p>
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                        >
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {project.projectName}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {project.client?.companyName || "No Client"}
                                </p>
                            </div>

                            <StatusBadge status={project.status} />
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}