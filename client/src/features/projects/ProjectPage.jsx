import { useEffect, useState } from "react";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../../services/projects.service";
import { getClients } from "../../services/clients.service";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";

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
            setProjects([]);
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

    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        try {
            await deleteProject(projectId);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete project");
        }
    };

    if (loading) return <h2>Loading projects...</h2>;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Projects"
                subtitle="Manage all client projects in one place."
                buttonText="+ New Project"
                onButtonClick={openCreateForm}
            />

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
                            <Button type="submit">
                                {editingProject ? "Update Project" : "Save Project"}
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingProject(null);
                                    setForm(initialForm);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {projects.length === 0 ? (
                <EmptyState
                    title="No Projects Yet"
                    description="Create your first project and start tracking work."
                    action={<Button onClick={openCreateForm}>+ New Project</Button>}
                />
            ) : (
                <table className="w-full overflow-hidden rounded-xl border bg-white">
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
                                <td className="p-3 font-medium">{project.projectName}</td>
                                <td className="p-3">
                                    {project.client?.companyName || "-"}
                                </td>
                                <td className="p-3">
                                    <StatusBadge status={project.status} />
                                </td>
                                <td className="p-3">
                                    <PriorityBadge priority={project.priority} />
                                </td>
                                <td className="p-3">
                                    ₹{Number(project.budget || 0).toLocaleString()}
                                </td>
                                <td className="flex gap-2 p-3">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => openEditForm(project)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}