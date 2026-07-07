import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
    "rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export default function TaskForm({
    form,
    setForm,
    projects,
    editingTask,
    onSubmit,
    onCancel,
}) {
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Card>
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    className={inputClass}
                    required
                >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.projectName}
                        </option>
                    ))}
                </select>

                <input
                    name="title"
                    placeholder="Task Title"
                    value={form.title}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                </select>

                <input
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                    className={inputClass}
                />

                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={form.description}
                    onChange={handleChange}
                    className={`${inputClass} md:col-span-2`}
                />

                <div className="flex gap-3 md:col-span-2">
                    <Button type="submit">
                        {editingTask ? "Update Task" : "Save Task"}
                    </Button>

                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    );
}