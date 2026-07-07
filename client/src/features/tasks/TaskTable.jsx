import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";
import EmptyState from "@/components/ui/EmptyState";

export default function TaskTable({ tasks, onEdit, onDelete, onCreate }) {
    if (tasks.length === 0) {
        return (
            <EmptyState
                title="No Tasks Yet"
                description="Create your first task and start tracking project work."
                action={<Button onClick={onCreate}>+ New Task</Button>}
            />
        );
    }

    return (
        <Card className="p-0">
            <table className="w-full overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">Task</th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">Project</th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">Status</th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">Priority</th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">Due Date</th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task._id}
                            className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                        >
                            <td className="p-3 font-medium text-slate-900 dark:text-white">
                                {task.title}
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">
                                {task.project?.projectName || "-"}
                            </td>
                            <td className="p-3">
                                <StatusBadge status={task.status} />
                            </td>
                            <td className="p-3">
                                <PriorityBadge priority={task.priority} />
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">
                                {task.dueDate
                                    ? new Date(task.dueDate).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td className="flex gap-2 p-3">
                                <Button size="sm" variant="secondary" onClick={() => onEdit(task)}>
                                    Edit
                                </Button>

                                <Button size="sm" variant="danger" onClick={() => onDelete(task._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}