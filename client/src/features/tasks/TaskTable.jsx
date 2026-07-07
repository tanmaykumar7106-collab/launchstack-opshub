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
        <table className="w-full overflow-hidden rounded-xl border bg-white">
            <thead className="bg-slate-100">
                <tr>
                    <th className="p-3 text-left">Task</th>
                    <th className="p-3 text-left">Project</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Priority</th>
                    <th className="p-3 text-left">Due Date</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
            </thead>

            <tbody>
                {tasks.map((task) => (
                    <tr key={task._id} className="border-t">
                        <td className="p-3 font-medium">{task.title}</td>
                        <td className="p-3">{task.project?.projectName || "-"}</td>
                        <td className="p-3">
                            <StatusBadge status={task.status} />
                        </td>
                        <td className="p-3">
                            <PriorityBadge priority={task.priority} />
                        </td>
                        <td className="p-3">
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
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
    );
}