import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import PriorityBadge from "@/components/ui/PriorityBadge";

export default function UpcomingTasks({ tasks = [] }) {
    return (
        <Card>
            <SectionTitle>Upcoming Tasks</SectionTitle>

            {tasks.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">
                    No upcoming tasks.
                </p>
            ) : (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                        >
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {task.title}
                                </p>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {task.project?.projectName || "No Project"}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Due:{" "}
                                    {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString()
                                        : "No Due Date"}
                                </p>
                            </div>

                            <PriorityBadge priority={task.priority} />
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}