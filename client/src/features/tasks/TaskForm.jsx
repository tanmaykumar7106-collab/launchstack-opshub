const initialTaskForm = {
    project: "",
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
};

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
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
                {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3"
                    required
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3"
                />

                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={form.description}
                    onChange={handleChange}
                    className="rounded-xl border p-3 md:col-span-2"
                />

                <div className="flex gap-3 md:col-span-2">
                    <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                    >
                        {editingTask ? "Update Task" : "Save Task"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setForm(initialTaskForm);
                            onCancel();
                        }}
                        className="rounded-xl border px-5 py-2.5"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}