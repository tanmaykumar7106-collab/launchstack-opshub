export default function TaskTable({ tasks, onEdit, onDelete }) {
    if (tasks.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <table className="w-full rounded-xl border bg-white">
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
                        <td className="p-3">{task.title}</td>
                        <td className="p-3">{task.project?.projectName || "-"}</td>
                        <td className="p-3">{task.status}</td>
                        <td className="p-3">{task.priority}</td>
                        <td className="p-3">
                            {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "-"}
                        </td>
                        <td className="flex gap-2 p-3">
                            <button
                                onClick={() => onEdit(task)}
                                className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(task._id)}
                                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}