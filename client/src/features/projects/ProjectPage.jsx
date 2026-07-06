import { useEffect, useState } from "react";
import {
    getProjects,
    createProject,
    updateProject,
} from "../../services/projects.service";
import { getClients } from "../../services/clients.service";

const initialForm = {
    client: "",
    projectName: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    budget: "",
    startDate: "",
    endDate: "",
};

export default function ProjectPage() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchData();
    }, []);

    const formatDateForInput = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const fetchData = async () => {
        try {
            const [projectRes, clientRes] = await Promise.all([
                getProjects(),
                getClients(),
            ]);

            setProjects(projectRes.data || []);
            setClients(clientRes.data || clientRes.clients || []);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const openCreateForm = () => {
        setEditingProject(null);
        setForm(initialForm);
        setShowForm(true);
    };

    const openEditForm = (project) => {
        setEditingProject(project);

        setForm({
            client: project.client?._id || project.client || "",
            projectName: project.projectName || "",
            description: project.description || "",
            status: project.status || "Planning",
            priority: project.priority || "Medium",
            budget: project.budget || "",
            startDate: formatDateForInput(project.startDate),
            endDate: formatDateForInput(project.endDate),
        });

        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                budget: Number(form.budget || 0),
            };

            if (editingProject) {
                await updateProject(editingProject._id, payload);
            } else {
                await createProject(payload);
            }

            setForm(initialForm);
            setEditingProject(null);
            setShowForm(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save project");
        }
    };

    if (loading) return <h2>Loading projects...</h2>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-slate-500">
                        Manage all client projects here.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                >
                    + New Project
                </button>
            </div>

            {showForm && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        {editingProject ? "Edit Project" : "Add New Project"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-4 md:grid-cols-2"
                    >
                        <select
                            name="client"
                            value={form.client}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
                            required
                        >
                            <option value="">Select Client</option>
                            {clients.map((client) => (
                                <option key={client._id} value={client._id}>
                                    {client.companyName}
                                </option>
                            ))}
                        </select>

                        <input
                            name="projectName"
                            placeholder="Project Name"
                            value={form.projectName}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
                            required
                        />

                        <input
                            name="budget"
                            type="number"
                            placeholder="Budget"
                            value={form.budget}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
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
                            <option value="Planning">Planning</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>

                        <input
                            name="startDate"
                            type="date"
                            value={form.startDate}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
                        />

                        <input
                            name="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
                        />

                        <textarea
                            name="description"
                            placeholder="Project Description"
                            value={form.description}
                            onChange={handleChange}
                            className="rounded-xl border p-3 md:col-span-2"
                        />

                        <div className="flex gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                            >
                                {editingProject ? "Update Project" : "Save Project"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingProject(null);
                                    setForm(initialForm);
                                }}
                                className="rounded-xl border px-5 py-2.5"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <table className="w-full rounded-xl border bg-white">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left">Project</th>
                            <th className="p-3 text-left">Client</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Priority</th>
                            <th className="p-3 text-left">Budget</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id} className="border-t">
                                <td className="p-3">{project.projectName}</td>
                                <td className="p-3">
                                    {project.client?.companyName || "-"}
                                </td>
                                <td className="p-3">{project.status}</td>
                                <td className="p-3">{project.priority}</td>
                                <td className="p-3">
                                    ₹{Number(project.budget || 0).toLocaleString()}
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => openEditForm(project)}
                                        className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}